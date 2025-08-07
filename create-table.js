import { sql } from './db.js';

// sql `DROP TABLE IF EXISTS videos;`.then(() => {
//   console.log("Table 'novo' dropped successfully.");
// }).catch((error) => {
//   console.error("Error dropping table 'novo':", error);
// });


// sql`CREATE TABLE videos (
//   id TEXT PRIMARY KEY,
//   title TEXT,
//   description TEXT,
//   duration INTEGER
// );
// `.then(() => {
//   console.log("Table 'users' created successfully.");
// });   
sql `DROP TABLE IF EXISTS users;`.then(() => {
  console.log("Table 'novo' dropped successfully.");
}).catch((error) => {
  console.error("Error dropping table 'novo':", error);
});

sql`CREATE TABLE users (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  age INTEGER,
  is_admin BOOLEAN DEFAULT FALSE
);
`.then(() => {
  console.log("Table 'videos' created successfully.");
}); 
