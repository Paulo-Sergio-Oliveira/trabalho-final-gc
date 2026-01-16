"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Home, Lock } from "lucide-react"
import { login } from "@/lib/auth"

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate a small delay for better UX
    setTimeout(() => {
      const success = login(formData.username, formData.password)

      if (success) {
        router.push("/admin")
      } else {
        setError("Usuário ou senha inválidos")
        setIsLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-serif italic text-foreground">CéudePelúcia Admin</h1>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Voltar à Loja
            </Button>
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Login de Administrador</CardTitle>
            <CardDescription>Digite suas credenciais para acessar o painel administrativo</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Digite o usuário"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Digite a senha"
                  required
                  disabled={isLoading}
                />
              </div>
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                <strong>Credenciais de Demonstração:</strong>
                <br />
                Usuário: admin | Senha: admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
