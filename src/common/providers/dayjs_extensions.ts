import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);

process.env.TZ = 'UTC';
dayjs.tz.setDefault('UTC');
