/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('replies', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNull: true,
    },
    comment_id: {
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


  pgm.addConstraint('replies', 'fk_replies.comment_id_comments.id', 'FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE');
  pgm.addConstraint('replies', 'fk_replies.owner_id_owners.id', 'FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE');


};

exports.down = pgm => {
  pgm.dropConstraint('replies', 'fk_replies.comment_id_comments.id');
  pgm.dropConstraint('replies', 'fk_replies.owner_id_owners.id');

  pgm.dropTable('replies');
};
