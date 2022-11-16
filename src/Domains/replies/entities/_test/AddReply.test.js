const AddReply = require('../AddReply');

describe('a AddReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      owner_id: 'user-123',
      content: 'content',
    };

    // Action and Assert
    expect(() => new AddReply(payload)).toThrowError('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      owner_id: 'user-123',
      comment_id: 1234,
      content: 1234,
    };

    // Action and Assert
    expect(() => new AddReply(payload)).toThrowError('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddReply object correctly', () => {
    // Arrange
    const payload = {
      owner_id: 'user-123',
      comment_id: 'comment-123',
      content: 'content',
    };

    // Action
    const { owner_id, comment_id, content } = new AddReply(payload);

    // Assert
    expect(owner_id).toBe(payload.owner_id);
    expect(comment_id).toBe(payload.comment_id);
    expect(content).toBe(payload.content);
  });
});
