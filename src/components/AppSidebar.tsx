import { 
  BarChart3, 
  Brain, 
  Database, 
  Phone, 
  MessageSquare,
  Home
} from "lucide-react"
import { NavLink } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Entrenamientos IA", url: "/training", icon: Brain },
  { title: "Bitácora Mikrowisp", url: "/mikrowisp", icon: Database },
  { title: "Bitácora RingByName", url: "/ringbyname", icon: Phone },
  { title: "Sandbox Chat", url: "/sandbox", icon: MessageSquare },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold px-4 py-4">
            {!isCollapsed && (
              <div className="flex items-center gap-2 mb-4 mt-4">
                <img src="/alpha.svg" alt="Logo" className="h-12 w-12" />
                <span className="text-white">AlphyOS v1.0</span>
              </div>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end
                      className={({ isActive }) =>
                        isActive 
                          ? "bg-primary text-primary-foreground font-medium" 
                          : "hover:bg-muted/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-4">
        {!isCollapsed && <span className="text-xs text-white">Powered by LeopolMedia</span>}
      </SidebarFooter>
    </Sidebar>
  )
}
