-- name: CreatePrivateChatNotification :one
INSERT INTO private_chat_notification (
  source_id, target_id, chat_noti, last_msg_at
) VALUES (
  ?, ?, ?, ?
)
RETURNING *;