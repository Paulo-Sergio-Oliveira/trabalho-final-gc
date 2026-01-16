import { useEffect, useState } from "react"
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
import type { Product, Category } from "@/lib/api"

interface EditProductDialogProps {
  open: boolean
  product: Product | null
  categories: Category[]
  onOpenChange: (open: boolean) => void
  onUpdate: (data: { name: string; price: string; image: string; categoryId: string }) => void
}

export function EditProductDialog({ open, product, categories, onOpenChange, onUpdate }: EditProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    categoryId: "",
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        image: product.imageUrl,
        categoryId: product.categoryId,
      })
    }
  }, [product])

  const resetForm = () => {
    setFormData({ name: "", price: "", image: "", categoryId: "" })
  }

  const handleUpdate = () => {
    onUpdate(formData)
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
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>Atualize as informações do produto.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-price">Preço</Label>
            <Input
              id="edit-price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-category">Categoria</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
            >
              <SelectTrigger id="edit-category" className="w-full">
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
            <Label htmlFor="edit-image">URL da Imagem</Label>
            <Input
              id="edit-image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleUpdate}>Atualizar Produto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
