export class Model {
    getBoardTasks = (id) =>
        fetch(`/api/board/${id}/tasks`).then((res) => res.json());

    addTask = (id, task) =>
        fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                task: { task, boardId: id },
            }),
        }).then((res) => res.json());

    filterTasks = (id, text) =>
        fetch("/api/tasks/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text,
            }),
        }).then((res) => res.json());

    getBoards = () => fetch("/api/boards").then((res) => res.json());
}
