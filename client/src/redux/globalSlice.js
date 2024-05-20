import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    user: {},
    subjectCates: [],
    subjects: [],
    listSystemKeys: []
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setSubjects: (state, action) => {
      state.subjects = action.payload
    },
    setSubjectCates: (state, action) => {
      state.subjectCates = action.payload
    },
    setListSystemKeys: (state, action) => {
      state.listSystemKeys = action.payload
    }
  }
})

export default globalSlice
