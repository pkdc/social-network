// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.17.2
// source: groupChatItemQueries.sql

package crud

import (
	"context"
	"time"
)

const createGroupChatItem = `-- name: CreateGroupChatItem :one
INSERT INTO group_chat_item (
  group_id, last_msg_at
) VALUES (
  ?, ?
)
RETURNING id, group_id, last_msg_at
`

type CreateGroupChatItemParams struct {
	GroupID   int64
	LastMsgAt time.Time
}

func (q *Queries) CreateGroupChatItem(ctx context.Context, arg CreateGroupChatItemParams) (GroupChatItem, error) {
	row := q.db.QueryRowContext(ctx, createGroupChatItem, arg.GroupID, arg.LastMsgAt)
	var i GroupChatItem
	err := row.Scan(&i.ID, &i.GroupID, &i.LastMsgAt)
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

const getGroupChatNoti = `-- name: GetGroupChatNoti :many
SELECT id, group_id, last_msg_at FROM group_chat_item
WHERE group_id = ?
ORDER BY last_msg_at
`

func (q *Queries) GetGroupChatNoti(ctx context.Context, groupID int64) ([]GroupChatItem, error) {
	rows, err := q.db.QueryContext(ctx, getGroupChatNoti, groupID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GroupChatItem
	for rows.Next() {
		var i GroupChatItem
		if err := rows.Scan(&i.ID, &i.GroupID, &i.LastMsgAt); err != nil {
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

const getGroupChatNotiByGroupId = `-- name: GetGroupChatNotiByGroupId :one
SELECT id, group_id, last_msg_at FROM group_chat_item
WHERE group_id = ?
`

func (q *Queries) GetGroupChatNotiByGroupId(ctx context.Context, groupID int64) (GroupChatItem, error) {
	row := q.db.QueryRowContext(ctx, getGroupChatNotiByGroupId, groupID)
	var i GroupChatItem
	err := row.Scan(&i.ID, &i.GroupID, &i.LastMsgAt)
	return i, err
}
