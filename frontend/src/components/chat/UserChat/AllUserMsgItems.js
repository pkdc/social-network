import UserMsgItem from "./UserMsgItem";

const AllUserMsgItems = () => {
   
    // console.log("msg in AllUserMsgItems", props.msgItems);

    return (
        props.msgItems.map((msg) => {
            return <UserMsgItem
                key={comment.id}
                id={comment.id}
                
                
            />
        })
    );
    
  

    
    
    ;
}

export default AllComments;