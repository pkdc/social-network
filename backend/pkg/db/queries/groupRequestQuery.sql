-- name: GetGroupRequests :many
SELECT * FROM group_request
WHERE group_id = ? AND status_ = ?;

-- name: CreateGroupRequest :one
INSERT INTO group_request (
  user_id, group_id, status_
) VALUES (
  ?, ?, ?
)
RETURNING *;

-- name: UpdateGroupRequest :one
UPDATE group_request
set status_ = ?
WHERE group_id = ? AND user_id = ?
RETURNING *;

-- name: DeleteGroupRequest :exec
DELETE FROM group_request
WHERE group_id = ? AND user_id = ?;