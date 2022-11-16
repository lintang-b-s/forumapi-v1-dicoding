class AddedReply {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, owner_id, comment_id, content, created_at, deleted_at } = payload;

    this.id = id;
    this.owner_id = owner_id;
    this.comment_id = comment_id;
    this.content = content;
    this.created_at = created_at;
    this.deleted_at = deleted_at;
  }

  _verifyPayload({ id, comment_id, owner_id, content, created_at, deleted_at }) {
    if (!id || !owner_id || !comment_id || !content || !created_at) {
      throw new Error('ADDED_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof comment_id !== 'string' || typeof owner_id !== 'string' || typeof content !== 'string' || typeof created_at !== 'object') {
      throw new Error('ADDED_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedReply;
