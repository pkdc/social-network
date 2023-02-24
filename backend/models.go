package backend

type AuthResponse struct {
	Success bool `json:"success"`
}

type loginPayload struct {
	Email string `json:"email"`
	Pw    string `json:"pw"`
}

type regPayload struct {
	Email  string `json:"email"`
	Pw     string `json:"pw"`
	Fname  string `json:"fname"`
	Lname  string `json:"lname"`
	Dob    string `json:"dob"`
	Avatar string `json:"avatar"`
	Nname  string `json:"nname"`
	About  string `json:"about"`
}

type UserStruct struct {
	Id       int    `json:"id"`
	Fname    string `json:"fname"`
	Lname    string `json:"lname"`
	Nname    string `json:"nname"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Dob      string `json:"dob"`
	Avatar   string `json:"avatar"`
	About    string `json:"about"`
	Public   string `json:"public"`
}

type UserFollowerStruct struct {
	Id       int `json:"id"`
	SourceId int `json:"sourceid"`
	TargetId int `json:"targetid"`
	Status   int `json:"status"`
}

type UserMessageStruct struct {
	Id        int    `json:"id"`
	TargetId  int    `json:"targetid"`
	SourceId  int    `json:"sourceid"`
	Message   string `json:"message"`
	CreatedAt string `json:"createdat"`
}

type PostStruct struct {
	Id        int    `json:"id"`
	Author    int    `json:"author"`
	Message   string `json:"message"`
	Image     string `json:"image"`
	CreatedAt string `json:"createdat"`
	Privacy   int    `json:"privacy"`
}

type PostMemberStruct struct {
	Id         int `json:"id"`
	UserId     int `json:"userid"`
	UserPostId int `json:"userpostid"`
}

type PostCommentStruct struct {
	Id        int    `json:"id"`
	PostId    int    `json:"postid"`
	UserId    int    `json:"userid"`
	CreatedAt string `json:"createdat"`
	Message   string `json:"message"`
}

type GroupStruct struct {
	Id          int    `json:"id"`
	Title       string `json:"title"`
	Creator     int    `json:"creator"`
	Description string `json:"description"`
	CreatedAt   string `json:"createdat"`
}

type GroupRequestStruct struct {
	Id      int `json:"id"`
	UserId  int `json:"userid"`
	GroupId int `json:"groupid"`
	Status  int `json:"status"`
}

type GroupMemberStruct struct {
	Id      int `json:"id"`
	UserId  int `json:"userid"`
	GroupId int `json:"groupid"`
	Status  int `json:"status"`
}

type GroupEventStruct struct {
	Id          int    `json:"id"`
	GroupId     int    `json:"groupid"`
	Author      int    `json:"author"`
	Title       string `json:"title"`
	Description string `json:"description"`
	CreatedAt   string `json:"createdat"`
	Date        string `json:"date"`
}

type GroupEventMemberStruct struct {
	Id      int `json:"id"`
	Status  int `json:"status"`
	UserId  int `json:"userid"`
	EventId int `json:"eventid"`
}

type GroupPostStruct struct {
	Id        int    `json:"id"`
	Author    int    `json:"author"`
	Message   string `json:"message"`
	Image     string `json:"image"`
	CreatedAt string `json:"createdat"`
}

type GroupPostCommentStruct struct {
	Id          int    `json:"id"`
	GroupPostId int    `json:"postid"`
	Author      int    `json:"userid"`
	CreatedAt   string `json:"createdat"`
	Message     string `json:"message"`
}

type GroupMessageStruct struct {
	Id        int    `json:"id"`
	Message   string `json:"message"`
	SourceId  int    `json:"sourceid"`
	GroupId   int    `json:"groupid"`
	CreatedAt string `json:"createdat"`
}

type SessionStruct struct {
	SessionToken string `json:"sessiontoken"`
	UserId       int    `json:"userid"`
}
