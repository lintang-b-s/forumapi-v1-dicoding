const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: handler.postCommentHandler,
    options: {
      auth: 'forum_api_jwt',
      tags: ['api', 'comments'],
      description: 'Buat komen baru',
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: handler.deleteCommentHandler,
    options: {
      auth: 'forum_api_jwt',
      tags: ['api', 'comments'],
      description: 'Hapus komen ini',
    },
  }
]);

module.exports = routes;
