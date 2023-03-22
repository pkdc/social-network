// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.17.2
// source: userQuery.sql

package crud

import (
	"context"
	"time"
)

const createUser = `-- name: CreateUser :one
INSERT INTO user (
  first_name, last_name, nick_name, email, password_, dob, image_ , about, public
) VALUES (
  ?, ?, ?, ?, ?, ?, ?, ?, ?
)
RETURNING id, first_name, last_name, nick_name, email, password_, dob, image_, about, public
`

type CreateUserParams struct {
	FirstName string
	LastName  string
	NickName  string
	Email     string
	Password  string
	Dob       time.Time
	Image     string
	About     string
	Public    int64
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.FirstName,
		arg.LastName,
		arg.NickName,
		arg.Email,
		arg.Password,
		arg.Dob,
		arg.Image,
		arg.About,
		arg.Public,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.FirstName,
		&i.LastName,
		&i.NickName,
		&i.Email,
		&i.Password,
		&i.Dob,
		&i.Image,
		&i.About,
		&i.Public,
	)
	return i, err
}

const deleteUser = `-- name: DeleteUser :exec
DELETE FROM user
WHERE id = ?
`

func (q *Queries) DeleteUser(ctx context.Context, id int64) error {
	_, err := q.db.ExecContext(ctx, deleteUser, id)
	return err
}

const getUser = `-- name: GetUser :one
SELECT id, first_name, last_name, nick_name, email, password_, dob, image_, about, public, COUNT(*) FROM user
WHERE email = ? LIMIT 1
`

type GetUserRow struct {
	ID        int64
	FirstName string
	LastName  string
	NickName  string
	Email     string
	Password  string
	Dob       time.Time
	Image     string
	About     string
	Public    int64
	Count     int64
}

func (q *Queries) GetUser(ctx context.Context, email string) (GetUserRow, error) {
	row := q.db.QueryRowContext(ctx, getUser, email)
	var i GetUserRow
	err := row.Scan(
		&i.ID,
		&i.FirstName,
		&i.LastName,
		&i.NickName,
		&i.Email,
		&i.Password,
		&i.Dob,
		&i.Image,
		&i.About,
		&i.Public,
		&i.Count,
	)
	return i, err
}

const getUserById = `-- name: GetUserById :one
SELECT id, first_name, last_name, nick_name, email, password_, dob, image_, about, public FROM user
WHERE id = ?
`

func (q *Queries) GetUserById(ctx context.Context, id int64) (User, error) {
	row := q.db.QueryRowContext(ctx, getUserById, id)
	var i User
	err := row.Scan(
		&i.ID,
		&i.FirstName,
		&i.LastName,
		&i.NickName,
		&i.Email,
		&i.Password,
		&i.Dob,
		&i.Image,
		&i.About,
		&i.Public,
	)
	return i, err
}

const getUserExist = `-- name: GetUserExist :one
SELECT COUNT(*)
FROM user
WHERE email = ? OR nick_name = ?
`

type GetUserExistParams struct {
	Email    string
	NickName string
}

func (q *Queries) GetUserExist(ctx context.Context, arg GetUserExistParams) (int64, error) {
	row := q.db.QueryRowContext(ctx, getUserExist, arg.Email, arg.NickName)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const listUsers = `-- name: ListUsers :many
SELECT id, first_name, last_name, nick_name, email, password_, dob, image_, about, public FROM user
ORDER BY nick_name
`

func (q *Queries) ListUsers(ctx context.Context) ([]User, error) {
	rows, err := q.db.QueryContext(ctx, listUsers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.FirstName,
			&i.LastName,
			&i.NickName,
			&i.Email,
			&i.Password,
			&i.Dob,
			&i.Image,
			&i.About,
			&i.Public,
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

const updateUser = `-- name: UpdateUser :one
UPDATE user
set first_name = ?, 
last_name = ?, 
nick_name = ?, 
email = ?, 
password_ = ?, 
dob = ?, 
image_ = ?, 
about = ?, 
public = ?
WHERE id = ?
RETURNING id, first_name, last_name, nick_name, email, password_, dob, image_, about, public
`

type UpdateUserParams struct {
	FirstName string
	LastName  string
	NickName  string
	Email     string
	Password  string
	Dob       time.Time
	Image     string
	About     string
	Public    int64
	ID        int64
}

func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, updateUser,
		arg.FirstName,
		arg.LastName,
		arg.NickName,
		arg.Email,
		arg.Password,
		arg.Dob,
		arg.Image,
		arg.About,
		arg.Public,
		arg.ID,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.FirstName,
		&i.LastName,
		&i.NickName,
		&i.Email,
		&i.Password,
		&i.Dob,
		&i.Image,
		&i.About,
		&i.Public,
	)
	return i, err
}