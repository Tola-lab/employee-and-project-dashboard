import { getDataFromMonth, deleteDataFromMonth, findProject, removeProjectFromEmployees } from './storage.js';
import { effectiveCapacity, revenue, cost, profit, calcUsedEffectiveCapacity, calcProjectIncome } from './calculations.js';
import { renderEmployees } from './render-employees.js';
import { SELECT_MONTH, SELECT_YEAR } from "./state.js";

export const deleteProject = () => {
  const container = document.querySelector('.filters__tbody--projects');
  container.addEventListener('click', (evt) => {

    if (evt.target.classList.contains('button__delete')) {
      const id = evt.target.dataset.id;
      const data = getDataFromMonth(SELECT_YEAR.value, SELECT_MONTH.value);
      const currentProject = findProject(SELECT_YEAR.value, SELECT_MONTH.value, id);

      const isConfirmed = confirm(`Are you sure you want to delete "${currentProject.projectName}"? All employees will be unassigned.`);

      if (!isConfirmed) {
        return;
      }

      removeProjectFromEmployees(SELECT_YEAR.value, SELECT_MONTH.value, id);
      deleteDataFromMonth(SELECT_YEAR.value, SELECT_MONTH.value, 'projects', id);
      renderProjects(SELECT_YEAR.value, SELECT_MONTH.value);
      renderEmployees(SELECT_YEAR.value, SELECT_MONTH.value);
    }
  })
}

export const renderProjects = (year, month) => {
  const data = getDataFromMonth(year, month);
  const projects = data['projects'];

  const container = document.querySelector('.filters__tbody--projects');

  container.innerHTML = '';

  let totalIncome = 0;

  projects.forEach((project) => {

    const projectEmployees = data.employees.filter(employee =>
      employee.projectAssignments.some(assignment => assignment.projectId === project.id)
    );

    const usedEffectiveCapacity = calcUsedEffectiveCapacity(project, projectEmployees);
    const estimatedIncome = calcProjectIncome(project, projectEmployees);

    totalIncome += estimatedIncome;

    const incomeClass = estimatedIncome >= 0 ? 'positive-income' : 'negative-income';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${project.companyName}</td>
      <td>${project.projectName}</td>
      <td>$${project.budget.toFixed(2)}</td>
      <td>${usedEffectiveCapacity.toFixed(1)}/${project.employeeCapacity}</td>
      <td>-</td>
      <td class="${incomeClass}">$${estimatedIncome.toFixed(2)}</td>
      <td><button class="button__delete button" data-id="${project.id}">Delete</button></td>
    `;

    container.appendChild(row);
  });

  const benchPayments = data.employees
    .filter(employee => employee.projectAssignments.length === 0)
    .reduce((sum, employee) => sum + employee.salary * 0.5, 0);

  const totalPrice = document.querySelector('.projects__price');
  const total = totalIncome - benchPayments;
  totalPrice.textContent = `$${total.toFixed(2)}`;
  totalPrice.classList.remove('positive-income', 'negative-income');
  totalPrice.classList.add(total >= 0 ? 'positive-income' : 'negative-income');
}
