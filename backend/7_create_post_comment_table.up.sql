CREATE TABLE post_comment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  postId INTEGER NOT NULL,
  createdAt DATETIME NOT NULL,
  message TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES user(id),
  FOREIGN KEY (postId) REFERENCES post(id)
);
