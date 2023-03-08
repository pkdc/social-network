-- name: GetGroupPosts :many
SELECT * FROM group_post
WHERE group_id = ?
ORDER BY created_at;

-- name: CreateGroupPost :one
INSERT INTO group_post (
  author, group_id, message_, image, created_at
) VALUES (
  ?, ?, ?, ?, ?
)
RETURNING *;

-- name: DeleteGroupMessage :exec
DELETE FROM group_post
WHERE group_id = ? AND author = ? AND id = ?;