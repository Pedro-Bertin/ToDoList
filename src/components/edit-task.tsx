import { SquarePen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const EditTask = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen className="cursor-pointer" size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefas</DialogTitle>
        </DialogHeader>
        <div className="flex gap-x-2">
          <Input placeholder="Editar tarefa" />
          <Button className="cursor-pointer">Editar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
