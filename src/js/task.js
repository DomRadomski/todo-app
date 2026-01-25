import Priority from './priority.js';
import { isAfter } from 'date-fns';

class Task {
  #title;
  #dueDate;
  #priority;
  #notes;
  #isComplete;
  #taskId;

  constructor(title, dueDate, priority = Priority.NORMAL, notes = '') {
    // Title validation
    if (typeof title !== 'string' || title.trim() === '') {
      throw new Error('Task title must be a non-empty string');
    }

    // Date validation
    if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
      throw new Error('dueDate must be a valid Date');
    }

    // Priority validation
    if (!Object.values(Priority).includes(priority)) {
      throw new Error(
        `Priority must be one of: ${Object.values(Priority).join(', ')}`
      );
    }

    // notes validation
    if (typeof notes !== 'string') {
      throw new Error('notes must be a string');
    }

    this.#title = title.trim();
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#notes = notes;
    this.#isComplete = false;
    this.#taskId = crypto.randomUUID();
  }

  /* ========= Getters ========= */

  get title() {
    return this.#title;
  }

  get dueDate() {
    return this.#dueDate;
  }

  get priority() {
    return this.#priority;
  }

  get notes() {
    return this.#notes;
  }

  get isComplete() {
    return this.#isComplete;
  }

  get taskId() {
    return this.#taskId;
  }

  /**
   * Derived temporal state
   */
  get isOverdue() {
    return isAfter(new Date(), this.#dueDate);
  }

  get isUpcoming() {
    return isAfter(this.#dueDate, new Date());
  }

  /* ========= Setters ========= */

  set title(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error('Task title must be a non-empty string');
    }
    this.#title = value.trim();
  }

  set dueDate(value) {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new Error('dueDate must be a valid Date');
    }
    this.#dueDate = value;
  }

  set priority(value) {
    if (!Object.values(Priority).includes(value)) {
      throw new Error(
        `Priority must be one of: ${Object.values(Priority).join(', ')}`
      );
    }
    this.#priority = value;
  }

  set notes(value) {
    if (typeof value !== 'string') {
      throw new Error('notes must be a string');
    }
    this.#notes = value;
  }

  /* ========= Behavior ========= */

  markComplete() {
    this.#isComplete = true;
  }

  markIncomplete() {
    this.#isComplete = false;
  }

  toggleComplete() {
    this.#isComplete = !this.#isComplete;
  }
}

export default Task;
