import CreateTask from "./CreateTask";
import { Calendar } from "@/components/ui/calendar";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedDate } from "@/store/dateSlice";

const LeftContent = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: RootState) => state.date.selectedDate
  );

  return (
    <div className="w-[20%] pt-[20px] px-[30px] h-full box-border">
      <CreateTask />
      <Calendar
        className="p-0"
        selected={selectedDate}
        onSelect={(date: Date | undefined) => dispatch(setSelectedDate(date))}
      />
      <Modal />
    </div>
  );
};

export default LeftContent;
