import {render} from './render.js';
import {debounce} from './helpers.js';

export const searchUsers = () => {
    const input = document.getElementById('search-input');

    const debounceSearch = debounce(() => {
        userService.getSearchUsers(input.value).then((users) => {
          render(users);
        });
    }, 500)

    input.addEventListener("input", debounceSearch);
}