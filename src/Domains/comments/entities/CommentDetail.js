class CommentDetail {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, username, content, created_at, deleted_at, replies} = payload;

    this.id = id;
    this.username = username;
    this.date = created_at;
    this.content = deleted_at ? "**komentar telah dihapus**" : content;
    this.replies = replies;
   
  }

  _verifyPayload({ id, username, content, created_at}) {
    if (!id || !username || !content || !created_at) {
      throw new Error('COMMENT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof username !== 'string' || typeof content !== 'string' || typeof created_at !== 'object' ) {
      throw new Error('COMMENT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = CommentDetail;
