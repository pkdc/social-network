CREATE TABLE group_chat_item (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  last_msg_at DATETIME NOT NULL,
  FOREIGN KEY (group_id) REFERENCES group_(id)
);