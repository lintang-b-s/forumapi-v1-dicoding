const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentHandler(request, h) {
   
    const { id: owner_id } = request.auth.credentials;
    const { threadId: thread_id } = request.params;
    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
    request.payload.owner_id = owner_id;
    request.payload.thread_id = thread_id;
    const addedComment = await addCommentUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedComment: {
          id: addedComment.id,
          content: addedComment.content,
          owner: addedComment.owner_id,
        },
      },
    });
    response.code(201);
    return response;

  }

  async deleteCommentHandler(request, h) {
   
    const { threadId: thread_id, commentId: comment_id } = request.params;
    const { id: owner_id } = request.auth.credentials;
    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
    await deleteCommentUseCase.execute({ thread_id, comment_id, owner_id });

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
 
  }
}

module.exports = CommentsHandler;
