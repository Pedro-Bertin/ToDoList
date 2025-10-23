"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  List,
  Check,
  MoveDownRight,
  SquarePen,
  Trash,
  ListCheck,
  Sigma,
} from "lucide-react";

import { getTasksFromDB } from "@/actions/get-tasks-from-db";

import EditTask from "@/components/edit-task";
import ClearTrash from "@/components/trash-tasks";
import { useEffect, useState } from "react";
import { Tasks } from "@/generated/prisma";
import { NewTask } from "@/actions/add-task";

const Home = () => {
  const [tasksList, setTasksList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");

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
    try {
      if (!task || task.length === 0) {
        return;
      }
      const myNewTask = await NewTask(task);

      if (!myNewTask) {
        return;
      }

      await handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <main className="w-full h-screen flex justify-center items-center bg-gray-100 p-10">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input
            placeholder="Adicionar tarefa"
            onChange={(e) => setTask(e.target.value)}
          />
          <Button
            variant="default"
            className="cursor-pointer"
            onClick={handleAddTask}
          >
            <Plus />
            Adicionar
          </Button>
        </CardHeader>

        <Button onClick={handleGetTasks}>Busacar tarefas</Button>

        <CardContent>
          <Separator className="mb-4" />
          <div className="flex gap-2">
            <Badge className="cursor-pointer" variant="default">
              <List />
              Tarefas
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <Check />
              check
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <MoveDownRight />
              Tarefas
            </Badge>
          </div>

          <div className="mt-4 border-b-1">
            {tasksList.map((task) => (
              <div
                className=" h-14 flex justify-between items-center border-t-1"
                key={task.id}
              >
                <div className="w-2 h-full bg-green-300"></div>
                <p className="flex-1 mx-2 text-sm cursor-pointer">
                  {task.task}
                </p>
                <div className="text-center flex gap-2 mr-2">
                  <EditTask />
                  <Trash className="cursor-pointer" size={16} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="mt-2 flex gap-2">
              <ListCheck size={18} />
              <p className="text-xs">Tarefas concluidas(3/3)</p>
            </div>
            <ClearTrash />
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{ width: "50%" }}
            ></div>
          </div>

          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">3 tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
