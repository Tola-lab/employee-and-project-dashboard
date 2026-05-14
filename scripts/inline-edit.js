import { updateEmployee, findEmployee } from './storage.js';
import {SELECT_YEAR, SELECT_MONTH} from './state.js';

const container = document.querySelector('.filters__tbody--employees');

const initPositionEdit = () => {
  container.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('position')) {
      const id = evt.target.dataset.id;
      const cellPosition = evt.target;
      const currentPosition = cellPosition.textContent;
      cellPosition.innerHTML = `
        <select>
          <option value="Junior" ${currentPosition === 'Junior' ? 'selected' : ''}>Junior</option>
          <option value="Middle" ${currentPosition === 'Middle' ? 'selected' : ''}>Middle</option>
          <option value="Senior" ${currentPosition === 'Senior' ? 'selected' : ''}>Senior</option>
          <option value="Lead" ${currentPosition === 'Lead' ? 'selected' : ''}>Lead</option>
          <option value="Architect" ${currentPosition === 'Architect' ? 'selected' : ''}>Architect</option>
          <option value="BO" ${currentPosition === 'BO' ? 'selected' : ''}>BO</option>
        </select>
      `;

      const select = cellPosition.querySelector('select');
      select.addEventListener('change', () => {
        const newPosition = select.value;
        const employee = findEmployee(SELECT_YEAR.value, SELECT_MONTH.value, id);
        employee.position = newPosition;
        updateEmployee(SELECT_YEAR.value, SELECT_MONTH.value, employee);
        cellPosition.textContent = newPosition;
      });
    };
  });
}

const initSalaryEdit = () => {
  container.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('salary')) {
      const id = evt.target.dataset.id;
      const cellSalary = evt.target;
      const currentSalary = cellSalary.textContent;
      cellSalary.innerHTML = `<input type="number" value="${parseFloat(currentSalary)}">`;

      const input = cellSalary.querySelector('input');
      input.focus();
      input.addEventListener('blur', saveSalary);
      input.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') saveSalary();
        if (evt.key === 'Escape') cellSalary.textContent = currentSalary;
      });

      function saveSalary() {
        const newSalary = +input.value;
        const employee = findEmployee(SELECT_YEAR.value, SELECT_MONTH.value, id);
        employee.salary = newSalary;
        updateEmployee(SELECT_YEAR.value, SELECT_MONTH.value, employee);
        cellSalary.textContent = `$${newSalary.toFixed(2)}`;
      }
    };
  });
};

export {initPositionEdit, initSalaryEdit};

