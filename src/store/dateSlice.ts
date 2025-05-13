import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateState {
  selectedDate: Date | undefined;
}

const initialState: DateState = {
  selectedDate: undefined,
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSelectedDate: (
      state: DateState,
      action: PayloadAction<Date | undefined>
    ) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = dateSlice.actions;
export default dateSlice.reducer;
