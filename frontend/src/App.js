import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskForm from "../src/components/tasks/TaskForm";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Cadastro from "./components/pages/CadastroForm";
import LoginForm from "./components/pages/LoginForm";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";

const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

function App() {

  return (
    <>
      <Container customClass="min-height">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<ProtectedRoute element={<TaskForm/>} />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Router>
        <Footer />
      </Container>
      <GlobalStyle />
    </>
  );
}

export default App;
