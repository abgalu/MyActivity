import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { useStopwatch } from 'react-timer-hook'

import { useIndexedDB } from '../hooks/useIndexedDB'
import { COLORS, CONTAINED, CURRENT_DATE, DEFAULT_VALUES, DICTIONARY, POSITIONS } from '../shared/constants'
import { getIdData, padTo2Digits } from '../shared/helpers'
import { useStore } from '../store/useStore'

const StopwatchDialog = () => {
  const {
    hours,
    isRunning,
    minutes,
    pause,
    reset,
    seconds,
    start,
    totalSeconds
  } = useStopwatch()
  const {
    showStopwatchDialog,
    updateSelectedMonthActivity,
    updateShowStopwatchDialog,
    updateUserActivity,
    userActivity
  } = useStore()
  const { updateIndexedDBActivity } = useIndexedDB()

  const handleReset = () => {
    reset(CURRENT_DATE, false)
  }

  const handleSaveActivity = () => {
    const currentDate = CURRENT_DATE.toDateString()
    const currentMonth = CURRENT_DATE.getMonth()
    const currentYear = CURRENT_DATE.getFullYear()
    const currentMonthActivity = userActivity?.find(
      (item) => {
        const { month, year } = getIdData(item.id)
        return month === currentMonth && year === currentYear
      }
    ) ?? DEFAULT_VALUES.MONTH_ACTIVITY
    const newDailyActivity = currentMonthActivity.daily_activity
    const dayActivityIndex = newDailyActivity.findIndex(
      (item) => item.date === currentDate
    )

    if (dayActivityIndex >= 0) {
      newDailyActivity[dayActivityIndex] = {
        ...newDailyActivity[dayActivityIndex],
        time: {
          hours: newDailyActivity[dayActivityIndex].time.hours + hours,
          minutes: newDailyActivity[dayActivityIndex].time.minutes + minutes
        }
      }
    } else {
      newDailyActivity.push({
        date: currentDate,
        hours,
        minutes
      })
    }

    const newMonthActivity = newDailyActivity.reduce(
      (acc, current) => ({
        daily_activity: newDailyActivity,
        id: `${currentYear}_${currentMonth}`,
        time: {
          hours: acc.time.hours + current.time.hours + Math.floor(current.time.minutes / 60),
          minutes: acc.time.minutes + current.time.minutes % 60
        }
      }),
      DEFAULT_VALUES.MONTH_ACTIVITY
    )

    const newUserActivity = [...userActivity]
    const monthActivityIndex = newUserActivity.findIndex(item => item.id === newMonthActivity.id)
    newUserActivity[monthActivityIndex] = newMonthActivity

    updateShowStopwatchDialog()
    updateIndexedDBActivity(newMonthActivity)
    updateSelectedMonthActivity(newMonthActivity)
    updateUserActivity(newUserActivity)
  }

  return (
    <Dialog
      fullWidth
      onClose={updateShowStopwatchDialog}
      open={showStopwatchDialog}
    >
      <DialogTitle textAlign={POSITIONS.CENTER}>
        {DICTIONARY.ACTIVITY_FOR_TODAY}
        <IconButton
          onClick={updateShowStopwatchDialog}
          sx={{
            position: POSITIONS.ABSOLUTE,
            right: 0,
            top: 0
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          textAlign: POSITIONS.CENTER
        }}
      >
        {padTo2Digits(hours)}:{padTo2Digits(minutes)}:{padTo2Digits(seconds)}
      </DialogContent>
      <DialogActions>
        {
          isRunning
            ? (
              <Button color={COLORS.WARNING} onClick={pause}>
                {DICTIONARY.PAUSE}
              </Button>)
            : (
              <Button color={COLORS.SUCCESS} onClick={start}>
                {DICTIONARY.START}
              </Button>
              )

        }
        {totalSeconds > 0 && (
          <Button color={COLORS.ERROR} onClick={handleReset}>
            {DICTIONARY.RESET}
          </Button>
        )}
        {!isRunning && totalSeconds > 60 && (
          <Button onClick={handleSaveActivity} variant={CONTAINED}>
            {DICTIONARY.SAVE}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default StopwatchDialog
