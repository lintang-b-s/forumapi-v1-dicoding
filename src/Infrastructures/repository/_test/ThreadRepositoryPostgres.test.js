const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadDetail = require('../../../Domains/threads/entities/ThreadDetail');


describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should persist add thread and return added thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      });
      const addThread = new AddThread({ 
        owner_id: 'user-123',
        title: 'title',
        body: 'body',
        
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await threadRepositoryPostgres.masukkanThread(addThread);

      // Assert
      const threads = await ThreadsTableTestHelper.findThreadsById('thread-123');
      expect(threads).toHaveLength(1);
    });
    // batas should persist

    it('should return added thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      });
      const addThread = new AddThread({
        title: 'title',
        body: 'body',
        owner_id: 'user-123',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedThread = await threadRepositoryPostgres.masukkanThread(addThread);

      // Assert
      expect(addedThread).toStrictEqual(new AddedThread({
        id: 'thread-123',
        title: 'title',
        body: 'body',
        owner_id: 'user-123',
        created_at: expect.any(Object),
      }));
    });
  });

  describe('mendapatkanThreadBerdasarkanId', () => {
    it('should throw NotFoundError when thread not found', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepositoryPostgres.mendapatkanThreadBerdasarkanId('thread-1234'))
        .rejects
        .toThrowError(NotFoundError);
    });

    it('should return thread id correctly when thread is found', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      });

      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      await ThreadsTableTestHelper.masukkanThread({
        id: 'thread-123',
        title: 'title',
        body: 'body',
        owner_id: 'user-123',
      });

      // Action
      const thread = await threadRepositoryPostgres.mendapatkanThreadBerdasarkanId('thread-123');

      // Assert
      expect(thread).toStrictEqual(new ThreadDetail({
        id: 'thread-123',
        title: 'title',
        body: 'body',
        username: 'dicoding',
        created_at: expect.any(Object),
      }));
    });
  });
});
