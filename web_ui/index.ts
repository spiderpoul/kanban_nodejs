import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import { debounce } from "lodash";

class DomElement {
  element = null;

  constructor({ type = "div", className = "", html = "" } = {}) {
    this.element = document.createElement(type);
    this.element.innerHTML = html;

    className.split(" ").forEach(this.addClass.bind(this));
  }

  addClass(className) {
    if (className) this.element.classList.add(className);
  }

  removeClass(className) {
    this.element.classList.remove(className);
  }

  removeElement() {
    this.element.remove();
  }

  appendToElement(target) {
    target.appendChild(this.element);
  }
}

class Board {
  id = null;
  element = null;
  inputElem = null;
  submitButton = null;
  inputText = "";
  filterInputElem = null;

  constructor({ boardId, name }) {
    this.id = boardId;

    console.log('name', name);

    this.element = new DomElement({
      className: "col-sm-4",
      html: `
              <div class="panel panel-primary">                
                <div class="panel-heading">
                  <h3 class="panel-title">${name}</h3>
                </div>
                <div class="input-group">
                  <input data-id="filter" class="form-control" placeholder="find task">                  
                </div>
                <div data-id="content" class="panel-body">                
                </div>
                <div class="input-group">
                  <input data-id="task-input" class="form-control" placeholder="add new task">
                  <div class="input-group-append">
                    <button data-id="submit" class="btn btn-outline-secondary">Add</button>
                  </div>
                </div>
              </div>     
                     
            `,
    }).element;

    this.inputElem = this.element.querySelector(
      "input[data-id=task-input]"
    );

    this.filterInputElem = this.element.querySelector(
      "input[data-id=filter]"
    );

    this.submitButton = this.element.querySelector(
      "button[data-id=submit]"
    );

    this.submitButton.addEventListener("click", () => {
      this.addTask(this.inputElem.value);
      console.log(this.id)
      this.inputElem.value = "";
    });

    this.filterInputElem.addEventListener(
      "input",
      debounce(() => {
        if (this.filterInputElem.value) {
          this.filterTasks(this.filterInputElem.value);
        } else {
          this.getBoardTasks();
        }
      }, 500)
    );

    this.getBoardTasks();
  }

  getBoardTasks = () => {
    fetch(`/api/board/${this.id}/tasks`)
      .then((res) => res.json())
      .then((res) => this.renderElements(res));
  };

  addTask = (task) => {
    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: { task, boardId: this.id },
      }),
    })
      .then((res) => res.json())
      .then((res) => this.renderElements(res));
  };

  deleteTask = (task) => {
    fetch("/api/tasks", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },



    })
      .then((res) => res.json())
      .then((res) => this.renderElements(res));
  };

  filterTasks = (text) => {
    fetch("/api/tasks/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    })
      .then((res) => res.json())
      .then((res) => this.renderElements(res));
  };

  renderTask({ task }) {
    return `<div class="list-group-item">${task}</div>`;
  }

  renderElements(tasks) {
    this.element.querySelector("div[data-id=content]").innerHTML = `
          <div class="list-group">
            ${tasks.reduce((acc, task) => acc + this.renderTask(task), "")}
            
          </div>
        `;
  }
}

