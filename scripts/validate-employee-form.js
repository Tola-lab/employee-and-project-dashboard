import { NOW } from "./state.js";

const form = document.querySelector('.dashboard__form--employee form');
const submitButton = form.querySelector('.form__button--add');

const validateAge = () => {
  const dateOfBirthInput = document.getElementById('date-of-birth');
  const today = NOW;
  const birthDate = new Date(dateOfBirthInput.value);
  const age = today.getFullYear() - birthDate.getFullYear();

  if (age < 18) {
    dateOfBirthInput.setCustomValidity(dateOfBirthInput.title);
  } else {
    dateOfBirthInput.setCustomValidity('')
  }

  document.getElementById('date-of-birth-error').textContent = age < 18 ? dateOfBirthInput.title : '';
}

const validateName = () => {
  const nameInput = document.getElementById('name');
  const lettersOnly = /^[a-zA-Zа-яА-ЯёЁ]+$/;

  if (!lettersOnly.test(nameInput.value) || nameInput.value.length < 3) {
    nameInput.setCustomValidity(nameInput.title);
    document.getElementById('name-error').textContent = nameInput.title;
  } else {
    nameInput.setCustomValidity('');
    document.getElementById('name-error').textContent = '';
  }
}

const validateSurname = () => {
  const surnameInput = document.getElementById('surname');
  const lettersOnly = /^[a-zA-Zа-яА-ЯёЁ]+$/;

  if (!lettersOnly.test(surnameInput.value) || surnameInput.value.length < 3) {
    surnameInput.setCustomValidity(surnameInput.title);
    document.getElementById('surname-error').textContent = surnameInput.title;
  } else {
    surnameInput.setCustomValidity('');
    document.getElementById('surname-error').textContent = '';
  }
}

const validateSalary = () => {
  const salaryInput = document.getElementById('salary');

  if (salaryInput.value <= 0) {
    salaryInput.setCustomValidity(salaryInput.title);
    document.getElementById('salary-error').textContent = salaryInput.title;
  } else {
    salaryInput.setCustomValidity('');
    document.getElementById('salary-error').textContent = '';
  }
}

const validatePosition = () => {
  const positionInput = document.getElementById('position');
  if (!positionInput.value) {
    positionInput.setCustomValidity(positionInput.title);
    document.getElementById('position-error').textContent = positionInput.title;
  } else {
    positionInput.setCustomValidity('');
    document.getElementById('position-error').textContent = '';
  }
}

const validateEmployeeForm = () => {
  form.addEventListener('input', () => {

    validateAge();
    validateName();
    validateSurname();
    validateSalary();
    validatePosition();
    submitButton.disabled = !form.checkValidity();
  });
}

export {validateEmployeeForm};
