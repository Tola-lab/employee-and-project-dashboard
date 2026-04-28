const form = document.querySelector('.dashboard__form--employee form');
const container = form.closest('.dashboard__form--employee');
const buttonOpen = document.querySelector('.employees__button');
const buttonClose = container.querySelector('.form__button--cancel');

export const initEmployeeForm = () => {
  if (!buttonOpen) return;

  if (!buttonClose) return;

  buttonOpen.addEventListener('click', () => {
    container.classList.add('dashboard__form--employee--open');
  })

  buttonClose.addEventListener('click', () => {
    container.classList.remove('dashboard__form--employee--open');
  })
}
