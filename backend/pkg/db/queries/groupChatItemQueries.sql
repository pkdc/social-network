-- name: GetGroupChatNoti :many
SELECT * FROM group_chat_item
WHERE group_id = ?
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

-- name: DeleteGroupChatItem :exec
DELETE FROM group_chat_item
WHERE group_id = ?;