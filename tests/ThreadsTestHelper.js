/* istanbul ignore file */

const ThreadsTestHelper = {
  async createThread(server, requestPayload, accessToken) {
    const response = await server.inject({
      method: 'POST',
      url: '/threads',
      payload: requestPayload,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseJson = JSON.parse(response.payload);
    return responseJson.data.addedThread;
  },

  async getThreadId(server, accessToken) {
    /** add thread */
    const insertThreadRes = await server.inject({
      method: 'POST',
      url: '/threads',
      payload: {
        title: 'title',
        body: 'body',
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (insertThreadRes.statusCode !== 201) {
      throw new Error('Failed to insert thread');
    }

    const { data: { addedThread: { id: threadId } } } = JSON.parse(insertThreadRes.payload);
    return threadId;
  },
};

module.exports = ThreadsTestHelper;