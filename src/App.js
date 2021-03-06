import { NavPage, LoginPage } from "./pages/index";
import "./Styles/App.css";
import useGlobalcontext from "./Helper/AppProvider";
import SignoutModal from "./Components/Signout-modal";

function App() {
  const { haslogin, Info } = useGlobalcontext();

  return (
    <div className="App">
      {haslogin ? <NavPage /> : <LoginPage />}
      {Info.signingOut && <SignoutModal />}
    </div>
  );
}

export default App;
