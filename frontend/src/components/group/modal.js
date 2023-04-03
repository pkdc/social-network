import { useState } from 'react';
import useGet from '../fetch/useGet';
import Card from '../UI/Card';
import SmallButton from '../UI/SmallButton';
import styles from './modal.module.css';

function Modal({open, onClose}) {

    const { error, isLoaded, data } = useGet(`/user`)

    const [isChecked, setIsChecked] = useState(false); 
        // new Array(data.id.length).fill(false)

    
        
   

    if (!isLoaded) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!open) return null;

    function handleClick(e) {
        // const check = e.target.checked;
        const user = e.target.id    ;
        console.log("invite user", user);
        
    }

    // function handleOnChange() {
    //     setIsChecked(!isChecked);
    //     console.log("ischecked", isChecked)
    // }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modalContainer} >
                <div className={styles.close} onClick={onClose} >X</div>
                <div className={styles.container}>
                {data && data.data.map((user) => (
                    <div key={user.id} id={user.id} className={styles.userContainer}>
                        <div className={styles.img}></div>
                        <div>{user.fname}{user.lname}</div>
                        {/* <div className={styles.check}> */}
                        {/* <input type="checkbox"  name="check" id="check"
                         value="value"
                         checked={isChecked}
                         onChange={handleOnChange}/> */}
                        {/* </div> */}
                <div className={styles.end}>
                <div className={styles.btn} id={user.id} onClick={handleClick}>Send Invitation</div>
              
                </div>
                    </div>
                ))}
                </div>
            </div>
            
        </div>

    )
}

export default Modal;