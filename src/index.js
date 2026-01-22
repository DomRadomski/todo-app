import Priority from "./js/priority";
import Task from "./js/task";
import TaskList from "./js/tasklist";

console.log('===== TASK TESTS =====');

// Helper for readable test output
function test(description, fn) {
  try {
    fn();
    console.log(`✅ PASS: ${description}`);
  } catch (err) {
    console.error(`❌ FAIL: ${description}`);
    console.error('   ', err.message);
  }
}

// --- Task creation ---
test('Create a valid task', () => {
  const task = new Task(
    'Write tests',
    new Date(Date.now() + 1000 * 60 * 60),
    Priority.HIGH,
    'Testing the Task class'
  );

  console.log(task.title, task.priority, task.isComplete);
});

// --- Validation ---
test('Reject empty title', () => {
  new Task('', new Date());
});

test('Reject invalid dueDate', () => {
  new Task('Bad date', 'tomorrow');
});

test('Reject invalid priority', () => {
  new Task('Bad priority', new Date(), 'urgent');
});

// --- Completion methods ---
test('markComplete sets isComplete to true', () => {
  const task = new Task('Complete me', new Date());
  task.markComplete();

  if (!task.isComplete) {
    throw new Error('Task should be complete');
  }
});

test('toggleComplete flips completion state', () => {
  const task = new Task('Toggle me', new Date());

  task.toggleComplete();
  if (!task.isComplete) throw new Error('Expected complete');

  task.toggleComplete();
  if (task.isComplete) throw new Error('Expected incomplete');
});

// --- Derived properties ---
test('isOverdue returns true for past dates', () => {
  const task = new Task('Late task', new Date(Date.now() - 1000));
  if (!task.isOverdue) {
    throw new Error('Task should be overdue');
  }
});

console.log('\n===== TASKLIST TESTS =====');

test('Create empty TaskList', () => {
  const list = new TaskList('My Tasks');
  console.log(list.title, list.tasklist.length);
});

test('Add task to TaskList', () => {
  const list = new TaskList('Daily Tasks');
  const task = new Task('Brush teeth', new Date());

  list.addTask(task);

  if (list.tasklist.length !== 1) {
    throw new Error('Task was not added');
  }
});

test('Reject adding non-Task', () => {
  const list = new TaskList('Bad List');
  list.addTask({ title: 'fake task' });
});

test('Remove task from TaskList', () => {
  const list = new TaskList('Removal Test');
  const task = new Task('Remove me', new Date());

  list.addTask(task);
  list.removeTask(task);

  if (list.tasklist.length !== 0) {
    throw new Error('Task was not removed');
  }
});

test('checkCompleted returns false if tasks incomplete', () => {
  const list = new TaskList('Completion Test');
  const task = new Task('Incomplete task', new Date());

  list.addTask(task);

  if (list.checkCompleted() !== false) {
    throw new Error('List should not be complete');
  }
});

test('checkCompleted returns true if all tasks complete', () => {
  const list = new TaskList('All Done');
  const task1 = new Task('Task 1', new Date());
  const task2 = new Task('Task 2', new Date());

  task1.markComplete();
  task2.markComplete();

  list.addTask(task1);
  list.addTask(task2);

  if (list.checkCompleted() !== true) {
    throw new Error('List should be complete');
  }
});

test('checkCompleted returns false for empty list', () => {
  const list = new TaskList('Empty List');

  if (list.checkCompleted() !== false) {
    throw new Error('Empty list should not be complete');
  }
});

console.log('\n===== ALL TESTS DONE =====');


