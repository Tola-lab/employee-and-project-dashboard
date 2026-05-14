const form = document.querySelector('.dashboard__form--project form');
const submitButton = form.querySelector('.form__button--add');

const validateProjectName = () => {
  const projectNameInput = document.getElementById('project-name');
  const lettersOnly = /^[a-zA-Zа-яА-ЯёЁ0-9]+$/;

  if (!lettersOnly.test(projectNameInput.value) || projectNameInput.value.length < 3) {
    projectNameInput.setCustomValidity(projectNameInput.title);
    document.getElementById('project-name-error').textContent = projectNameInput.title;
  } else {
    projectNameInput.setCustomValidity('');
    document.getElementById('project-name-error').textContent = '';
  }
}

const validateCompanyName = () => {
  const companyNameInput = document.getElementById('company-name');
  const lettersOnly = /^[a-zA-Zа-яА-ЯёЁ0-9]+$/;

  if (!lettersOnly.test(companyNameInput.value) || companyNameInput.value.length < 2) {
    companyNameInput.setCustomValidity(companyNameInput.title);
    document.getElementById('company-name-error').textContent = companyNameInput.title;
  } else {
    companyNameInput.setCustomValidity('');
    document.getElementById('company-name-error').textContent = '';
  }
}

const validateBudget = () => {
  const budgetInput = document.getElementById('budget');

  if (budgetInput.value <= 0) {
    budgetInput.setCustomValidity(budgetInput.title);
    document.getElementById('budget-error').textContent = budgetInput.title;
  } else {
    budgetInput.setCustomValidity('');
    document.getElementById('budget-error').textContent = '';
  }
}

const validateCapacity = () => {
  const capacityInput = document.getElementById('employee-capacity');

  if (capacityInput.value < 1) {
    capacityInput.setCustomValidity(capacityInput.title);
    document.getElementById('capacity-error').textContent = capacityInput.title;
  } else {
    capacityInput.setCustomValidity('');
    document.getElementById('capacity-error').textContent = '';
  }
}

const validateProjectsForm = () => {
  form.addEventListener('input', () => {

    validateProjectName();
    validateCompanyName();
    validateBudget();
    validateCapacity();

    submitButton.disabled = !form.checkValidity();
  });
}

export {validateProjectsForm};
