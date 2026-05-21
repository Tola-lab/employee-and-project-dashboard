import { initContent } from './show-content.js';
import { toggleSideBar } from './sidebar.js';
import { initProjectsForm } from './projects-form.js';
import { initEmployeeForm } from './employee-form.js';
import { checkData } from './storage.js';
import { renderProjects, deleteProject } from './render-projects.js';
import { renderEmployees, deleteEmployee } from './render-employees.js';
import { initPositionEdit, initSalaryEdit } from './inline-edit.js';
import { SELECT_MONTH, SELECT_YEAR, MONTH, YEAR } from "./state.js";
import { assignEmployee } from './assign-popup.js';
import { initShowEmployeesPopup } from './show-employees-popup.js';
import { initShowAssignmentsPopup } from './show-assignments-popup.js';

document.addEventListener('DOMContentLoaded', () => {
  SELECT_MONTH.value = MONTH;
  SELECT_YEAR.value = YEAR;

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
  initPositionEdit();
  initSalaryEdit();
  deleteProject();
  deleteEmployee();
  assignEmployee();
  initShowEmployeesPopup();
  initShowAssignmentsPopup();

  SELECT_YEAR.addEventListener('change', renderAll);
  SELECT_MONTH.addEventListener('change', renderAll);
})
