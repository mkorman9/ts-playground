import 'dotenv/config'

import { createEmployee } from './employee';
import twing from './twing';

const main = async () => {
    try {
        const employee1 = await createEmployee('HR', 10000);
        const employee2 = await createEmployee('Finance', 15000);

        const report = await twing.render('report.twig', {
            employees: [employee1, employee2]
        });

        console.log(report);
    } catch (err) {
        console.error(err);
    }
};

main()
    .then(() => null)
    .catch(err => console.error(err));
