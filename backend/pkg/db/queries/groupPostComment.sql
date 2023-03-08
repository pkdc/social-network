-- name: GetGroupPostComments :many
SELECT * FROM group_post_comment
WHERE group_post_id = ?
ORDER BY created_at;

-- name: CreateGroupPost :one
INSERT INTO group_post_comment (
  author, group_post_id, message_, created_at
) VALUES (
  ?, ?, ?, ?
)
RETURNING *;

-- name: DeleteGroupMessage :exec
DELETE FROM group_post_comment
WHERE group_post_id = ? AND author = ? AND id = ?;