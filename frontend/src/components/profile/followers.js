import Card from "../UI/Card";
import profile from '../assets/profile.svg';
import classes from './followers.module.css'


function Followers() {
    return <Card>
        Followers
            <div className={classes.wrapper}>
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