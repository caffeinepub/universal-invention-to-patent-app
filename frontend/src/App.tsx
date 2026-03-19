import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import NewProject from './pages/NewProject';
import InventionWorkspace from './pages/InventionWorkspace';
import Portfolio from './pages/Portfolio';
import Resources from './pages/Resources';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/dashboard' });
  },
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const newProjectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/new-project',
  component: NewProject,
});

const workspaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/workspace/$projectId',
  component: InventionWorkspace,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portfolio',
  component: Portfolio,
});

const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resources',
  component: Resources,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  newProjectRoute,
  workspaceRoute,
  portfolioRoute,
  resourcesRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
