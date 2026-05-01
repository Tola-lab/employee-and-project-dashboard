import { saveDataToMonth } from "./storage.js";
import { SELECT_MONTH, SELECT_YEAR } from "./state.js";

export const createEmployee = () => {
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const dateOfBirth = document.getElementById('date-of-birth').value;
  const position = document.getElementById('position').value;
  const salary = +document.getElementById('salary').value;

  const employeeData = {
    id: Date.now(),
    name: name,
    surname: surname,
    dateOfBirth: dateOfBirth,
    position: position,
    salary: salary,
    projectAssignments: [],
    dayoff: []
  };

  saveDataToMonth(SELECT_YEAR.value, SELECT_MONTH.value, 'employees', employeeData);
}
