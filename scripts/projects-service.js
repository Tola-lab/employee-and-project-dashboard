import { saveDataToMonth } from "./storage.js";
import { SELECT_MONTH, SELECT_YEAR } from "./state.js";

export const createProject = () => {
  const projectName = document.getElementById('project-name').value;
  const companyName = document.getElementById('company-name').value;
  const budget = +document.getElementById('budget').value;
  const employeeCapacity = +document.getElementById('employee-capacity').value;

  const projectData = {
    id: Date.now(),
    projectName: projectName,
    companyName: companyName,
    budget: budget,
    employeeCapacity: employeeCapacity,
  };

  saveDataToMonth(SELECT_YEAR.value, SELECT_MONTH.value, 'projects', projectData);
}