const header = new DomElement({
  className: "doc_header",
  html: `
    <div class="app_logo">
    <div class="menu">
      <div class = "menu_item">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.95312 2.19531C5.72656 2.19531 6.35938 2.82812 6.35938 3.60156V5.00781C6.35938 5.78125 5.72656 6.41406 4.95312 6.41406H3.54688C2.77344 6.41406 2.14062 5.78125 2.14062 5.00781V3.60156C2.14062 2.82812 2.77344 2.19531 3.54688 2.19531H4.95312ZM4.95312 0.789062H3.54688C2 0.789062 0.734375 2.05469 0.734375 3.60156V5.00781C0.734375 6.55469 2 7.82031 3.54688 7.82031H4.95312C6.5 7.82031 7.76562 6.55469 7.76562 5.00781V3.60156C7.76562 2.05469 6.5 0.789062 4.95312 0.789062Z" fill="white"/>
        </svg>
        <svg width="21" height="3" viewBox="0 0 21 3" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.2656 0.601562H0.578125V2.00781H20.2656V0.601562Z" fill="white"/>
        </svg>
      </div>
      <div class = "menu_item">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.95312 2.19531C5.72656 2.19531 6.35938 2.82812 6.35938 3.60156V5.00781C6.35938 5.78125 5.72656 6.41406 4.95312 6.41406H3.54688C2.77344 6.41406 2.14062 5.78125 2.14062 5.00781V3.60156C2.14062 2.82812 2.77344 2.19531 3.54688 2.19531H4.95312ZM4.95312 0.789062H3.54688C2 0.789062 0.734375 2.05469 0.734375 3.60156V5.00781C0.734375 6.55469 2 7.82031 3.54688 7.82031H4.95312C6.5 7.82031 7.76562 6.55469 7.76562 5.00781V3.60156C7.76562 2.05469 6.5 0.789062 4.95312 0.789062Z" fill="white"/>
        </svg>
        <svg width="21" height="3" viewBox="0 0 21 3" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.2656 0.601562H0.578125V2.00781H20.2656V0.601562Z" fill="white"/>
        </svg>
      </div>
      <div class = "menu_item">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.95312 2.19531C5.72656 2.19531 6.35938 2.82812 6.35938 3.60156V5.00781C6.35938 5.78125 5.72656 6.41406 4.95312 6.41406H3.54688C2.77344 6.41406 2.14062 5.78125 2.14062 5.00781V3.60156C2.14062 2.82812 2.77344 2.19531 3.54688 2.19531H4.95312ZM4.95312 0.789062H3.54688C2 0.789062 0.734375 2.05469 0.734375 3.60156V5.00781C0.734375 6.55469 2 7.82031 3.54688 7.82031H4.95312C6.5 7.82031 7.76562 6.55469 7.76562 5.00781V3.60156C7.76562 2.05469 6.5 0.789062 4.95312 0.789062Z" fill="white"/>
        </svg>
        <svg width="21" height="3" viewBox="0 0 21 3" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.2656 0.601562H0.578125V2.00781H20.2656V0.601562Z" fill="white"/>
        </svg>
      </div>
    </div>
    <span class="span_logo">Awesome Kanban Board</span>
  </div>
  
  <div class="menu_create-list">
    <div class="create-list">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 0C4.9 0 0 4.9 0 11C0 17.1 4.9 22 11 22C17.1 22 22 17.1 22 11C22 4.9 17.1 0 11 0ZM16 13H13V16C13 17.1 12.1 18 11 18C9.9 18 9 17.1 9 16V13H6C4.9 13 4 12.1 4 11C4 9.9 4.9 9 6 9H9V6C9 4.9 9.9 4 11 4C12.1 4 13 4.9 13 6V9H16C17.1 9 18 9.9 18 11C18 12.1 17.1 13 16 13Z" fill="black"/>
      </svg>
      <span class="span_create_list">Create new list</span>
    </div>
    <div class="user_menu" id="user-menu">
      <div class= "user-avatar">
        <svg width="28" height="35" viewBox="0 0 28 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.9464 23.4224C17.8296 22.1328 17.8744 21.2328 17.8744 20.0544C18.4584 19.748 19.5048 17.7944 19.6816 16.144C20.1408 16.1064 20.8648 15.6584 21.0768 13.8896C21.1912 12.94 20.7368 12.4056 20.46 12.2376C21.2072 9.99041 22.7592 3.03841 17.5896 2.32001C17.0576 1.38561 15.6952 0.912811 13.9248 0.912811C6.84161 1.04321 5.98721 6.26161 7.54001 12.2376C7.26401 12.4056 6.80961 12.94 6.92321 13.8896C7.13601 15.6584 7.85921 16.1064 8.31841 16.144C8.49441 17.7936 9.58241 19.748 10.168 20.0544C10.168 21.2328 10.212 22.1328 10.0952 23.4224C9.08641 26.1344 3.90561 26.3464 0.916809 28.9616C4.04161 32.108 9.10561 34.3584 14.4496 34.3584C19.7936 34.3584 26.0752 30.1392 27.1208 28.988C24.1504 26.3488 18.9576 26.144 17.9464 23.4224Z" fill="black"/>
        </svg>
      </div>
      <div class="arrow_down" id="arrow-down">
        <svg id="svg_image" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.415 0.209991L6 4.79499L10.585 0.209991L12 1.62499L6 7.62499L0 1.62499L1.415 0.209991Z" fill="white"/>
        </svg>
</div>
    </div>
  </div>
    `,
});

const footer = new DomElement({
  className: "doc_footer",
  html: `
  <div class="tasks">
  <span class="span_tasks">Active tasks: &lt;N&gt;</span>
  <span class="span_tasks">Finished tasks: &lt;M&gt;</span>
</div>
<span class="span_footer">Kanban board by &lt;NAME&gt;, &lt;YEAR&gt;</span>

    `,
});

const panel = new DomElement({
  className: "row",
});

const { element: container } = new DomElement({ className: "container" });

container.appendChild(panel.element);

document.body.appendChild(header.element);
document.body.appendChild(container);
document.body.appendChild(footer.element);

fetch("/api/boards")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    return res.map((el) => new Board({ boardId: el.id, name: el.title }))
  }
  )
  .then((elems) =>
    elems.forEach((item) => panel.element.appendChild(item.element))
  );