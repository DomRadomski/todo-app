import './index.css';
import './palette.css';
import genHome from './ui/home';
import genProjectPage from './ui/projectPage';
import { STORAGE, getProjectById, getToDoById, getTaskById, openedTasks, addProject, addList, addTask, removeProjectById, removeListById, removeTaskById, withTask, findTaskInProject, projects } from './js/user';
import renderer from './ui/renderer';
import Priority from './js/priority';

let firstLoad = true;

const page = document.querySelector(".content");
const addProjectForm = document.querySelector("div#add-project");
const newListForm = document.querySelector("div#new-list");
const addTaskForm = document.querySelector("div#add-task");

const routes = {
  home: genHome,
  projectPage: genProjectPage
};

const clearContent = () => {
  if (!page) throw new Error('Missing ".content" container');
  page.innerHTML = "";
};

const loadPage = (route, ...args) => {
  const render = routes[route];
  if (!render) throw new Error(`Unknown route: ${route}`);

  if (route !== "projectPage") {page.classList = "content"}
  if (firstLoad) {render(...args); firstLoad = false} // Update projects in local storage
  else {
    STORAGE.updateStorage(projects);
    clearContent(); 
    render(...args);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  loadPage("home"); // initial route
  let currentProject;
  let currentList;
  
  header.addEventListener("click", (e) => {
    if (e.target.closest(".add-project-button")) {
      //loadPage("addProject");
      addProjectForm.classList.toggle('hidden');
    } else if (e.target.closest(".home-button")) {
      openedTasks.length = 0;
      loadPage("home");
    }
  });

  document.addEventListener("submit", (e) => {
    
    if(e.target.classList.contains("add-project-form")) {
      e.preventDefault(); // Don't forget this!
      
      // Can add validation in future
      let proTitle = document.querySelector("#project-title").value;
      let proDesc = document.querySelector("#project-description").value;   

      addProject(proTitle,proDesc);

      loadPage("home");

      addProjectForm.classList.toggle("hidden");
    }

    if(e.target.classList.contains("add-list-form")) {
      e.preventDefault(); // Don't forget this!
      
      // Can add validation in future
      let listTitle = document.querySelector("#list-title").value;
        

      addList(currentProject, listTitle);

      loadPage("projectPage", currentProject);

      newListForm.classList.toggle("hidden");
    }

    if (e.target.classList.contains("add-task-form")) {
      e.preventDefault(); // Prevent page reload

      // Grab values from the form
      const title = document.querySelector("#task-title").value;
      const dueDateValue = document.querySelector("#task-due-date").value;
      const priorityKey = document.querySelector("#task-priority").value;
      const notes = document.querySelector("#task-notes").value;

      // Convert date string -> Date object for Task constructor
      const dueDate = new Date(dueDateValue);
      const priority = Priority[priorityKey];

      // TODO: wire this up later
      addTask(currentList, title, dueDate, priority, notes);

      loadPage("projectPage", currentProject);

      addTaskForm.classList.toggle("hidden");
    }

  });

  page.addEventListener("click", (e) => {
    
    // Project Stuff

    if(e.target.closest("#delete-project")) {
      e.stopPropagation();
      let removeId = e.target.closest("article").id;
      if(removeProjectById(removeId)) {loadPage("home")}
    }
    
    else if(e.target.closest(".project-card")) {
      currentProject = getProjectById(e.target.closest(".project-card").id);
      console.table(currentProject);
      page.classList.add("content-project");
      loadPage("projectPage", currentProject);
    }

    // List stuff
    else if(e.target.closest("#delete-list")) { 
      let removeId = e.target.closest("section").id;
      removeListById(currentProject, removeId);
      loadPage("projectPage", currentProject);
    }

    else if(e.target.closest(".list-toggle")) {
      const listGroup = e.target.closest(".list-group");
      const taskList = listGroup.querySelector(".task-list");
      const numTasks = listGroup.querySelector(".list-count").textContent;
      // Toggle display
      console.log(numTasks)
      if (taskList.style.display === "none" && numTasks != "0") {
        taskList.style.display = "";
      } else {
        taskList.style.display = "none";
      }
    }

    // Add List

    else if (e.target.closest(".task-link")) {
      const taskPane = document.querySelector(".task-pane");

      const taskId = e.target.closest(".task-item").id;
      const listId = e.target.closest(".list-group").id;

      const list = getToDoById(listId, currentProject);
      const task = getTaskById(taskId, list);

      if (openedTasks.some(t => t.taskId === taskId)) {
        return;
      }

      openedTasks.push(task);

      taskPane.appendChild(
        renderer.genTaskCard(
          taskId,
          task.title,
          task.priority,
          task.dueDate,
          task.isComplete,
          task.notes
        )
      );
    }


    // Task Stuff

    // Delete task

    // else if (e.target.closest("#delete-task")) {
    //   e.stopPropagation();

    //   const taskCard = e.target.closest(".task-card");
    //   if (!taskCard) return;

    //   const taskId = taskCard.id;

    //   if (removeTaskById(currentProject, taskId)) {
    //     const index = openedTasks.findIndex(task => task.taskId === taskId);
    //     if (index !== -1) {
    //       openedTasks.splice(index, 1);
    //     }

    //     loadPage("projectPage", currentProject);
    //   } else {
    //     console.log("couldn't find");
    //   }
    // }

    else if (e.target.closest("#delete-task")) {
      e.stopPropagation();

      const card = e.target.closest(".task-card");
      if (!card) return;

      const taskId = card.id;

      const ok = withTask(currentProject, taskId, ({ list }) => {
        list.removeTaskById(taskId);
      });

      if (ok) {
        const i = openedTasks.findIndex(t => t.taskId === taskId);
        if (i !== -1) openedTasks.splice(i, 1);

        loadPage("projectPage", currentProject);
      } else {
        console.log("couldn't find");
      }
    }

    // Mark task complete 

    else if (e.target.closest("#mark-complete")) {
      e.stopPropagation();

      const card = e.target.closest(".task-card");
      if (!card) return;

      const taskId = card.id;

      const ok = withTask(currentProject, taskId, ({ task }) => {
        task.toggleComplete();
      });

      if (ok) {
        // If openedTasks stores Task objects, this auto-updates since it's the same reference.
        loadPage("projectPage", currentProject);
      } else {
        console.log("couldn't find");
      }
    }



    // Add Task

    else if(e.target.closest(".list-action")) {
      addTaskForm.classList.toggle("hidden");
      let listId = e.target.closest(".list-group").id;
      currentList = getToDoById(listId, currentProject);
    }

    // Close Task
    else if(e.target.closest(".close-task")) {
      let taskCardId = e.target.closest("article").id;
      let taskIndex = openedTasks.findIndex(task => task.taskId === taskCardId);
      
      if (taskIndex !== -1) {
          openedTasks.splice(taskIndex, 1);
          loadPage("projectPage", currentProject);
      }
    }

    // delete task

    //==========Open new list form============
    else if(e.target.closest(".explorer-action")) {
      newListForm.classList.toggle("hidden");
    }
  })

    //====================Close-forms===========================
  document.addEventListener("click", (e) => {
    if(e.target.closest("#close-add-project")) {
      addProjectForm.classList.toggle("hidden");
    }

    else if(e.target.closest("#close-new-list")) {
      newListForm.classList.toggle("hidden");
    }

    else if(e.target.closest("#close-add-task")) {
      addTaskForm.classList.toggle("hidden");
    }
  })

});

