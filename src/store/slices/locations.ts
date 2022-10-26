import { createSlice } from '@reduxjs/toolkit';

const locations = createSlice({
  name: 'locations',
  initialState: [] as Array<any>,
  reducers: {
    addLocation: (state, action) => {
      return [...state, action.payload];
    },
    sortLocations: (state, action) => {
      return [...action.payload];
    },
  },
});

export const { addLocation, sortLocations } = locations.actions;
export default locations.reducer;
