const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const GetThreadDetailUseCase = require('../../../../Applications/use_case/GetThreadDetailUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadDetailHandler = this.getThreadDetailHandler.bind(this);
  }

  async postThreadHandler(request, h) {

    const { id: owner_id } = request.auth.credentials;
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    request.payload.owner_id = owner_id;
    const addedThread = await addThreadUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedThread: {
          id: addedThread.id,
          title: addedThread.title,
          owner: addedThread.owner_id,
        },
      },
    });
    response.code(201);
    return response;
  
  }

  async getThreadDetailHandler(request, h) {
    
    
    const { id } = request.params;
    const getThreadDetailUseCase = this._container.getInstance(GetThreadDetailUseCase.name);
    const useCasePayload = { id };
    const threadDetail = await getThreadDetailUseCase.execute(useCasePayload);

    const response = h.response({
      status: 'success',
      data: {
        thread: threadDetail,
      },
    });
    return response;
 
  }

}

module.exports = ThreadsHandler;
