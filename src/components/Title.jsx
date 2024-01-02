import { useEffect, useState } from 'react'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import TextField from '@mui/material/TextField'

import { ACTIVITY, COLORS, DICTIONARY, OUTLINED } from '../shared/constants'

const Title = () => {
  const [activity, setActivity] = useState()
  const [isEditionMode, setIsEditionMode] = useState(false)

  useEffect(() => {
    const localStorageActivity = window.localStorage.getItem(ACTIVITY)

    if (localStorageActivity) {
      setActivity(localStorageActivity)
    } else {
      window.localStorage.setItem(ACTIVITY, DICTIONARY.ACTIVITY)
      setActivity(DICTIONARY.ACTIVITY)
    }
  }, [])

  const editActivity = () => {
    if (activity) {
      window.localStorage.setItem(ACTIVITY, activity)
    } else {
      setActivity(window.localStorage.getItem(ACTIVITY))
    }
    setIsEditionMode(false)
  }

  return (
    <header>
      <h1>
        <span>
          {isEditionMode
            ? (
              <TextField
                autoFocus
                value={activity}
                inputProps={{ maxLength: 20 }}
                InputProps={{
                  endAdornment: (
                    <CheckCircleRoundedIcon color={activity ? COLORS.SUCCESS : COLORS.ERROR} />
                  )
                }}
                onBlur={editActivity}
                onChange={(event) => setActivity(event.target.value)}
                variant={OUTLINED}
              />
              )
            : activity}
        </span>
        {!isEditionMode &&
          <EditRoundedIcon onClick={() => setIsEditionMode(true)} />}
      </h1>
    </header>
  )
}

export default Title
