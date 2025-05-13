import {
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
const Header = () => {
  return (
    <>
      <div className="p-[30px] w-full h-[50px] flex items-center gap-4 border-0 border-b border-gray-200">
        <div className="w-[20%] flex items-center justify-start gap-4">
          <Bars3Icon className="w-6 h-6" />
          <div className="text-2xl font-medium  ">달력</div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button variant="outline">오늘</Button>
          <div className="flex items-center justify-center gap-2">
            <Button variant="ghost">
              <ChevronLeftIcon className="w-6 h-6" />
            </Button>
            <Button variant="ghost">
              <ChevronRightIcon className="w-6 h-6" />
            </Button>
            <div className="text-xl font-medium  ">2025년 5월</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
