import { Model } from "../Model/Model";
import { View } from "../View/View";

export class Controller {
    model: Model;
    view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
    }

    async getBoards() {
        const boards = await this.model.getBoards();

        this.view.renderBoards(boards, {
            addTask: this.model.addTask,
            filterTasks: this.model.filterTasks,
            getBoardTasks: this.model.getBoardTasks,
        });
    }
}
