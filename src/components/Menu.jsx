import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined'

import { useTheme } from '../hooks/useTheme'
import { ACTIVITY_DIALOG_TYPE, CURRENT_DATE, DARK, DICTIONARY } from '../shared/constants'
import { parseDate } from '../shared/helpers'
import { useStore } from '../store/useStore'
import styles from '../styles/Menu.module.css'

const Menu = () => {
  const { mode, updateSelectedDate, updateShowActivityDialog, updateShowStopwatchDialog } =
    useStore()
  const { toggleTheme } = useTheme()
  const isDarkMode = mode === DARK

  const handleAddButtonClick = () => {
    updateSelectedDate(parseDate(CURRENT_DATE))
    updateShowActivityDialog(ACTIVITY_DIALOG_TYPE.ADD)
  }

  return (
    <footer>
      <div className={styles.menuItem} onClick={updateShowStopwatchDialog}>
        <UpdateOutlinedIcon />
        <span>{DICTIONARY.CHRONOMETER}</span>
      </div>
      <div className={styles.menuItem} onClick={handleAddButtonClick}>
        <AddOutlinedIcon />
        <span>{DICTIONARY.ADD}</span>
      </div>
      <div className={styles.menuItem} onClick={toggleTheme}>
        {isDarkMode
          ? <LightModeOutlinedIcon />
          : <DarkModeOutlinedIcon />}
        <span>{isDarkMode ? DICTIONARY.LIGHT_MODE : DICTIONARY.DARK_MODE}</span>
      </div>
    </footer>
  )
}

export default Menu
