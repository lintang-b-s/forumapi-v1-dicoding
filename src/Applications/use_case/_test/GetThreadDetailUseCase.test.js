const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const UserRepository = require('../../../Domains/users/UserRepository');
const GetThreadDetailUseCase = require('../GetThreadDetailUseCase');
const ThreadDetail = require('../../../Domains/threads/entities/ThreadDetail');
const CommentDetail = require('../../../Domains/comments/entities/CommentDetail');
const ReplyDetail = require('../../../Domains/replies/entities/ReplyDetail');

describe('GetThreadDetailUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the get thread detail action correctly', async () => {
    // Arrange
    const useCasePayload = {
      id: 'thread-123',
    };
    const expectedThreadDetail = new ThreadDetail({
      id: 'thread-123',
      title: 'title',
      body: 'body',
      created_at: expect.any(Date),
      username: 'dicoding',
      comments: [
        new CommentDetail({
          id: 'comment-123',
          content: 'content',
          created_at: expect.any(Date),
          username: 'username',
          like_count: 0,
          replies: [
            new ReplyDetail({
              id: 'reply-123',
              content: 'content',
              created_at: expect.any(Date),
              username: 'username',
            })],
        })],
    });

    /** creating dependency of use case */
    const mockUserRepository = new UserRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    /** mocking needed function */
    mockThreadRepository.mendapatkanThreadBerdasarkanId = jest.fn(async () => {
      return new ThreadDetail({
        id: 'thread-123',
        username: 'dicoding',
        title: 'title',
        body: 'body',
        owner_id: 'user-123',
        created_at: expect.any(Date),
        comments: [],
      });
    });
    mockCommentRepository.mendapatkanCommentsBerdasarkanThreadId = jest.fn(async () => {
      return [
        new CommentDetail({
          id: 'comment-123',
          username: 'username',
          content: 'content',
          thread_id: 'thread-123',
          like_count: 0,
          created_at: expect.any(Date),
          deleted_at: null,
        })
      ];
    });
    mockReplyRepository.mendapatkanRepliesBerdasarkanCommentId = jest.fn(async () => {
      return [
        new ReplyDetail({
          id: 'reply-123',
          username: 'username',
          content: 'content',
          comment_id: 'comment-123',
          created_at: expect.any(Date),
          deleted_at: null,
        })
      ];
    });
    mockUserRepository.getUsernameById = jest.fn(async () => {
      return 'username';
    });

    /** creating use case instance */
    const getThreadDetailUseCase = new GetThreadDetailUseCase({
      userRepository: mockUserRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const threadDetail = await getThreadDetailUseCase.execute(useCasePayload);

    // Assert
    expect(threadDetail).toStrictEqual(expectedThreadDetail);
    expect(mockThreadRepository.mendapatkanThreadBerdasarkanId).toHaveBeenCalledWith(useCasePayload.id);
  });

  it('should sort comments by created_at', async () => {
    // Arrange
    const useCasePayload = {
      id: 'thread-123',
    };
    const expectedThreadDetail = new ThreadDetail({
      id: 'thread-123',
      title: 'title',
      body: 'body',
      created_at: expect.any(Date),
      username: 'dicoding',
      comments: [
        new CommentDetail({
          id: 'comment-123',
          content: 'content1',
          created_at: new Date("2020-01-04T00:00:00.000Z"),
          username: 'username1',
          like_count: 0,
          replies: [],
        }),
        new CommentDetail({
          id: 'comment-124',
          content: 'content2',
          created_at: new Date("2020-01-10T00:00:00.000Z"),
          username: 'username2',
          like_count: 0,
          replies: [],
        }),
      ],
    });

    /** creating dependency of use case */
    const mockUserRepository = new UserRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    /** mocking needed function */
    mockThreadRepository.mendapatkanThreadBerdasarkanId = jest.fn(async () => {
      return new ThreadDetail({
        id: 'thread-123',
        title: 'title',
        body: 'body',
        owner_id: 'user-123',
        username: 'dicoding',
        created_at: expect.any(Date),
        comments: [],
      });
    });
    mockCommentRepository.mendapatkanCommentsBerdasarkanThreadId = jest.fn(async () => {
      return [
        new CommentDetail({
          id: 'comment-124',
          username: 'username2',
          content: 'content2',
          thread_id: 'thread-123',
          created_at: new Date("2020-01-10T00:00:00.000Z"),
          deleted_at: null,
          like_count: 0,
          replies: [],
        }),
        new CommentDetail({
          id: 'comment-123',
          username: 'username1',
          content: 'content1',
          thread_id: 'thread-123',
          created_at: new Date("2020-01-04T00:00:00.000Z"),
          deleted_at: null,
          like_count: 0,
          replies: [],
        }),
      ];
    });
    mockReplyRepository.mendapatkanRepliesBerdasarkanCommentId = jest.fn(async () => {
      return [];
    });
    mockUserRepository.getUsernameById = jest.fn(async () => {
      return 'username';
    });

    /** creating use case instance */
    const getThreadDetailUseCase = new GetThreadDetailUseCase({
      userRepository: mockUserRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const threadDetail = await getThreadDetailUseCase.execute(useCasePayload);

    // Assert
    expect(threadDetail).toStrictEqual(expectedThreadDetail);
    expect(mockThreadRepository.mendapatkanThreadBerdasarkanId).toHaveBeenCalledWith(useCasePayload.id);
  });

  it('should sort replies by created_at', async () => {
    // Arrange
    const useCasePayload = {
      id: 'thread-123',
    };
    const expectedThreadDetail = new ThreadDetail({
      id: 'thread-123',
      title: 'title',
      body: 'body',
      created_at: expect.any(Date),
      username: 'dicoding',
      comments: [
        new CommentDetail({
          id: 'comment-123',
          content: 'content1',
          created_at: new Date("2020-01-04T00:00:00.000Z"),
          username: 'username1',
          like_count: 0,
          replies: [
            new ReplyDetail({
              id: 'reply-123',
              content: 'reply1',
              created_at: new Date("2021-01-01T00:00:00.000Z"),
              username: 'username2',
            }),
            new ReplyDetail({
              id: 'reply-124',
              content: 'reply2',
              created_at: new Date("2021-01-02T00:00:00.000Z"),
              username: 'username2',
            }),
          ],
        }),
      ],
    });

    /** creating dependency of use case */
    const mockUserRepository = new UserRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    /** mocking needed function */
    mockThreadRepository.mendapatkanThreadBerdasarkanId = jest.fn(async () => {
      return new ThreadDetail({
        id: 'thread-123',
        title: 'title',
        body: 'body',
        owner_id: 'user-123',
        username: 'dicoding',
        created_at: expect.any(Date),
        comments: [],
      });
    });
    mockCommentRepository.mendapatkanCommentsBerdasarkanThreadId = jest.fn(async () => {
      return [
        new CommentDetail({
          id: 'comment-123',
          username: 'username1',
          content: 'content1',
          thread_id: 'thread-123',
          created_at: new Date("2020-01-04T00:00:00.000Z"),
          deleted_at: null,
          like_count: 0,
          replies: []
        }),
      ];
    });
    mockReplyRepository.mendapatkanRepliesBerdasarkanCommentId = jest.fn(async () => {
      return [
        new ReplyDetail({
          id: 'reply-124',
          content: 'reply2',
          created_at: new Date("2021-01-02T00:00:00.000Z"),
          username: 'username2',
        }),
        new ReplyDetail({
          id: 'reply-123',
          content: 'reply1',
          created_at: new Date("2021-01-01T00:00:00.000Z"),
          username: 'username2',
        }),
      ];
    });
    mockUserRepository.getUsernameById = jest.fn(async () => {
      return 'username';
    });

    /** creating use case instance */
    const getThreadDetailUseCase = new GetThreadDetailUseCase({
      userRepository: mockUserRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const threadDetail = await getThreadDetailUseCase.execute(useCasePayload);

    // Assert
    expect(threadDetail).toStrictEqual(expectedThreadDetail);
    expect(mockThreadRepository.mendapatkanThreadBerdasarkanId).toHaveBeenCalledWith(useCasePayload.id);
  });
});
