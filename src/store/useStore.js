import { create } from 'zustand'

import { DEFAULT_VALUES, LIGHT } from '../shared/constants'

export const useStore = create((set) => {
  return {
    activityDialogType: null,
    isCurrentMonth: true,
    isLoading: false,
    mode: LIGHT,
    selectedDate: null,
    selectedDayActivity: DEFAULT_VALUES.DAY_ACTIVITY,
    selectedMonth: DEFAULT_VALUES.MONTH,
    selectedMonthActivity: DEFAULT_VALUES.MONTH_ACTIVITY,
    selectedYear: DEFAULT_VALUES.YEAR,
    showActivityDialog: false,
    showStopwatchDialog: false,
    userActivity: null,
    updateIsLoading: (value) => {
      set(() => ({
        isLoading: value
      }))
    },
    updateMode: (value) => {
      set(() => ({
        mode: value
      }))
    },
    updateSelectedDate: (value) => {
      set(() => ({
        selectedDate: value
      }))
    },
    updateSelectedDayActivity: (value, key) => {
      set((store) => ({
        selectedDayActivity: key
          ? {
              ...store.selectedDayActivity,
              [key]: value
            }
          : value
      }))
    },
    updateSelectedMonth: (value) => {
      setTimeout(
        () => set((store) => ({
          isCurrentMonth: value === DEFAULT_VALUES.MONTH && store.selectedYear === DEFAULT_VALUES.YEAR,
          isLoading: false,
          selectedMonth: value
        }))
      )
    },
    updateSelectedMonthActivity: (value, key) => {
      set((store) => ({
        selectedMonthActivity: key
          ? {
              ...store.selectedMonthActivity,
              [key]: value
            }
          : value
      }))
    },
    updateSelectedYear: (value) => {
      setTimeout(
        () => set((store) => ({
          isCurrentMonth: value === DEFAULT_VALUES.YEAR && store.selectedMonth === DEFAULT_VALUES.MONTH,
          isLoading: false,
          selectedYear: value
        }))
      )
    },
    updateShowActivityDialog: (type) => {
      set((store) => ({
        showActivityDialog: !store.showActivityDialog,
        activityDialogType: type
      }))
    },
    updateShowStopwatchDialog: () => {
      set((store) => ({
        showStopwatchDialog: !store.showStopwatchDialog
      }))
    },
    updateUserActivity: (value) => {
      set(() => ({
        userActivity: value
      }))
    }
  }
})
