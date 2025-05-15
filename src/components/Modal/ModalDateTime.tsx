import { ClockIcon } from "@heroicons/react/24/outline";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModalDateTimeProps } from "@/types/modal";

const ModalDateTime = ({
  date,
  startTime,
  endTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
}: ModalDateTimeProps) => {
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const timeToMinutes = (time: string) => {
    const [period, timeStr] = time.split(" ");
    const [hours, minutes] = timeStr.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes;

    if (period === "오후" && hours !== 12) {
      totalMinutes += 12 * 60;
    } else if (period === "오전" && hours === 12) {
      totalMinutes = minutes;
    }

    return totalMinutes;
  };

  const minutesToTime = (totalMinutes: number) => {
    let hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const period = hours < 12 ? "오전" : "오후";

    if (hours === 0) hours = 12;
    else if (hours > 12) hours -= 12;

    return `${period} ${hours}:${minutes === 0 ? "00" : minutes}`;
  };

  const getTimeOneHourLater = (time: string) => {
    const minutes = timeToMinutes(time);
    return minutesToTime(minutes + 60);
  };

  const handleStartTimeChange = (time: string) => {
    onStartTimeChange(time);
    const oneHourLater = getTimeOneHourLater(time);
    onEndTimeChange(oneHourLater);
  };

  const generateAllTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      // 0시부터 23시까지 반복
      for (let minute = 0; minute < 60; minute += 30) {
        // 0분부터 59분까지 30분 간격으로 반복
        const period = hour < 12 ? "오전" : "오후"; // 시간대 확인
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour; // 12시간 형식으로 변환
        const displayMinute = minute === 0 ? "00" : minute; // 분 표시
        times.push(`${period} ${displayHour}:${displayMinute}`); // 시간 추가
      }
    }
    return times;
  };

  const generateEndTimeOptions = () => {
    return generateAllTimeOptions().filter(
      (time) => timeToMinutes(time) > timeToMinutes(startTime)
    );
  };

  return (
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
            <Calendar selected={date} onSelect={onDateChange} />
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
                {generateAllTimeOptions().map((time) => (
                  <div
                    key={time}
                    className="px-2 py-1 text-sm rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStartTimeChange(time)}
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
                {generateEndTimeOptions().map((time) => (
                  <div
                    key={time}
                    className="px-2 py-1 text-sm rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => onEndTimeChange(time)}
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
  );
};

export default ModalDateTime;
