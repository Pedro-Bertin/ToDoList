"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash, ListCheck, Sigma, LoaderCircle } from "lucide-react";

import { getTasksFromDB } from "@/actions/get-tasks-from-db";

import EditTask from "@/components/edit-task";
import Filter, { FilterType } from "@/components/filter-task";
import ClearTrash from "@/components/trash-tasks";
import { useEffect, useState } from "react";
import { Tasks } from "@/generated/prisma";
import { NewTask } from "@/actions/add-task";
import { deleteTask } from "@/actions/delete-task";
import { toast } from "sonner";
import { updateTodo } from "@/actions/toggle-done";

import { deletedCompletedTask } from "@/actions/clear-completedtasks";

const Home = () => {
  const [tasksList, setTasksList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([]);

  const handleGetTasks = async () => {
    try {
      const tasks = await getTasksFromDB();
      if (!tasks) {
        return;
      }
      setTasksList(tasks);
    } catch (error) {
      throw error;
    }
  };

  const handleAddTask = async () => {
    setLoading(true);
    try {
      if (!task || task.length === 0) {
        toast.error("Digite uma tarefa válida.");
        setLoading(false);
        return;
      }
      const myNewTask = await NewTask(task);

      if (!myNewTask) {
        return;
      }

      await handleGetTasks();
      toast.success("Tarefa adicionada com sucesso!");
      setTask("");
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      if (!id || id.length === 0) {
        return;
      }
      const deleted = await deleteTask(id);

      if (!deleted) {
        return;
      }

      await handleGetTasks();
      toast.success("Tarefa deletada com sucesso!");
    } catch (error) {
      throw error;
    }
  };

  const handleToggleTaskDone = async (id: string) => {
    console.log(tasksList);

    const previusTask = [...tasksList];

    try {
      setTasksList((prev) => {
        const updateTaskList = prev.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              done: !task.done,
            };
          } else {
            return task;
          }
        });
        return updateTaskList;
      });
      await updateTodo(id);
    } catch (error) {
      setTasksList(previusTask);
      throw error;
    }
  };

  const clearCompletedTask = async () => {
    const deletedTasks = await deletedCompletedTask();

    if (!deletedTasks) {
      return;
    }

    setTasksList(deletedTasks || []);
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  useEffect(() => {
    switch (currentFilter) {
      case "all":
        setFilteredTasks(tasksList);
        break;
      case "pending":
        const pendingTasks = tasksList.filter((task) => !task.done);
        setFilteredTasks(pendingTasks);
        break;
      case "completed":
        const completedTasks = tasksList.filter((task) => task.done);
        setFilteredTasks(completedTasks);
        break;
    }
  }, [currentFilter, tasksList]);

  const doneCount = tasksList.filter((task) => task.done).length;
  const total = tasksList.length;

  return (
    <main className="w-full h-screen flex justify-center items-center bg-gray-100 p-10">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input
            placeholder="Adicionar tarefa"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <Button
            variant="default"
            className="cursor-pointer"
            onClick={handleAddTask}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : <Plus />}
            Adicionar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          <Filter
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />

          <div className="mt-4 border-b-1">
            {tasksList.length === 0 && (
              <p className="text-sm border-t-1 py-4">
                Você não possui nenhuma atividade cadastrada.
              </p>
            )}
            {filteredTasks.map((task) => (
              <div
                className=" h-14 flex justify-between items-center border-t-1"
                key={task.id}
              >
                <div
                  className={` ${
                    task.done
                      ? "w-2 h-full bg-green-300"
                      : "w-2 h-full bg-red-400"
                  }`}
                ></div>
                <p
                  className="flex-1 mx-2 text-sm cursor-pointer"
                  onClick={() => handleToggleTaskDone(task.id)}
                >
                  {task.task}
                </p>
                <div className="text-center flex gap-2 mr-2">
                  <EditTask task={task} handleGetTasks={handleGetTasks} />
                  <Trash
                    className="cursor-pointer"
                    size={16}
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="mt-2 flex gap-2">
              <ListCheck size={18} />
              <p className="text-xs">
                Tarefas concluidas(
                {tasksList.filter((task) => task.done).length}/
                {tasksList.length})
              </p>
            </div>
            <ClearTrash count={doneCount} onConfirm={clearCompletedTask} />
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{
                width: `${
                  (tasksList.filter((task) => task.done).length /
                    tasksList.length) *
                  100
                }%`,
              }}
            ></div>
          </div>

          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">{tasksList.length} tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
