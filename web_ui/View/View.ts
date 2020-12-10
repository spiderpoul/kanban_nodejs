import { Board } from "../components/Board";
import { DomElement } from "../components/DomElement";

export class View {
    panel = null;

    constructor() {
        const header = new DomElement({
            className: "navbar navbar-default",
            html: `
          <div class="container">
            <div class="navbar-brand">Kanban</div>
          </div>
        `,
        });

        this.panel = new DomElement({
            className: "row",
        });

        const { element: container } = new DomElement({
            className: "container",
        });

        container.appendChild(this.panel.element);

        document.body.appendChild(header.element);
        document.body.appendChild(container);
    }

    renderBoards(boards, props: { addTask; filterTasks; getBoardTasks }) {
        boards
            .map(
                (el) => new Board({ boardId: el.id, name: el.title, ...props })
            )
            .forEach((item) => this.panel.element.appendChild(item.element));
    }
}
