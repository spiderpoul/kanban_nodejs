<template>
    <div class="col-md-4">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">{{ board.title }}</h3>
            </div>
            <div class="input-group">
                <input
                    class="form-control"
                    placeholder="find task"
                    v-model="filter"
                    v-on:input="filterTasks"
                />
            </div>
            <div class="panel-body">
                <div
                    class="list-group-item"
                    v-bind:key="task.id"
                    v-for="task in tasks"
                >
                    {{ task.task }}
                </div>
            </div>
            <div class="input-group">
                <input class="form-control" placeholder="add new task" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Board",
    props: ["board"],
    data() {
        return {
            tasks: [],
            filter: "",
        };
    },
    created() {
        fetch(`/api/board/${this.board.id}/tasks`)
            .then((res) => res.json())
            .then((tasks) => {
                console.log(tasks);
                this.tasks = tasks;
            });
    },
    methods: {
        filterTasks() {
            fetch(`/api/boards/${this.board.id}/tasks/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: this.filter,
                }),
            })
                .then((res) => res.json())
                .then((res) => (this.tasks = res));
        },
    },
};
</script>
