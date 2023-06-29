import * as config from './config';
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

process.on('SIGINT', async () => {
    console.log('Exiting');
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    console.error(err);
});

process.on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled rejection: ${reason} ${p}`);
});

main()
    .then(() => null)
    .catch(err => console.error(err));
