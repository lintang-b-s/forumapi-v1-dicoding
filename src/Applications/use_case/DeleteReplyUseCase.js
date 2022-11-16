const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

class DeleteReplyUseCase {
  constructor({ replyRepository, commentRepository, threadRepository, userRepository }) {
    this._replyRepository = replyRepository;
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._userRepository = userRepository;
  }

  async execute(useCasePayload) {
    const thread = await this._threadRepository.mendapatkanThreadBerdasarkanId(useCasePayload.thread_id);
    if (!thread) {
      throw new NotFoundError('thread not found');
    }

    const komen = await this._commentRepository.mendapatkanCommentBerdasarkanId(useCasePayload.comment_id);
    if (!komen) {
      throw new NotFoundError('comment not found');
    }

    if (!useCasePayload.reply_id) {
      throw new NotFoundError('reply not found');
    }

    const balasan = await this._replyRepository.mendapatkanReplyBerdasarkanId(useCasePayload.reply_id);

    const username = await this._userRepository.verifyUsernameById(useCasePayload.owner_id);
    if (balasan.username !== username) throw new AuthorizationError('user not authorized');

    return await this._replyRepository.hapusReply(useCasePayload.reply_id);
  }
}

module.exports = DeleteReplyUseCase;
