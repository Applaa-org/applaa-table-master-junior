import * as React from 'react'
import { 
  createRouter, 
  RouterProvider, 
  createRootRoute, 
  createRoute as createTanStackRoute, 
  Outlet 
} from '@tanstack/react-router'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Practice from "./pages/Practice";
import Games from "./pages/Games";
import Progress from "./pages/Progress";
import NotFound from "./pages/NotFound";
import { Footer } from "@/components/Footer";

const queryClient = new QueryClient();

// Create root route
const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen flex flex-col">
          <Outlet />
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  ),
})

// Create routes
const indexRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const tablesRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/tables',
  component: Tables,
})

const practiceRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/practice',
  component: Practice,
})

const gamesRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/games',
  component: Games,
})

const progressRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/progress',
  component: Progress,
})

const notFoundRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
})

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  tablesRoute,
  practiceRoute,
  gamesRoute,
  progressRoute,
  notFoundRoute
])

// Create router with proper TypeScript configuration
const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent' as const,
  defaultPreloadStaleTime: 0,
})

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => <RouterProvider router={router} />

export default App;