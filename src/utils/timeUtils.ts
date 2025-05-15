export const convertTimeToMinutes = (time: string): number => {
  const [period, hourMin] = time.split(" ");
  const [hour, minute = "0"] = hourMin.split(":");
  let hours = parseInt(hour);
  if (period === "오후" && hours !== 12) {
    hours += 12;
  } else if (period === "오전" && hours === 12) {
    hours = 0;
  }
  return hours * 60 + parseInt(minute);
};

export const formatTime = (hour: number): string => {
  if (hour === 0) return "";
  if (hour === 12) return "오후 12시";
  if (hour > 12) return `오후 ${hour - 12}시`;
  return `오전 ${hour}시`;
};
