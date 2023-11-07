module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './instance/app.db',
    express: {
      port: 3001, 
    },
  },
  test: {
    dialect: 'sqlite',
    storage: './instance/app-test.db',
  },
  production: {
    dialect: 'sqlite',
    storage: './instance/app-prod.db',
  },
};
