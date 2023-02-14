CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  nickName TEXT,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  dob DATE,
  image TEXT,
  about TEXT,
  public INTEGER NOT NULL DEFAULT 0
);