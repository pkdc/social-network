CREATE TABLE group_event_member (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  eventId INTEGER NOT NULL,
  status INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (userId) REFERENCES user(id),
  FOREIGN KEY (eventId) REFERENCES group_event(id)
);
