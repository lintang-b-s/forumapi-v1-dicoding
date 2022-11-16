const AddReply = require('../../Domains/replies/entities/AddReply');

class AddReplyUseCase {
  constructor({ replyRepository, commentRepository, threadRepository }) {
    this._replyRepository = replyRepository;
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const addReply = new AddReply(useCasePayload);
    await this._threadRepository.mendapatkanThreadBerdasarkanId(useCasePayload.thread_id);
    await this._commentRepository.mendapatkanCommentBerdasarkanId(addReply.comment_id);
    return this._replyRepository.masukkanReply(addReply);
  }
}

module.exports = AddReplyUseCase;
