import { Button } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import {
  ACTIVITY_DIALOG_TYPE,
  CONTAINED,
  CURRENT_DATE,
  EDIT_MONTH_ACTIVITY,
  MONTH_LIST
} from '../shared/constants'
import { getOptions } from '../shared/helpers'
import { useStore } from '../store/useStore'
import styles from '../styles/DateControls.module.css'

const DateControls = () => {
  const {
    isCurrentMonth,
    updateIsLoading,
    updateSelectedDate,
    updateSelectedMonth,
    updateSelectedYear,
    updateShowActivityDialog
  } = useStore()

  const handleMonthChange = (event) => {
    updateIsLoading(true)
    updateSelectedDate(null)
    updateSelectedMonth(event.target.value)
  }

  const handleYearChange = (event) => {
    updateIsLoading(true)
    updateSelectedDate(null)
    updateSelectedYear(event.target.value)
  }

  return (
    <div>
      <div className={styles.selects}>
        <Select
          defaultValue={CURRENT_DATE.getMonth()}
          onChange={handleMonthChange}
        >
          {MONTH_LIST.map((month, index) => (
            <MenuItem key={index} value={index}>{month}</MenuItem>
          ))}
        </Select>
        <Select
          defaultValue={CURRENT_DATE.getFullYear()}
          onChange={handleYearChange}
        >
          {getOptions(2023, CURRENT_DATE.getFullYear()).map((year, index) => (
            <MenuItem key={index} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </div>
      {!isCurrentMonth && (
        <div className={styles.button}>
          <Button
            onClick={() => updateShowActivityDialog(ACTIVITY_DIALOG_TYPE.MONTH)}
            variant={CONTAINED}
          >
            {EDIT_MONTH_ACTIVITY}
          </Button>
        </div>
      )}
    </div>
  )
}

export default DateControls
