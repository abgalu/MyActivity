import { LONG, NUMERIC, SPANISH } from './constants'

export const compareObjects = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2)

export const getIdData = (id) => {
  const [year, month] = id.split('_')
  return {
    month: Number(month),
    year: Number(year)
  }
}

export const getMonth = (date) =>
  `${date.getFullYear()}/${date.getMonth() + 1}`

export const getOptions = (start, end) => {
  const options = []
  for (let i = start; i <= end; i++) {
    options.push(i)
  }
  return options
}

export const getSpanishDate = (date, withDay = true) => new Intl.DateTimeFormat(SPANISH, {
  day: withDay ? NUMERIC : undefined,
  month: LONG,
  year: NUMERIC
}).format(toDate(date))

export const hasActivity = (value) => value.time.hours || value.time.minutes

export const padTo2Digits = (number) => number.toString().padStart(2, '0')

export const parseDate = (value) => toDate(value).toDateString()

export const toDate = (value) => new Date(value)
