/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const RepliesTableTestHelper = {
  async insertReply({
    id = 'reply-123', content = 'dicoding', owner_id = 'user-123', comment_id = 'comment-123',
  }) {
    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4)',
      values: [id, comment_id, owner_id, content],
    };

    await pool.query(query);
  },

  async findReplyById(id) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM replies WHERE 1=1');
  },
};

module.exports = RepliesTableTestHelper;
