-- name: GetUser :one
SELECT *, COUNT(*) FROM user
WHERE nick_name = ? LIMIT 1;

-- name: ListUsers :many
SELECT * FROM user
ORDER BY nick_name;

-- name: CreateUser :one
INSERT INTO user (
  first_name, last_name, nick_name, email, password_, dob, image_ , about, public
) VALUES (
  ?, ?, ?, ?, ?, ?, ?, ?, ?
)
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM user
WHERE id = ?;

-- name: UpdateUser :one
UPDATE user
set first_name = ?, 
last_name = ?, 
nick_name = ?, 
email = ?, 
password_ = ?, 
dob = ?, 
image_ = ?, 
about = ?, 
public = ?
WHERE id = ?
RETURNING *;

-- name: GetUserExist :one
SELECT COUNT(*)
FROM user
WHERE email = ? OR nick_name = ?;