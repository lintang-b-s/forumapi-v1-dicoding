const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const UserRepository = require('../../../Domains/users/UserRepository');
const DeleteReplyUseCase = require('../DeleteReplyUseCase');

describe('DeleteReplyUseCase', () => {
  it('should throw error when thread_id is not provided', async () => {
    const useCasePayload = {
      reply_id: 'reply-123',
      comment_id: 'comment-123',
      user_id: 'user-123',
    };
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.mendapatkanThreadBerdasarkanId= jest.fn().mockReturnValue(Promise.resolve(null));
    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.mendapatkanCommentBerdasarkanId = jest.fn();
    const mockReplyRepository = new ReplyRepository();
    mockReplyRepository.hapusReply = jest.fn();
    const mockUserRepository = new UserRepository();
    mockUserRepository.getUsernameById = jest.fn().mockReturnValue(Promise.resolve('username'));

    const deleteReplyUseCase = new DeleteReplyUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
      userRepository: mockUserRepository,
    });

    // Act
    const result = deleteReplyUseCase.execute(useCasePayload);

    // Assert
    expect(mockReplyRepository.hapusReply).not.toHaveBeenCalled();
    await expect(result).rejects.toThrowError('thread not found');
  });

  it('should throw error when comment_id is not provided', async () => {
    const useCasePayload = {
      reply_id: 'reply-123',
      thread_id: 'thread-123',
      user_id: 'user-123',
    };
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.mendapatkanThreadBerdasarkanId= jest.fn().mockReturnValue(Promise.resolve({}));
    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.mendapatkanCommentBerdasarkanId = jest.fn().mockReturnValue(Promise.resolve(null));
    const mockReplyRepository = new ReplyRepository();
    mockReplyRepository.hapusReply= jest.fn();
    const mockUserRepository = new UserRepository();
    mockUserRepository.getUsernameById = jest.fn().mockReturnValue(Promise.resolve('username'));

    const deleteReplyUseCase = new DeleteReplyUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
      userRepository: mockUserRepository,
    });

    // Act
    const result = deleteReplyUseCase.execute(useCasePayload);

    // Assert
    expect(mockReplyRepository.hapusReply).not.toHaveBeenCalled();
    await expect(result).rejects.toThrowError('comment not found');
  });

  it('should throw error when reply_id is not provided', async () => {
    const useCasePayload = {
      comment_id: 'comment-123',
      thread_id: 'thread-123',
      user_id: 'user-123',
    };
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.mendapatkanThreadBerdasarkanId= jest.fn().mockReturnValue(Promise.resolve({}));
    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.mendapatkanCommentBerdasarkanId = jest.fn().mockReturnValue(Promise.resolve({}));
    const mockReplyRepository = new ReplyRepository();
    mockReplyRepository.mendapatkanReplyBerdasarkanId = jest.fn();
    mockReplyRepository.hapusReply = jest.fn();
    const mockUserRepository = new UserRepository();
    mockUserRepository.getUsernameById = jest.fn().mockReturnValue(Promise.resolve('username'));

    const deleteReplyUseCase = new DeleteReplyUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
      userRepository: mockUserRepository,
    });

    // Act
    const result = deleteReplyUseCase.execute(useCasePayload);

    // Assert
    expect(mockReplyRepository.hapusReply).not.toHaveBeenCalled();
    await expect(result).rejects.toThrowError('reply not found');
  });

  it('should throw error when trying to delete another user reply', async () => {
    const useCasePayload = {
      thread_id: 'thread-123',
      comment_id: 'comment-123',
      reply_id: 'reply-123',
      user_id: 'user-123',
    };
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.mendapatkanThreadBerdasarkanId= jest.fn()
      .mockResolvedValue({
        id: 'thread-123',
        title: 'thread-123',
        content: 'this is a thread',
        created_at: '2020-01-01',
        username: 'username1',
      });
    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.mendapatkanCommentBerdasarkanId = jest.fn()
      .mockResolvedValue({
        id: 'comment-123',
        content: 'this is a comment',
        created_at: '2020-01-01',
        username: 'username2',
      });
    const mockReplyRepository = new ReplyRepository();
    mockReplyRepository.mendapatkanReplyBerdasarkanId = jest.fn()
      .mockResolvedValue({
        id: 'reply-123',
        content: 'this is reply',
        created_at: '2020-01-01',
        username: 'username2',
      });
    mockReplyRepository.hapusReply = jest.fn()
      .mockResolvedValue({
        id: 'reply-123',
        content: 'this is a reply',
        created_at: '2020-01-01',
        username: 'username2',
      });
    const mockUserRepository = new UserRepository();
    mockUserRepository.verifyUsernameById = jest.fn().mockReturnValue(Promise.resolve('username1'));

    const deleteReplyUseCase = new DeleteReplyUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
      userRepository: mockUserRepository,
    });

    // Act
    const result = deleteReplyUseCase.execute(useCasePayload);

    // Assert
    expect(mockReplyRepository.hapusReply).not.toHaveBeenCalled();
    await expect(result).rejects.toThrowError('user not authorized');
  });
 
  it('should orchestrating the delete reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      thread_id: 'thread-123',
      comment_id: 'comment-123',
      reply_id: 'reply-123',
      user_id: 'user-123',
    };
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.mendapatkanThreadBerdasarkanId= jest.fn()
      .mockResolvedValue({
        id: 'thread-123',
        title: 'a thread',
        content: 'this is a thread',
        created_at: '2020-01-01',
        username: 'username',
      });
    const mockCommentRepository = new CommentRepository();
    mockCommentRepository.mendapatkanCommentBerdasarkanId = jest.fn()
      .mockResolvedValue({
        id: 'comment-123',
        content: 'content',
        created_at: '2020-01-01',
        username: 'username',
      });
    const mockReplyRepository = new ReplyRepository();
    mockReplyRepository.mendapatkanReplyBerdasarkanId = jest.fn()
      .mockResolvedValue({
        id: 'reply-123',
        content: 'content',
        created_at: '2020-01-01',
        username: 'username',
      });
    mockReplyRepository.hapusReply = jest.fn();
    const mockUserRepository = new UserRepository();
    mockUserRepository.verifyUsernameById = jest.fn().mockReturnValue(Promise.resolve('username'));

    const deleteReplyUseCase = new DeleteReplyUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
      userRepository: mockUserRepository,
    });

    // Act
    await deleteReplyUseCase.execute(useCasePayload);

    // Assert
    // mungkin harusnya tothrowerrorr
    expect(mockReplyRepository.hapusReply).toHaveBeenCalledWith(useCasePayload.reply_id);
  });
});
