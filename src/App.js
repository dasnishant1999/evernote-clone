import "./App.css";
import AuthContextProvider from "./contexts/AuthProvider";
import ContextProvider from "./contexts/Context";
import AppRoute from "./Routing/AppRoute";

function App() {
  return (
    <AuthContextProvider>
      <ContextProvider>
        <AppRoute />
      </ContextProvider>
    </AuthContextProvider>
  );
}

export default App;
