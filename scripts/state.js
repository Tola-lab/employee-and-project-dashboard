export const SELECT_YEAR = document.getElementById('select-year');
export const SELECT_MONTH = document.getElementById('select-month');

export const NOW = new Date();
export const YEAR = NOW.getFullYear();
export const MONTH = NOW.getMonth();

export const SAMPLE_DATE = {
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
