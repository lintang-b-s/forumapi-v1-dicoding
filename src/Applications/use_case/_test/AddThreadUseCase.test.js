const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');

describe('AddThreadUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'title',
      body: 'body',
      owner_id: 'user-123',
    };
    const expectedAddedThread = new AddedThread({
      id: 'user-123',
      title: useCasePayload.title,
      body: useCasePayload.body,
      owner_id: useCasePayload.owner_id,
      created_at: expect.any(String),
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.masukkanThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedThread));

    /** creating use case instance */
    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await getThreadUseCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadRepository.masukkanThread).toBeCalledWith(new AddThread({
      title: useCasePayload.title,
      body: useCasePayload.body,
      owner_id: useCasePayload.owner_id,
    }));
  });
});
