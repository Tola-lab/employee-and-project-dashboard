const form = document.querySelector('.dashboard__form--project form');
const container = form.closest('.dashboard__form--project');
const buttonOpen = document.querySelector('.projects__button--add');
const buttonClose = container.querySelector('.form__button--cancel');

export const initProjectsForm = () => {
  if (!buttonOpen) return;

  if (!buttonClose) return;

  buttonOpen.addEventListener('click', () => {
    container.classList.add('dashboard__form--project--open');
  })

  buttonClose.addEventListener('click', () => {
    container.classList.remove('dashboard__form--project--open');
  })
}
