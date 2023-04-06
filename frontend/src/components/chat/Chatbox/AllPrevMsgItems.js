import PrevMsgItem from "../Chatbox/PrevMsgItem";

const AllPrevMsgItems = (props) => {
   
    // console.log("msg in AllMsgItems", props.msgItems);

    return (
        props.msgItems.map((prevMsg) => {
            return <PrevMsgItem
                key={prevMsg.id}
                id={prevMsg.id}
                
                
            />
        })
    );
    
  

    
    
    ;
}

export default AllPrevMsgItems;