const navLinkProjects = document.getElementById('navigation-projects');
const navLinkEmployees = document.getElementById('navigation-employees');
const projectsContainer = document.querySelector('.projects');
const employeesContainer = document.querySelector('.employees');

export const initContent = () => {
  function showSection(activeLink, activeContainer, activeClass, inactiveLink, inactiveContainer, inactiveClass) {
    activeLink.classList.add('navigation__link--active');
    inactiveLink.classList.remove('navigation__link--active');
    activeContainer.classList.add(activeClass);
    inactiveContainer.classList.remove(inactiveClass);
  }

  showSection(navLinkProjects, projectsContainer, 'projects--open', navLinkEmployees, employeesContainer, 'employees--open');

  navLinkProjects.addEventListener('click', () => {
    showSection(navLinkProjects, projectsContainer, 'projects--open', navLinkEmployees, employeesContainer, 'employees--open');
  });

  navLinkEmployees.addEventListener('click', () => {
    showSection(navLinkEmployees, employeesContainer, 'employees--open', navLinkProjects, projectsContainer, 'projects--open');
  });
}
