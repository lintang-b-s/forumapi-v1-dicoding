const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
    options: {
      auth: 'forum_api_jwt',
      tags: ['api', 'threads'],
      description: 'Membuat thread baru',
    },
  },
  {
    method: 'GET',
    path: '/threads/{id}',
    handler: handler.getThreadDetailHandler,
    options: {
      tags: ['api', 'threads'],
      description: 'Mendapatkan detail thread',
    }
  },
]);

module.exports = routes;
