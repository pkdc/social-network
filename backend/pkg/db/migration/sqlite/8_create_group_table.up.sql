CREATE TABLE group_ (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  creator INTEGER NOT NULL,
  description_ TEXT,
  createdAt DATETIME NOT NULL,
  FOREIGN KEY (creator) REFERENCES user(id)
);
