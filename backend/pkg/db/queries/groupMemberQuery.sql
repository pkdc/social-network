-- name: GetGroupMembers :many
SELECT * FROM group_member
WHERE id = ? AND status_ = ?;

-- name: CreateGroupMember :one
INSERT INTO group_member (
  user_id, group_id, status_
) VALUES (
  ?, ?, ?
)
RETURNING *;

-- name: UpdateGroupMember :one
UPDATE group_member
set status_ = ?
WHERE group_id = ? AND user_id = ?
RETURNING *;

-- name: DeleteGroupMember :exec
DELETE FROM group_member
WHERE group_id = ? AND user_id = ?;