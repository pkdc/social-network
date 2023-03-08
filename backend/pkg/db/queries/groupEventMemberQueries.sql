-- name: GetGroupEventMembers :many
SELECT * FROM group_event_member
WHERE event_id = ?;

-- name: GetGroupEventMembersGoing :many
SELECT * FROM group_event_member
WHERE event_id = ? AND status_ = 1;

-- name: CreateGroupEventMember :one
INSERT INTO group_event_member (
  user_id, event_id, status_
) VALUES (
  ?, ?, ?
)
RETURNING *;

-- name: UpdateGroupEventMember :one
UPDATE group_event_member
set status_ = ?
WHERE event_id = ? AND user_id = ?
RETURNING *;

-- name: DeleteGroupEventMember :exec
DELETE FROM group_event_member
WHERE event_id = ? AND user_id = ?;