import EditUserModal from "../modals/EditUserModal";
import {Fragment} from "react";
import icon from './UI/delete-icon.png'
const UserItem = (props) => {
    const fetchUser = () => {
        props.onShow(props.id);
    }

    return (
        <Fragment>
        <EditUserModal id={props.id} show={props.show} hide={props.onHide} getUser={fetchUser} fetched={props.fetched} edit={props.onEdit} />
        <tr key={props.id}>
            <td><button id={props.id} className='btn btn-link' onClick={fetchUser}>{`${props.first_name} ${props.last_name}`}</button></td>
            <td>{props.email}</td>
            <td><button type='button' onClick={() => props.onDelete(props.id)}><img  src={icon}/></button></td>
        </tr>
        </Fragment>
    )
}

export default UserItem;