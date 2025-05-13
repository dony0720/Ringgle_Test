export type ScheduleType = "event" | "todo" | "appointment";

export interface Schedule {
  title: string;
  type: ScheduleType;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Task extends Schedule {
  id: number;
  createdAt: string;
}

export interface GroupedTasks {
  [date: string]: {
    tasks: Task[];
  };
}

export interface ScheduleFormProps {
  onSubmit: (schedule: Schedule) => void;
  onClose?: () => void;
  initialData?: Partial<Schedule>;
}
