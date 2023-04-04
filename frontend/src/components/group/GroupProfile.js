import classes from './GroupProfile.module.css';
import SmallButton from "../UI/SmallButton";
import GreyButton from "../UI/GreyButton";
import Card from "../UI/Card";
import useGet from '../fetch/useGet';
import { useLocation } from 'react-router-dom';
import Modal from './modal';
import { useState } from 'react';

function GroupProfile( props ) {

    const { error, isLoaded, data } = useGet(`/group?id=${props.groupid}`)
    const [ open, setOpen ] = useState(false)
    
    const currUserId = localStorage.getItem("user_id");


    if (!isLoaded) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    function handleClick() {
        const currUserId = localStorage.getItem("user_id");

        setOpen(true)

        // const data = {
        //     id: 0,
        //     author: parseInt(currUserId),
        //     message: message,
        //     image: '',
        //     createdat: created,
        // };

        // fetch('http://localhost:8080/group', 
        // {
        //     method: 'POST',
        //     credentials: "include",
        //     mode: "cors",
        //     body: JSON.stringify(data),
        //     headers: { 
        //         'Content-Type': 'application/json' 
        //     }
        // }).then(() => {
        //     // navigate.replace('/??')
        //     console.log("posted")
        // })
        // console.log(data)
    
    }

    return <Card className={classes.container}>
           {data.data && data.data.map((group) => (
            <div className={classes.groupContainer} key={group.id} id={group.id}>
        <div className={classes.img}></div>
        <div className={classes.wrapper}>
            <div className={classes.row}>
                <div className={classes.groupname}>{group.title}</div>
             

                <div className={classes.btnWrapper}>
                    <SmallButton className={classes.btn} onClick={handleClick}>+ Invite</SmallButton>
                    <GreyButton className={classes.btn}>Message</GreyButton>
                </div>
            </div>
         
            <div className={classes.description}>{group.description}</div>
            {/* <div className={classes.members}>Members</div> */}
        </div>
        <Modal open={open} onClose={() => setOpen(false)}></Modal>
        </div>
     ))}
    </Card>
}

export default GroupProfile;