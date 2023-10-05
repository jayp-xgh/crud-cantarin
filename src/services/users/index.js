import {deleteUser} from "./delete.js";
import {createUser} from "./create.js";
import {listAllUsers} from "./listAll.js";
import {updateUser} from "./update.js";
import {getUser} from "./getUser.js";


const userServices = {
    deleteUser,
    createUser,
    listAllUsers,
    updateUser,
    getUser
}

export default userServices;