import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Category } from "@/lib/api"

interface CreateProductDialogProps {
  open: boolean
  categories: Category[]
  onOpenChange: (open: boolean) => void
  onCreate: (data: { name: string; price: string; imageUrl: string; categoryId: string }) => void
}

export function CreateProductDialog({ open, categories, onOpenChange, onCreate }: CreateProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    categoryId: "",
  })

  const resetForm = () => {
    setFormData({ name: "", price: "", imageUrl: "", categoryId: "" })
  }

  const handleCreate = () => {
    onCreate(formData)
    resetForm()
  }

  const handleCancel = () => {
    onOpenChange(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produto</DialogTitle>
          <DialogDescription>Crie um novo produto de pelúcia para sua loja.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="create-name">Nome</Label>
            <Input
              id="create-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Urso Fofinho"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-price">Preço</Label>
            <Input
              id="create-price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="24.99"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-category">Categoria</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
            >
              <SelectTrigger id="create-category" className="w-full">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-image">URL da Imagem</Label>
            <Input
              id="create-image"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="/placeholder.svg?height=300&width=300"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleCreate} disabled={!formData.name || !formData.price || !formData.categoryId}>
            Criar Produto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
