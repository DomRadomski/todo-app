import TaskList from "./tasklist";

import TaskList from './tasklist.js';

class Project {
  #title;
  #description;
  #todolists;
  #isComplete;

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

    addTaskList(taskList) {
        if (!(taskList instanceof TaskList)) {
        throw new Error('Only TaskList instances can be added to a project');
        }
        this.#todolists.push(taskList);
    }

    removeTaskList(taskList) {
        if (!(taskList instanceof TaskList)) {
        throw new Error('Only TaskList instances can be removed from a project');
        }

        const index = this.#todolists.indexOf(taskList);
        if (index === -1) {
        throw new Error('TaskList not found in this project');
        }

        this.#todolists.splice(index, 1);
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
