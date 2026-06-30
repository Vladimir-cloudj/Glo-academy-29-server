import { render } from "./render.js";

export const sortUsers = () => {
  const headerSortIsChildren = document.getElementById("sort-is-children");

  if (!headerSortIsChildren) {
    console.warn("Элемент sort-is-children не найден");
    return;
  }

  headerSortIsChildren.style.cursor = "pointer";
//   headerSortIsChildren.title = "Нажмите для сортировки";

  let isSort = false; 

  headerSortIsChildren.addEventListener("click", () => {
    userService.getUsers().then((users) => {
      const sortedUsers = [...users].sort((a, b) => {
        const aChildren = a.children ? 1 : 0;
        const bChildren = b.children ? 1 : 0;

        return isSort ? aChildren - bChildren : bChildren - aChildren;
      });

      render(sortedUsers);
    });

    isSort = !isSort;
  });
};
