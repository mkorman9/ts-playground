import config from './config';
import './error_handlers';
import app from './app';

import twing from './twing';
import dayjs from 'dayjs';
import { createEmployee } from './employee';

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

    app.listen(8080, '0.0.0.0', () => {
      console.log('Listening on :8080');
    });
  } catch (err) {
    console.error(err);
  }
};

main()
  .then(() => null)
  .catch(err => console.error(err));
