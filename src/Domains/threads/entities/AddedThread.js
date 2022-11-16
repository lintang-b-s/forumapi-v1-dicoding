class AddedThread {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, owner_id, title, body, created_at } = payload;

    this.id = id;
    this.owner_id = owner_id;
    this.title = title;
    this.body = body;
    this.created_at = created_at;
  }

  _verifyPayload({ id, owner_id, title, body, created_at }) {
    if (!id || !owner_id || !title || !body || !created_at) {
      throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof owner_id !== 'string' || typeof title !== 'string' || typeof body !== 'string' || typeof created_at !== 'object') {
      throw new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedThread;
