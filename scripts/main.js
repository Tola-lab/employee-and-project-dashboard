import { initContent } from './show-content.js';
import { toggleSideBar } from './sidebar.js';
import { initProjectsForm } from './projects-form.js';
import { initEmployeeForm } from './employee-form.js';
import { checkData } from './storage.js';
import { renderProjects } from './render-projects.js';
import { renderEmployees } from './render-employees.js';
import { SELECT_MONTH, SELECT_YEAR } from "./state.js";

document.addEventListener('DOMContentLoaded', () => {
  initContent();
  toggleSideBar();
  initProjectsForm();
  initEmployeeForm();
  checkData();

  const renderAll = () => {
    renderProjects(SELECT_YEAR.value, SELECT_MONTH.value);
    renderEmployees(SELECT_YEAR.value, SELECT_MONTH.value);
  };

  renderAll();

  SELECT_YEAR.addEventListener('change', renderAll);
  SELECT_MONTH.addEventListener('change', renderAll);
})
