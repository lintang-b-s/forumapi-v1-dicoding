const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti tidak lengkap sesuai yang dibutuhkan'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data salah'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat login karena client tidak memasukkan username dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus bertipe string'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('client tidak mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus bertipe string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('client tidak mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus bertipe string'),
  'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat thread baru karena properti tidak lengkap sesuai yang dibutuhkan'),
  'ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat thread baru karena tipe data salah'),
  'THREAD_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat mengambil detail thread karena properti tidak lengkap sesuai yang dibutuhkan'),
  'THREAD_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat mengambil detail thread karena tipe data salah'),
  'ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat comment baru karena properti tidak lengkap sesuai yang dibutuhkan'),
  'ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat comment baru karena tipe data salah'),
  'ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat reply baru karena properti tidak lengkap sesuai yang dibutuhkan'),
  'ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat reply baru karena tipe data salah'),
};

module.exports = DomainErrorTranslator;
