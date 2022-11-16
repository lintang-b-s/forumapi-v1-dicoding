/* istanbul ignore file */

const AutheticationsTestHelper = {
  async getAccessToken(server) {
    /** add user */
    const registerRes = await server.inject({
      method: 'POST',
      url: '/users',
      payload: {
        username: 'dicoding1',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      },
    });

    if (registerRes.statusCode !== 201) {
      throw new Error('Failed to register user');
    }

    /** login with the user that has been created above */
    const loginRes = await server.inject({
      method: 'POST',
      url: '/authentications',
      payload: {
        username: 'dicoding1',
        password: 'secret',
      },
    });

    const { data: { accessToken } } = JSON.parse(loginRes.payload);
    return accessToken;
  },
};

module.exports = AutheticationsTestHelper;