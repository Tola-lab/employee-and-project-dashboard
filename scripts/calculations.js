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

export {effectiveCapacity, revenue, cost, profit};
