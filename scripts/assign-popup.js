import { getDataFromMonth, findEmployee, findProject, updateEmployee } from './storage.js';
import { SELECT_MONTH, SELECT_YEAR } from "./state.js";
import { renderEmployees } from './render-employees.js';
import { renderProjects } from './render-projects.js';

const assignPopup = document.querySelector('.assign');
const projectSelect = assignPopup.querySelector('.assign__select');

projectSelect.addEventListener('change', () => {
  const assignContent = assignPopup.querySelector('.assign__content');
  projectSelect.value ? assignContent.style.display = 'block' : assignContent.style.display = 'none';
});


const fillProjectSelect = (employee, projects) => {
  const projectSelect = assignPopup.querySelector('.assign__select');
  projectSelect.innerHTML = '<option value="">Select a project</option>';

  const assignedEmployee = employee.projectAssignments.map(assigned => assigned.projectId);
  const availableProjects = projects.filter(project => !assignedEmployee.includes(project.id));

  availableProjects.forEach(project => {
    const option = document.createElement('option');
    option.value = project.id;
    option.textContent = project.projectName;
    projectSelect.appendChild(option);
  });
}

const openAssignPopup = (employee, data) => {
  const assignTitle = assignPopup.querySelector('.assign__title');
  const currentCapacity = assignPopup.querySelector('.assign-current-capacity');
  const availableCapacity = assignPopup.querySelector('.available-capacity');

  const currentCapacityValue = employee.projectAssignments.reduce((sum, a) => sum + a.capacity, 0);
  const availableCapacityValue = 1.5 - currentCapacityValue;

  assignTitle.textContent = `Assign ${employee.name} ${employee.surname}`;
  currentCapacity.textContent = currentCapacityValue.toFixed(1);
  availableCapacity.textContent = availableCapacityValue.toFixed(1);

  fillProjectSelect(employee, data.projects);
  assignPopup.classList.add('assign--open');

  assignPopup.querySelector('.assign__button--apply').addEventListener('click', () => {
    const projectId = Number(projectSelect.value);
    const capacity = +document.getElementById('capacity-allocation').value;
    const fit = +document.getElementById('project-fit').value;

    employee.projectAssignments.push({ projectId, capacity, fit });

    updateEmployee(SELECT_YEAR.value, SELECT_MONTH.value, employee);
    closeAssignPopup();
    renderEmployees(SELECT_YEAR.value, SELECT_MONTH.value);
    renderProjects(SELECT_YEAR.value, SELECT_MONTH.value);
});
}

const closeAssignPopup = () => {
  assignPopup.classList.remove('assign--open');
  assignPopup.querySelector('.assign__content').style.display = 'none';
  projectSelect.value = '';
}

const getEffectiveCapacity = () => {
  const capacity = +document.getElementById('capacity-allocation').value;
  const fit = +document.getElementById('project-fit').value;
  return capacity * fit;
}

const getAfterAssignmentValue = (effectiveCapacity) => {
  const currentProjectId = projectSelect.value;
  const currentProject = findProject(SELECT_YEAR.value, SELECT_MONTH.value, currentProjectId);

  if (currentProject) {
    const usedCapacity = 0;
    const afterAssignment = (usedCapacity + effectiveCapacity).toFixed(2);
    const total = currentProject.employeeCapacity;
    document.querySelector('.info__value--target').textContent = `${afterAssignment} / ${total}`;
  }
}

const updateInfo = () => {
  const effectiveCapacity = getEffectiveCapacity();
  document.querySelector('.info__value--effective').textContent = effectiveCapacity.toFixed(2);
  getAfterAssignmentValue(effectiveCapacity);
}

const capacityAllocationSlider = () => {
  const capacityAllocationInput = document.getElementById('capacity-allocation');

  capacityAllocationInput.addEventListener('input', () => {
    document.getElementById('capacity-value').textContent = capacityAllocationInput.value;
    updateInfo();
  })
};

const projectFitSlider = () => {
  const projectFitInput = document.getElementById('project-fit');

  projectFitInput.addEventListener('input', () => {
    document.getElementById('fit-value').textContent = projectFitInput.value;
    updateInfo();
  })
};

export const assignEmployee = () => {
  const container = document.querySelector('.filters__tbody--employees');

  container.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('button__assign')) {
      const id = evt.target.dataset.id;
      const data = getDataFromMonth(SELECT_YEAR.value, SELECT_MONTH.value);
      const employee = findEmployee(SELECT_YEAR.value, SELECT_MONTH.value, id);
      openAssignPopup(employee, data);
    }
  });

  capacityAllocationSlider();
  projectFitSlider();
  assignPopup.querySelector('.assign__button--cancel').addEventListener('click', closeAssignPopup);
}
