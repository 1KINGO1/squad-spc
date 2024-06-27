import { FC } from "react";
import UsersWrapper from "./UsersWrapper";
import NavigationBar from "./NavigationBar";
import useCurrentUser from "../../store/useCurrentUser";
import User from "./User";

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