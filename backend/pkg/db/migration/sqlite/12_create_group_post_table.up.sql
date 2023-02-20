CREATE TABLE group_post (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author INTEGER NOT NULL,
  groupId INTEGER NOT NULL,
  message_ TEXT NOT NULL,
  image_ TEXT,
  createdAt DATETIME NOT NULL,
  FOREIGN KEY (author) REFERENCES user(id),
  FOREIGN KEY (groupId) REFERENCES group_(id)
);
