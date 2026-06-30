import { render } from "./render.js";

export const addUsers = () => {
  const form = document.querySelector("#form");
  const nameInput = form.querySelector("#form-name");
  const emailInput = form.querySelector("#form-email");
  const childrenInput = form.querySelector("#form-children");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.dataset.method) {
      userService.getUsers().then((users) => {
        let maxId = -1;

        users.forEach((user) => {
          const numId = parseInt(user.id, 10);
          if (!isNaN(numId) && numId > maxId) {
            maxId = numId;
          }
        });

        const nextId = String(maxId + 1);

        const user = Object.assign(
          {},
          { id: nextId },
          {
            name: nameInput.value,
            email: emailInput.value,
            children: childrenInput.checked,
            permissions: false,
          },
        );

        userService.addUser(user).then(() => {
          userService.getUsers().then((users) => {
            render(users);
            form.reset();
          });
        });
      });
    }
  });
};
