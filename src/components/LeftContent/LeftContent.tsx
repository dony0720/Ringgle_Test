import CreateTask from "./CreateTask";
import { Calendar } from "@/components/ui/calendar";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@/store/dateSlice";
import { RootState } from "@/store/store";
import { useMemo, useState, useEffect } from "react";

const LeftContent = () => {
  const dispatch = useDispatch(); //Redux 스토어의 상태를 변경할 수 있음
  const dateString = useSelector((state: RootState) => state.date.currentDate); //Redux 스토어의 상태를 읽을 수 있음
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date()); //캘린더의 월을 선택할 수 있음

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
    </div>
  );
};

export default LeftContent;
