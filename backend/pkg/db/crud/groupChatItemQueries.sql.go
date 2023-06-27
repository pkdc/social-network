// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.18.0
// source: groupChatItemQueries.sql

package crud

import (
	"context"
	"time"
)

const createGroupChatItem = `-- name: CreateGroupChatItem :one
INSERT INTO group_chat_item (
  group_id, user_id, last_msg_at, chat_noti
) VALUES (
  ?, ?, ?, ?
)
RETURNING id, group_id, user_id, chat_noti, last_msg_at
`

type CreateGroupChatItemParams struct {
	GroupID   int64
	UserID    int64
	LastMsgAt time.Time
	ChatNoti  int64
}

func (q *Queries) CreateGroupChatItem(ctx context.Context, arg CreateGroupChatItemParams) (GroupChatItem, error) {
	row := q.db.QueryRowContext(ctx, createGroupChatItem,
		arg.GroupID,
		arg.UserID,
		arg.LastMsgAt,
		arg.ChatNoti,
	)
	var i GroupChatItem
	err := row.Scan(
		&i.ID,
		&i.GroupID,
		&i.UserID,
		&i.ChatNoti,
		&i.LastMsgAt,
	)
	return i, err
}

const deleteGroupChatItem = `-- name: DeleteGroupChatItem :exec
DELETE FROM group_chat_item
WHERE group_id = ?
`

func (q *Queries) DeleteGroupChatItem(ctx context.Context, groupID int64) error {
	_, err := q.db.ExecContext(ctx, deleteGroupChatItem, groupID)
	return err
}

const deleteOneGroupChatItem = `-- name: DeleteOneGroupChatItem :exec
DELETE FROM group_chat_item
WHERE group_id = ? AND user_id
`

func (q *Queries) DeleteOneGroupChatItem(ctx context.Context, groupID int64) error {
	_, err := q.db.ExecContext(ctx, deleteOneGroupChatItem, groupID)
	return err
}

const getGroupChatNoti = `-- name: GetGroupChatNoti :many
SELECT id, group_id, user_id, chat_noti, last_msg_at FROM group_chat_item
WHERE user_id = ?
ORDER BY last_msg_at DESC
`

func (q *Queries) GetGroupChatNoti(ctx context.Context, userID int64) ([]GroupChatItem, error) {
	rows, err := q.db.QueryContext(ctx, getGroupChatNoti, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GroupChatItem
	for rows.Next() {
		var i GroupChatItem
		if err := rows.Scan(
			&i.ID,
			&i.GroupID,
			&i.UserID,
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

const getOneGroupChatItemByUserId = `-- name: GetOneGroupChatItemByUserId :one
SELECT id, group_id, user_id, chat_noti, last_msg_at FROM group_chat_item
WHERE group_id = ? AND user_id = ?
`

type GetOneGroupChatItemByUserIdParams struct {
	GroupID int64
	UserID  int64
}

func (q *Queries) GetOneGroupChatItemByUserId(ctx context.Context, arg GetOneGroupChatItemByUserIdParams) (GroupChatItem, error) {
	row := q.db.QueryRowContext(ctx, getOneGroupChatItemByUserId, arg.GroupID, arg.UserID)
	var i GroupChatItem
	err := row.Scan(
		&i.ID,
		&i.GroupID,
		&i.UserID,
		&i.ChatNoti,
		&i.LastMsgAt,
	)
	return i, err
}

const updateGroupChatItem = `-- name: UpdateGroupChatItem :one
UPDATE group_chat_item
SET chat_noti = ?,
last_msg_at = ?
WHERE group_id = ? AND user_id = ?
RETURNING id, group_id, user_id, chat_noti, last_msg_at
`

type UpdateGroupChatItemParams struct {
	ChatNoti  int64
	LastMsgAt time.Time
	GroupID   int64
	UserID    int64
}

func (q *Queries) UpdateGroupChatItem(ctx context.Context, arg UpdateGroupChatItemParams) (GroupChatItem, error) {
	row := q.db.QueryRowContext(ctx, updateGroupChatItem,
		arg.ChatNoti,
		arg.LastMsgAt,
		arg.GroupID,
		arg.UserID,
	)
	var i GroupChatItem
	err := row.Scan(
		&i.ID,
		&i.GroupID,
		&i.UserID,
		&i.ChatNoti,
		&i.LastMsgAt,
	)
	return i, err
}
