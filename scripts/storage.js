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

const employeeData = {
  id: 0,
  name: '',
  surname: '',
  dateOfBirth: 0,
  position: '',
  salary: 0,
  projectAssignments: [],
  dayoff: [],
};

const projectData = {
  id: 0,
  projectName: '',
  companyName: '',
  budget: 0,
  employeeCapacity: 0,
};

const sampleData = {
  employees: [
    {
      id: 1,
      name: 'Lisa',
      surname: 'Ustiuzhanina',
      dateOfBirth: '1998-09-17',
      position: 'Junior',
      salary: 1000,
      projectAssignments: [{ projectId: 1, capacity: 0.8, fit: 0.9 }],
      dayoff: [5, 10]
    },
    {
      id: 2,
      name: 'Max',
      surname: 'Bondarenko',
      dateOfBirth: '1995-04-19',
      position: 'Senior',
      salary: 3000,
      projectAssignments: [{ projectId: 2, capacity: 0.9, fit: 0.5 }],
      dayoff: [3, 4, 6]
    }],
  projects: [{
    id: 1,
    projectName: 'Cat',
    companyName: 'Like',
    budget: 1000,
    employeeCapacity: 2,
  },
  {
    id: 2,
    projectName: 'Dog',
    companyName: 'Mike',
    budget: 7000,
    employeeCapacity: 5,
  }]
};

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();

const checkData = () => {
  const allData = getData();
  if (allData) return;
  setData('monthlyData', {[`${year}-${month}`] : sampleData })
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

export { setData, getData, getDataFromMonth, checkData, saveDataToMonth, deleteDataFromMonth, employeeData, projectData }
