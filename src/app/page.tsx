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
import { Plus, List, Check, MoveDownRight } from "lucide-react";

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
            <Badge className="cursor-pointer">
              <List />
              Tarefas
            </Badge>
            <Badge className="cursor-pointer">
              <Check />
              check
            </Badge>
            <Badge className="cursor-pointer">
              <MoveDownRight />
              Tarefas
            </Badge>
          </div>

          <div className="h-14">
            <div className="bg-green-600 h-8">
              <div className="w-2 h-full "></div>
              <p className="text-center text-gray-500 mt-4">Estudar React</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
