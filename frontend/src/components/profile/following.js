import Card from "../UI/Card";
import profile from '../assets/profile.svg';
import classes from './followers.module.css'
import useGet from "../fetch/useGet";
import { useNavigate } from "react-router-dom";


function Following({ userId }) {

    const navigate = useNavigate();

    const currUserId = localStorage.getItem("user_id");

    const { error , isLoaded, data } = useGet(`/user-following?id=${userId}`)

    if (!isLoaded) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    function handleClick(e) {
        const id = e.target.id

        console.log("id: ", id)
        navigate("/profile", { state: { id } })
    }

    return <Card>

    Following
    {data.data && data.data.map((follower) => (
         
         <div key={follower.id} className={classes.wrapper}>
         <img className={classes.img} src={profile}/>
         <div key={follower.id} id={follower.id} onClick={handleClick} className={classes.user}>{follower.fname}</div>
        </div>
     
     ))} 
    </Card>
}

export default Following;