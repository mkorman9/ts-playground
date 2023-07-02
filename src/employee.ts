export interface IEmployee {
  id: number;
  department: string;
  salary: number;
}

export const createEmployee = async (department: string, salary: number): Promise<IEmployee> => {
  return {
    id: Math.floor(Math.random() * 10000),
    department: department,
    salary: salary
  };
};
