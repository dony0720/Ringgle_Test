import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScheduleType {
  type: "event" | "todo" | "appointment";
}

const Modal = () => {
  const [selectedType, setSelectedType] =
    useState<ScheduleType["type"]>("event");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("오전 10:00");
  const [endTime, setEndTime] = useState("오후 10:00");

  const getButtonStyle = (type: ScheduleType["type"]) => {
    return selectedType === type
      ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
      : "bg-white text-gray-500 hover:bg-gray-100 shadow-none";
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const period = hour < 12 ? "오전" : "오후";
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const displayMinute = minute === 0 ? "00" : minute;
        times.push(`${period} ${displayHour}:${displayMinute}`);
      }
    }
    return times;
  };

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </DialogTrigger>
      <DialogContent
        className="w-[450px] h-[520px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="flex flex-col mt-[30px] gap-[15px] relative ">
          <div className="w-full box-border pl-[50px]">
            <Input
              placeholder="제목 추가"
              className="w-full p-0 box-border border-0 border-b border-gray-300 border-solid shadow-none rounded-none focus:border-b-2 focus:border-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0 text-xl placeholder:text-gray-400 placeholder:text-xl"
            />
          </div>

          <div className="w-[330px] ml-[50px] flex flex-row gap-[10px]">
            <Button
              className={getButtonStyle("event")}
              onClick={() => setSelectedType("event")}
            >
              이벤트
            </Button>
            <Button
              className={getButtonStyle("todo")}
              onClick={() => setSelectedType("todo")}
            >
              할 일
            </Button>
            <Button
              className={getButtonStyle("appointment")}
              onClick={() => setSelectedType("appointment")}
            >
              약속 일정
            </Button>
          </div>
          <div className="flex flex-row items-center">
            <ClockIcon className="w-6 h-6" />
            <div className="flex flex-row ml-[25px] gap-[10px] items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="bg-gray-100 p-[10px] text-sm rounded-md hover:cursor-pointer hover:bg-gray-200">
                    {date ? formatDate(date) : "날짜 선택"}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="bg-gray-100 p-[10px] text-sm rounded-md hover:cursor-pointer hover:bg-gray-200">
                    {startTime}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-2">
                  <ScrollArea className="h-[200px]">
                    <div className="flex flex-col gap-1">
                      {generateTimeOptions().map((time) => (
                        <div
                          key={time}
                          className="px-2 py-1 text-sm rounded-md hover:bg-gray-100 cursor-pointer"
                          onClick={() => setStartTime(time)}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <div>-</div>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="bg-gray-100 p-[10px] text-sm rounded-md hover:cursor-pointer hover:bg-gray-200">
                    {endTime}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-2">
                  <ScrollArea className="h-[200px]">
                    <div className="flex flex-col gap-1">
                      {generateTimeOptions().map((time) => (
                        <div
                          key={time}
                          className="px-2 py-1 text-sm rounded-md hover:bg-gray-100 cursor-pointer"
                          onClick={() => setEndTime(time)}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-[70px] bg-blue-500 text-white absolute bottom-0 right-0"
          >
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
