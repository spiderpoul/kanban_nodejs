import "bootstrap/dist/css/bootstrap.css";
import { Controller } from "./Controller/Controller";
import { Model } from "./Model/Model";
import { View } from "./View/View";
import "./styles.css";

const controller = new Controller(new Model(), new View());

controller.getBoards();