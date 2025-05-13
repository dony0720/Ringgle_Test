import { useState, useEffect } from "react";
import { Task, GroupedTasks } from "@/types/schedule";

export const useSchedule = () => {
  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({});

  // localStorage에서 tasks를 날짜별로 불러오기
  const loadTasks = () => {
    const result: GroupedTasks = {};

    // localStorage의 모든 키를 가져와서 날짜별로 처리
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // YYYY-MM-DD 형식의 키만 처리
        const tasks = JSON.parse(localStorage.getItem(key) || "[]");
        result[key] = {
          tasks: tasks.sort((a: Task, b: Task) =>
            a.startTime.localeCompare(b.startTime)
          ),
        };
      }
    }

    setGroupedTasks(result);
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
      localStorage.removeItem(date); // 해당 날짜의 모든 task가 삭제되면 키도 삭제
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
  };
};
