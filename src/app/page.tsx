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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

const Home = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center bg-gray-100 p-10">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input placeholder="Adicionar tarefa" />
          <Button variant="default" className="cursor-pointer">
            <Plus />
            Adicionar
          </Button>
        </CardHeader>

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
            <div className=" h-14 flex justify-between items-center border-t-1">
              <div className="w-2 h-full bg-green-300"></div>
              <p className="flex-1 mx-2 text-sm cursor-pointer">
                Estudar React
              </p>
              <div className="text-center flex gap-2 mr-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <SquarePen className="cursor-pointer" size={16} />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar tarefas</DialogTitle>
                    </DialogHeader>
                    <div className="flex">
                      <Input placeholder="Editar tarefa" />
                      <Button className="cursor-pointer">Editar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Trash className="cursor-pointer" size={16} />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="mt-2 flex gap-2">
              <ListCheck size={18} />
              <p className="text-xs">Tarefas concluidas(3/3)</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="text-xs h-7 cursor-pointer"
                  variant="outline"
                >
                  <Trash />
                  Limpar tarefas Concluidas
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que quer excluir x itens?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Sim</AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
