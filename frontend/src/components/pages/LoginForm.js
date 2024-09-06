import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import login from '../img/login.svg';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    setName('Admin')
    setEmail('admin@example.com');
    setPassword('Admin123');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await fetch(`${apiUrl}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({ email, senha: password }),
      });
        
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userName', data.nome); 
        navigate('/projetos');
      } else {
        setErrorMessage(data.message || 'Erro ao fazer login.');
      }
    } catch (err) {
      console.error('Erro:', err);
      setErrorMessage('Ocorreu um erro ao se conectar ao servidor.');
    }
  };

  
  
  return (
    <div className={styles.container}>
      <div className={styles.form_image}>
        <img src={login} alt="login" />
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_header}>
            <div className={styles.title}>
              <h1>Identifique-se</h1>
            </div>
          </div>

          <div className={styles.input_box}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Digite seu nome"
              value = {name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.input_group}>
            <div className={styles.input_box}>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.input_box}>
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.form_p}>
            <p>Não tem uma conta? <Link className={styles.form_p} to="/cadastro">Inscrever-se</Link></p>
          </div>
          {errorMessage && (
            <div className={styles.error_message}>
              <p>{errorMessage}</p>
            </div>
          )}

          <div className={styles.continue_button}>
            <button type="submit">Continuar</button>
          </div>
          
          <div className={styles.admin_button}>
            <button type="submit" onClick={handleAdminLogin}>Login como Admin</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
