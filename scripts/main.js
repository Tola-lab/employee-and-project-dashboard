import { initContent } from './show-content.js';
import { toggleSideBar } from './sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
  initContent();
  toggleSideBar();
})
