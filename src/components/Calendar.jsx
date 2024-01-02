import { useEffect } from 'react'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import {
  DEFAULT_VALUES,
  DICTIONARY
} from '../shared/constants'
import { getIdData } from '../shared/helpers'
import { useStore } from '../store/useStore'
import Day from './Day'

const Calendar = () => {
  const {
    isLoading,
    selectedMonth,
    selectedYear,
    updateSelectedMonthActivity,
    userActivity
  } = useStore()

  useEffect(() => {
    if (userActivity) {
      const monthActivity = userActivity?.find(
        (item) => {
          const { month, year } = getIdData(item.id)
          return month === selectedMonth && year === selectedYear
        }
      ) ?? DEFAULT_VALUES.MONTH_ACTIVITY
      updateSelectedMonthActivity(monthActivity)
    }
  }, [userActivity, selectedMonth, selectedYear])

  return (
    <div>
      {isLoading
        ? <p>{DICTIONARY.LOADING}...</p>
        : (
          <LocalizationProvider adapterLocale='es' dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultCalendarMonth={dayjs(`${selectedYear}-${selectedMonth + 1}`)}
              readOnly
              slots={{
                day: Day
              }}
            />
          </LocalizationProvider>
          )}
    </div>
  )
}

export default Calendar
