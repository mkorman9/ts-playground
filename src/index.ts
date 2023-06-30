import config from './config';
import './error_handlers';

import twing from './twing';
import dayjs from 'dayjs';
import { createEmployee } from './employee';
import { findPublicIp } from './ip';

const main = async () => {
    try {
        const employee1 = await createEmployee('HR', 10000);
        const employee2 = await createEmployee('Finance', 15000);

        const report = await twing.render('report.twig', {
            now: dayjs(),
            companyId: config.COMPANY_ID,
            employees: [employee1, employee2]
        });

        console.log(report);

        setInterval(async () => {
            try {
                const ip = await findPublicIp();
                console.log(`IP: ${ip}`);
            } catch (err) {
                console.error(`Error while finding IP address: ${err}`);
            }
        }, 3000);
    } catch (err) {
        console.error(err);
    }
};

main()
    .then(() => null)
    .catch(err => console.error(err));
