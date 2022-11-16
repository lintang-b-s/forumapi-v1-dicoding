const AddComment = require('../AddComment');

describe('a AddComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      owner_id: 'user-123',
      content: 'content',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      owner_id: 'user-123',
      thread_id: 1234,
      content: 1234,
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddComment object correctly', () => {
    // Arrange
    const payload = {
      owner_id: 'user-123',
      thread_id: 'thread-123',
      content: 'content',
    };

    // Action
    const { owner_id, thread_id, content } = new AddComment(payload);

    // Assert
    expect(owner_id).toBe(payload.owner_id);
    expect(thread_id).toBe(payload.thread_id);
    expect(content).toBe(payload.content);
  });
});
