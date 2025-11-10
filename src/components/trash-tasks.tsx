import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { memo, useState } from "react";

type ClearTrashProps = {
  count: number;
  onConfirm: () => void | Promise<void>;
  className?: string;
  tringgerLabel?: string;
  varient?: React.ComponentProps<typeof Button>["variant"];
  disable?: boolean;
};

const ClearTrash = memo(function ClearTrash({
  count,
  onConfirm,
  className = "text-xs h-7 cursor-pointer gap-2",
  tringgerLabel = "Limpar tarefas Concluidas",
  varient = "outline",
  disable,
}: ClearTrashProps) {
  const [loading, setLoading] = useState(false);
  const isDisabled = (disable ?? false) || count === 0;
  const plural = count === 1 ? "Item" : "Itens";
  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={className}
          variant={varient}
          disabled={isDisabled || loading}
          aria-label={tringgerLabel}
        >
          <Trash size={16} />
          {tringgerLabel}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm sm:text-base">
            {isDisabled
              ? "Não há tarefas concluídas para limpar."
              : `Tem certeza que quer excluir ${count} ${plural}?`}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>
            {!isDisabled && (
              <AlertDialogAction onClick={handleConfirm} disabled={loading}>
                {loading ? "Excluindo..." : "Sim"}
              </AlertDialogAction>
            )}
          </AlertDialogAction>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default ClearTrash;
