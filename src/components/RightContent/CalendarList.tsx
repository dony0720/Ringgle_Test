import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState, useEffect } from "react";
import { useSchedule } from "@/hooks/useSchedule";
import { convertTimeToMinutes, formatTime } from "@/utils/timeUtils";
import { Todo } from "@/types/schedule";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CalendarList = () => {
  const currentDate = useSelector((state: RootState) => state.date.currentDate);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const [weekDays, setWeekDays] = useState<
    Array<{ day: string; date: string; fullDate: string }>
  >([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const { loadWeekTasks, deleteTask } = useSchedule();

  // Dialog 상태 관리
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const date = new Date(currentDate);
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - date.getDay());

    const week = Array.from({ length: 7 }, (_, index) => {
      const day = new Date(sunday);
      day.setDate(sunday.getDate() + index);
      // 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      return {
        day: ["일", "월", "화", "수", "목", "금", "토"][index],
        date: day.getDate().toString(),
        fullDate: formatDate(day),
      };
    });
    setWeekDays(week);
    const weekTodos = loadWeekTasks(week[0].fullDate);
    setTodos(weekTodos);
  }, [currentDate]);

  const getTodosForDate = (date: string) => {
    return todos
      .filter((todo) => todo.date === date)
      .map((todo) => ({
        ...todo,
        startMinutes: convertTimeToMinutes(todo.startTime), // 시작 시간을 분 단위로 변환
        endMinutes: convertTimeToMinutes(todo.endTime), // 종료 시간을 분 단위로 변환
      }));
  };

  // 일정 클릭 핸들러
  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsDeleteDialogOpen(true);
  };

  // 일정 삭제 핸들러
  const handleDeleteTodo = () => {
    if (selectedTodo) {
      deleteTask(selectedTodo.id, selectedTodo.date);
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== selectedTodo.id)
      );
      setIsDeleteDialogOpen(false);
      setSelectedTodo(null);
    }
  };

  return (
    <div className="w-[80%] pt-[20px] px-[30px] h-full box-border">
      <div className="flex flex-col bg-white h-full">
        {/* GMT+09 및 요일, 날짜 헤더 */}
        <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-200">
          <div className="p-2 text-[11px] flex justify-center items-center text-gray-500">
            GMT+09
          </div>
          {weekDays.map((item) => (
            <div
              key={item.day}
              className="flex flex-col items-center py-2 border-l border-gray-200"
            >
              <div className="text-xs text-gray-500">{item.day}</div>
              <div
                className={`text-lg font-medium mt-1 ${
                  item.fullDate === new Date().toISOString().split("T")[0]
                    ? "text-white bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center"
                    : ""
                }`}
              >
                {item.date}
              </div>
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
            {weekDays.map((day) => (
              <div key={day.day} className="border-l border-gray-200 relative">
                {/* 시간 그리드 라인 */}
                {hours.map((hour) => (
                  <div
                    key={`${day.day}-${hour}`}
                    className="h-[48px] border-b border-gray-200 hover:bg-gray-50"
                  />
                ))}

                {/* 일정 렌더링 */}
                {getTodosForDate(day.fullDate).map((todo) => {
                  const startHour = Math.floor(todo.startMinutes / 60);
                  const duration = (todo.endMinutes - todo.startMinutes) / 60;

                  return (
                    <div
                      key={todo.id}
                      className="absolute left-0 right-1 rounded-md overflow-hidden bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors"
                      style={{
                        top: `${startHour * 48}px`,
                        height: `${duration * 48}px`,
                        zIndex: 10,
                      }}
                      onClick={() => handleTodoClick(todo)}
                    >
                      <div className="text-sm font-medium p-1">
                        {todo.title}
                      </div>
                      <div className="text-xs text-gray-600 px-1">
                        {todo.startTime} ~ {todo.endTime}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 삭제 확인 Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>일정 삭제</DialogTitle>
            <DialogDescription>
              "{selectedTodo?.title}" 일정을 삭제하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              취소
            </Button>
            <Button variant="destructive" onClick={handleDeleteTodo}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarList;
