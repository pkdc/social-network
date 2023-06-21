-- name: GetGroupChatNoti :many
SELECT * FROM group_chat_item
ORDER BY last_msg_at;

-- name: GetGroupChatNotiByGroupId :one
SELECT * FROM group_chat_item
WHERE group_id = ?;

-- name: CreateGroupChatItem :one
INSERT INTO group_chat_item (
  group_id, last_msg_at
) VALUES (
  ?, ?
)
RETURNING *;

-- name: UpdateGroupChatItem :one
UPDATE group_chat_item
set last_msg_at = ?
WHERE group_id = ?
RETURNING *;

-- name: DeleteGroupChatItem :exec
DELETE FROM group_chat_item
WHERE group_id = ?;
