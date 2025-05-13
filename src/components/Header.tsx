import {
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { moveWeek, setToday } from "@/store/features/dateSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const currentDate = useAppSelector((state) => state.date.currentDate);

  const handleWeekChange = (direction: "prev" | "next") => {
    dispatch(moveWeek(direction));
  };

  const handleToday = () => {
    dispatch(setToday());
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  return (
    <>
      <div className="p-[30px] w-full h-[50px] flex items-center gap-4 border-0 border-b border-gray-200">
        <div className="w-[20%] flex items-center justify-start gap-4">
          <Bars3Icon className="w-6 h-6" />
          <div className="text-2xl font-medium">달력</div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" onClick={handleToday}>
            오늘
          </Button>
          <div className="flex items-center justify-center gap-2">
            <Button variant="ghost" onClick={() => handleWeekChange("prev")}>
              <ChevronLeftIcon className="w-6 h-6" />
            </Button>
            <Button variant="ghost" onClick={() => handleWeekChange("next")}>
              <ChevronRightIcon className="w-6 h-6" />
            </Button>
            <div className="text-xl font-medium">{formatDate(currentDate)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
