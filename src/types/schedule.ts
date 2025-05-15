export type ScheduleType = "event" | "todo" | "appointment"; //단순한 문자열 값들로 type 정의

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

export interface Todo {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  createdAt: string;
}

export interface GroupedTasks {
  [weekStartDate: string]: {
    tasks: Todo[];
  };
}

export interface ScheduleFormProps {
  onSubmit: (schedule: Schedule) => void;
  onClose?: () => void;
  initialData?: Partial<Schedule>;
}
