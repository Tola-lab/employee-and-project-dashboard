import { getDataFromMonth, deleteDataFromMonth } from './storage.js';
import { SELECT_MONTH, SELECT_YEAR } from "./state.js";

export const deleteEmployee = () => {
  const container = document.querySelector('.filters__tbody--employees');
  container.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('button__delete')) {
      const id = evt.target.dataset.id;
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

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.surname}</td>
      <td>${age}</td>
      <td>${employee.position}</td>
      <td>$${employee.salary}</td>
      <td>$0.00</td>
      <td>-</td>
      <td>$0.00</td>
      <td>
        <div class="filters__buttons">
          <button class="button__availability filters__button button">Availability</button>
          <button class="button__assign filters__button button">Assign</button>
          <button class="button__delete filters__button button" data-id="${employee.id}">Delete</button>
        </div>
      </td>
    `;

    container.appendChild(row);
  });
}
