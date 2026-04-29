import { getDataFromMonth } from './storage.js';

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
      <td><button class="button__delete button">Delete</button></td>
    `;

    container.appendChild(row);
  });
}


