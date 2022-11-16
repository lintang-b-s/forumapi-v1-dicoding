/* istanbul ignore file */

const RepliesTestHelper = {
  async getReplyId(server, accessToken, threadId, commentId) {
    /** add comment */
    const insertReplyRes = await server.inject({
      method: 'POST',
      url: `/threads/${threadId}/comments/${commentId}/replies`,
      payload: {
        content: 'content',
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (insertReplyRes.statusCode !== 201) {
      throw new Error('Failed to insert reply');
    }
    const { data: { addedReply: { id: replyId } } } = JSON.parse(insertReplyRes.payload);
    return replyId;
  },
};

module.exports = RepliesTestHelper;