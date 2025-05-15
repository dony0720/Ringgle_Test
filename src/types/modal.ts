import { Schedule } from "./schedule";

export interface ModalDateTimeProps {
  date: Date | undefined;
  startTime: string;
  endTime: string;
  onDateChange: (date: Date | undefined) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

export interface ScheduleFormProps {
  onSubmit: (schedule: Schedule) => void;
  onClose?: () => void;
  initialData?: Partial<Schedule>;
}
export interface ModalTypeButtonsProps {
  selectedType: "event" | "todo" | "appointment";
  onTypeSelect: (type: "event" | "todo" | "appointment") => void;
}
