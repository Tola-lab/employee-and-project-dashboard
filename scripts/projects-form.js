import { createProject } from "./projects-service.js";
import { renderProjects } from "./render-projects.js";
import { SELECT_MONTH, SELECT_YEAR } from "./state.js";

const form = document.querySelector('.dashboard__form--project form');
const container = form.closest('.dashboard__form--project');
const buttonOpen = document.querySelector('.projects__button--add');
const buttonClose = container.querySelector('.form__button--cancel');
const submitButton = container.querySelector('.form__button--add');

const showProjectsForm = () => {
  buttonOpen.addEventListener('click', () => {
    container.classList.add('dashboard__form--project--open');
  });
}

const closeProjectsForm = () => {
  buttonClose.addEventListener('click', () => {
    container.classList.remove('dashboard__form--project--open');
  })
}

export const initProjectsForm = () => {

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

    createProject();

    renderProjects(SELECT_YEAR.value, SELECT_MONTH.value);
    container.classList.remove('dashboard__form--project--open');
    form.reset();
  });

  showProjectsForm();
  closeProjectsForm();
}
