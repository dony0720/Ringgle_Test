const CalendarList = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = [
    { day: "일", date: "18" },
    { day: "월", date: "19" },
    { day: "화", date: "20" },
    { day: "수", date: "21" },
    { day: "목", date: "22" },
    { day: "금", date: "23" },
    { day: "토", date: "24" },
  ];

  const formatTime = (hour: number) => {
    if (hour === 0) return ""; // 오전 12시는 표시하지 않음
    if (hour === 12) return "오후 12시";
    if (hour > 12) return `오후 ${hour - 12}시`;
    return `오전 ${hour}시`;
  };

  return (
    <div className="w-[80%] pt-[20px] px-[30px] h-full box-border">
      <div className="flex flex-col bg-white h-full">
        {/* GMT+09 및 요일, 날짜 헤더 */}
        <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-200">
          <div className="p-2 text-[11px] flex justify-center items-center text-gray-500">
            GMT+09
          </div>
          {days.map((item) => (
            <div
              key={item.day}
              className="flex flex-col items-center py-2 border-l border-gray-200"
            >
              <div className="text-xs text-gray-500">{item.day}</div>
              <div className="text-lg font-medium mt-1">{item.date}</div>
            </div>
          ))}
        </div>

        {/* 시간 및 일정 그리드 */}
        <div className="flex flex-1 overflow-auto">
          {/* 시간 열 */}
          <div className="w-[60px] relative">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-[48px] pr-2 text-right text-[11px] text-gray-500 relative"
                style={{ top: "-8px" }}
              >
                {formatTime(hour)}
              </div>
            ))}
          </div>

          {/* 일정 그리드 */}
          <div className="flex-1 grid grid-cols-7">
            {days.map((day) => (
              <div key={day.day} className="border-l border-gray-200">
                {hours.map((hour) => (
                  <div
                    key={`${day.day}-${hour}`}
                    className="h-[48px] border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarList;
