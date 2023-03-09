CREATE TABLE group_ (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  creator INTEGER NOT NULL,
  description_ TEXT,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (creator) REFERENCES user(id)
);
