import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Board } from "./components/Board";

const TITLE = "Kanban";

function App() {
    const [boards, setBoards] = useState();

    useEffect(() => {
        fetch("/api/boards")
            .then((res) => res.json())
            .then((boards) => {
                console.log("boards", boards);
                setBoards(boards);
            });
    }, []);

    return (
        <div>
            <div className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-brand">{TITLE}</div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {boards?.map((board) => (
                        <Board key={board.id} board={board} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
