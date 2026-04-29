import { createEmployee } from "./employee-service.js";
import { renderEmployees } from "./render-employees.js";
import { SELECT_MONTH, SELECT_YEAR } from "./state.js";

const form = document.querySelector('.dashboard__form--employee form');
const container = form.closest('.dashboard__form--employee');
const buttonOpen = document.querySelector('.employees__button');
const buttonClose = container.querySelector('.form__button--cancel');
const submitButton = container.querySelector('.form__button--add');

const showEmployeeForm = () => {
  buttonOpen.addEventListener('click', () => {
    container.classList.add('dashboard__form--employee--open');
  });
}

const closeEmployeeForm = () => {
  buttonClose.addEventListener('click', () => {
    container.classList.remove('dashboard__form--employee--open');
  })
}

export const initEmployeeForm = () => {
  if (!buttonOpen) return;
  if (!buttonClose) return;

  form.addEventListener('input', () => {
    submitButton.disabled = !form.checkValidity();
  });

  form.addEventListener('submit', (evt) => {
      if (!form.checkValidity()) {
        evt.preventDefault();
        form.reportValidity();
      }
      evt.preventDefault();

      createEmployee();

      renderEmployees(SELECT_YEAR.value, SELECT_MONTH.value);
      container.classList.remove('dashboard__form--employee--open');
      form.reset();
    });

  showEmployeeForm();
  closeEmployeeForm();
}
