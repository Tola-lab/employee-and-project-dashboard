const sidebar = document.querySelector('.sidebar');
const sidebarButtonClose = document.querySelector('.sidebar__button');
const sidebarButtonOpen = document.querySelector('.sidebar__button-open');

export const toggleSideBar = () => {
  sidebarButtonClose.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar--hidden');
  });

  sidebarButtonOpen.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar--hidden');
  });
};
