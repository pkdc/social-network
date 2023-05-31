-- name: CreatePrivateChatNotification :one
 INSERT INTO private_chat_notification (
  source_id, target_id, chat_noti, last_msg_at
) VALUES (
  ?, ?, ?, ?
)
RETURNING *;

-- name: GetPrivateChatNoti :many
SELECT * FROM private_chat_notification
WHERE target_id = ?;

-- name: DeletePrivateChatNotification :exec
DELETE FROM private_chat_notification
WHERE source_id = ? AND target_id = ?;

-- name: UpdatePrivateChatNotification :one
UPDATE private_chat_notification
SET chat_noti = ?,
last_msg_at = ?
WHERE source_id = ? AND target_id = ?
RETURNING *;