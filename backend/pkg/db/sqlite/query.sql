-- name: GetUser :one
SELECT * FROM user
WHERE id = ? LIMIT 1;

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

-- name: GetFollowers :many
SELECT * FROM user_follower
WHERE target_id = ?;

-- name: CreateFollower :one
INSERT INTO user_follower (
  source_id, target_id, status_
) VALUES (
  ?, ?, ?
)
RETURNING *;

-- name: DeleteFollower :exec
DELETE FROM user_follower
WHERE source_id = ? AND target_id = ?;

-- name: UpdateUserFollower :one
UPDATE user_follower
set status_ = ?
WHERE source_id = ? AND target_id = ?
RETURNING *;