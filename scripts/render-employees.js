import { getDataFromMonth, deleteDataFromMonth, findEmployee } from './storage.js';
import {effectiveCapacity, revenue, cost, profit } from './calculations.js';
import { SELECT_MONTH, SELECT_YEAR } from "./state.js";

export const deleteEmployee = () => {
  const container = document.querySelector('.filters__tbody--employees');
  container.addEventListener('click', (evt) => {

    if (evt.target.classList.contains('button__delete')) {
      const id = evt.target.dataset.id;
      const data = getDataFromMonth(SELECT_YEAR.value, SELECT_MONTH.value);
      const currentEmployee = findEmployee(SELECT_YEAR.value, SELECT_MONTH.value, id);

      const isConfirmed = confirm(`Are you sure you want to delete ${currentEmployee.name} ${currentEmployee.surname}?`);

      if (!isConfirmed) {
        return;
      }

      deleteDataFromMonth(SELECT_YEAR.value, SELECT_MONTH.value, 'employees', id);
      renderEmployees(SELECT_YEAR.value, SELECT_MONTH.value);
    }
  })
}

export const renderEmployees = (year, month) => {
  const data = getDataFromMonth(year, month);
  const employees = data['employees'];

  const container = document.querySelector('.filters__tbody--employees');

  container.innerHTML = '';

  employees.forEach((employee) => {

    const birthYear = new Date(employee.dateOfBirth).getFullYear();
    const age = year - birthYear;
    const assignmentCount = employee.projectAssignments.length;
    const totalCapacity = employee.projectAssignments.reduce((sum, a) => sum + a.capacity, 0);

    const estimatedPayment = assignmentCount > 0
      ? employee.projectAssignments.reduce((sum, a) => sum + employee.salary * Math.max(0.5, a.capacity), 0)
      : employee.salary * 0.5;

    const projectedIncome = employee.projectAssignments.reduce((sum, assignment) => {
      const project = data.projects.find(p => p.id === assignment.projectId);
      if (!project) return sum;

      const allProjectEmployees = data.employees.filter(e =>
        e.projectAssignments.some(a => a.projectId === project.id)
      );

      const usedEffectiveCapacity = allProjectEmployees.reduce((s, e) => {
        const a = e.projectAssignments.find(a => a.projectId === project.id);
        return s + effectiveCapacity(a.capacity, a.fit);
      }, 0);

      const empEffectiveCapacity = effectiveCapacity(assignment.capacity, assignment.fit);
      const empRevenue = revenue(project.budget, project.employeeCapacity, usedEffectiveCapacity, empEffectiveCapacity);
      const empCost = cost(employee.salary, assignment.capacity);

      return sum + profit(empRevenue, empCost);
    }, 0);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.surname}</td>
      <td>${age}</td>
      <td>${employee.position}</td>
      <td>$${employee.salary.toFixed(2)}</td>
      <td>$${estimatedPayment.toFixed(2)}</td>
      <td><button class="button__show-assignments button">${assignmentCount > 0 ? `Show Assignments (${assignmentCount}) ${totalCapacity.toFixed(1)}/1.5` : 'No Assignments'}</button></td>
      <td>$${projectedIncome.toFixed(2)}</td>
      <td>
        <div class="filters__buttons">
          <button class="button__availability filters__button button">Availability</button>
          <button class="button__assign filters__button button" data-id="${employee.id}">Assign</button>
          <button class="button__delete filters__button button" data-id="${employee.id}">Delete</button>
        </div>
      </td>
    `;

    container.appendChild(row);
  });
}
