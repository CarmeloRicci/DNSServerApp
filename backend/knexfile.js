const config = require("config");
const path = require("path");

module.exports = {
  
  development: {
    client: 'mysql',
    connection: {
        host: '172.19.0.2',
        user: 'melo',
        password: 'melo',
        database: 'aviot'
    }
  },
  
  staging: {
    client: 'mysql',
    connection: {
        host: '172.19.0.2',
        user: 'melo',
        password: 'melo',
        database: 'aviot'
    }
  },

  production: {
    client: 'mysql',
    connection: {
        host: '172.19.0.2',
        user: 'melo',
        password: 'melo',
        database: 'aviot'
    }
  }
};

// module.exports = {
  
//   development: {
//     client: "sqlite3",
//     connection: {
//       filename: path.resolve(__dirname) + "/src/db/dev.sqlite3"
//     },
//     // seeds: {
//     //   directory: path.resolve(__dirname) + "/src/db/seeds/development"
//     // },
//     migrations: {
//       tableName: "migrations",
//       directory: path.resolve(__dirname) + "/src/db/migrations"
//     },
//     useNullAsDefault: true
//   },
  
//   staging: {
//     client: "sqlite3",
//     connection: {
//       filename: path.resolve(__dirname) + "/src/db/staging.sqlite3"
//     },
//     migrations: {
//       tableName: "migrations",
//       directory: path.resolve(__dirname) + "/src/db/migrations"
//     },
//     useNullAsDefault: true
//   },

//   production: {
//     client: "sqlite3",
//     connection: {
//       filename: path.resolve(__dirname) + "/src/db/production.sqlite3"
//     },
//     migrations: {
//       tableName: "migrations",
//       directory: path.resolve(__dirname) + "/src/db/migrations"
//     },
//     useNullAsDefault: true
//   }
// };
