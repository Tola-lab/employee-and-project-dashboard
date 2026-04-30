import { getDataFromMonth, deleteDataFromMonth } from './storage.js';
import { SELECT_MONTH, SELECT_YEAR } from "./state.js";

export const deleteProject = () => {
  const container = document.querySelector('.filters__tbody--projects');
  container.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('button__delete')) {
      const id = evt.target.dataset.id;
      deleteDataFromMonth(SELECT_YEAR.value, SELECT_MONTH.value, 'projects', id);
      renderProjects(SELECT_YEAR.value, SELECT_MONTH.value);
    }
  })
}

export const renderProjects = (year, month) => {
  const data = getDataFromMonth(year, month);
  const projects = data['projects'];

  const container = document.querySelector('.filters__tbody--projects');

  container.innerHTML = '';

  projects.forEach((project) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${project.companyName}</td>
      <td>${project.projectName}</td>
      <td>$${project.budget.toFixed(2)}</td>
      <td>${project.employeeCapacity}</td>
      <td>-</td>
      <td>$0.00</td>
      <td><button class="button__delete button" data-id="${project.id}">Delete</button></td>
    `;

    container.appendChild(row);
  });
}


