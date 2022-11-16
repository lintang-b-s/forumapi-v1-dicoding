const pool = require('../../database/postgres/pool');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTestHelper = require('../../../../tests/AuthenticationsTestHelper');
const ThreadsTestHelper = require('../../../../tests/ThreadsTestHelper');
const CommentsTestHelper = require('../../../../tests/CommentsTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/comments endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  beforeEach(async () => {
    jest.setTimeout(120000);
  });

  describe('when POST /comments', () => {
    it('should response 201 and persisted comment', async () => {
      // Arrange
      const requestPayload = {
        content: 'content',
      };
      // eslint-disable-next-line no-undef
      const server = await createServer(container);
      const accessToken = await AuthenticationsTestHelper.getAccessToken(server);
      const threadId = await ThreadsTestHelper.getThreadId(server, accessToken);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedComment).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {};
      const server = await createServer(container);
      const accessToken = await AuthenticationsTestHelper.getAccessToken(server);
      const threadId = await ThreadsTestHelper.getThreadId(server, accessToken);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat comment baru karena properti tidak lengkap sesuai yang dibutuhkan');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const requestPayload = {
        content: ['content'],
      };
      const server = await createServer(container);
      const accessToken = await AuthenticationsTestHelper.getAccessToken(server);
      const threadId = await ThreadsTestHelper.getThreadId(server, accessToken);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat comment baru karena tipe data salah');
    });

    it('should response 404 when thread not found', async () => {
      // Arrange
      const requestPayload = {
        content: 'content',
      };
      const server = await createServer(container);
      const accessToken = await AuthenticationsTestHelper.getAccessToken(server);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/0/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('thread tidak ditemukan');
    });
  });

  describe('when DELETE /comments/:id', () => {
    it('should response 200 and deleted comment', async () => {
      // Arrange
      const server = await createServer(container);
      const accessToken = await AuthenticationsTestHelper.getAccessToken(server);
      const threadId = await ThreadsTestHelper.getThreadId(server, accessToken);
      const commentId = await CommentsTestHelper.getCommentId(server, accessToken, threadId);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });

    it('should response 404 when comment not found', async () => {
      // Arrange
      const server = await createServer(container);
      const accessToken = await AuthenticationsTestHelper.getAccessToken(server);
      const threadId = await ThreadsTestHelper.getThreadId(server, accessToken);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/0`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('comment tidak ditemukan');
    });
  });
});
