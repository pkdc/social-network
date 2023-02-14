CREATE TABLE session_table (
  sessionToken TEXT PRIMARY KEY,
  userId INTEGER NOT NULL,
  FOREIGN KEY (userId) REFERENCES user(id)
);