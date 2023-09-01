const btnAddEl = document.getElementById('btnAdd')
btnAddEl.addEventListener('click', () => {
  addNewTask()
})

const taskListEl = document.getElementById('taskList');

const tasks = [
  {
    id: 'task1',
    name: 'Hello',
    subTasks: [
      {
        id: "task1." + "1",
        name: 'hello',
        _isEditing: false,
      }
    ],
    _isEditing: false,
  }
]

// func to add new task
function addNewTask() {
  tasks.push({
    id: '',
    name: '',
    subTasks: [],
    _isEditing: true,
  })
  renderTasks();
}

//function to delete parent task
function deleteTask(taskIdx){
  tasks.splice(taskIdx,1);
  renderTasks();

}

// func to render tasks
function renderTasks() {
  // empty everything
  taskListEl.innerHTML = ''
  for (let i = 0; i < tasks.length; i++) {
    const taskEl = document.createElement('li');
    taskEl.innerHTML = generateTaskHtml(i)
    taskListEl.appendChild(taskEl)
  }
}

// func to generate task (single task) html
function generateTaskHtml(idx) {
  const task = tasks[idx]
  if (task._isEditing) {
    return `<div>
    <label for="task.${idx}.id">ID</label>
    <input id="task.${idx}.id" value="${task.id}"/>
    </br>
    <label for="task.${idx}.name">Name</label>
    <input id="task.${idx}.name" value="${task.name}"/>
    </br>
    <button onClick="saveTask(${idx})">Save Task</button>
    <ul class="sub-task-list">
      ${task.subTasks.map((_, subTaskIdx) => generateSubTaskHtml(idx, subTaskIdx))}
    </ul>
    </div>`
  } else {
    return `<div>
    <h2>Name: ${task.name}</h2>
    <h3>ID: ${task.id}</h3>
    <ul class="sub-task-list">
      ${task.subTasks.map((_, subTaskIdx) => generateSubTaskHtml(idx, subTaskIdx) )}
    </ul>
    <button onClick="addSubTask(${idx})">Add Sub Task</button>
    <button onClick="editTask(${idx})">Edit</button>
    <button onClick="deleteTask(${idx})">Delete</button>
    </div>`
  }
}

function generateSubTaskHtml(taskIdx, subTaskIdx) {
  const subTask = tasks[taskIdx].subTasks[subTaskIdx]
  if (subTask._isEditing) {
    return `
    <li>
      <div>
        <label for="task.${taskIdx}.subtask.${subTaskIdx}.name">Name</label>
        <input id="task.${taskIdx}.subtask.${subTaskIdx}.name" value="${subTask.name}"/>
      </br>
      <button onClick="saveSubTask(${taskIdx}, ${subTaskIdx})">Save Sub Task</button>
      </div>
    </li>
    `
  } else {
    return `
      <li>
        <div>
          <h4>${subTask.id}</h4>
          <h4>${subTask.name}</h4>
          <button onClick="editSubTask(${taskIdx}, ${subTaskIdx})">Edit Sub Task</button>
          <button onClick="deleteSubTask(${taskIdx}, ${subTaskIdx})">Delete Sub Task</button>
        </div>
      </li>
    `
  }
}

// func to set it editing
function editTask(idx) {
  tasks[idx]._isEditing = true
  renderTasks()
}

// func to save task
function saveTask(idx) {
  tasks[idx].id = document.getElementById(`task.${idx}.id`).value
  tasks[idx].name = document.getElementById(`task.${idx}.name`).value
  tasks[idx]._isEditing = false
  renderTasks()
}

// func to add sub task
function addSubTask(idx) {
  tasks[idx].subTasks.push({
    id: `${tasks[idx].id}.${tasks[idx].subTasks.length + 1}`,
    name: 'hello',
    _isEditing: true,
  })
  renderTasks()
}

//func to delete subtask
function deleteSubTask(taskIdx, subTaskIdx) {
  tasks.splice(tasks[taskIdx].subTasks[subTaskIdx], 1);
  renderTasks()
 
}

// func to set sub task editing
function editSubTask(taskIdx, subTaskIdx) {
  tasks[taskIdx].subTasks[subTaskIdx]._isEditing = true
  renderTasks()
}

// func to save sub tasdk
function saveSubTask(taskIdx, subTaskIdx) {
  tasks[taskIdx].subTasks[subTaskIdx].name = document.getElementById(`task.${taskIdx}.subtask.${subTaskIdx}.name`).value
  tasks[taskIdx].subTasks[subTaskIdx]._isEditing = false
  renderTasks()
}

// intital render
document.addEventListener('DOMContentLoaded', () => {
  renderTasks()
})