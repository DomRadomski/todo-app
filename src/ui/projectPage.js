import renderer from "./renderer";
import { openedTasks } from "../js/user";

// genprojects and tasks, later seperate the gen of the explorer and task pane so i can refresh the explorer seperately
// should keep stae of opened lists????

const genProjectPage = (project) => {
    let explorer = renderer.genExplorer(project.title);
    let explorerTree = explorer.querySelector(".explorer-tree");
    addTaskPane(openedTasks);
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

    const addTaskPane = (openedTasks) => {
        // Create empty task pane container
        const taskPane = renderer.genTaskPane(); // You'll need this function
        
        if (!openedTasks || openedTasks.length === 0) {
            return taskPane; // Return empty pane
        }
        
        // Add each task card to the pane
        openedTasks.forEach(task => {
            const taskCard = renderer.genTaskCard(
                task.taskId,
                task.title,
                task.priority,
                task.dueDate,
                task.isComplete,
                task.notes
            );
            taskPane.appendChild(taskCard);
        });
        
        return taskPane;
    }


export default genProjectPage;