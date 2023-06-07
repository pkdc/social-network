// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.18.0
// source: privateChatItem.sql

package crud

import (
	"context"
	"time"
)

const createPrivateChatItem = `-- name: CreatePrivateChatItem :one
 INSERT INTO private_chat_item (
  source_id, target_id, chat_noti, last_msg_at
) VALUES (
  ?, ?, ?, ?
)
RETURNING id, source_id, target_id, chat_noti, last_msg_at
`

type CreatePrivateChatItemParams struct {
	SourceID  int64
	TargetID  int64
	ChatNoti  int64
	LastMsgAt time.Time
}

func (q *Queries) CreatePrivateChatItem(ctx context.Context, arg CreatePrivateChatItemParams) (PrivateChatItem, error) {
	row := q.db.QueryRowContext(ctx, createPrivateChatItem,
		arg.SourceID,
		arg.TargetID,
		arg.ChatNoti,
		arg.LastMsgAt,
	)
	var i PrivateChatItem
	err := row.Scan(
		&i.ID,
		&i.SourceID,
		&i.TargetID,
		&i.ChatNoti,
		&i.LastMsgAt,
	)
	return i, err
}

const deletePrivateChatItem = `-- name: DeletePrivateChatItem :exec
DELETE FROM private_chat_item
WHERE source_id = ? AND target_id = ?
`

type DeletePrivateChatItemParams struct {
	SourceID int64
	TargetID int64
}

func (q *Queries) DeletePrivateChatItem(ctx context.Context, arg DeletePrivateChatItemParams) error {
	_, err := q.db.ExecContext(ctx, deletePrivateChatItem, arg.SourceID, arg.TargetID)
	return err
}

const getOnePrivateChatItem = `-- name: GetOnePrivateChatItem :one
SELECT id, source_id, target_id, chat_noti, last_msg_at FROM private_chat_item
WHERE source_id = ? AND target_id = ?
`

type GetOnePrivateChatItemParams struct {
	SourceID int64
	TargetID int64
}

func (q *Queries) GetOnePrivateChatItem(ctx context.Context, arg GetOnePrivateChatItemParams) (PrivateChatItem, error) {
	row := q.db.QueryRowContext(ctx, getOnePrivateChatItem, arg.SourceID, arg.TargetID)
	var i PrivateChatItem
	err := row.Scan(
		&i.ID,
		&i.SourceID,
		&i.TargetID,
		&i.ChatNoti,
		&i.LastMsgAt,
	)
	return i, err
}

const getPrivateChatItem = `-- name: GetPrivateChatItem :many
SELECT id, source_id, target_id, chat_noti, last_msg_at FROM private_chat_item
WHERE target_id = ?
ORDER BY last_msg_at DESC
`

func (q *Queries) GetPrivateChatItem(ctx context.Context, targetID int64) ([]PrivateChatItem, error) {
	rows, err := q.db.QueryContext(ctx, getPrivateChatItem, targetID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []PrivateChatItem
	for rows.Next() {
		var i PrivateChatItem
		if err := rows.Scan(
			&i.ID,
			&i.SourceID,
			&i.TargetID,
			&i.ChatNoti,
			&i.LastMsgAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updatePrivateChatItem = `-- name: UpdatePrivateChatItem :one
UPDATE private_chat_item
SET chat_noti = ?,
last_msg_at = ?
WHERE source_id = ? AND target_id = ?
RETURNING id, source_id, target_id, chat_noti, last_msg_at
`

type UpdatePrivateChatItemParams struct {
	ChatNoti  int64
	LastMsgAt time.Time
	SourceID  int64
	TargetID  int64
}

func (q *Queries) UpdatePrivateChatItem(ctx context.Context, arg UpdatePrivateChatItemParams) (PrivateChatItem, error) {
	row := q.db.QueryRowContext(ctx, updatePrivateChatItem,
		arg.ChatNoti,
		arg.LastMsgAt,
		arg.SourceID,
		arg.TargetID,
	)
	var i PrivateChatItem
	err := row.Scan(
		&i.ID,
		&i.SourceID,
		&i.TargetID,
		&i.ChatNoti,
		&i.LastMsgAt,
	)
	return i, err
}
