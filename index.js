let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

formElement.addEventListener("submit", function(evt) {
  evt.preventDefault();
  const newTask = createItem(inputElement.value);
  listElement.prepend(newTask);
  saveTasks(getTasksFromDOM());
  formElement.reset();
});

function loadTasks() {
	const savedTasks = JSON.parse(localStorage.getItem('allTasks'));
	
	if (savedTasks.length !== 0) {
		return savedTasks;
	}

	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);

  const textElement = clone.querySelector(".to-do__item-text");
	textElement.textContent = item;

  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	deleteButton.addEventListener('click', function () {
		clone.remove();
		saveTasks(getTasksFromDOM());
	});

  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	duplicateButton.addEventListener('click', function () {
		let nameOfItem = textElement.textContent;
		let newItem = createItem(nameOfItem);
		listElement.prepend(newItem);
		saveTasks(getTasksFromDOM()); 
	});

  const editButton = clone.querySelector(".to-do__item-button_type_edit");
	editButton.addEventListener('click', function () {
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus();
	});
	textElement.addEventListener('blur', function () {
		textElement.setAttribute('contenteditable', 'false');
		saveTasks(getTasksFromDOM());
	});

	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
  const tasks = [];

  itemsNamesElements.forEach(function (element) {
		tasks.push(element.textContent);
	});

  return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('allTasks', JSON.stringify(tasks));
}

items = loadTasks();
items.forEach(function (item) {
	listElement.append(createItem(item));
});
