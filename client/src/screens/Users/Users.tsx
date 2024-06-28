import { FC } from "react";

import NavigationBar from "./NavigationBar";
import User from "./User";
import UsersWrapper from "./UsersWrapper";
import useCurrentUser from "../../store/useCurrentUser";

const Users: FC = () => {

  const {user} = useCurrentUser();

  return (
    <>
      <NavigationBar />
      <UsersWrapper>
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
        {user === null ? <span>Loading...</span> : <User user={user}/>}
      </UsersWrapper>
    </>
  );
};

export default Users;