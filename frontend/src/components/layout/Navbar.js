import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../img/task_1.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      setIsLoggedIn(true);
      fetchUserName(userId);
    }
  }, []);

  const fetchUserName = async (userId) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");


    try {
      const response = await fetch(`${apiUrl}/usuarios/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const userData = await response.json();

      if (response.ok) {
        setUserName(userData.nome);
        localStorage.setItem('userName', userData.nome);
      } else {
        setUserName('Usuário');
      }
    } catch (error) {
      console.error('Erro ao buscar o nome do usuário:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <Link to="/">
          <div className={styles.form_image}>
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className={`${styles.item} ${styles.userName}`}>{userName}</li>
              <li className={styles.item}>
                <button onClick={handleLogout} className={styles.logout_button}>
                  Sair
                </button>
              </li>
              <li className={styles.item}>
                <Link to="/projetos">Novo Projeto</Link>
              </li>
            </>
          ) : (
            <>
              
              <li className={styles.item}>
                <Link to="/login">Entrar</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
