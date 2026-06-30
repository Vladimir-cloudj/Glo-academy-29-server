export class UserService {
  constructor(baseUrl = "http://localhost:4545") {
    this.baseUrl = baseUrl;
  }

  getData(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        this.showError("Произошла ошибка, данных нет!");
        console.error("Ошибка getData:", error);
        return [];
      });
  }

  sendData(url, data = null, method = "POST") {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data && method !== "DELETE") {
      options.body = JSON.stringify(data);
    }

    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        this.showError("Произошла ошибка, данных нет!");
        console.error("Ошибка sendData:", error);
        return null;
      });
  }

  showError(message) {
    const table = document.querySelector(".table");
    if (!table) return;

    const existingError = document.querySelector(".table-error-message");
    if (existingError) {
      existingError.remove();
    }

    const errorBlock = document.createElement("div");
    errorBlock.className = "table-error-message";
    errorBlock.style.cssText = `
      text-align: center;
      padding: 15px;
      margin-top: 15px;
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      border-radius: 5px;
      font-weight: 600;
      font-size: 16px;
    `;
    errorBlock.textContent = message;

    table.parentNode.insertBefore(errorBlock, table.nextSibling);

    setTimeout(() => {
      errorBlock.remove();
    }, 5000);
  }

  getUsers() {
    return this.getData(`${this.baseUrl}/users`);
  }

  getUser(id) {
    return this.getData(`${this.baseUrl}/users/${id}`);
  }

  addUser(user) {
    return this.sendData(`${this.baseUrl}/users`, user, "POST");
  }

  removeUser(id) {
    return this.sendData(`${this.baseUrl}/users/${id}`, null, "DELETE");
  }

  changeUser(id, data) {
    return this.sendData(`${this.baseUrl}/users/${id}`, data, "PATCH");
  }

  editUser(id, user) {
    return this.sendData(`${this.baseUrl}/users/${id}`, user, "PUT");
  }

  filterUsers(filterOption) {
    return this.getData(`${this.baseUrl}/users?${filterOption}=true`);
  }

  getSortUsers(sortOption) {
    return this.getData(
      `${this.baseUrl}/users?_sort=${sortOption.name}&_order=${sortOption.value}`,
    );
  }

  getSearchUsers(str) {
    return this.getData(`${this.baseUrl}/users?name_like=${str}`);
  }
}
