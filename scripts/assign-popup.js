import { getDataFromMonth, findEmployee, findProject, updateEmployee } from './storage.js';
import { SELECT_MONTH, SELECT_YEAR } from "./state.js";
import { renderEmployees } from './render-employees.js';
import { renderProjects } from './render-projects.js';

const assignPopup = document.querySelector('.assign');
const projectSelect = assignPopup.querySelector('.assign__select');
const capacitySlider = document.getElementById('capacity-allocation');
const fitSlider = document.getElementById('project-fit');
const capacityValue = document.getElementById('capacity-value');
const fitValue = document.getElementById('fit-value');

let currentEmployee;
let currentData;

projectSelect.addEventListener('change', () => {
  const assignContent = assignPopup.querySelector('.assign__content');
  projectSelect.value ? assignContent.style.display = 'block' : assignContent.style.display = 'none';
});

const fillProjectSelect = (employee, projects) => {
  projectSelect.innerHTML = '<option value="">Select a project</option>';
  const assignedIds = employee.projectAssignments.map(a => a.projectId);
  const availableProjects = projects.filter(p => !assignedIds.includes(p.id));
  availableProjects.forEach(project => {
    const option = document.createElement('option');
    option.value = project.id;
    option.textContent = project.projectName;
    projectSelect.appendChild(option);
  });
}

const openAssignPopup = (employee, data) => {
  currentEmployee = employee;
  currentData = data;

  const assignTitle = assignPopup.querySelector('.assign__title');
  const currentCapacityEl = assignPopup.querySelector('.assign-current-capacity');
  const availableCapacityEl = assignPopup.querySelector('.available-capacity');

  const currentCapacityValue = employee.projectAssignments.reduce((sum, a) => sum + a.capacity, 0);
  const availableCapacityValue = 1.5 - currentCapacityValue;
  capacitySlider.max = availableCapacityValue;
  capacitySlider.value = Math.min(capacitySlider.value, availableCapacityValue);
  capacityValue.textContent = capacitySlider.value;

  assignTitle.textContent = `Assign ${employee.name} ${employee.surname}`;
  currentCapacityEl.textContent = currentCapacityValue.toFixed(1);
  availableCapacityEl.textContent = availableCapacityValue.toFixed(1);

  fillProjectSelect(employee, data.projects);
  assignPopup.classList.add('assign--open');
}

const closeAssignPopup = () => {
  assignPopup.classList.remove('assign--open');
  assignPopup.querySelector('.assign__content').style.display = 'none';
  projectSelect.value = '';
  currentEmployee = null;
  currentData = null;
}

const getEffectiveCapacity = () => {
  const capacity = +capacitySlider.value;
  const fit = +fitSlider.value;
  return capacity * fit;
}

const getAfterAssignmentValue = (effectiveCapacity) => {
  const currentProjectId = projectSelect.value;
  const currentProject = findProject(SELECT_YEAR.value, SELECT_MONTH.value, currentProjectId);
  if (currentProject) {
    const afterAssignment = effectiveCapacity.toFixed(2);
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
  capacitySlider.addEventListener('input', () => {
    capacityValue.textContent = capacitySlider.value;
    updateInfo();
  });
};

const projectFitSlider = () => {
  fitSlider.addEventListener('input', () => {
    fitValue.textContent = fitSlider.value;
    updateInfo();
  });
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

  assignPopup.querySelector('.assign__button--apply').addEventListener('click', () => {
    if (!currentEmployee) return;
    const projectId = Number(projectSelect.value);
    const capacity = +capacitySlider.value;
    const fit = +fitSlider.value;

    currentEmployee.projectAssignments.push({ projectId, capacity, fit });
    updateEmployee(SELECT_YEAR.value, SELECT_MONTH.value, currentEmployee);
    closeAssignPopup();
    renderEmployees(SELECT_YEAR.value, SELECT_MONTH.value);
    renderProjects(SELECT_YEAR.value, SELECT_MONTH.value);
  });

  capacityAllocationSlider();
  projectFitSlider();
  assignPopup.querySelector('.assign__button--cancel').addEventListener('click', closeAssignPopup);
}
