import Group from "./Group";

import classes from './AllGroups.module.css';
import useGet from "../fetch/useGet";

function AllGroups() {

  const currUserId = localStorage.getItem("user_id");

    // const { error , isLoaded, data } = useGet(`/group?userid=${currUserId}`)
    const { error , isLoaded, data } = useGet(`/group`)


      if (!isLoaded) return <div>Loading...</div>
      if (error) return <div>Error: {error.message}</div>

    return <div className={classes.container}>
        {data.data && data.data.map((group) => (
         <Group
        key={group.id}
        grpid={group.id}
        title={group.title} 
        creator={group.creator}
        description={group.description}
        // img={group.img}
        />
        ))}
            </div>
}

export default AllGroups;
