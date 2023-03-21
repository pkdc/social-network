import classes from './JoinedGroup.module.css';
import { useNavigate } from "react-router-dom";
import useGet from '../fetch/useGet'


function JoinedGroup(props) {
    const navigate = useNavigate();
    // const { data, isLoading, error } = useGet("/group")

    function handleClick(e) {
        const id = e.target.id
        
            console.log("id: ", id)
        navigate("/groupprofile", {
            state: {
                id
            }
        })
        
    }
    return <div>
          <div id={props.id} className={classes.container} onClick={handleClick} >
                <div className={classes.img}></div>
                <div>
                    <div className={classes.title}>{props.title}</div>
                </div>
             
            </div>
    </div>
}

export default JoinedGroup;