import { debounce } from "lodash";
import { DomElement } from "./DomElement";

export class Board {
    id = null;
    element = null;
    inputElem = null;
    submitButton = null;
    inputText = "";
    filterInputElem = null;
    addTask;
    filterTasks;
    getBoardTasks;

    constructor({ boardId, name, addTask, filterTasks, getBoardTasks }) {
        this.id = boardId;
        this.addTask = addTask;
        this.filterTasks = filterTasks;
        this.getBoardTasks = getBoardTasks;
        console.log("name", name);

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
            this.addTask(this.id, this.inputElem.value);
            this.inputElem.value = "";
        });

        this.filterInputElem.addEventListener(
            "input",
            debounce(() => {
                if (this.filterInputElem.value) {
                    this.filterTasks(
                        this.id,
                        this.filterInputElem.value
                    ).then((res) => this.renderElements(res));
                } else {
                    this.getBoardTasks(this.id).then((res) => {
                        this.renderElements(res);
                    });
                }
            }, 500)
        );

        this.getBoardTasks(this.id).then((res) => {
            this.renderElements(res);
        });
    }

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
