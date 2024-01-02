import { DatePickerToolbar } from '@mui/x-date-pickers'

import { CURRENT_DATE, MONTH_LIST } from '../shared/constants'
import styles from '../styles/CustomToolbar.module.css'

const CustomToolbar = (props) => {
  return (
    <div className={props.className}>
      <DatePickerToolbar {...props} />
      <span className={styles.title}>
        {MONTH_LIST[CURRENT_DATE.getMonth()]} {CURRENT_DATE.getFullYear()}
      </span>
    </div>
  )
}

export default CustomToolbar
