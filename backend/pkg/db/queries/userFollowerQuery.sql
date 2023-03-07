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

-- name: UpdateFollower :one
UPDATE user_follower
set status_ = ?
WHERE source_id = ? AND target_id = ?
RETURNING *;