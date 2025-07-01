import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Brain, Database, Phone, MessageSquare, TrendingUp, Users, Activity } from "lucide-react"

const Index = () => {
  // Mock data for dashboard metrics
  const metrics = {
    trainings: {
      total: 12,
      active: 3,
      lastWeekGrowth: 25
    },
    conversations: {
      total: 1247,
      thisMonth: 342,
      lastWeekGrowth: 15
    },
    mikrowisp: {
      lastSync: "2024-01-22 14:30",
      recordsTransferred: 1250,
      successRate: 98.5
    },
    calls: {
      totalToday: 45,
      completed: 38,
      averageDuration: "00:04:32"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Panel de control de entrenamientos y operaciones de IA</p>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrenamientos Activos</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.trainings.active}</div>
            <p className="text-xs text-muted-foreground">
              de {metrics.trainings.total} totales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ciclos Conversacionales</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversations.thisMonth}</div>
            <p className="text-xs text-muted-foreground">
              este mes (+{metrics.conversations.lastWeekGrowth}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registros Mikrowisp</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.mikrowisp.recordsTransferred}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.mikrowisp.successRate}% éxito
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Llamadas Hoy</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.calls.completed}</div>
            <p className="text-xs text-muted-foreground">
              de {metrics.calls.totalToday} intentos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>Últimas operaciones del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sincronización Mikrowisp completada</p>
                  <p className="text-xs text-muted-foreground">hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nuevo entrenamiento iniciado</p>
                  <p className="text-xs text-muted-foreground">hace 4 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">45 llamadas procesadas</p>
                  <p className="text-xs text-muted-foreground">hace 6 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Test de sandbox ejecutado</p>
                  <p className="text-xs text-muted-foreground">hace 8 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Estado del Sistema
            </CardTitle>
            <CardDescription>Monitoreo de servicios principales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Mikrowisp</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Activo</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">RingByName</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Activo</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">GoHighLevel</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Activo</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">IA Training Engine</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-yellow-600">Entrenando</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Operaciones frecuentes del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <Brain className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Nuevo Entrenamiento</h3>
              <p className="text-sm text-muted-foreground">Iniciar entrenamiento de IA</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <Database className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Sync Mikrowisp</h3>
              <p className="text-sm text-muted-foreground">Sincronizar datos manualmente</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <MessageSquare className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Test IA</h3>
              <p className="text-sm text-muted-foreground">Probar modelo en sandbox</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <BarChart3 className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Ver Reportes</h3>
              <p className="text-sm text-muted-foreground">Análisis detallado</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
