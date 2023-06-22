-- name: GetGroupChatNoti :many
SELECT * FROM group_chat_item
ORDER BY last_msg_at DESC;

-- name: GetGroupChatNotiByGroupId :one
SELECT * FROM group_chat_item
WHERE group_id = ?;

-- name: CreateGroupChatItem :one
INSERT INTO group_chat_item (
  group_id, source_id, target_id, last_msg_at, chat_noti
) VALUES (
  ?, ?, ?, ?, ?
)
RETURNING *;

-- name: UpdateGroupChatItem :one
UPDATE group_chat_item
SET chat_noti = ?,
last_msg_at = ?
WHERE group_id = ? AND source_id = ? AND target_id = ?
RETURNING *;

-- name: DeleteGroupChatItem :exec
DELETE FROM group_chat_item
WHERE group_id = ?;
