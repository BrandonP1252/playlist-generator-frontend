import './App.css'
import Welcome from "./pages/Welcome.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import Dashboard from "./pages/Dashboard.tsx";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import GeneratePlaylist from "./pages/GeneratePlaylist.tsx";
import Result from "./pages/Result.tsx";



const queryClient = new QueryClient()

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/generate-playlist" element={<GeneratePlaylist />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/" element={<Welcome />}/>
                </Routes>
          </BrowserRouter>
      </QueryClientProvider>
  )
}

export default App
