CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  nick_name TEXT,
  email TEXT NOT NULL,
  password_ TEXT NOT NULL,
  dob DATE,
  image_ TEXT,
  about TEXT,
  public INTEGER NOT NULL DEFAULT 0
);