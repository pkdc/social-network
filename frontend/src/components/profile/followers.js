import Card from "../UI/Card";
import profile from '../assets/profile.svg';
import classes from './followers.module.css'
import useGet from "../fetch/useGet";
import { useNavigate } from "react-router-dom";


function Followers({userId}) {
    const navigate = useNavigate();

    // const { data } = useGet(`/user-follower${userId}`)

    function handleClick(e) {
        const id = e.target.id

        console.log("id: ", id)
        navigate("/profile", {
            state: {
                id
            }
        })

    }

    return <Card>
        Followers
            <div id="6" className={classes.wrapper} onClick={handleClick}>
            <img className={classes.img} src={profile}/>
            <div className={classes.user}>username</div>
        </div>
       <div className={classes.wrapper}>
            <img className={classes.img} src={profile}/>
            <div className={classes.user}>username</div>
        </div>
    </Card>
}

export default Followers;