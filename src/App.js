import "./App.css";
import AuthContextProvider from "./contexts/AuthProvider";
import AppRoute from "./Routing/AppRoute";

function App() {
  return (
    <AuthContextProvider>
        <AppRoute />
    </AuthContextProvider>
  );
}

export default App;
