import { sql } from './db.js';

// sql `DROP TABLE IF EXISTS videos;`.then(() => {
//   console.log("Table 'novo' dropped successfully.");
// }).catch((error) => {
//   console.error("Error dropping table 'novo':", error);
// });
sql`CREATE TABLE videos (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  duration INTEGER
); `.then(() => {
  console.log("Table 'videos' created successfully.");
});    
