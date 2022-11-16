const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');

describe('AddCommentUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'content',
      owner_id: 'user-123',
      thread_id: 'thread-123',
    };
    const expectedAddedComment = new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      thread_id: useCasePayload.thread_id,
      owner_id: useCasePayload.owner_id,
      created_at: expect.any(String),
      deleted_at: null,
    });

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.mendapatkanThreadBerdasarkanId = jest.fn(async () => {
      return new AddedThread({
        id: 'thread-123',
        title: 'title',
        body: 'body',
        owner_id: 'user-123',
        created_at: expect.any(String),
      });
    });
    mockCommentRepository.masukkanComment = jest.fn(() => Promise.resolve(expectedAddedComment));

    /** creating use case instance */
    const getCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedComment = await getCommentUseCase.execute(useCasePayload);

    // Assert
    expect(addedComment).toStrictEqual(expectedAddedComment);
    expect(mockCommentRepository.masukkanComment).toBeCalledWith(new AddComment({
      content: useCasePayload.content,
      owner_id: useCasePayload.owner_id,
      thread_id: useCasePayload.thread_id,
    }));
  });
});
