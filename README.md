# Employee & Project Dashboard

A comprehensive management application for tracking employees, projects, and their assignments across different time periods.

## Features

- Monthly snapshot architecture — each month stores independent data
- Add, view, and delete projects and employees
- Assign employees to projects with capacity and fit coefficients
- Financial calculations — Estimated Payment, Projected Income, Estimated Income per project, Total Estimated Income
- Automatic bench payments for unassigned employees
- Period selector — switch between months and years

## Tech Stack

- HTML, CSS, vanilla JavaScript (ES modules)
- localStorage for data persistence
- No frameworks or libraries

## How to Run

Open `index.html` in a browser, or visit the live version at:
https://tola-lab.github.io/employee-and-project-dashboard/

## Notes

- Data is stored in localStorage under the key `monthlyData`
- Each month is independent — changes in one month don't affect others
