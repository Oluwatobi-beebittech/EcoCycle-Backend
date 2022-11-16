import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const DayJS = (date?: string | undefined): dayjs.Dayjs =>
  dayjs.utc(date);
