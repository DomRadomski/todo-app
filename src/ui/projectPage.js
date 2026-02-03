import renderer from "./renderer";

const genProjectPage = (project) => {
    const explorer = renderer.genExplorer(project.title);
    renderer.genTaskPane();

    project.todolists.forEach(list => {
        explorer.appendChild(renderer.genList(list.title, list.numTasks));
    });
    
}

export default genProjectPage;