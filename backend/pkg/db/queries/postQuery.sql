-- name: GetPosts :many
SELECT * FROM post
WHERE author = ?;

-- name: GetAllPosts :many
SELECT * FROM post
WHERE privary = 0
ORDER BY created_at;

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