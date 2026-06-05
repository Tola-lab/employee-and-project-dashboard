import { getDataFromMonth, findProject, findEmployee, updateEmployee } from './storage.js';
import { SELECT_MONTH, SELECT_YEAR } from "./state.js";
import { effectiveCapacity, revenue, cost, profit, calcUsedEffectiveCapacity, calcProjectIncome} from './calculations.js';
import { renderEmployees } from './render-employees.js';
import { renderProjects } from './render-projects.js';
import { renderShowAssignmentsPopupContent } from './show-assignments-popup.js';
import { renderShowEmployeesPopupContent } from './show-employees-popup.js';

const overlay = document.querySelector('.details__overlay');
const container = document.querySelector('.unassignment');
const cancelButton = document.querySelector('.content__button--cancel');
const unassignButton = document.querySelector('.content__button--unassign');

let currentEmployeeId;
let currentProjectId;

const openUnassignPopup = () => {
  container.classList.add('unassignment-open');
  overlay.classList.add('details__overlay--open');
}

const closeUnassignPopup = () => {
  container.classList.remove('unassignment-open');
  overlay.classList.remove('details__overlay--open');
}

const renderUnassignPopup = (employee, project, data, projectId) => {
  const assignment = employee.projectAssignments.find(a => a.projectId === +(projectId));
  const projectEmployees = data.employees.filter(e =>
      e.projectAssignments.some(a => a.projectId === project.id)
    );
  const projectEmployeesWithout = projectEmployees.filter(e => e.id !== employee.id);

  const assignmentCapacity = assignment.capacity;
  const usedEffectiveCapacity = calcUsedEffectiveCapacity(project, projectEmployees);
  const employeeSalaryShare = cost(employee.salary, assignment.capacity);
  const projectEffective = effectiveCapacity(assignment.capacity, assignment.fit);
  const budgetShare = revenue(project.budget, project.employeeCapacity, usedEffectiveCapacity, projectEffective);
  const employeeEstimatedIncome = profit(budgetShare, employeeSalaryShare);
  const currentProjectCapacity = usedEffectiveCapacity / project.employeeCapacity;
  const capacityAfterUnassignment = (usedEffectiveCapacity - effectiveCapacity(assignment.capacity, assignment.fit)) / project.employeeCapacity;
  const projectIncomeNow = calcProjectIncome(project, projectEmployees);
  const projectIncomeAfter = calcProjectIncome(project, projectEmployeesWithout);

  const message = container.querySelector('.unassign__message');
  message.innerHTML = `You want to unassign <b>${employee.name} ${employee.surname}</b> (${assignmentCapacity} capacity) from <b>${project.projectName}</b>?`;

  const employeeIncomeClass = employeeEstimatedIncome >= 0 ? 'positive-income' : 'negative-income';
  const projectIncomeNowClass = projectIncomeNow >= 0 ? 'positive-income' : 'negative-income';
  const projectIncomeAfterClass = projectIncomeAfter >= 0 ? 'positive-income' : 'negative-income';

  const values = container.querySelectorAll('.content__value');
  values[0].textContent = assignmentCapacity;
  values[1].textContent = `$${employeeSalaryShare.toFixed(2)}`;
  values[2].textContent = `$${budgetShare.toFixed(2)}`;
  values[3].textContent = `$${employeeEstimatedIncome.toFixed(2)}`;
  values[3].classList.remove('positive-income', 'negative-income');
  values[3].classList.add(employeeIncomeClass);
  values[4].textContent = `${currentProjectCapacity.toFixed(1)} / ${project.employeeCapacity}`;
  values[5].textContent = `${capacityAfterUnassignment.toFixed(1)} / ${project.employeeCapacity}`;
  values[6].textContent = `$${projectIncomeNow.toFixed(2)}`;
  values[6].classList.remove('positive-income', 'negative-income');
  values[6].classList.add(projectIncomeNowClass);
  values[7].textContent = `$${projectIncomeAfter.toFixed(2)}`;
  values[7].classList.remove('positive-income', 'negative-income');
  values[7].classList.add(projectIncomeAfterClass);
}

const unassignEmployyee = () => {
  unassignButton.addEventListener('click', () => {
    const data = getDataFromMonth(SELECT_YEAR.value, SELECT_MONTH.value);
    const employee = findEmployee(SELECT_YEAR.value, SELECT_MONTH.value, currentEmployeeId);
    const project = findProject(SELECT_YEAR.value, SELECT_MONTH.value, currentProjectId);

    employee.projectAssignments = employee.projectAssignments.filter(
      a => a.projectId !== Number(currentProjectId)
    );

    updateEmployee(SELECT_YEAR.value, SELECT_MONTH.value, employee);
    closeUnassignPopup();
    renderEmployees(SELECT_YEAR.value, SELECT_MONTH.value);
    renderProjects(SELECT_YEAR.value, SELECT_MONTH.value);
    const freshData = getDataFromMonth(SELECT_YEAR.value, SELECT_MONTH.value);


    const detailsPopup = document.querySelector('.details__popup');
      if (detailsPopup.dataset.type === 'assignments') {
        renderShowAssignmentsPopupContent(employee, freshData);
      } else {
        renderShowEmployeesPopupContent(project, freshData);
      }
        })
}

export const initUnssignPopup = () => {
  const parentContainer = document.querySelector('.details__popup');

  parentContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__unassign-button')) {
      const employeeId = evt.target.dataset.employeeId;
      const projectId = evt.target.dataset.projectId;
      const data = getDataFromMonth(SELECT_YEAR.value, SELECT_MONTH.value);
      const project = findProject(SELECT_YEAR.value, SELECT_MONTH.value, projectId);
      const employee = findEmployee(SELECT_YEAR.value, SELECT_MONTH.value, employeeId);

      currentEmployeeId = employeeId;
      currentProjectId = projectId;

      openUnassignPopup();
      renderUnassignPopup(employee, project, data, projectId);
    }
  });

  cancelButton.addEventListener('click', closeUnassignPopup);
  unassignEmployyee();
}
