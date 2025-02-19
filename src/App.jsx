import VerticalTabs from './components/verticaltabs/VerticalTabs'
import { Container } from '@mui/material'
import './App.css'

function App() {
  // useEffect(() => {
  //   fetch("http://localhost:5000/users")
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  // }, []);

  return (
    <Container maxWidth="lg">
      <VerticalTabs />
    </Container>
  )
}

export default App
