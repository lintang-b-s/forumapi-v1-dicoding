const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedReply = require('../../Domains/replies/entities/AddedReply');
const ReplyRepository = require('../../Domains/replies/ReplyRepository');
const ReplyDetail = require('../../Domains/replies/entities/ReplyDetail');

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async masukkanReply(addReply) {
    const { content, owner_id, comment_id } = addReply;
    const id = `reply-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4) RETURNING id, comment_id, owner_id, content, created_at',
      values: [id, comment_id, owner_id, content],
    };

    const result = await this._pool.query(query);

    return new AddedReply({ ...result.rows[0] });
  }

  async mendapatkanReplyBerdasarkanId(id) {
    const query = {
      text: `SELECT 
              replies.id,
              replies.comment_id,
              replies.content,
              replies.created_at,
              replies.deleted_at,
              users.username 
            FROM replies
            INNER JOIN users ON replies.owner_id = users.id
            WHERE replies.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError('reply tidak ditemukan');
    }

    return new ReplyDetail({ ...result.rows[0] });
  }

  async hapusReply(id) {
    if (!id) {
      throw new InvariantError('id is required');
    }

    const query = {
      text: 'UPDATE replies SET deleted_at = NOW() WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('reply tidak ditemukan');
    }
  }

  async mendapatkanRepliesBerdasarkanCommentId(comment_id) {
    if (!comment_id) return [];

    const query = {
      text: `SELECT 
              replies.id,
              replies.comment_id,
              replies.content,
              replies.created_at,
              replies.deleted_at,
              users.username
            FROM replies
            INNER JOIN users ON replies.owner_id = users.id
            WHERE replies.comment_id = $1`,
      values: [comment_id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      return [];
    }

    return result.rows.map(row => {
      return new ReplyDetail({ ...row });
    });
  }
}

module.exports = ReplyRepositoryPostgres;
