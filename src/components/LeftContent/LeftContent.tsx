import CreateTask from "./CreateTask";
import { Calendar } from "@/components/ui/calendar";
// import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@/store/features/dateSlice";
import { RootState } from "@/store/store";
import { useMemo, useState, useEffect } from "react";

const LeftContent = () => {
  const dispatch = useDispatch();
  const dateString = useSelector((state: RootState) => state.date.currentDate);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());

  const currentDate = useMemo(() => {
    return dateString ? new Date(dateString) : undefined;
  }, [dateString]);

  // Header의 월 변경을 감지하여 Calendar 월 업데이트
  useEffect(() => {
    if (currentDate) {
      setCalendarMonth(currentDate);
    }
  }, [currentDate]);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      const selectedDate = new Date(newDate);
      if (currentDate) {
        selectedDate.setHours(currentDate.getHours());
        selectedDate.setMinutes(currentDate.getMinutes());
      }
      dispatch(setDate(selectedDate.toISOString()));
    }
  };

  return (
    <div className="w-[20%] pt-[20px] px-[30px] h-full box-border">
      <CreateTask />
      <Calendar
        selected={currentDate}
        month={calendarMonth}
        onMonthChange={setCalendarMonth}
        onSelect={handleDateSelect}
        className="p-0"
      />
      {/* <Modal /> */}
    </div>
  );
};

export default LeftContent;
