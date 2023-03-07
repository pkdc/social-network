-- name: GetUserId :one
SELECT * FROM session_table
WHERE session_token = ? LIMIT 1;

-- name: CreateSession :one
INSERT INTO session_table (
  session_token, user_id
) VALUES (
  ?, ?
)
RETURNING *;

-- name: DeleteMessage :exec
DELETE FROM session_table
WHERE session_token = ?;