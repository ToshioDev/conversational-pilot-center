import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Bot, User, Settings, TestTube, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

interface TestConfig {
  model: string
  temperature: number
  maxTokens: number
  scenario: string
}

const Sandbox = () => {
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?",
      role: "assistant",
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const [testConfig, setTestConfig] = useState<TestConfig>({
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 500,
    scenario: "general"
  })

  const testScenarios = [
    { value: "general", label: "Conversación General" },
    { value: "sales", label: "Manejo de Objeciones de Venta" },
    { value: "support", label: "Soporte Técnico" },
    { value: "appointment", label: "Agendamiento de Citas" },
    { value: "qualification", label: "Calificación de Leads" }
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulated AI response
    setTimeout(() => {
      const responses = [
        "Entiendo tu consulta. Como asistente especializado, puedo ayudarte con información sobre nuestros servicios.",
        "Perfecto. Basándome en tu pregunta, te puedo proporcionar detalles específicos sobre esa funcionalidad.",
        "Excelente pregunta. Déjame explicarte paso a paso cómo podemos resolver esto.",
        "Te entiendo completamente. Esta es una consulta común y tengo la información exacta que necesitas.",
        "Muy bien. Permíteme brindarte una respuesta detallada sobre ese tema específico."
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        timestamp: new Date().toLocaleTimeString()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        content: "¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?",
        role: "assistant",
        timestamp: new Date().toLocaleTimeString()
      }
    ])
    toast({
      title: "Chat reiniciado",
      description: "La conversación ha sido limpiada exitosamente."
    })
  }

  const runTest = () => {
    toast({
      title: "Test iniciado",
      description: `Ejecutando prueba con el escenario: ${testScenarios.find(s => s.value === testConfig.scenario)?.label}`
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sandbox de Pruebas IA</h1>
        <p className="text-muted-foreground">Entorno de pruebas para evaluar y ajustar el comportamiento de la IA</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Chat de Prueba</CardTitle>
                <CardDescription>Interactúa con la IA para evaluar su comportamiento</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={clearChat}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Limpiar
              </Button>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 mb-4 p-4 border rounded-md">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.role === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                          <span className="text-xs opacity-70">{message.timestamp}</span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4" />
                          <span className="text-sm">Escribiendo...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Escribe tu mensaje..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                />
                <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración de Pruebas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="config" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="config">Config</TabsTrigger>
                  <TabsTrigger value="tests">Tests</TabsTrigger>
                </TabsList>
                
                <TabsContent value="config" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="model">Modelo</Label>
                    <Select value={testConfig.model} onValueChange={(value) => setTestConfig({...testConfig, model: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="scenario">Escenario</Label>
                    <Select value={testConfig.scenario} onValueChange={(value) => setTestConfig({...testConfig, scenario: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {testScenarios.map((scenario) => (
                          <SelectItem key={scenario.value} value={scenario.value}>
                            {scenario.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="temperature">Temperatura: {testConfig.temperature}</Label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={testConfig.temperature}
                      onChange={(e) => setTestConfig({...testConfig, temperature: parseFloat(e.target.value)})}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxTokens">Máx. Tokens</Label>
                    <Input
                      type="number"
                      value={testConfig.maxTokens}
                      onChange={(e) => setTestConfig({...testConfig, maxTokens: parseInt(e.target.value)})}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="tests" className="space-y-4 mt-4">
                  <Button className="w-full" onClick={runTest}>
                    <TestTube className="h-4 w-4 mr-2" />
                    Ejecutar Test Automático
                  </Button>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Tests Disponibles:</h4>
                    <div className="space-y-1">
                      <Badge variant="outline" className="w-full justify-start">Test de Objeciones</Badge>
                      <Badge variant="outline" className="w-full justify-start">Test de Empatía</Badge>
                      <Badge variant="outline" className="w-full justify-start">Test de Precisión</Badge>
                      <Badge variant="outline" className="w-full justify-start">Test de Velocidad</Badge>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="customPrompt">Prompt Personalizado</Label>
                    <Textarea
                      placeholder="Ingresa un prompt personalizado para probar..."
                      className="min-h-[100px]"
                    />
                    <Button className="w-full mt-2" variant="outline">
                      Probar Prompt
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Sandbox