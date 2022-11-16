const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddReplyUseCase = require('../AddReplyUseCase');
const AddReply = require('../../../Domains/replies/entities/AddReply');
const AddedReply = require('../../../Domains/replies/entities/AddedReply');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');

describe('AddReplyUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'content',
      owner_id: 'user-123',
      comment_id: 'comment-123',
      thread_id: 'thread-123',
    };
    const expectedAddedReply = new AddedReply({
      id: 'reply-123',
      content: useCasePayload.content,
      comment_id: useCasePayload.comment_id,
      owner_id: useCasePayload.owner_id,
      created_at: expect.any(String),
      deleted_at: null,
    });

    /** creating dependency of use case */
    const mockReplyRepository = new ReplyRepository();
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
    mockCommentRepository.mendapatkanCommentBerdasarkanId = jest.fn(async () => {
      return new AddedComment({
        id: 'comment-123',
        content: 'content',
        thread_id: 'thread-123',
        owner_id: 'user-123',
        created_at: expect.any(String),
      });
    });
    mockReplyRepository.masukkanReply = jest.fn(() => Promise.resolve(expectedAddedReply));

    /** creating use case instance */
    const getReplyUseCase = new AddReplyUseCase({
      replyRepository: mockReplyRepository,
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedReply = await getReplyUseCase.execute(useCasePayload);

    // Assert
    expect(addedReply).toStrictEqual(expectedAddedReply);
    expect(mockReplyRepository.masukkanReply).toBeCalledWith(new AddReply({
      content: useCasePayload.content,
      owner_id: useCasePayload.owner_id,
      comment_id: useCasePayload.comment_id,
    }));
  });
});
