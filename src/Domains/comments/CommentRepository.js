class CommentRepository {
  async masukkanComment(comment) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async mendapatkanCommentBerdasarkanId(id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }



  async hapusComment(id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async mendapatkanCommentsBerdasarkanThreadId(thread_id) {
    throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = CommentRepository;
