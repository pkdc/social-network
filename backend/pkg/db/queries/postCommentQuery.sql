-- name: GetPostComments :many
SELECT * FROM post_comment
WHERE post_id = ?
ORDER BY created_at;

-- name: CreatePostComment :one
INSERT INTO post_comment (
  user_id, post_id, created_at, message_, image_
) VALUES (
  ?, ?, ?, ?, ?
)
RETURNING *;c

-- name: DeletePostComment :exec
DELETE FROM post_comment
WHERE user_id = ? AND post_id = ?;