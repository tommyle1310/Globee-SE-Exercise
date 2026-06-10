import { useState } from "react";
import AppRouter from "./routes";
import AppLayout from "./components/app-layout/AppLayout";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <>
  <AppLayout isLoggedIn={isLoggedIn}>
    <AppRouter />
  </AppLayout>
  </>;

}

export default App
