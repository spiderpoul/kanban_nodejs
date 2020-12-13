<template>
    <div>
        <div class="navbar navbar-default">
            <div class="container">
                <div class="navbar-brand">{{ title }}</div>
            </div>
        </div>
        <div class="container">
            <div class="row" v-if="boards.length > 0">
                <Board
                    v-bind:key="board.id"
                    v-for="board in boards"
                    v-bind="{ board }"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Board from "../components/Board";

export default {
    name: "Kanban",
    components: {
        Board,
    },
    data() {
        return {
            boards: [],
            title: "Kanban",
        };
    },
    created() {
        fetch("/api/boards")
            .then((res) => res.json())
            .then((boards) => {
                console.log(boards);
                this.boards = boards;
            });
    },
};
</script>

<style lang="scss">
.panel-body {
    padding: 0;
}

.input-group {
    display: flex;
    padding: 15px;
}
</style>
