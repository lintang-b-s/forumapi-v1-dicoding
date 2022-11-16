/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('threads', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNull: true,
    },
    owner_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    body: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('threads', 'fk_threads.owner_id_users.id', 'FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE');


};

exports.down = pgm => {
  pgm.dropConstraint('threads', 'fk_threads.owner_id_users.id');
  
  pgm.dropTable('threads');
};
