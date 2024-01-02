import { useState, useEffect } from 'react'

import { DB_NAME, INDEXEDDB_ERROR, KEY_PATH, READ_ONLY, READ_WRITE, STORE_NAME } from '../shared/constants'
import { hasActivity } from '../shared/helpers'
import { useStore } from '../store/useStore'

export const useIndexedDB = () => {
  const [db, setDB] = useState(null)
  const [fetchData, setFetchData] = useState(true)
  const { updateUserActivity } = useStore()

  useEffect(() => {
    const openDB = window.indexedDB.open(DB_NAME, 1)

    openDB.onupgradeneeded = event => {
      const db = event.target.result
      db.createObjectStore(STORE_NAME, { keyPath: KEY_PATH })
    }

    openDB.onsuccess = event => {
      setDB(event.target.result)
    }

    openDB.onerror = event => {
      console.error(INDEXEDDB_ERROR, event.target.error)
    }
  }, [DB_NAME, STORE_NAME])

  useEffect(() => {
    const getAllRecords = async () => {
      return new Promise((resolve, reject) => {
        if (db) {
          const transaction = db.transaction([STORE_NAME], READ_ONLY)
          const objectStore = transaction.objectStore(STORE_NAME)
          const response = objectStore.getAll()

          transaction.oncomplete = () => {
            resolve(response.result)
          }

          transaction.onerror = () => {
            reject(transaction.error)
          }
        }
      })
    }

    const getIndexedDBActivity = async () => {
      const records = await getAllRecords()
      updateUserActivity(records)
      setFetchData(false)
    }

    if (fetchData) {
      getIndexedDBActivity()
    }
  }, [db, fetchData])

  const deleteRecord = async (record) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], READ_WRITE)
      const objectStore = transaction.objectStore(STORE_NAME)
      const response = objectStore.delete(record)

      transaction.oncomplete = () => {
        resolve(response.result)
        setFetchData(true)
      }

      transaction.onerror = () => {
        reject(transaction.error)
      }
    })
  }

  const putRecord = async (record) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], READ_WRITE)
      const objectStore = transaction.objectStore(STORE_NAME)
      const response = objectStore.put(record)

      transaction.oncomplete = () => {
        resolve(response.result)
        setFetchData(true)
      }

      transaction.onerror = () => {
        reject(transaction.error)
      }
    })
  }

  const updateIndexedDBActivity = async (monthActivity) => {
    const monthHasActivity = hasActivity(monthActivity)

    if (!monthHasActivity) {
      await deleteRecord(`${monthActivity.month}_${monthActivity.year}`)
    } else {
      await putRecord(monthActivity)
    }
  }

  return {
    updateIndexedDBActivity
  }
}
