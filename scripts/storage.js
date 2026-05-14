import { YEAR, MONTH, SAMPLE_DATE } from "./state.js";

const setData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getData = () => {
  const monthlyData = localStorage.getItem('monthlyData');
  return JSON.parse(monthlyData);
};

const getDataFromMonth = (year, month) => {
  const key = `${year}-${month}`;
  const allData = getData();
  return (allData && allData[key]) || { employees: [], projects: [] };
};

const checkData = () => {
  const allData = getData();
  if (allData) return;
  setData('monthlyData', {[`${YEAR}-${MONTH}`] : SAMPLE_DATE })
}

const saveDataToMonth = (year, month, type, item) => {
  const allData = getData();
  const monthData = getDataFromMonth(year, month);
  monthData[type].push(item);
  allData[`${year}-${month}`] = monthData;
  setData('monthlyData', allData);
}

const deleteDataFromMonth = (year, month, type, id) => {
  const allData = getData();
  const monthData = getDataFromMonth(year, month);
  const currentProjects = monthData[type].filter(item => item.id !== +id);
  monthData[type] = currentProjects;
  allData[`${year}-${month}`] = monthData;
  setData('monthlyData', allData);
};

const findEmployee = (year, month, id) => {
  const data = getDataFromMonth(year, month);
  return data.employees.find(employee => employee.id === Number(id));
}

const findProject = (year, month, id) => {
  const data = getDataFromMonth(year, month);
  return data.projects.find(project => project.id ===  Number(id));
}

const updateEmployee = (year, month, employee) => {
  const allData = getData() || {};
  const monthData = getDataFromMonth(year, month);
  monthData.employees = monthData.employees.map(item =>
    item.id === employee.id ? employee : item
  );
  allData[`${year}-${month}`] = monthData;
  setData('monthlyData', allData);
};

const removeProjectFromEmployees = (year, month, projectId) => {
  const allData = getData() || {};
  const monthData = getDataFromMonth(year, month);

  monthData.employees.map(employee => {
    employee.projectAssignments = employee.projectAssignments.filter(assignment => assignment.projectId !== Number(projectId));
    return employee;
  });

  allData[`${year}-${month}`] = monthData;
  setData('monthlyData', allData);
}

export { setData, getData, getDataFromMonth, checkData, saveDataToMonth, deleteDataFromMonth, findEmployee, findProject, updateEmployee, removeProjectFromEmployees }
