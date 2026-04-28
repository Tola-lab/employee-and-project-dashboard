import { initContent } from './show-content.js';
import { toggleSideBar } from './sidebar.js';
import { initProjectsForm } from './projects-form.js';
import { initEmployeeForm } from './employee-form.js';
import { checkData } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  initContent();
  toggleSideBar();
  initProjectsForm();
  initEmployeeForm();
  checkData();
})
