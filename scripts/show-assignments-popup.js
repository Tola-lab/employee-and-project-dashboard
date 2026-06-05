import { getDataFromMonth, findEmployee } from './storage.js';
import { SELECT_MONTH, SELECT_YEAR } from "./state.js";
import { effectiveCapacity, revenue, cost, profit, calcUsedEffectiveCapacity} from './calculations.js';

const body = document.querySelector('.page__body');
const container = document.querySelector('.details__popup');
const closeButton = document.querySelector('.popup__close-btn');
const popupTitle = document.querySelector('.popup__title');
const popupName = document.querySelector('.popup__thead-name');

const openShowAssignmentsPopup = () => {
  container.classList.add('popup-open');
  body.classList.add('page__body--overlay');
}

const closeShowAssignmentsPopup = () => {
  container.classList.remove('popup-open');
  body.classList.remove('page__body--overlay');
}

export const renderShowAssignmentsPopupContent = (employee, data) => {

  const tbody = container.querySelector('tbody');
  tbody.innerHTML = '';

  employee.projectAssignments.forEach((assignment) => {
    const project = data.projects.find(p => p.id === assignment.projectId);
    const projectEmployees = data.employees.filter(e =>
      e.projectAssignments.some(a => a.projectId === project.id)
    );

    const usedEffectiveCapacity = calcUsedEffectiveCapacity(project, projectEmployees);
    const projectEffective = effectiveCapacity(assignment.capacity, assignment.fit);
    const projectRevenue = revenue(project.budget, project.employeeCapacity, usedEffectiveCapacity, projectEffective);
    const projectCost = cost(employee.salary, assignment.capacity);
    const projectProfit = profit(projectRevenue, projectCost);

    const incomeClass = projectProfit >= 0 ? 'positive-income' : 'negative-income';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${project.projectName}</td>
      <td>${assignment.capacity}</td>
      <td>${assignment.fit}</td>
      <td>0</td>
      <td>${projectEffective.toFixed(2)}</td>
      <td>$${projectRevenue.toFixed(2)}</td>
      <td>$${projectCost.toFixed(2)}</td>
      <td class="${incomeClass}">$${projectProfit.toFixed(2)}</td>
      <td>
        <button class="popup__edit-button button">Edit</button>
        <button class="popup__unassign-button button" data-employee-id="${employee.id}" data-project-id="${project.id}">Unassign</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  if (employee.projectAssignments.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9">No assignments for this employee.</td></tr>';
  };
}

export const initShowAssignmentsPopup = () => {
  const projectsContainer = document.querySelector('.filters__tbody--employees');

  projectsContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('button__show-assignments')) {
      const id = evt.target.dataset.id;
      const data = getDataFromMonth(SELECT_YEAR.value, SELECT_MONTH.value);
      const employee = findEmployee(SELECT_YEAR.value, SELECT_MONTH.value, id);

      container.dataset.type = 'assignments';
      openShowAssignmentsPopup();

      popupName.textContent = 'Project';
      popupTitle.textContent = `Assignments for ${employee.name} ${employee.surname}`;
      renderShowAssignmentsPopupContent(employee, data);
    };
  });

  closeButton.addEventListener('click', closeShowAssignmentsPopup);
}
