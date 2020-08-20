module.exports = {
  "development": {
    "username": "express-dbuser",
    "password": "123456",
    "database": "lodos_web_app",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": 3306
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.dbUsername,
    "password": process.env.dbPassword,
    "database": process.env.database,
    "host": process.env.dbHost,
    "dialect": "mysql",
    "logging": false
  }
}