// eg:
// {
//     "label": "noti",
//     "id": 0,
//     "type": "join-req",
//     "sourceid": 1,
//     "targetid": 4,
//     "accepted": false,
//     "createdat": "not now",
//     "groupid": 2
// }

interface Notif {
    label:     string;
	id:        number;
	type:     string;
	sourceid:  number;
	targetid:  number;
	accepted:  boolean;
	createdat: string;
	groupid:   number;
}

export default Notif;