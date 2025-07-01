import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Training {
  id: string
  name: string
  description: string
  agent: 'venta' | 'soporte' | 'conversacional'
  status: 'active' | 'inactive' | 'training'
  createdAt: string
  lastUpdated: string
}

const Training = () => {
  const { toast } = useToast()
  const [trainings, setTrainings] = useState<Training[]>([
    {
      id: "1",
      name: "Modelo Base v1.0",
      description: "Entrenamiento inicial con datos básicos de conversación",
      agent: "conversacional",
      status: "active",
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-20"
    },
    {
      id: "2", 
      name: "Modelo Especializado",
      description: "Entrenamiento específico para manejo de objeciones",
      agent: "venta",
      status: "training",
      createdAt: "2024-01-18",
      lastUpdated: "2024-01-22"
    }
  ])

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    agent: "conversacional" as const
  })

  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newTraining: Training = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      agent: formData.agent,
      status: "inactive",
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    }

    setTrainings([...trainings, newTraining])
    setFormData({ name: "", description: "", agent: "conversacional" })
    setShowForm(false)
    
    toast({
      title: "Entrenamiento creado",
      description: "El nuevo entrenamiento ha sido registrado exitosamente.",
    })
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-500",
      inactive: "bg-gray-500", 
      training: "bg-yellow-500"
    }
    
    const labels = {
      active: "Activo",
      inactive: "Inactivo",
      training: "Entrenando"
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Entrenamientos de IA</h1>
          <p className="text-muted-foreground">Administra y registra los entrenamientos del modelo de IA</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Entrenamiento
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nuevo Entrenamiento</CardTitle>
            <CardDescription>Registra un nuevo entrenamiento del modelo de IA</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre del Entrenamiento</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Modelo v2.0"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe el propósito y características del entrenamiento"
                  required
                />
              </div>
              <div>
                <Label htmlFor="agent">Agente IA</Label>
                <Select value={formData.agent} onValueChange={(value: any) => setFormData({ ...formData, agent: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un agente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venta">Venta</SelectItem>
                    <SelectItem value="soporte">Soporte</SelectItem>
                    <SelectItem value="conversacional">Conversacional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Crear Entrenamiento</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Entrenamientos Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Agente</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Creado</TableHead>
                <TableHead>Última Actualización</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainings.map((training) => (
                <TableRow key={training.id}>
                  <TableCell className="font-medium">{training.name}</TableCell>
                  <TableCell>{training.description}</TableCell>
                  <TableCell><Badge variant="outline">{training.agent}</Badge></TableCell>
                  <TableCell>{getStatusBadge(training.status)}</TableCell>
                  <TableCell>{training.createdAt}</TableCell>
                  <TableCell>{training.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Training