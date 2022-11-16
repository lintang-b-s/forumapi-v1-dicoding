/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
  async insertComment({
    id = 'comment-123', content = 'dicoding', owner_id = 'user-123', thread_id = 'thread-123'
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4)',
      values: [id, thread_id, owner_id, content],
    };

    await pool.query(query);
  },

  async findCommentsById(id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments WHERE 1=1');
  },
};

module.exports = CommentsTableTestHelper;
