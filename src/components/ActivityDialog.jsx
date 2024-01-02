import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { useIndexedDB } from '../hooks/useIndexedDB'
import {
  ACTIVITY_DIALOG_TYPE,
  COLORS,
  CONTAINED,
  DEFAULT_VALUES,
  DICTIONARY,
  POSITIONS
} from '../shared/constants'
import { compareObjects, getSpanishDate, hasActivity, padTo2Digits, parseDate, toDate } from '../shared/helpers'
import { useStore } from '../store/useStore'
import CustomToolbar from './CustomToolbar'
import TimeCounter from './TimeCounter'

const ActivityDialog = () => {
  const { updateIndexedDBActivity } = useIndexedDB()
  const [currentActivity, setCurrentActivity] = useState(DEFAULT_VALUES.DAY_ACTIVITY)
  const {
    activityDialogType,
    selectedDate,
    selectedDayActivity,
    selectedMonth,
    selectedMonthActivity,
    selectedYear,
    showActivityDialog,
    updateSelectedDate,
    updateSelectedMonthActivity,
    updateShowActivityDialog,
    updateUserActivity,
    userActivity
  } = useStore()

  const dayHasActivity = activityDialogType !== ACTIVITY_DIALOG_TYPE.MONTH && hasActivity(currentActivity)
  const isDisabled = !hasActivity(currentActivity)

  useEffect(() => {
    const getDefaultActivity = () => {
      if (activityDialogType === ACTIVITY_DIALOG_TYPE.MONTH) {
        return selectedMonthActivity
      }
      if (activityDialogType === ACTIVITY_DIALOG_TYPE.DAY) {
        return selectedDayActivity
      }
      return DEFAULT_VALUES.DAY_ACTIVITY
    }
    const defaultActivity = getDefaultActivity()
    setCurrentActivity(defaultActivity)
  }, [activityDialogType, selectedDayActivity, selectedMonthActivity])

  const handleClose = () => {
    updateSelectedDate(null)
    updateShowActivityDialog(null)
  }

  const handleSaveActivity = () => {
    let newDailyActivity = selectedMonthActivity?.daily_activity ?? []
    let newMonthActivity = {
      ...currentActivity,
      id: `${selectedYear}_${selectedMonth}`
    }
    const dayActivityIndex = newDailyActivity.findIndex(
      (item) => item.date === currentActivity.date
    )
    const dayActivityIsEdited = !compareObjects(newDailyActivity[dayActivityIndex], currentActivity)

    if (selectedDate) {
      currentActivity.date = selectedDate
    }

    if (activityDialogType !== ACTIVITY_DIALOG_TYPE.MONTH) {
      if (dayActivityIndex >= 0) {
        if (dayActivityIsEdited) {
          if (dayHasActivity) {
            if (activityDialogType === ACTIVITY_DIALOG_TYPE.ADD) {
              const sumHours = newDailyActivity[dayActivityIndex].time.hours + currentActivity.time.hours
              const sumMinutes = newDailyActivity[dayActivityIndex].time.minutes + currentActivity.time.minutes
              newDailyActivity[dayActivityIndex].time = {
                hours: sumHours + Math.floor(sumMinutes / 60),
                minutes: sumMinutes % 60
              }
            } else {
              newDailyActivity[dayActivityIndex] = currentActivity
            }
          } else {
            newDailyActivity.splice(dayActivityIndex, 1)
          }
        }
      } else if (dayHasActivity) {
        newDailyActivity = [...newDailyActivity, currentActivity]
      }

      newMonthActivity = newDailyActivity.reduce(
        (acc, current) => ({
          daily_activity: newDailyActivity,
          id: `${toDate(selectedDate).getFullYear()}_${toDate(selectedDate).getMonth()}`,
          time: {
            hours: acc.time.hours + current.time.hours,
            minutes: acc.time.minutes + current.time.minutes
          }
        }),
        DEFAULT_VALUES.MONTH_ACTIVITY
      )

      newMonthActivity.time = {
        hours: newMonthActivity.time.hours + Math.floor(newMonthActivity.time.minutes / 60),
        minutes: newMonthActivity.time.minutes % 60
      }
    }

    const newUserActivity = [...userActivity]
    const monthActivityIndex = newUserActivity.findIndex(item => item.id === newMonthActivity.id)
    newUserActivity[monthActivityIndex] = newMonthActivity

    updateShowActivityDialog(null)
    updateIndexedDBActivity(newMonthActivity)
    updateSelectedMonthActivity(newMonthActivity)
    updateUserActivity(newUserActivity)
  }

  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      open={showActivityDialog}
    >
      <DialogTitle sx={{ textAlign: POSITIONS.CENTER }}>
        {activityDialogType === ACTIVITY_DIALOG_TYPE.ADD ? DICTIONARY.NEW_ACTIVITY : DICTIONARY.ACTIVITY}
        {activityDialogType === ACTIVITY_DIALOG_TYPE.MONTH && ` ${DICTIONARY.OF}`}
        {activityDialogType === ACTIVITY_DIALOG_TYPE.DAY && ` ${DICTIONARY.OF_THE}`}
        {activityDialogType !== ACTIVITY_DIALOG_TYPE.ADD && ` ${activityDialogType === ACTIVITY_DIALOG_TYPE.DAY
          ? getSpanishDate(selectedDate)
          : getSpanishDate(`${selectedYear}-${padTo2Digits(selectedMonth + 1)}`, false)}`}
        <IconButton
          onClick={handleClose}
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
          margin: 'auto',
          width: 'min-content'
        }}
      >
        {activityDialogType === ACTIVITY_DIALOG_TYPE.ADD && (
          <LocalizationProvider adapterLocale='es' dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(day) => {
                setCurrentActivity(item => ({
                  ...item,
                  date: parseDate(day)
                }))
                updateSelectedDate(parseDate(day))
              }}
              slotProps={{
                textField: {
                  placeholder: DICTIONARY.DATE
                }
              }}
              slots={{
                toolbar: CustomToolbar
              }}
              sx={{
                marginBottom: 1
              }}
              value={dayjs(selectedDate)}
            />
          </LocalizationProvider>
        )}
        <TimeCounter
          currentActivity={currentActivity}
          setCurrentActivity={setCurrentActivity}
        />
      </DialogContent>
      <DialogActions>
        <Button color={COLORS.ERROR} onClick={handleClose}>
          {DICTIONARY.CANCEL}
        </Button>
        <Button disabled={isDisabled} onClick={handleSaveActivity} variant={CONTAINED}>
          {DICTIONARY.SAVE}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ActivityDialog
