import { getDataFromMonth, findProject } from './storage.js';
import { SELECT_MONTH, SELECT_YEAR } from "./state.js";
import { effectiveCapacity, revenue, cost, profit, calcUsedEffectiveCapacity} from './calculations.js';

const body = document.querySelector('.page__body');
const container = document.querySelector('.details__popup');
const closeButton = document.querySelector('.popup__close-btn');
const popupTitle = document.querySelector('.popup__title');
const popupName = document.querySelector('.popup__thead-name');

const openShowEmployeesPopup = () => {
  container.classList.add('popup-open');
  body.classList.add('page__body--overlay');
}

const closeShowEmployeesPopup = () => {
  container.classList.remove('popup-open');
  body.classList.remove('page__body--overlay');
}

export const renderShowEmployeesPopupContent = (project, data) => {
  const projectEmployees = data.employees.filter(employee =>
    employee.projectAssignments.some(assignment => assignment.projectId === project.id)
  );
  const usedEffectiveCapacity = calcUsedEffectiveCapacity(project, projectEmployees);

  const tbody = container.querySelector('tbody');
  tbody.innerHTML = '';

  projectEmployees.forEach((employee) => {
    const assignment = employee.projectAssignments.find(a => a.projectId === project.id);
    const employeeEffective = effectiveCapacity(assignment.capacity, assignment.fit);
    const employeeRevenue = revenue(project.budget, project.employeeCapacity, usedEffectiveCapacity, employeeEffective);
    const employeeCost = cost(employee.salary, assignment.capacity);
    const employeeProfit = profit(employeeRevenue, employeeCost);

    const incomeClass = employeeProfit >= 0 ? 'positive-income' : 'negative-income';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><a href="#" class="popup__link" data-employee-name="${employee.name}" data-employee-surname="${employee.surname}" data-project-name="">${employee.name} ${employee.surname}</a></td>
      <td>${assignment.capacity}</td>
      <td>${assignment.fit}</td>
      <td>0</td>
      <td>${employeeEffective.toFixed(2)}</td>
      <td>$${employeeRevenue.toFixed(2)}</td>
      <td>$${employeeCost.toFixed(2)}</td>
      <td class="${incomeClass}">$${employeeProfit.toFixed(2)}</td>
      <td>
        <button class="popup__edit-button button">Edit</button>
        <button class="popup__unassign-button button" data-employee-id="${employee.id}" data-project-id="${project.id}">Unassign</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  if (projectEmployees.length === 0) {
  tbody.innerHTML = '<tr><td colspan="9">No employees on this project.</td></tr>';
}
}

export const initShowEmployeesPopup = () => {
  const projectsContainer = document.querySelector('.filters__tbody--projects');

  projectsContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('button__show-employees')) {
      const id = evt.target.dataset.id;
      const data = getDataFromMonth(SELECT_YEAR.value, SELECT_MONTH.value);
      const project = findProject(SELECT_YEAR.value, SELECT_MONTH.value, id);

      container.dataset.type = 'employees';
      openShowEmployeesPopup();

      popupName.textContent = 'Employee';
      popupTitle.textContent = 'Employees on ' + project.projectName;
      renderShowEmployeesPopupContent(project, data);
    };
  });

  closeButton.addEventListener('click', closeShowEmployeesPopup);
}
