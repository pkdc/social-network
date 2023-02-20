CREATE TABLE group_event (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author INTEGER NOT NULL,
  groupId INTEGER NOT NULL,
  title TEXT NOT NULL,
  description_ TEXT,
  createdAt DATETIME NOT NULL,
  date_ DATETIME NOT NULL,
  FOREIGN KEY (author) REFERENCES user(id),
  FOREIGN KEY (groupId) REFERENCES group_(id)
);