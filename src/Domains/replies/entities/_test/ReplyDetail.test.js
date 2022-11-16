const ReplyDetail = require('../ReplyDetail');

describe('a ReplyDetail entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      created_at: '2020-01-01T00:00:00.000Z',
      content: 'content',
    };

    // Action and Assert
    expect(() => new ReplyDetail(payload)).toThrowError('REPLY_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      username: 123,
      created_at: 123,
      content: [123],
    };

    // Action and Assert
    expect(() => new ReplyDetail(payload)).toThrowError('REPLY_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create replyDetail object correctly', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      username: 'username',
      created_at: new Date('2020-01-01T00:00:00.000Z'),
      content: 'content',
    };

    // Action
    const replyDetail = new ReplyDetail(payload);

    // Assert
    expect(replyDetail.id).toEqual(payload.id);
    expect(replyDetail.username).toEqual(payload.username);
    expect(replyDetail.date).toEqual(payload.created_at);
    expect(replyDetail.content).toEqual(payload.content);
  });

  it('should create replyDetail object correctly when deleted_at is not null', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      username: 'username',
      content: 'content',
      created_at: new Date('2020-01-01T00:00:00.000Z'),
      deleted_at: new Date('2020-01-01T00:00:00.000Z'),
    };

    // Action
    const replyDetail = new ReplyDetail(payload);

    // Assert
    expect(replyDetail.id).toEqual(payload.id);
    expect(replyDetail.username).toEqual(payload.username);
    expect(replyDetail.date).toEqual(payload.created_at);
    expect(replyDetail.content).toEqual('**balasan telah dihapus**');
  });
});
