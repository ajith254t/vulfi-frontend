import { useEffect, useState } from "react";
import Home from "./components/Home";
import WebsiteScan from "./components/WebsiteScan";
import DeviceScan from "./components/DeviceScan";
import EmailScan from "./components/EmailScan";
import Splash from "./components/Splash";

export default function App() {
  const [mode, setMode] = useState("splash");

  // Auto move from splash to home
  useEffect(() => {
    if (mode === "splash") {
      const timer = setTimeout(() => {
        setMode("home");
      }, 2500); // 2.5 seconds

      return () => clearTimeout(timer);
    }
  }, [mode]);

  if (mode === "splash") return <Splash />;

  if (mode === "home") return <Home setMode={setMode} />;
  if (mode === "website") return <WebsiteScan goBack={() => setMode("home")} />;
  if (mode === "device") return <DeviceScan goBack={() => setMode("home")} />;
  if (mode === "email") return <EmailScan goBack={() => setMode("home")} />;

  return null;
}
