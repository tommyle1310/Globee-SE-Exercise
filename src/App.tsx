import AppRouter from "./routes";
import AppLayout from "./components/app-layout/AppLayout";

export function App() {
  return <>
  <AppLayout>
    <AppRouter />
  </AppLayout>
  </>;

}

export default App
