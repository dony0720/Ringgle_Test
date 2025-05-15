import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateState } from "@/types/date";
const initialState: DateState = {
  currentDate: new Date().toISOString(),
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    moveWeek: (state, action: PayloadAction<"prev" | "next">) => {
      const currentDate = new Date(state.currentDate);
      const weekChange = action.payload === "prev" ? -7 : 7;
      currentDate.setDate(currentDate.getDate() + weekChange);
      state.currentDate = currentDate.toISOString();
    },
    setToday: (state) => {
      state.currentDate = new Date().toISOString();
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
  },
});

export const { moveWeek, setToday, setDate } = dateSlice.actions;
export default dateSlice.reducer;
