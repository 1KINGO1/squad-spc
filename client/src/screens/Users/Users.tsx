import { FC } from "react";

import NavigationBar from "./NavigationBar";
import User from "./User";
import UsersWrapper from "./UsersWrapper";
import useUsers from "../../hooks/users/useUsers";
import useCurrentUser from "../../store/useCurrentUser";
import useUsersFilter from "../../store/useUsersFilter";

const Users: FC = () => {
  const { users } = useUsers({});
  const { user: currentUser } = useCurrentUser();

  const { roles, searchValue } = useUsersFilter();

  return (
    <div>
      <NavigationBar />
      <UsersWrapper>
        {
          users
            .filter(user =>
              user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
              user.steam_id.toLowerCase().includes(searchValue.toLowerCase())
            )
            .filter(user => roles.length ? roles.includes(user.permission) : true)
            .map((user) => (
              <User key={user.id} user={user} isCurrentUser={user.id === currentUser?.id} />
            ))
        }
      </UsersWrapper>
    </div>
  );
};

export default Users;