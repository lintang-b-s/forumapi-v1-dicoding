class ThreadDetail {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, title, body, created_at, username, comments } = payload;

    this.id = id;
    this.title = title;
    this.body = body;
    this.date = created_at;
    this.username = username;
    this.comments = comments;
  }

  _verifyPayload({ id, title, body, created_at, username }) {
    if (!id || !title || !body || !created_at || !username) {
      throw new Error('THREAD_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof title !== 'string' || typeof body !== 'string' || typeof created_at !== 'object' || typeof username !== 'string') {
      throw new Error('THREAD_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = ThreadDetail;
