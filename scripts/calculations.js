const effectiveCapacity = (capacity, fit, vacationCoefficient = 1) => {
  return capacity * fit * vacationCoefficient;
};

const revenue = (budget, projectCapacity, usedEffectiveCapacity, employeeEffectiveCapacity) => {
  const capacityForRevenue = Math.max(projectCapacity, usedEffectiveCapacity);
  const revenuePerEffectiveCapacity = budget / capacityForRevenue;
  const employeeRevenue = revenuePerEffectiveCapacity * employeeEffectiveCapacity;
  return employeeRevenue;
};

const cost = (salary, assignedCapacity) => {
  const employeeCost = salary * Math.max(0.5, assignedCapacity);
  return employeeCost;
}

const profit = (revenue, cost) => {
  return revenue - cost;
}

const calcUsedEffectiveCapacity = (project, employees) => {
  return employees.reduce((sum, employee) => {
    const assignment = employee.projectAssignments.find(a => a.projectId === project.id);
    return sum + effectiveCapacity(assignment.capacity, assignment.fit);
  }, 0);
}

const calcProjectIncome = (project, employees) => {
  const usedEffectiveCapacity = calcUsedEffectiveCapacity(project, employees);

  const estimatedIncome = employees.reduce((sum, employee) => {
    const assignment = employee.projectAssignments.find(a => a.projectId === project.id);
    const employeeEffectiveCapacity = effectiveCapacity(assignment.capacity, assignment.fit);
    const employeeRevenue = revenue(project.budget, project.employeeCapacity, usedEffectiveCapacity, employeeEffectiveCapacity);
    const employeeCost = cost(employee.salary, assignment.capacity);
    return sum + profit(employeeRevenue, employeeCost);
  }, 0);
  return estimatedIncome;
}

export {effectiveCapacity, revenue, cost, profit, calcProjectIncome, calcUsedEffectiveCapacity};
