const AddedThread = require('../AddedThread');

describe('a AddedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      owner_id: 'user-123',
      title: 'title',
      body: 'body',
      created_at: '2020-01-01T00:00:00.000Z',
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      owner_id: 123,
      title: 123,
      body: 123,
      created_at: 123,
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addedThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      owner_id: 'user-123',
      title: 'title',
      body: 'body',
      created_at: new Date('2020-01-01T00:00:00.000Z'),
    };

    // Action
    const addedThread = new AddedThread(payload);

    // Assert
    expect(addedThread.id).toEqual(payload.id);
    expect(addedThread.owner_id).toEqual(payload.owner_id);
    expect(addedThread.title).toEqual(payload.title);
    expect(addedThread.body).toEqual(payload.body);
    expect(addedThread.created_at).toEqual(payload.created_at);
  });
});
