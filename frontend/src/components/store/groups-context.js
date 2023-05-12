

export const GroupsContext = React.createContext({
    groups: [],
    onNewGroupCreated: () => {},
});

export const GroupsContextProvider = (props) => {


    return (
        <GroupsContext.Provider value={{
            groups: groupsList,
            // onlineGroups: onlineGroupsList,
            onNewUserReg: getGroupsHandler,
            // onOnline: userOnlineHandler,
            // onOffline: userOfflineHandler,
        }}>
        {props.children}
        </GroupsContext.Provider>
    );
};