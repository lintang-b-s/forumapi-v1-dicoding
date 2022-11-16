class AddThread {
  constructor(payload) {
    this._verifyPayload(payload);

    const { owner_id, title, body } = payload;

    this.owner_id = owner_id;
    this.title = title;
    this.body = body;
  }

  _verifyPayload({ owner_id, title, body }) {
    if (!owner_id || !title || !body) {
      throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof owner_id !== 'string' || typeof title !== 'string' || typeof body !== 'string') {
      throw new Error('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddThread;
