import { Button } from "@/components/ui/button";
import { ModalTypeButtonsProps } from "@/types/modal";

const ModalTypeButtons = ({
  selectedType,
  onTypeSelect,
}: ModalTypeButtonsProps) => {
  const getButtonStyle = (type: "event" | "todo" | "appointment") => {
    return selectedType === type
      ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
      : "bg-white text-gray-500 hover:bg-gray-100 shadow-none";
  };

  return (
    <div className="w-[330px] ml-[50px] flex flex-row gap-[10px]">
      <Button
        className={getButtonStyle("event")}
        onClick={() => onTypeSelect("event")}
      >
        이벤트
      </Button>
      <Button
        className={getButtonStyle("todo")}
        onClick={() => onTypeSelect("todo")}
      >
        할 일
      </Button>
      <Button
        className={getButtonStyle("appointment")}
        onClick={() => onTypeSelect("appointment")}
      >
        약속 일정
      </Button>
    </div>
  );
};

export default ModalTypeButtons;
