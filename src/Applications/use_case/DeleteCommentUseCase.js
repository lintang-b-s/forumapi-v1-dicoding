const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');

class DeleteCommentUseCase {
  constructor({ commentRepository, threadRepository, userRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._userRepository = userRepository;
  }

  async execute(useCasePayload) {
    const thread = await this._threadRepository.mendapatkanThreadBerdasarkanId(useCasePayload.thread_id);
    if (!thread) {
      throw new NotFoundError('thread not found');
    }

    if (!useCasePayload.comment_id) {
      throw new NotFoundError('comment not found');
    }

   
    const comment = await this._commentRepository.mendapatkanCommentBerdasarkanId(useCasePayload.comment_id);

    const username = await this._userRepository.verifyUsernameById(useCasePayload.owner_id);
    if (comment.username !== username) throw new AuthorizationError('pengguna tidak dapat menghapus komen ini, karena komen bukan milik anda');

    return await this._commentRepository.hapusComment(useCasePayload.comment_id);
  }
}

module.exports = DeleteCommentUseCase;
