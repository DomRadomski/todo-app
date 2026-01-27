import renderer from "./renderer";
import { addProject, getProjects, projectsToJson } from "../js/user";

let projectJson = projectsToJson(getProjects());

const genAddProject = () => {
    renderer.genProjectForm();   
}

const genNewProject = (evnt, title, desc) => {
    evnt.preventDefault();
    addProject(title, desc);
}

export {genAddProject, genNewProject};