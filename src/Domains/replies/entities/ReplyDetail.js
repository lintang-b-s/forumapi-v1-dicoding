class ReplyDetail {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, username, content, created_at, deleted_at } = payload;

    this.id = id;
    this.username = username;
    this.date = created_at;
    this.content = deleted_at ? "**balasan telah dihapus**" : content;
  }

  _verifyPayload({ id, username, content, created_at, deleted_at }) {
    if (!id || !username || !content || !created_at) {
      throw new Error('REPLY_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof username !== 'string' || typeof content !== 'string' || typeof created_at !== 'object') {
      throw new Error('REPLY_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = ReplyDetail;
