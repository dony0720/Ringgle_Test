import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Middleware } from "@reduxjs/toolkit";

interface DateState {
  currentDate: string;
}

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

// 날짜 변경을 감지하는 미들웨어
export const dateChangeMiddleware: Middleware =
  (store) => (next) => (action) => {
    const prevDate = store.getState().date.currentDate;
    const result = next(action);
    const newDate = store.getState().date.currentDate;

    if (prevDate !== newDate) {
      console.log(
        "날짜가 변경되었습니다:",
        new Date(newDate).toLocaleDateString("ko-KR")
      );
    }

    return result;
  };

export const { moveWeek, setToday, setDate } = dateSlice.actions;
export default dateSlice.reducer;
