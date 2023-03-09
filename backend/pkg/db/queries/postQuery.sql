-- name: GetPosts :many
SELECT * FROM post
WHERE author = ?;

-- name: CreatePost :one
INSERT INTO post (
  author, message_, image_, created_at, privacy
) VALUES (
  ?, ?, ?, ?, ?
)
RETURNING *;

-- name: DeletePost :exec
DELETE FROM post
WHERE author = ? AND id = ?;