import Task from './task.js';

class TaskList {
  #title;
  #tasks;
  #listId;

  constructor(title, tasks=null, listId=null) {
    // Title validation
    if (typeof title !== 'string' || title.trim() === '') {
      throw new Error('TaskList title must be a non-empty string');
    }

    this.#title = title.trim();
    this.#tasks = tasks ?? [];
    this.#listId = listId ?? crypto.randomUUID();
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

  toJSON() {
    return {
      listId: this.#listId,
      title: this.#title,
      tasks: this.#tasks, // each Task has toJSON getter, so it will serialize nicely
    };
  }

  static fromJSON({title, tasks, listId}) {
    return new TaskList(title, tasks.fromJSON(), listId);
  }


  // get isComplete() {
  //   return (
  //     this.#tasks.length > 0 &&
  //     this.#tasks.every(task => task.isComplete)
  //   );
  // }

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

}

export default TaskList;
