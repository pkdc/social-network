import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useGet from '../fetch/useGet';
import { JoinedGroupContext } from "../store/joined-group-context";
import Card from '../UI/Card';
import SmallButton from '../UI/SmallButton';
import styles from './modal.module.css';


function Modal({open, onClose}) {
    const jGrpCtx = useContext(JoinedGroupContext);
    const currUserId = localStorage.getItem("user_id");

    const { state } = useLocation();
    const { id } = state; 

    const { error, isLoaded, data } = useGet(`/user`)

    if (!isLoaded) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!open) return null;

    function inviteHandler(e) {
        const uid = e.target.id;
        jGrpCtx.InviteToJoin(+id, +uid);
        console.log("group invite id", id);

        const data = {
            // id: 0,
            userid: parseInt(uid),
            groupid: parseInt(id),
            status: "0",
        };
    
        fetch('http://localhost:8080/group-member', 
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
            console.log("group invite posted", data)
        })
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modalContainer} >
                <div className={styles.close} onClick={onClose} >X</div>
                <div className={styles.container}>
                {data && data.data.map((user) => (
                    <div key={user.id} id={user.id} className={styles.userContainer}>
                        <div className={styles.img}></div>
                        <div>{user.fname}{user.lname}</div>
             
                <div className={styles.end}>
                <div className={styles.btn} id={user.id} onClick={inviteHandler}>Send Invitation</div>
              
                </div>
                    </div>
                ))}
                </div>
            </div>
            
        </div>

    )
}

export default Modal;