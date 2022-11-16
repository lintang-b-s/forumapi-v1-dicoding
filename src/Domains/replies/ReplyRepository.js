class ReplyRepository {
  async masukkanReply(reply) {
    throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async mendapatkanReplyBerdasarkanId(id) {
    throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async hapusReply(id) {
    throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async mendapatkanRepliesBerdasarkanCommentId(comment_id) {
    throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ReplyRepository;
