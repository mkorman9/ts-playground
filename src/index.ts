import * as config from './config';
import './error_handlers';

import { createEmployee } from './employee';
import twing from './twing';
import daysjs from 'dayjs';

const main = async () => {
    try {
        const employee1 = await createEmployee('HR', 10000);
        const employee2 = await createEmployee('Finance', 15000);

        const report = await twing.render('report.twig', {
            now: daysjs(),
            companyId: config.COMPANY_ID,
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
