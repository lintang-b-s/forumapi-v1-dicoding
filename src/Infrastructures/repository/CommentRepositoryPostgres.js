const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedComment = require('../../Domains/comments/entities/AddedComment');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const CommentDetail = require('../../Domains/comments/entities/CommentDetail');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async masukkanComment(addComment) {
    const { content, owner_id, thread_id } = addComment;
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id, thread_id, owner_id, content, created_at',
      values: [id, thread_id, owner_id, content],
    };

    const result = await this._pool.query(query);

    return new AddedComment({ ...result.rows[0] });
  }

  

  async mendapatkanCommentBerdasarkanId(id) {
    const query = {
      text: `SELECT 
              comments.id,
              comments.thread_id,
              comments.content,
              comments.created_at,
              comments.deleted_at,
              users.username 
            FROM comments
            INNER JOIN users ON comments.owner_id = users.id
            WHERE comments.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError('comment tidak ditemukan');
    }

    return new CommentDetail({ ...result.rows[0] });
  }

  async hapusComment(id) {
    if (!id) {
      throw new InvariantError('id is required');
    }

    const query = {
      text: 'UPDATE comments SET deleted_at = NOW() WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('comment tidak ditemukan di database');
    }
  }

  async mendapatkanCommentsBerdasarkanThreadId(thread_id) {
    if (!thread_id) return [];

    const query = {
      text: `SELECT 
              comments.id,
              comments.thread_id,
              comments.content,
              comments.created_at,
              comments.deleted_at,
              users.username
            FROM comments
            INNER JOIN users ON comments.owner_id = users.id
            WHERE comments.thread_id = $1`,
      values: [thread_id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      return [];
    }

    return result.rows.map(row => {
      return new CommentDetail({ ...row });
    });
  }
}

module.exports = CommentRepositoryPostgres;
