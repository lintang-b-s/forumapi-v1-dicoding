const AddReplyUseCase = require('../../../../Applications/use_case/AddReplyUseCase');
const DeleteReplyUseCase = require('../../../../Applications/use_case/DeleteReplyUseCase');

class RepliesHandler {
  constructor(container) {
    this._container = container;

    this.postReplyHandler = this.postReplyHandler.bind(this);
    this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
  }

  async postReplyHandler(request, h) {
    
    const { id: owner_id } = request.auth.credentials;
    const { commentId: comment_id, threadId: thread_id } = request.params;
    const addReplyUseCase = this._container.getInstance(AddReplyUseCase.name);
    request.payload.owner_id = owner_id;
    request.payload.comment_id = comment_id;
    request.payload.thread_id = thread_id;
    const addedReply = await addReplyUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedReply: {
          id: addedReply.id,
          content: addedReply.content,
          owner: addedReply.owner_id,
        },
      },
    });
    response.code(201);
    return response;
 
  }

  async deleteReplyHandler(request, h) {
   
    const { threadId: thread_id, commentId: comment_id, replyId: reply_id } = request.params;
    const { id: owner_id } = request.auth.credentials;
    const deleteReplyUseCase = this._container.getInstance(DeleteReplyUseCase.name);
    await deleteReplyUseCase.execute({ thread_id, comment_id, reply_id, owner_id });

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
 
  }
}

module.exports = RepliesHandler;
