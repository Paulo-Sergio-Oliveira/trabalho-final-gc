import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Product } from "@/lib/api"

interface DeleteProductDialogProps {
  open: boolean
  product: Product | null
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteProductDialog({ open, product, onOpenChange, onConfirm }: DeleteProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Produto</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir "{product?.name}"? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
