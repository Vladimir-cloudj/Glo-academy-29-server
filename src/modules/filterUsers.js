import { render} from './render.js';

export const filterUsers = () => {
    const btnIsChildren = document.getElementById('btn-isChildren');
    const btnIsPermisssions = document.getElementById('btn-isPermissions');
    const btnIsAll = document.getElementById("btn-isAll");

    btnIsChildren.addEventListener('click', () => {
        userService.filterUsers('children').then(users => {
            render(users)
        })
    })
    btnIsPermisssions.addEventListener('click', () => {
        userService.filterUsers("permissions").then((users) => {
          render(users);
        });
    })
    btnIsAll.addEventListener('click', () => {
        userService.getUsers().then((users) => {
          render(users);
        });
    })
}