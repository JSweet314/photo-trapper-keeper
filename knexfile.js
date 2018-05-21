// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/photo_trapper',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }

};
