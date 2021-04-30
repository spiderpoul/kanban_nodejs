import React, { useEffect, useState } from 'react'

export const Board = ({ board }) => {

  const [tasks, setTasks] = useState();
  const [inputNewTask, setInputNewTask] = useState();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (board.id !== undefined) {
      fetch(`/api/board/${board.id}/tasks`)
        .then((res) => res.json())
        .then((tasks) => {
          setTasks(tasks);
        });
    }
  }, [board.id]);

  useEffect(() => {
    if (filter) {
      fetch(`/api/boards/${board.id}/tasks/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: filter,
        }),
      })
        .then((res) => res.json())
        .then((res) => setTasks(res));
    }
  }, [filter])

  const onClick = () => {
    console.log('click', inputNewTask);

    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: { task: inputNewTask, boardId: board.id },
      }),
    })
      .then((res) => res.json())
      .then((res) => setTasks(res));
  }

  return (
    <div>
      <div className="col-md-4">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">{board.title}</h3>
          </div>
          <div className="input-group">
            <input
              className="form-control"
              placeholder="find task"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="panel-body">
            {!tasks && <div>Loading</div>}
            {tasks?.map(({ task, id }) => (
              <div
                key={id}
                className="list-group-item"
              >
                {task}
              </div>
            ))}
            {tasks && tasks.length === 0 && <div>Nothing to show</div>}
          </div>
          <div className="input-group">
            <input className="form-control" placeholder="add new task" onChange={(e) => setInputNewTask(e.target.value)} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" onClick={onClick}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
