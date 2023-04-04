import Group from "./Group";

import classes from './AllGroups.module.css';
import useGet from "../fetch/useGet";

function AllGroups(props) {

    // const { data } = useGet("/group")

//     return <div className={classes.container}>
//         {data.map((group) => (
//          <Group
//         key={group.id}
//         id={group.id}
//         title={group.title} 
//         creator={group.creator}
//         description={group.description}  
//         // img={group.img}
//         />
//         ))}
//             </div>
}

export default AllGroups;
