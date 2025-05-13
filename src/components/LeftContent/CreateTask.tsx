import { PlusIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CreateTask = () => {
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
          <div className="flex flex-col">
            <div className="h-[40px] p-[10px] box-border text-sm font-medium hover:cursor-pointer hover:bg-gray-100">
              이벤트
            </div>
            <div className="h-[40px] p-[10px] box-border text-sm font-medium hover:cursor-pointer hover:bg-gray-100">
              할일
            </div>
            <div className="h-[40px] p-[10px] box-border text-sm font-medium hover:cursor-pointer hover:bg-gray-100">
              약속일정
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CreateTask;
