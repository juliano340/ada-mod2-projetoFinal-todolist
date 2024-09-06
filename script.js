let tasks = [];
let nextTaskId = 1;  // Variável global para rastrear o próximo ID único



function addTask() {
    const taskInput = document.getElementById('new-task-input');

    if (taskInput.value === '') {
        alert('Por favor, insira uma tarefa');
        return;
    }

    const taskText = taskInput.value;

    // Criar a nova tarefa com um ID único, usando o nextTaskId
    let newTask = {
        id: nextTaskId,  // Usar o próximo ID disponível
        text: taskText,
        finalized: false
    }

    // Adicionar a nova tarefa ao array de tarefas
    tasks.push(newTask);

    // Incrementar o nextTaskId para garantir IDs únicos
    nextTaskId++;

    // Limpar o input de tarefa
    taskInput.value = '';
    console.log(newTask);

    // Renderizar a UI novamente
    renderUi();
}

// function renderUi() {    
//     const tasksContainer = document.getElementById('tasks-ul');
//     tasksContainer.innerHTML = '';  

//     tasks.forEach(task => {
//         const li = document.createElement('li');

//         li.innerHTML = `id: ${task.id} - Descrição: ${task.text} - <input type="checkbox" ${task.finalized ? 'checked' : ''}> <button onclick="deleteTask(${task.id})">Excluir</button>`;
//         li.id = `${task.id}`;
//         tasksContainer.appendChild(li);
//     });
// }

function renderUi() {    
    const tasksContainer = document.getElementById('tasks-ul');
    tasksContainer.innerHTML = '';  

    tasks.forEach(task => {
        const li = document.createElement('li');

        // Adicionar a classe 'completed' se a tarefa estiver finalizada
        li.classList.toggle('completed', task.finalized);

        // Definir o conteúdo do <li> com ID, Descrição, Checkbox e Botão Excluir
        li.innerHTML = `
            ${task.id} - ${task.text}
            <input type="checkbox" ${task.finalized ? 'checked' : ''} onchange="toggleTask(${task.id})"> 
            <button onclick="deleteTask(${task.id})">Excluir</button>
            <button onclick="editTask(${task.id})">Editar</button>
        `;
        
        // Atribuir um ID ao <li> para identificação
        li.id = `${task.id}`;

        // Adicionar o item à lista
        tasksContainer.appendChild(li);
    });
}

function editTask(id) {
    const taskToEdit = tasks.find(task => task.id === id);

    if (taskToEdit) {
        // Coloca o texto da tarefa no campo de input para edição
        const taskInput = document.getElementById('new-task-input');
        taskInput.value = taskToEdit.text;

        // Substitui o botão "Adicionar" por um botão "Salvar"
        const addButton = document.querySelector('#new-task button');
        addButton.innerText = 'Salvar';
        addButton.onclick = function() {
            saveTask(id);
        };
    }
}

function saveTask(id) {
    const taskInput = document.getElementById('new-task-input');

    if (taskInput.value === '') {
        alert('Por favor, insira uma tarefa');
        return;
    }

    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex !== -1) {
        // Atualiza o texto da tarefa
        tasks[taskIndex].text = taskInput.value;

        // Limpa o campo de input
        taskInput.value = '';

        // Volta o botão "Salvar" para "Adicionar"
        const addButton = document.querySelector('#new-task button');
        addButton.innerText = 'Adicionar';
        addButton.onclick = addTask;

        // Renderiza a lista de tarefas novamente
        renderUi();
    }
}


function deleteTask(id) {
    // Filtrar a lista de tarefas removendo a que corresponde ao ID
    tasks = tasks.filter(task => task.id !== id);
    
    // Renderizar a lista novamente
    renderUi();
}


function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, finalized: !task.finalized };
        }
        return task;
    });
    
    // Renderizar a lista novamente
    renderUi();
}

function filterTask() {
    const filterInput = document.getElementById('filter-task-input').value.trim();

    if (filterInput === '') {
        alert('Por favor, insira o ID da tarefa para filtrar.');
        return;
    }

    const filterId = parseInt(filterInput, 10);

    if (isNaN(filterId)) {
        alert('O ID da tarefa deve ser um número.');
        return;
    }

    const filteredTask = tasks.find(task => task.id === filterId);

    const tasksContainer = document.getElementById('tasks-ul');
    tasksContainer.innerHTML = '';  // Limpar a lista

    if (filteredTask) {
        const li = document.createElement('li');
        li.classList.toggle('completed', filteredTask.finalized);
        li.innerHTML = `
            ${filteredTask.id} - ${filteredTask.text}
            <input type="checkbox" ${filteredTask.finalized ? 'checked' : ''} onchange="toggleTask(${filteredTask.id})"> 
            <button onclick="deleteTask(${filteredTask.id})">Excluir</button>
        `;
        tasksContainer.appendChild(li);
    } else {
        tasksContainer.innerHTML = `<li>Tarefa com ID ${filterId} não encontrada.</li>`;
    }
}

function clearFilter() {
    document.getElementById('filter-task-input').value = '';  // Limpar o campo de pesquisa
    renderUi();  // Renderizar todas as tarefas novamente
}
