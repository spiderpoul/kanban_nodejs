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
    className: "navbar navbar-default",
    html: `
      <div class="container">
        <div class="navbar-brand">Kanban</div>
      </div>
    `,
});

const panel = new DomElement({
    className: "row",
});

const { element: container } = new DomElement({ className: "container" });

container.appendChild(panel.element);

document.body.appendChild(header.element);
document.body.appendChild(container);

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