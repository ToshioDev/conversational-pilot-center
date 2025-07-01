import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download, RefreshCw } from "lucide-react"

interface DataMovement {
  id: string
  timestamp: string
  operation: string
  recordsCount: number
  status: 'success' | 'error' | 'pending'
  source: string
  destination: string
  errorMessage?: string
}

const Mikrowisp = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [movements] = useState<DataMovement[]>([
    {
      id: "1",
      timestamp: "2024-01-22 14:30:25",
      operation: "Sincronización de Clientes",
      recordsCount: 150,
      status: "success",
      source: "Mikrowisp DB",
      destination: "GHL CRM"
    },
    {
      id: "2",
      timestamp: "2024-01-22 12:15:10",
      operation: "Actualización de Facturas",
      recordsCount: 75,
      status: "success",
      source: "Mikrowisp DB",
      destination: "GHL CRM"
    },
    {
      id: "3",
      timestamp: "2024-01-22 10:45:33",
      operation: "Migración de Servicios",
      recordsCount: 0,
      status: "error",
      source: "Mikrowisp DB",
      destination: "GHL CRM",
      errorMessage: "Error de conexión a API"
    },
    {
      id: "4",
      timestamp: "2024-01-22 09:20:15",
      operation: "Respaldo de Datos",
      recordsCount: 300,
      status: "pending",
      source: "Mikrowisp DB",
      destination: "GHL CRM"
    }
  ])

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "bg-green-500",
      error: "bg-red-500",
      pending: "bg-yellow-500"
    }
    
    const labels = {
      success: "Exitoso",
      error: "Error",
      pending: "Pendiente"
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const filteredMovements = movements.filter(movement =>
    movement.operation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.destination.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: movements.length,
    success: movements.filter(m => m.status === 'success').length,
    errors: movements.filter(m => m.status === 'error').length,
    pending: movements.filter(m => m.status === 'pending').length
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bitácora Mikrowisp → GHL</h1>
        <p className="text-muted-foreground">Registro de movimientos de datos entre Mikrowisp y GoHighLevel</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Movimientos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exitosos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.success}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.errors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por operación, origen o destino..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Data Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Movimientos</CardTitle>
          <CardDescription>Historial detallado de transferencias de datos</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Operación</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Registros</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Detalles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell className="font-mono text-sm">{movement.timestamp}</TableCell>
                  <TableCell className="font-medium">{movement.operation}</TableCell>
                  <TableCell>{movement.source}</TableCell>
                  <TableCell>{movement.destination}</TableCell>
                  <TableCell>{movement.recordsCount}</TableCell>
                  <TableCell>{getStatusBadge(movement.status)}</TableCell>
                  <TableCell>
                    {movement.errorMessage && (
                      <span className="text-sm text-red-600">{movement.errorMessage}</span>
                    )}
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

export default Mikrowisp