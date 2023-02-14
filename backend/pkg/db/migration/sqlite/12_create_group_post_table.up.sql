CREATE TABLE group_post (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author INTEGER NOT NULL,
  groupId INTEGER NOT NULL,
  message TEXT NOT NULL,
  image TEXT,
  createdAt DATETIME NOT NULL,
  FOREIGN KEY (author) REFERENCES user(id),
  FOREIGN KEY (groupId) REFERENCES `group`(id)
);
