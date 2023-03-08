-- name: GetGroupMessages :many
SELECT * FROM group_message
WHERE group_id = ?
ORDER BY created_at;

-- name: CreateGroupMessage :one
INSERT INTO group_message (
  source_id, group_id, message_, created_at
) VALUES (
  ?, ?, ?, ?
)
RETURNING *;

-- name: DeleteGroupMessage :exec
DELETE FROM group_message
WHERE group_id = ? AND user_id = ? AND id = ?;