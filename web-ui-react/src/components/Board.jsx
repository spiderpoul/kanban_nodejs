import React, { useEffect, useState } from 'react'

export const Board = ({ board }) => {


  const [tasks, setTasks] = useState();
  const [filter, setFilter] = useState();

  useEffect(() => {
    if (board.id !== undefined) {
      fetch(`/api/board/${board.id}/tasks`)
        .then((res) => res.json())
        .then((tasks) => {
          setTasks(tasks);
        });
    }
  }, [board.id]);

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
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="panel-body">
            {tasks?.map(({ task, id }) => (
              <div
                key={id}
                className="list-group-item"
              >
                {task}
              </div>
            ))}

          </div>
          <div className="input-group">
            <input className="form-control" placeholder="add new task" />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
