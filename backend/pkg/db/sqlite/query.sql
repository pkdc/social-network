-- name: GetUser :one
SELECT * FROM user
WHERE id = ? LIMIT 1;

-- name: ListUsers :many
SELECT * FROM user
ORDER BY name;

-- name: CreateUser :one
INSERT INTO user (
  firstName, lastName, nickName, email, password_, dob, image_ , about, public
) VALUES (
  ?, ?, ?, ?, ?, ?, ?, ?, ?
)
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM user
WHERE id = ?;

-- name: UpdateUser :one
UPDATE user
set firstName = ?, 
lastName = ?, 
nickName = ?, 
email = ?, 
password_ = ?, 
dob = ?, 
image_ = ?, 
about = ?, 
public = ?
WHERE id = ?
RETURNING *;