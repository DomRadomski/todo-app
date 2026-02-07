import renderer from "./renderer";

// genprojects and tasks, later seperate the gen of the explorer and task pane so i can refresh the explorer seperately

const genProjectPage = (project) => {
    let explorer = renderer.genExplorer(project.title);
    let explorerTree = explorer.querySelector(".explorer-tree");
    renderer.genTaskPane();
    console.log(explorer)
    project.todolists.forEach(list => {
        console.log(list.listId)
        let section = explorerTree.appendChild(renderer.genList(list.listId, list.title, list.numTasks));
        
        let currentList = section.querySelector(".task-list");

        list.tasks.forEach(task => {
            currentList.appendChild(renderer.genTask(task.taskId, task.title, task.isComplete));
        })
    }); 
}



export default genProjectPage;