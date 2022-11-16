const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const ThreadDetail = require('../../Domains/threads/entities/ThreadDetail');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async masukkanThread(addThread) {
    const { title, body, owner_id } = addThread;
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, title, body, owner_id, created_at',
      values: [id, owner_id, title, body],
    };

    const result = await this._pool.query(query);

    return new AddedThread({ ...result.rows[0] });
  }

  async mendapatkanThreadBerdasarkanId(id) {
    const query = {
      text: `SELECT 
              threads.id,
              threads.title,
              threads.body,
              threads.created_at,
              users.username
            FROM threads
            INNER JOIN users ON threads.owner_id = users.id
            WHERE threads.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('thread tidak ditemukan');
    }

    return new ThreadDetail({ ...result.rows[0] });
  }
}

module.exports = ThreadRepositoryPostgres;
