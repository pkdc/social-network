CREATE TABLE group_post_comment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author INTEGER NOT NULL,
  groupPostId INTEGER NOT NULL,
  message TEXT NOT NULL,
  createdAt DATETIME NOT NULL,
  FOREIGN KEY (author) REFERENCES user(id),
  FOREIGN KEY (groupPostId) REFERENCES group_post(id)
);
