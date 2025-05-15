export interface TaskType {
  type: "event" | "todo" | "appointment";
}

export interface TaskInformation {
  title: string;
  type: TaskType["type"];
  date: string;
  startTime: string;
  endTime: string;
}
