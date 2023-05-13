import { useNavigate } from "react-router-dom";
import { JoinedGroupContext } from "../store/joined-group-context";
import Card from "../UI/Card";
import SmallButton from "../UI/SmallButton";

import classes from './Group.module.css';
import { useContext } from "react";

function Group(props) {
    const jGrpCtx = useContext(JoinedGroupContext);
    const currUserId = localStorage.getItem("user_id");
    console.log("curr id", currUserId);
    

    function reqToJoinHandler(e) {
        const grpid = e.target.id;
        console.log("grpid", e.target.id);
        jGrpCtx.requestToJoin(+grpid);

        const data = {
            id: Date.now(),
            userid: parseInt(currUserId),
            groupid: parseInt(grpid),
            status: 0,
            createdat: Date.now(),
        };

        console.log(data)
    
        fetch('http://localhost:8080/group-request', 
        {
            method: 'POST',
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json' 
            }
        }).then(() => {
            // navigate.replace('/??')
            console.log("group request posted")
        })
    }

    return <Card>
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.img}></div>
                <div>
                    <div className={classes.title}>{props.title}</div>
                    <div className={classes.members}>{props.members} members</div>
                    <div className={classes.desc}>{props.description}</div>
                </div>
             
            </div>
            <div className={classes.btn}>
                <div className={classes.smallbtn} id={props.grpid} onClick={reqToJoinHandler}>Join</div>
            </div>
        </div>
    </Card>
}

export default Group; 