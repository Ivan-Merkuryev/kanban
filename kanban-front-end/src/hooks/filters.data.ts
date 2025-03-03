import dayjs, {type Dayjs} from 'dayjs'
import 'dayjs/locale/ru'

import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)

export const FILTERS: Record<string, Dayjs> = {
    today: dayjs().startOf('day'),
    tomorrow: dayjs().add(1, 'day').startOf('day')

    
}