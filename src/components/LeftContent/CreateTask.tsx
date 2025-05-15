import { PlusIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import ModalTitle from "../Modal/ModalTitle";
import ModalDateTime from "../Modal/ModalDateTime";
import ModalTypeButtons from "../Modal/ModalTypeButtons";
import { useSchedule } from "@/hooks/useSchedule";
import { TaskType, TaskInformation } from "@/types/task";
import { useDispatch } from "react-redux";
import { setDate } from "@/store/dateSlice";

const CreateTask = () => {
  const { addTask } = useSchedule();
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [taskInformation, setTaskInformation] = useState<TaskInformation>({
    title: "",
    type: "event",
    date: formatDate(new Date()),
    startTime: "오전 12:00",
    endTime: "오전 01:00",
  });

  const saveTask = () => {
    const newTask = {
      ...taskInformation,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    addTask(newTask);

    // 현재 날짜 새로고침
    dispatch(setDate(new Date(taskInformation.date).toISOString()));

    // 저장 후 초기화
    setTaskInformation({
      title: "",
      type: "event",
      date: formatDate(new Date()),
      startTime: "오전 12:00",
      endTime: "오전 01:00",
    });

    // 모달 닫기
    setIsDialogOpen(false);
  };

  const buttonData = [
    { type: "event", label: "이벤트" },
    { type: "todo", label: "할일" },
    { type: "appointment", label: "약속일정" },
  ];

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[128px] h-[50px] rounded-[40px]"
          >
            <PlusIcon className="w-10 h-10 " />
            <div>만들기</div>
            <ChevronDownIcon className="w-6 h-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[100px] shadow-lg p-0">
          <Dialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            modal={false}
          >
            {buttonData.map((button) => (
              <DialogTrigger asChild key={button.type}>
                <Button
                  variant="outline"
                  className="w-full h-[40px] p-[10px] box-border text-sm font-medium hover:cursor-pointer hover:bg-gray-100 border-none shadow-none justify-start"
                  onClick={() => {
                    setTaskInformation((prev) => ({
                      ...prev,
                      type: button.type as TaskType["type"],
                    }));
                    setIsDialogOpen(true);
                  }}
                >
                  {button.label}
                </Button>
              </DialogTrigger>
            ))}
            <DialogContent
              className="w-[450px] h-[520px]"
              onPointerDownOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()}
            >
              <DialogTitle className="sr-only">일정 생성</DialogTitle>
              <div className="flex flex-col mt-[30px] gap-[30px] relative ">
                <ModalTitle
                  title={taskInformation.title}
                  onTitleChange={(title) =>
                    setTaskInformation((prev) => ({
                      ...prev,
                      title,
                    }))
                  }
                />
                <ModalTypeButtons
                  selectedType={taskInformation.type}
                  onTypeSelect={(type) =>
                    setTaskInformation((prev) => ({
                      ...prev,
                      type,
                    }))
                  }
                />
                <ModalDateTime
                  date={new Date(taskInformation.date)}
                  startTime={taskInformation.startTime}
                  endTime={taskInformation.endTime}
                  onDateChange={(date) =>
                    setTaskInformation((prev) => ({
                      ...prev,
                      date: date ? formatDate(date) : formatDate(new Date()),
                    }))
                  }
                  onStartTimeChange={(time) =>
                    setTaskInformation((prev) => ({
                      ...prev,
                      startTime: time,
                    }))
                  }
                  onEndTimeChange={(time) =>
                    setTaskInformation((prev) => ({
                      ...prev,
                      endTime: time,
                    }))
                  }
                />
                <Button
                  onClick={saveTask}
                  className="w-[80px] h-[40px] bg-blue-500 text-white absolute bottom-0 right-0"
                >
                  저장
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CreateTask;
