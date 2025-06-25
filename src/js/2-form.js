const STORAGE_KEY = 'feedback-form-state';

let formData = { email: "", message: "" };

const form = document.querySelector('.feedback-form');

// Загрузка данных при инициализации
function loadFromStorage() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      formData = JSON.parse(savedData);
      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      formData = { email: "", message: "" };
    }
  }
}

// Сохранение в localStorage
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Обработка ввода данных
function onFormInput(event) {
  const fieldName = event.target.name;
  const fieldValue = event.target.value;
  
  formData[fieldName] = fieldValue;
  saveToStorage();
}

// Отправка формы
function onFormSubmit(event) {
  event.preventDefault();
  
  // Проверка заполненности всех полей
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  
  console.log(formData);
  
  // Очистка
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  form.reset();
}

// Добавление слушателей
form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

// Инициализация
loadFromStorage();
