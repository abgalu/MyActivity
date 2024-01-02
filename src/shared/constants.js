export const ACTIVITY = 'activity'
export const ACTIVITY_DIALOG_TYPE = {
  ADD: 'add',
  DAY: 'day',
  MONTH: 'month'
}
export const COLORS = {
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning'
}
export const CONTAINED = 'contained'
export const CURRENT_DATE = new Date()
export const DARK = 'dark'
export const DARK_PREFERENCE = '(prefers-color-scheme: dark)'
export const DATA_THEME = 'data-theme'
export const DATE = 'date'
export const DB_NAME = 'MyActivity'
export const DEFAULT_VALUES = {
  DATE: CURRENT_DATE,
  DAY_ACTIVITY: {
    date: null,
    time: {
      hours: 0,
      minutes: 0
    }
  },
  MONTH: CURRENT_DATE.getMonth(),
  MONTH_ACTIVITY: {
    id: null,
    daily_activity: [],
    time: {
      hours: 0,
      minutes: 0
    }
  },
  YEAR: CURRENT_DATE.getFullYear()
}
export const DICTIONARY = {
  ACTIVITY_FOR_TODAY: 'Actividad para hoy',
  ACTIVITY: 'Actividad',
  ADD: 'Añadir',
  CANCEL: 'Cancelar',
  CHRONOMETER: 'Cronómetro',
  DARK_MODE: 'Modo oscuro',
  DATE: 'Fecha',
  HOURS: 'Horas',
  LIGHT_MODE: 'Modo claro',
  LOADING: 'Cargando',
  MINUTES: 'Minutos',
  NEW_ACTIVITY: 'Nueva actividad',
  OF_THE: 'del',
  OF: 'de',
  PAUSE: 'Pausa',
  RESET: 'Reiniciar',
  SAVE: 'Guardar',
  START: 'Inicio'
}
export const EDIT_MONTH_ACTIVITY = 'Editar actividad del mes'
export const HOURS = 'hours'
export const INDEXEDDB_ERROR = 'Error opening IndexedDB'
export const KEY_PATH = 'id'
export const LIGHT = 'light'
export const LONG = 'long'
export const MINUTES = 'minutes'
export const MONTH_LIST = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]
export const NUMERIC = 'numeric'
export const OUTLINED = 'outlined'
export const POSITIONS = {
  CENTER: 'center',
  ABSOLUTE: 'absolute'
}
export const READ_ONLY = 'readonly'
export const READ_WRITE = 'readwrite'
export const SPANISH = 'es-ES'
export const STORE_NAME = 'activity'
export const THEME = 'theme'
