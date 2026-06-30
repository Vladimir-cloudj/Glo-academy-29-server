import { render } from "./modules/render.js";
import { addUsers } from "./modules/addUsers.js";
import { removeUsers } from "./modules/removeUsers.js";
import { changePermissions } from "./modules/changePermissions.js";
import {UserService} from "./modules/userService.js"
import {editUsers} from "./modules/editUsers.js"
import { filterUsers } from "./modules/filterUsers.js";
import { sortUsers } from "./modules/sortUsers.js";
import {searchUsers} from "./modules/searchUsers.js"

window.userService = new UserService();

userService.getUsers().then(data => {
    console.log(data);
    render(data);
})

addUsers()
removeUsers()
changePermissions()
editUsers()
filterUsers()
sortUsers()
searchUsers()