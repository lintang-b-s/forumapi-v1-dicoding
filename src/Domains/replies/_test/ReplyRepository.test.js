const ReplyRepository = require('../ReplyRepository');

describe('ReplyRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const replyRepository = new ReplyRepository();

    // Action and Assert
    await expect(replyRepository.masukkanReply({})).rejects.toThrowError('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(replyRepository.mendapatkanReplyBerdasarkanId('reply-id')).rejects.toThrowError('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(replyRepository.hapusReply('reply-123')).rejects.toThrowError('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(replyRepository.mendapatkanRepliesBerdasarkanCommentId('thread-123')).rejects.toThrowError('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
