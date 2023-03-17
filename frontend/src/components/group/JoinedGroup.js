import classes from './JoinedGroup.module.css';
import { useNavigate } from "react-router-dom";
import useGet from '../fetch/useGet'


function JoinedGroup(props) {
    const navigate = useNavigate();
    // const { data, isLoading, error } = useGet("/group")

    function handleClick(e) {
    //     const id = e.target.id //??
    
        // console.log(data)
        navigate("/groupprofile", {
            state: {
                // data
            }
        })
        
    }
    return <div>
          <div className={classes.container} onClick={handleClick} >
                <div className={classes.img}></div>
                <div>
                    <div className={classes.title}>{props.title}</div>
                </div>
             
            </div>
    </div>
}

export default JoinedGroup;