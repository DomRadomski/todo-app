import renderer from "./renderer";
import { getProjects, projectsToJson } from "../js/user";

let projectJson = projectsToJson(getProjects());

const genAddProject = () => {
    renderer.genProjectForm();
    //Add event listner and functionality, pubsub??
}

export default genAddProject;