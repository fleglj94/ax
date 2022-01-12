import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import {Fragment, useState} from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    return (
        <Fragment>
        <UserForm setUsers={setUsers}/>
        <UsersTable setUsers={setUsers} users={users}/>
        </Fragment>
    )
}

export default Users;