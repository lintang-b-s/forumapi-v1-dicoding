class AddComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { owner_id, thread_id, content } = payload;

    this.owner_id = owner_id;
    this.thread_id = thread_id;
    this.content = content;
  }

  _verifyPayload({ owner_id, thread_id, content }) {
    if (!owner_id || !thread_id || !content) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof owner_id !== 'string' || typeof thread_id !== 'string' || typeof content !== 'string') {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddComment;
