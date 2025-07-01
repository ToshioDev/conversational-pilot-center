import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download, RefreshCw, Phone, Clock, User } from "lucide-react"

interface CallRecord {
  id: string
  timestamp: string
  phoneNumber: string
  duration: string
  direction: 'inbound' | 'outbound'
  status: 'completed' | 'missed' | 'busy' | 'failed'
  agent: string
  callId: string
  recording?: string
}

const RingByName = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [calls] = useState<CallRecord[]>([
    {
      id: "1",
      timestamp: "2024-01-22 16:45:30",
      phoneNumber: "+1234567890",
      duration: "00:05:23",
      direction: "inbound",
      status: "completed",
      agent: "Ana García",
      callId: "RBN-2024-001",
      recording: "recording_001.mp3"
    },
    {
      id: "2",
      timestamp: "2024-01-22 15:20:15",
      phoneNumber: "+1987654321",
      duration: "00:02:45",
      direction: "outbound",
      status: "completed",
      agent: "Carlos López",
      callId: "RBN-2024-002"
    },
    {
      id: "3",
      timestamp: "2024-01-22 14:10:08",
      phoneNumber: "+1555123456",
      duration: "00:00:00",
      direction: "inbound",
      status: "missed",
      agent: "Sistema",
      callId: "RBN-2024-003"
    },
    {
      id: "4",
      timestamp: "2024-01-22 13:35:42",
      phoneNumber: "+1777888999",
      duration: "00:08:17",
      direction: "outbound",
      status: "completed",
      agent: "María Rodríguez",
      callId: "RBN-2024-004",
      recording: "recording_004.mp3"
    },
    {
      id: "5",
      timestamp: "2024-01-22 12:15:33",
      phoneNumber: "+1444555666",
      duration: "00:00:12",
      direction: "inbound",
      status: "busy",
      agent: "Sistema",
      callId: "RBN-2024-005"
    }
  ])

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-500",
      missed: "bg-red-500",
      busy: "bg-yellow-500",
      failed: "bg-gray-500"
    }
    
    const labels = {
      completed: "Completada",
      missed: "Perdida",
      busy: "Ocupado",
      failed: "Fallida"
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const getDirectionIcon = (direction: string) => {
    return direction === 'inbound' ? (
      <Badge variant="outline" className="text-blue-600">
        ← Entrante
      </Badge>
    ) : (
      <Badge variant="outline" className="text-green-600">
        → Saliente
      </Badge>
    )
  }

  const filteredCalls = calls.filter(call =>
    call.phoneNumber.includes(searchTerm) ||
    call.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.callId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: calls.length,
    completed: calls.filter(c => c.status === 'completed').length,
    missed: calls.filter(c => c.status === 'missed').length,
    inbound: calls.filter(c => c.direction === 'inbound').length,
    outbound: calls.filter(c => c.direction === 'outbound').length
  }

  const totalDuration = calls
    .filter(c => c.status === 'completed')
    .reduce((acc, call) => {
      const [hours, minutes, seconds] = call.duration.split(':').map(Number)
      return acc + hours * 3600 + minutes * 60 + seconds
    }, 0)

  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bitácora RingByName</h1>
        <p className="text-muted-foreground">Registro y monitoreo de llamadas telefónicas</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Llamadas</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            <Phone className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perdidas</CardTitle>
            <Phone className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.missed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrantes</CardTitle>
            <User className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inbound}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Total</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{formatTotalDuration(totalDuration)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por teléfono, agente o ID de llamada..."
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

      {/* Calls Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Llamadas</CardTitle>
          <CardDescription>Historial detallado de llamadas telefónicas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>ID Llamada</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Agente</TableHead>
                <TableHead>Grabación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell className="font-mono text-sm">{call.timestamp}</TableCell>
                  <TableCell className="font-medium">{call.callId}</TableCell>
                  <TableCell>{call.phoneNumber}</TableCell>
                  <TableCell>{getDirectionIcon(call.direction)}</TableCell>
                  <TableCell className="font-mono">{call.duration}</TableCell>
                  <TableCell>{getStatusBadge(call.status)}</TableCell>
                  <TableCell>{call.agent}</TableCell>
                  <TableCell>
                    {call.recording ? (
                      <Button size="sm" variant="outline">
                        Reproducir
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-sm">No disponible</span>
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

export default RingByName