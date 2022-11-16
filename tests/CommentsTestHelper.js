/* istanbul ignore file */

const CommentsTestHelper = {
  async getCommentId(server, accessToken, threadId) {
    /** add comment */
    const insertCommentRes = await server.inject({
      method: 'POST',
      url: `/threads/${threadId}/comments`,
      payload: {
        content: 'content',
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (insertCommentRes.statusCode !== 201) {
      throw new Error('Failed to insert comment');
    }
    const { data: { addedComment: { id: commentId } } } = JSON.parse(insertCommentRes.payload);
    return commentId;
  },
};

module.exports = CommentsTestHelper;