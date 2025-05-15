import { useState, useEffect } from "react";
import { Task, GroupedTasks } from "@/types/schedule";

export const useSchedule = () => {
  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({});

  // 주의 시작일을 계산하는 함수
  const getWeekStartDate = (date: string): string => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day; // 일요일을 시작으로
    const monday = new Date(d.setDate(diff));
    return monday.toISOString().split("T")[0];
  };

  // localStorage에서 tasks를 주별로 불러오기
  const loadTasks = () => {
    const result: GroupedTasks = {};

    // localStorage의 모든 키를 가져와서 주별로 처리
    Object.keys(localStorage)
      .filter((key) => key.match(/^\d{4}-\d{2}-\d{2}$/))
      .forEach((key) => {
        const tasks = JSON.parse(localStorage.getItem(key) || "[]");
        const weekStartDate = getWeekStartDate(key);

        if (!result[weekStartDate]) {
          result[weekStartDate] = { tasks: [] };
        }

        result[weekStartDate].tasks = [
          ...result[weekStartDate].tasks,
          ...tasks,
        ].sort((a: Task, b: Task) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          const dateCompare = dateA.getTime() - dateB.getTime();
          return dateCompare === 0
            ? a.startTime.localeCompare(b.startTime)
            : dateCompare;
        });
      });

    setGroupedTasks(result);
  };

  // 특정 주의 tasks 불러오기
  const loadWeekTasks = (weekStartDate: string) => {
    // 주의 시작일과 종료일 설정
    const startDate = new Date(weekStartDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // 일주일 후 (토요일)

    const result: Task[] = [];
    const checkingDate = new Date(startDate); // 순회용 날짜 (시작일부터)

    while (checkingDate <= endDate) {
      const dateStr = checkingDate.toISOString().split("T")[0];
      const tasks = JSON.parse(localStorage.getItem(dateStr) || "[]");
      result.push(...tasks);
      checkingDate.setDate(checkingDate.getDate() + 1);
    }

    return result.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const dateCompare = dateA.getTime() - dateB.getTime();
      return dateCompare === 0
        ? a.startTime.localeCompare(b.startTime)
        : dateCompare;
    });
  };

  // 새로운 task 추가
  const addTask = (newTask: Task) => {
    const date = newTask.date;
    const existingTasks = JSON.parse(localStorage.getItem(date) || "[]");
    existingTasks.push(newTask);

    // 시작 시간순으로 정렬
    existingTasks.sort((a: Task, b: Task) =>
      a.startTime.localeCompare(b.startTime)
    );

    localStorage.setItem(date, JSON.stringify(existingTasks));
    loadTasks();
  };

  // task 삭제
  const deleteTask = (taskId: number, date: string) => {
    const existingTasks = JSON.parse(localStorage.getItem(date) || "[]");
    const updatedTasks = existingTasks.filter(
      (task: Task) => task.id !== taskId
    );

    if (updatedTasks.length === 0) {
      localStorage.removeItem(date);
    } else {
      localStorage.setItem(date, JSON.stringify(updatedTasks));
    }

    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    groupedTasks,
    addTask,
    deleteTask,
    loadTasks,
    loadWeekTasks,
    getWeekStartDate,
  };
};
