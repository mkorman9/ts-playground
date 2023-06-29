import { createEmployee } from './employee';

describe('Employees', () => {
    test('it should create employee with given options', async () => {
        const department = 'Finance';
        const salary = 10000;
        const employee = await createEmployee(department, salary);

        expect(employee.id).not.toBeNull();
        expect(employee.department).toEqual(department);
        expect(employee.salary).toEqual(salary);
    });
});
