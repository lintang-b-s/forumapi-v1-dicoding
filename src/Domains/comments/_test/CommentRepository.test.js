const CommentRepository = require('../CommentRepository');

describe('CommentRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const commentRepository = new CommentRepository();

    // Action and Assert
    await expect(commentRepository.masukkanComment({})).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentRepository.mendapatkanCommentBerdasarkanId('comment-id')).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  
    await expect(commentRepository.hapusComment('comment-123')).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentRepository.mendapatkanCommentsBerdasarkanThreadId('thread-123')).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
