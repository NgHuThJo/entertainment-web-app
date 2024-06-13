// Third party
import { Outlet } from "react-router-dom";
// Context
import { BreakpointContextProvider } from "./providers/context/BreakpointContext";
import { DataContextProvider } from "./providers/context/DataContext";

export function App() {
  return (
    <BreakpointContextProvider>
      <DataContextProvider>
        <Outlet />
      </DataContextProvider>
    </BreakpointContextProvider>
  );
}
