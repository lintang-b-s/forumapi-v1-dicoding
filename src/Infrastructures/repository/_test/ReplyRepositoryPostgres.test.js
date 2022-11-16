const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddReply = require('../../../Domains/replies/entities/AddReply');
const pool = require('../../database/postgres/pool');
const ReplyRepositoryPostgres = require('../ReplyRepositoryPostgres');
const AddedReply = require('../../../Domains/replies/entities/AddedReply');
const ReplyDetail = require('../../../Domains/replies/entities/ReplyDetail');


describe('ReplyRepositoryPostgres', () => {
  afterEach(async () => {
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addReply function', () => {
    it('should persist add comment and return added comment correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      });
      await ThreadsTableTestHelper.masukkanThread({
        id: 'thread-123',
        title: 'Dicoding Indonesia',
        body: 'All About Dicoding Indonesia here',
        owner_id: 'user-123',
      });
      await CommentsTableTestHelper.insertComment({
        id: 'comment-123',
        content: 'Hello World',
        owner_id: 'user-123',
      });
      const addReply = new AddReply({
        content: 'dicoding',
        owner_id: 'user-123',
        comment_id: 'comment-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await replyRepositoryPostgres.masukkanReply(addReply);

      // Assert
      const reply = await RepliesTableTestHelper.findReplyById('reply-123');
      expect(reply).toHaveLength(1);
    });

    it('should return added reply correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      });
      await ThreadsTableTestHelper.masukkanThread({
        id: 'thread-123',
        title: 'Dicoding Indonesia',
        body: 'All About Dicoding Indonesia here',
        owner_id: 'user-123',
      });
      await CommentsTableTestHelper.insertComment({
        id: 'comment-123',
        content: 'Hello World',
        owner_id: 'user-123',
      });
      const addReply = new AddReply({
        content: 'dicoding',
        comment_id: 'comment-123',
        owner_id: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedReply = await replyRepositoryPostgres.masukkanReply(addReply);

      // Assert
      expect(addedReply).toStrictEqual(new AddedReply({
        id: 'reply-123',
        content: 'dicoding',
        comment_id: 'comment-123',
        owner_id: 'user-123',
        created_at: expect.any(Object),
      }));
    });
  });

  describe('getReplyById', () => {
    it('should return comment detail correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      });

      await ThreadsTableTestHelper.masukkanThread({
        id: 'thread-123',
        title: 'Dicoding Indonesia',
        body: 'All About Dicoding Indonesia here',
        owner_id: 'user-123',
      });

      await CommentsTableTestHelper.insertComment({
        id: 'comment-123',
        content: 'dicoding comment',
        thread_id: 'thread-123',
        owner_id: 'user-123',
      });

      await RepliesTableTestHelper.insertReply({
        id: 'reply-123',
        content: 'dicoding reply',
        comment_id: 'comment-123',
        owner_id: 'user-123',
      });

      const fakeIdGenerator = () => '123'; // stub!
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const reply = await replyRepositoryPostgres.mendapatkanReplyBerdasarkanId('reply-123');

      // Assert
      expect(reply).toStrictEqual(new ReplyDetail({
        id: 'reply-123',
        thread_id: 'thread-123',
        username: 'dicoding',
        content: 'dicoding reply',
        created_at: expect.any(Object),
      }));
    });

    it('should throw error when reply not found', async () => {
      // Arrange
      const fakeIdGenerator = () => '123'; // stub!
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const action = replyRepositoryPostgres.mendapatkanReplyBerdasarkanId('reply-123');

      // Assert
      await expect(action).rejects.toThrow(NotFoundError);
    });
  });


  describe('deleteReply', () => {
    it('should throw InvariantError when reply id is not provided', async () => {
      // Arrange
      const fakeIdGenerator = () => '123'; // stub!
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action and Assert
      await expect(replyRepositoryPostgres.hapusReply()).rejects.toThrowError(InvariantError);
    });

    it('should throw InvariantError when reply id is not valid', async () => {
      // Arrange
      const fakeIdGenerator = () => '123'; // stub!
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action and Assert
      await expect(replyRepositoryPostgres.hapusReply('invalid-id')).rejects.toThrowError(InvariantError);
    });

    it('should update deleted_at column to current timestamp', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      });

      await ThreadsTableTestHelper.masukkanThread({
        id: 'thread-123',
        title: 'Dicoding Indonesia',
        body: 'All About Dicoding Indonesia here',
        owner_id: 'user-123',
      });

      await CommentsTableTestHelper.insertComment({
        id: 'comment-123',
        content: 'dicoding',
        owner_id: 'user-123',
        thread_id: 'thread-123',
      });

      await RepliesTableTestHelper.insertReply({
        id: 'reply-123',
        content: 'dicoding',
        owner_id: 'user-123',
        comment_id: 'comment-123',
      });

      const fakeIdGenerator = () => '123'; // stub!
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await replyRepositoryPostgres.hapusReply('reply-123');

      // Assert
      const replies = await RepliesTableTestHelper.findReplyById('reply-123');
      expect(replies[0].id).toBe('reply-123');
      expect(replies[0].deleted_at).toBeDefined();
    });
  });

  describe('getRepliesByCommentId', () => {
    it('should return empty array when comment id is not provided', async () => {
      // Arrange
      const fakeIdGenerator = () => '123'; // stub!
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const replies = await replyRepositoryPostgres.mendapatkanRepliesBerdasarkanCommentId();

      // Assert
      expect(replies).toHaveLength(0);
    });

    it('should return empty array when comment id is not valid', async () => {
      // Arrange
      const fakeIdGenerator = () => '123'; // stub!
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const replies = await replyRepositoryPostgres.mendapatkanRepliesBerdasarkanCommentId('invalid-id');

      // Assert
      expect(replies).toHaveLength(0);
    });

    it('should return replies correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      });

      await ThreadsTableTestHelper.masukkanThread({
        id: 'thread-123',
        title: 'Dicoding Indonesia',
        body: 'All About Dicoding Indonesia here',
        owner_id: 'user-123',
      });

      await CommentsTableTestHelper.insertComment({
        id: 'comment-123',
        content: 'dicoding comment',
        owner_id: 'user-123',
        thread_id: 'thread-123',
      });

      await RepliesTableTestHelper.insertReply({
        id: 'reply-123',
        content: 'dicoding reply',
        owner_id: 'user-123',
        comment_id: 'comment-123',
      });

      const fakeIdGenerator = () => '123'; // stub!
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const replies = await replyRepositoryPostgres.mendapatkanRepliesBerdasarkanCommentId('comment-123');

      // Assert
      expect(replies).toHaveLength(1);
      expect(replies[0].id).toBe('reply-123');
      expect(replies[0].content).toBe('dicoding reply');
      expect(replies[0].username).toBe('dicoding');
      expect(replies[0].date).toBeDefined();
    });
  });
});
