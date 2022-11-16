const AddThread = require('../AddThread');

describe('a AddThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'title',
      body: 'body',
    };

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      owner_id: 'user-123',
      title: 1234,
      body: 'body',
    };

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddThread object correctly', () => {
    // Arrange
    const payload = {
      owner_id: 'user-123',
      title: 'title',
      body: 'body',
    };

    // Action
    const { owner_id, title, body } = new AddThread(payload);

    // Assert
    expect(owner_id).toBe(payload.owner_id);
    expect(title).toBe(payload.title);
    expect(body).toBe(payload.body);
  });
});
