import { useMemo } from 'react'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import PropTypes from 'prop-types'

import { ACTIVITY_DIALOG_TYPE, DARK, DEFAULT_VALUES, LIGHT } from '../shared/constants'
import { parseDate, toDate } from '../shared/helpers'
import { useStore } from '../store/useStore'

const Day = ({ autoFocus, day, ...other }) => {
  const {
    mode,
    selectedMonthActivity,
    updateSelectedDate,
    updateSelectedDayActivity,
    updateShowActivityDialog
  } = useStore()

  const highlightedDays = selectedMonthActivity?.daily_activity?.map(
    (item) =>
      toDate(item.date).getDate()
  )

  const isHighlightedDay = highlightedDays?.includes(day.date())

  const sx = useMemo(() => {
    let backgroundColor
    let color
    let hoverColor

    if (isHighlightedDay) {
      backgroundColor = '#9bbb6b'
      color = '#000000de'
      hoverColor = '#fff'
      if ((autoFocus) && mode === DARK) {
        color = '#fff'
      }
      if (mode === LIGHT) {
        backgroundColor = '#7ab422'
        if (!autoFocus) {
          color = '#fff'
          hoverColor = '#000000de'
        }
      }
    }

    return {
      backgroundColor,
      color,
      ':hover': {
        color: hoverColor
      },
      fontSize: 16
    }
  }, [autoFocus, isHighlightedDay, mode])

  const handleClick = () => {
    const date = parseDate(day)
    const dayActivity = selectedMonthActivity?.daily_activity?.find(
      (item) => item.date === date
    ) ?? DEFAULT_VALUES.DAY_ACTIVITY

    updateSelectedDate(date)
    updateSelectedDayActivity(dayActivity)
    updateShowActivityDialog(ACTIVITY_DIALOG_TYPE.DAY)
  }

  return (
    <PickersDay
      {...other}
      day={day}
      onClick={isHighlightedDay && handleClick}
      sx={sx}
    />
  )
}

Day.defaultProps = {
  autoFocus: false,
  day: {}
}

Day.propTypes = {
  autoFocus: PropTypes.bool,
  day: PropTypes.object
}

export default Day
