import { useEffect, useMemo } from 'react'
import { createTheme } from '@mui/material/styles'
import { esES } from '@mui/x-date-pickers/locales'

import {
  DARK,
  DARK_PREFERENCE,
  DATA_THEME,
  LIGHT,
  THEME
} from '../shared/constants'
import { useStore } from '../store/useStore'

export const useTheme = () => {
  const { mode, updateMode } = useStore()

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME)
    const prefersDark =
      window.matchMedia &&
      window.matchMedia(DARK_PREFERENCE).matches
    const defaultDark = storedTheme === DARK || (!storedTheme && prefersDark)
    setMode(defaultDark ? DARK : LIGHT)
  }, [])

  const theme = useMemo(
    () =>
      createTheme(
        {
          components: {
            MuiDateCalendar: {
              styleOverrides: {
                root: {
                  height: 'min-content'
                }
              }
            },
            MuiPickersCalendarHeader: {
              styleOverrides: {
                root: {
                  display: 'none'
                }
              }
            }
          },
          palette: {
            mode
          }
        },
        esES
      ),
    [mode]
  )

  const setMode = (value) => {
    document.documentElement.setAttribute(DATA_THEME, value)
    window.localStorage.setItem(THEME, value)
    updateMode(value)
  }

  const toggleTheme = () =>
    setMode(mode === DARK ? LIGHT : DARK)

  return {
    theme,
    toggleTheme
  }
}
