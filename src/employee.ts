export interface IEmployee {
  id: number;
  department: string;
  salary: number;
}

export async function createEmployee(department: string, salary: number) {
  return {
    id: Math.floor(Math.random() * 10000),
    department: department,
    salary: salary
  };
}
