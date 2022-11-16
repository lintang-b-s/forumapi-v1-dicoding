const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddComment = require('../../Domains/comments/entities/AddComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const addComment = new AddComment(useCasePayload);
    await this._threadRepository.mendapatkanThreadBerdasarkanId(addComment.thread_id);
    return this._commentRepository.masukkanComment(addComment);
  }
}

module.exports = AddCommentUseCase;
