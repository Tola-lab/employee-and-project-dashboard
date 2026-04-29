import { initContent } from './show-content.js';
import { toggleSideBar } from './sidebar.js';
import { initProjectsForm } from './projects-form.js';
import { initEmployeeForm } from './employee-form.js';
import { checkData } from './storage.js';
import { renderProjects } from './render-projects.js';
import { renderEmployees } from './render-employees.js';

document.addEventListener('DOMContentLoaded', () => {
  const selectYear = document.getElementById('select-year');
  const selectMonth = document.getElementById('select-month');

  initContent();
  toggleSideBar();
  initProjectsForm();
  initEmployeeForm();
  checkData();

  const renderAll = () => {
    renderProjects(selectYear.value, selectMonth.value);
    renderEmployees(selectYear.value, selectMonth.value);
  };

  renderAll();

  selectYear.addEventListener('change', renderAll);
  selectMonth.addEventListener('change', renderAll);
})
