import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Form from "./components/Form.js";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
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
  const [tasks, setTasks] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getTasks = async () => {
    try {
      const res = await fetch("http://localhost:8080/tarefas");
      const data = await res.json();
      setTasks(data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, [setTasks]);

  return (
    <>
      <Container customClass="min-height">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<ProtectedRoute element={<Form onEdit={onEdit} setOnEdit={setOnEdit} getTasks={getTasks} tasks={tasks} setTasks={setTasks} />} />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Router>
        <Footer />
      </Container>

      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;
