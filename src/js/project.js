import TaskList from './tasklist.js';

class Project {
  #title;
  #description;
  #todolists;
  #isComplete;
  #projectId;

  constructor(title, description = '') {
    // Title validation
    if (typeof title !== 'string' || title.trim() === '') {
      throw new Error('Project title must be a non-empty string');
    }

    // Description validation
    if (typeof description !== 'string') {
      throw new Error('Project description must be a string');
    }

    this.#title = title.trim();
    this.#description = description;
    this.#todolists = [];
    this.#isComplete = false;
    this.#projectId = crypto.randomUUID();
    }

    /* ========= Getters ========= */

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get todolists() {
        // Defensive copy
        return [...this.#todolists];
    }

    get isComplete() {
        return this.#isComplete;
    }

    get projectId() {
        return this.#projectId;
    }

    get numLists() {
        return this.todolists.length;
    }

    /* ========= Setters ========= */

    set title(value) {
        if (typeof value !== 'string' || value.trim() === '') {
        throw new Error('Project title must be a non-empty string');
        }
        this.#title = value.trim();
    }

    set description(value) {
        if (typeof value !== 'string') {
        throw new Error('Project description must be a string');
        }
        this.#description = value;
    }

    /* ========= Behavior ========= */

    addToDo(list) {
        if (!(list instanceof TaskList)) {
        throw new Error('Only TaskList instances can be added to a project');
        }
        this.#todolists.push(list);
    }

    removeToDo(list) {
        if (!(list instanceof TaskList)) {
        throw new Error('Only TaskList instances can be removed from a project');
        }

        const index = this.#todolists.indexOf(list);
        if (index === -1) {
        throw new Error('TaskList not found in this project');
        }

        this.#todolists.splice(index, 1);
    }

    getToDoById(id) {
        return this.#todolists.find(list => list.listId === id) ?? null;
    }

    removeToDoById(id) {
    const list = this.getToDoById(id);
    if (!list) {
      throw new Error('To-do not found in this To-do List');
    }
    this.removeTask(list);
  }

    /* ========= Derived State ========= */

    checkCompleted() {
        return (
        this.#todolists.length > 0 &&
        this.#todolists.every(list => list.checkCompleted())
        );
    }

    updateCompletionStatus() {
        this.#isComplete = this.checkCompleted();
    }

    /* ========= Aggregation ========= */

    get allTasks() {
        return this.#todolists.flatMap(list => list.tasklist);
    }

    get overdueTasks() {
        return this.allTasks.filter(task => task.isOverdue);
    }
}

export default Project;
