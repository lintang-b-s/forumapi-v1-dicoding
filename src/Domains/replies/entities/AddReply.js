class AddReply {
  constructor(payload) {
    this._verifyPayload(payload);

    const { owner_id, comment_id, content } = payload;

    this.owner_id = owner_id;
    this.comment_id = comment_id;
    this.content = content;
  }

  _verifyPayload({ owner_id, comment_id, content }) {
    if (!owner_id || !comment_id || !content) {
      throw new Error('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof owner_id !== 'string' || typeof comment_id !== 'string' || typeof content !== 'string') {
      throw new Error('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddReply;
