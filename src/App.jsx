import VerticalTabs from './components/verticaltabs/VerticalTabs'
import { Container } from '@mui/material'
import './App.css'
import Topbar from './components/topbar/Topbar'

function App() {
  return (
    <Container maxWidth={false} sx={{ minHeight: "100vh" }}>
      <Topbar />
      <VerticalTabs />
    </Container>
  )
}

export default App
