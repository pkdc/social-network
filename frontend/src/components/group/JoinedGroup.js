import classes from './JoinedGroup.module.css';

function JoinedGroup(props) {
    return <div>
          <div className={classes.container}>
                <div className={classes.img}></div>
                <div>
                    <div className={classes.title}>{props.title}</div>
                </div>
             
            </div>
    </div>
}

export default JoinedGroup;