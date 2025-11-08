"use server";

import { prisma } from "@/utils/prisma";

type EditTaskParams = {
  idTask: string;
  newTask: string;
};

export const editTask = async ({ idTask, newTask }: EditTaskParams) => {
  try {
    if (!idTask || !newTask) {
      return;
    }
    const editedTask = await prisma.tasks.update({
      where: { id: idTask },
      data: { task: newTask },
    });
    if (!editedTask) {
      return;
    }
    return editedTask;
  } catch (error) {
    console.error("Erro ao editar a tarefa:", error);
  }
};
