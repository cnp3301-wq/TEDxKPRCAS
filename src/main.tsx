import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { supabase } from "./lib/supabase";

// Initialize and verify Supabase connection
console.log("🚀 App starting...");
console.log("✅ Supabase client initialized:", !!supabase);

createRoot(document.getElementById("root")!).render(<App />);
