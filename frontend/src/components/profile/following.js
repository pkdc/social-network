import Card from "../UI/Card";
import profile from '../assets/profile.svg';
import classes from './followers.module.css'
import useGet from "../fetch/useGet";
import { useNavigate } from "react-router-dom";


function Following() {

    const navigate = useNavigate();

    const { error , isLoading, data } = useGet(`/user-following?id=${51}`)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    function handleClick(e) {
        const id = e.target.id

        console.log("id: ", id)
        navigate("/profile", { state: { id } })
    }

    return <Card>

    Following
    {data && data.map((follower) => (
         <>
         <div  className={classes.wrapper}>
         <img className={classes.img} src={profile}/>
         <div key={follower[0].id} id={follower[0].id} onClick={handleClick} className={classes.user}>{follower[0].fname}</div>
        </div>
        </>
     ))} 
    </Card>
}

export default Following;