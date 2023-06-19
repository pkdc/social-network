import Group from "./Group";

import classes from './AllGroups.module.css';
import useGet from "../fetch/useGet";
import { useEffect, useState } from "react";

function AllGroups({refresh}) {

  const currUserId = localStorage.getItem("user_id");
const [groupData, setGroupData] = useState([])
    // const { error , isLoaded, data } = useGet(`/group?userid=${currUserId}`)
    // const { error , isLoaded, data } = useGet(`/group`)


    //   if (!isLoaded) return <div>Loading...</div>
    //   if (error) return <div>Error: {error.message}</div>
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch(`http://localhost:8080/group`);
          const data = await response.json();
          setGroupData(data.data);
        } catch (error) {
          console.log(error);
        }
      }
    
      fetchData();
    }, [refresh]);

    return <div className={classes.container}>
        {groupData && groupData.map((group) => (
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
