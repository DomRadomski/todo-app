import Task from './task.js';

class TaskList {
  #title;
  #tasks;
  #listId;

  constructor(title) {
    // Title validation
    if (typeof title !== 'string' || title.trim() === '') {
      throw new Error('TaskList title must be a non-empty string');
    }

    this.#title = title.trim();
    this.#tasks = [];
    this.#listId = crypto.randomUUID();
  }

  /* ========= Getters ========= */

  get title() {
    return this.#title;
  }

  get tasks() {
    // Defensive copy
    return [...this.#tasks];
  }

  get numTasks() {
    return this.#tasks.length;
    
  }

  get listId() {
    return this.#listId;
  }

  /**
   * A task list is complete if:
   * - it has at least one task
   * - every task is complete
   */
  get isComplete() {
    return (
      this.#tasks.length > 0 &&
      this.#tasks.every(task => task.isComplete)
    );
  }

  /* ========= Setters ========= */

  set title(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error('TaskList title must be a non-empty string');
    }
    this.#title = value.trim();
  }

  /* ========= Behavior ========= */

  addTask(task) {
    if (!(task instanceof Task)) {
      throw new Error('Only Task instances can be added to a TaskList');
    }

    this.#tasks.push(task);
  }

  removeTask(task) {
    if (!(task instanceof Task)) {
      throw new Error('Only Task instances can be removed from a TaskList');
    }

    const index = this.#tasks.indexOf(task);
    if (index === -1) {
      throw new Error('Task not found in this TaskList');
    }

    this.#tasks.splice(index, 1);
  }

  getTaskById(id) {
    return this.#tasks.find(task => task.taskId === id) ?? null;
  }

  removeTaskById(id) {
    const task = this.getTaskById(id);
    if (!task) {
      throw new Error('Task not found in this TaskList');
    }
    this.removeTask(task);
  }


  /* ========= Derived State ========= */

  checkCompleted() {
    return this.isComplete;
  }

  get hasTasks() {
    return this.#tasks.length > 0;
  }

  get incompleteTasks() {
    return this.#tasks.filter(task => !task.isComplete);
  }

  get completedTasks() {
    return this.#tasks.filter(task => task.isComplete);
  }

  get overdueTasks() {
    return this.#tasks.filter(task => task.isOverdue);
  }

}

export default TaskList;
