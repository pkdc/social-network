import PrevMsgItem from "../Chatbox/PrevMsgItem";

const AllPrevMsgItems = (props) => {
   
    console.log("msg in AllMsgItems", props.prevMsgItems);
    console.log("is array in AllMsgItems", Array.isArray(props.prevMsgItems));
    return (
        props.prevMsgItems.map((prevMsg) => {
            return <PrevMsgItem
                key={prevMsg.id}
                id={prevMsg.id}
                targetid={prevMsg.targetid}
                sourceid={prevMsg.sourceid}
                msg={prevMsg.message}
                createdat={prevMsg.createdat}
            />
        })
    );
}

export default AllPrevMsgItems;