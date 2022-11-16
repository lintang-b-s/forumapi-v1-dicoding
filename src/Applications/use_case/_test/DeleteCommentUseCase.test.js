const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const UserRepository = require('../../../Domains/users/UserRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should throw error when thread_id is not provided', async () => {
    const useCasePayload = {
      comment_id: 'comment-123',
      user_id: 'user-123',
    };
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.mendapatkanThreadBerdasarkanId = jest.fn().mockReturnValue(Promise.resolve(null));
    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.hapusComment = jest.fn();
    const mockUserRepository = new UserRepository();
    mockUserRepository.getUsernameById = jest.fn().mockReturnValue(Promise.resolve('username'));

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      userRepository: mockUserRepository,
    });

    // Act
    const result = deleteCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockCommentRepository.hapusComment).not.toHaveBeenCalled();
    await expect(result).rejects.toThrowError('thread not found');
  });

  it('should throw error when comment_id is not provided', async () => {
    const useCasePayload = {
      thread_id: 'thread-123',
      user_id: 'user-123',
    };
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.mendapatkanThreadBerdasarkanId = jest.fn().mockReturnValue(Promise.resolve({}));
    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.hapusComment = jest.fn();
    const mockUserRepository = new UserRepository();
    mockUserRepository.getUsernameById = jest.fn().mockReturnValue(Promise.resolve('username'));

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Act
    const result = deleteCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockCommentRepository.hapusComment).not.toHaveBeenCalled();
    await expect(result).rejects.toThrowError('comment not found');
  });

  it('should throw error when trying to delete another user comment', async () => {
    const useCasePayload = {
      thread_id: 'thread-123',
      comment_id: 'comment-123',
      user_id: 'user-123',
    };
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.mendapatkanThreadBerdasarkanId = jest.fn()
      .mockResolvedValue({
        id: 'thread-123',
        title: 'thread-123',
        content: 'thread-123',
        created_at: '2020-01-01',
        username: 'username1',
      });
    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.mendapatkanCommentBerdasarkanId = jest.fn()
      .mockResolvedValue({
        id: 'comment-123',
        content: 'comment-123',
        created_at: '2020-01-01',
        username: 'username2',
      });
    mockCommentRepository.hapusComment = jest.fn()
      .mockResolvedValue({
        id: 'comment-123',
        content: 'content',
        created_at: '2020-01-01',
        username: 'username2',
      });
    const mockUserRepository = new UserRepository();
    mockUserRepository.verifyUsernameById = jest.fn().mockReturnValue(Promise.resolve('username1'));

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      userRepository: mockUserRepository,
    });

    // Act
    const result = deleteCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockCommentRepository.hapusComment).not.toHaveBeenCalled();
    await expect(result).rejects.toThrowError('pengguna tidak dapat menghapus komen ini, karena komen bukan milik anda');
  });

  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      thread_id: 'thread-123',
      comment_id: 'comment-123',
      user_id: 'user-123',
    };
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.mendapatkanThreadBerdasarkanId = jest.fn()
      .mockResolvedValue({
        id: 'thread-123',
        title: 'thread-123',
        content: 'thread-123',
        created_at: '2020-01-01',
        username: 'username',
      });
    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.mendapatkanCommentBerdasarkanId= jest.fn()
      .mockResolvedValue({
        id: 'comment-123',
        content: 'content',
        created_at: '2020-01-01',
        username: 'username',
      });
    mockCommentRepository.hapusComment = jest.fn();
    const mockUserRepository = new UserRepository();
    mockUserRepository.verifyUsernameById = jest.fn().mockReturnValue(Promise.resolve('username'));

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      userRepository: mockUserRepository,
    });

    // Act
    await deleteCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockCommentRepository.hapusComment).toHaveBeenCalledWith(useCasePayload.comment_id);
  });
});
