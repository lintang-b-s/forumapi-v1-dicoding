/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('comments', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNull: true,
    },
    thread_id: {
      type: 'VARCHAR(50)',
      notNull: true,

    },
    owner_id: {
      type: 'VARCHAR(50)',
      notNull: true,
  
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    deleted_at: {
      type: 'TIMESTAMP',
      notNull: false,
      default: null,
    },
  });

  pgm.addConstraint('comments', 'fk_comments.thread_id_threads.id', 'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE');
  pgm.addConstraint('comments', 'fk_comments.owner_id_users.id', 'FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE');

};

exports.down = pgm => {
  pgm.dropConstraint('comments', 'fk_comments.thread_id_threads.id');
  pgm.dropConstraint('comments', 'fk_comments.owner_id_users.id');

  pgm.dropTable('comments');
};
