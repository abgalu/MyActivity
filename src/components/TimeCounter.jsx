import { MenuItem } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import PropTypes from 'prop-types'

import {
  ACTIVITY_DIALOG_TYPE,
  DICTIONARY,
  HOURS,
  MINUTES
} from '../shared/constants'
import { getOptions, padTo2Digits } from '../shared/helpers'
import { useStore } from '../store/useStore'
import styles from '../styles/TimeCounter.module.css'

const TimeCounter = ({ currentActivity, readOnlyMode, setCurrentActivity }) => {
  const {
    activityDialogType,
    isCurrentMonth
  } = useStore()

  const handleChange = (event, type) =>
    setCurrentActivity(prevState =>
      ({
        ...prevState,
        time: {
          ...prevState.time,
          [type]: event.target.value
        }
      })
    )

  return (
    <div className={styles.container}>
      {readOnlyMode
        ? (
          <span>
            {DICTIONARY.HOURS} <span className={styles.display}>{currentActivity.time.hours}:{padTo2Digits(currentActivity.time.minutes)}</span>
          </span>
          )
        : (
          <>
            <div>
              <InputLabel id={HOURS}>{DICTIONARY.HOURS}</InputLabel>
              <Select
                disabled={activityDialogType === ACTIVITY_DIALOG_TYPE.DAY && !isCurrentMonth}
                labelId={HOURS}
                onChange={(event) => handleChange(event, HOURS)}
                value={currentActivity.time.hours}
              >
                {getOptions(0, 99).map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <InputLabel id={MINUTES}>{DICTIONARY.MINUTES}</InputLabel>
              <Select
                disabled={activityDialogType === ACTIVITY_DIALOG_TYPE.DAY && !isCurrentMonth}
                labelId={MINUTES}
                onChange={(event) => handleChange(event, MINUTES)}
                value={currentActivity.time.minutes}
              >
                {getOptions(0, 59).map((option) => (
                  <MenuItem key={option} value={option}>{padTo2Digits(option)}</MenuItem>
                ))}
              </Select>
            </div>
          </>
          )}
    </div>
  )
}

TimeCounter.defaultProps = {
  currentActivity: {},
  readOnlyMode: false,
  setCurrentActivity: () => {}
}

TimeCounter.propTypes = {
  currentActivity: PropTypes.object,
  readOnlyMode: PropTypes.bool,
  setCurrentActivity: PropTypes.func
}

export default TimeCounter
