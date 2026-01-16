import { Button } from "@/components/ui/button"
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import type { Product, Category } from "@/lib/api"

interface ProductsTableProps {
  products: Product[]
  currentPage: number
  itemsPerPage: number
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
  onPageChange: (page: number) => void
}

export function ProductsTable({
  products,
  currentPage,
  itemsPerPage,
  onEdit,
  onDelete,
  onPageChange,
}: ProductsTableProps) {
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">Imagem</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Nome</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Categoria</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Preço</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedProducts.map((product) => {
              return (
                <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <img
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-muted"
                    />
                  </td>
                  <td className="p-4 font-medium text-foreground">{product.name}</td>
                  <td className="p-4 text-muted-foreground">{product.category?.name}</td>
                  <td className="p-4 text-foreground">R$ {product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(product)} className="gap-2">
                        <Pencil className="h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(product)}
                        className="gap-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1} até {Math.min(startIndex + itemsPerPage, products.length)} de{" "}
            {products.length} produtos
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="w-9"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="gap-1"
            >
              Próxima
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
