import {useEffect, useState} from "react";
import UserItem from "./UserItem";
import axios from "axios";
import {useContext} from "react";
import AuthContext from "../Contexts/auth-context";
import {Snackbar, SnackbarContent} from "@material-ui/core";

const UsersTable = (props) => {
    const [show, setShow] = useState(false);
    const [fetchedUser, setFetchedUser] = useState({});
    const authCtx = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [error, setErrorOpen] = useState(false);
    const headers = {
        'x-access-token': authCtx.token
    };
    const openModal = async (id) => {
        setShow(true);
        const response = await axios.get(`http://localhost:4001/api/v1/users/${id}`, {
            headers: headers
        });
        setFetchedUser(response.data);
        console.log(fetchedUser);
    };

    const closeModal = () => {
        setShow(false);
    };

    const closeEditSnackbar = () => {
        setEditOpen(false);
    };

    const closeErrorSnackbar = () => {
        setErrorOpen(false);
    };

    useEffect(() => {
        (async () => {
            const response = await axios.get('http://localhost:4001/api/v1/users', {
                headers: headers
            });
            props.setUsers(response.data);
        })();
    }, []);

    const deleteUsers = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4001/api/v1/users/${id}`, {
                headers: headers
            });
            props.setUsers((prevState) => prevState.filter((user) => response.data._id != user._id));
            setOpen(true);
        } catch (e) {
            console.log(e);
            setErrorOpen(true);
        }

    };

    const getUser = async (id) => {
        try {
            await axios.get(`http://localhost:4001/api/v1/users/${id}`, {
                headers: headers
            });
        } catch (e) {
            console.log(e);
            setErrorOpen(true);
        }
    }

    const closeSnackbar = () => {
        setOpen(false)
    };

    const editUser = (userData) => {
        const updatedUsers = props.users.map((user) => user._id === userData._id ? userData : user)
        props.setUsers(updatedUsers);
        setEditOpen(true);
    };


    return (
        <div className='container mt-5'>
            <table className="table mx-3 w-100">
                <thead className="thead-dark bg-primary text-white">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {props.users.map((user) => (
                    <UserItem id={user._id} first_name={user.first_name} last_name={user.last_name} email={user.email}
                              onDelete={deleteUsers} onShow={openModal} show={show} onHide={closeModal} onGet={getUser}
                              fetched={fetchedUser} onEdit={editUser}/>
                ))}
                </tbody>
            </table>
            <Snackbar
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                }}
                open={open}
                onClose={closeSnackbar}
                autoHideDuration={4000}
            >
                <SnackbarContent style={{
                    backgroundColor: 'green'
                }}
                                 message="User was removed"/>
            </Snackbar>

            <Snackbar
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                }}
                open={editOpen}
                onClose={closeEditSnackbar}
                autoHideDuration={4000}
            >
                <SnackbarContent style={{
                    backgroundColor: 'green'
                }}
                                 message="User was edited"/>
            </Snackbar>

            <Snackbar
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                }}
                open={error}
                onClose={closeErrorSnackbar}
                autoHideDuration={4000}
            >
                <SnackbarContent style={{
                    backgroundColor: 'red'
                }}
                                 message="Something went wrong"/>
            </Snackbar>
        </div>
    )
}

export default UsersTable;