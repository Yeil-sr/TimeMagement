import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CadastroForm.module.css';
import login from '../img/login.svg';

const CadastroForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    contato: "",
    cidade: "",
    senha: "",
    confirmSenha: "",
    genero: "",
    teamOption: "",
    teamName: "",
    inviteLink: ""
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTeamOptionChange = (option) => {
    setFormData((prevData) => ({
      ...prevData,
      teamOption: option,
      teamName: option === "create" ? prevData.teamName : "",
      inviteLink: option === "join" ? prevData.inviteLink : ""
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.senha !== formData.confirmSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const requestData = {
      nome: formData.nome,
      email: formData.email,
      contato: formData.contato,
      cidade: formData.cidade,
      senha: formData.senha,
      genero: formData.genero,
      ...(formData.teamOption === 'create' && { teamName: formData.teamName }),
      ...(formData.teamOption === 'join' && { inviteLink: formData.inviteLink })
    };

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/usuarios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message); 
        navigate('/login'); 
      } else {
        const error = await response.json();
        alert("Erro ao criar usuário: " + error.message);
      }
    } catch (err) {
      console.error("Erro ao enviar os dados: ", err);
      alert("Erro ao enviar os dados");
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
              <h1>Cadastre-se</h1>
            </div>
          </div>

          <div className={styles.input_group}>
            <div className={styles.input_box}>
              <label htmlFor="nome">Nome </label>
              <input id="nome" type="text" name="nome" placeholder="Digite seu nome" required 
                value={formData.nome} onChange={handleChange} />
            </div>

            <div className={styles.input_box}>
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" name="email" placeholder="Digite seu e-mail" required 
                value={formData.email} onChange={handleChange} />
            </div>

            <div className={styles.input_box}>
              <label htmlFor="contato">Celular</label>
              <input id="contato" type="tel" name="contato" placeholder="(xx) xxxx-xxxx" required 
                value={formData.contato} onChange={handleChange} />
            </div>

            <div className={styles.input_box}>
              <label htmlFor="cidade">Cidade</label>
              <input id="cidade" type="text" name="cidade" placeholder="Digite o nome da cidade" required 
                value={formData.cidade} onChange={handleChange} />
            </div>

            <div className={styles.input_box}>
              <label htmlFor="senha">Senha</label>
              <input id="senha" type="password" name="senha" placeholder="Digite sua senha" required 
                value={formData.senha} onChange={handleChange} />
            </div>

            <div className={styles.input_box}>
              <label htmlFor="confirmSenha">Confirme sua Senha</label>
              <input id="confirmSenha" type="password" name="confirmSenha" placeholder="Digite sua senha novamente" required 
                value={formData.confirmSenha} onChange={handleChange} />
            </div>
          </div>

          <div className={styles.gender_inputs}>
            <div className={styles.gender_title}>
              <h6>Gênero</h6>
            </div>

            <div className={styles.gender_group}>
              <div className={styles.gender_input}>
                <input id="female" type="radio" name="genero" 
                  value="Feminino" checked={formData.genero === 'Feminino'} 
                  onChange={handleChange} />
                <label htmlFor="female">Feminino</label>
              </div>

              <div className={styles.gender_input}>
                <input id="male" type="radio" name="genero" 
                  value="Masculino" checked={formData.genero === 'Masculino'} 
                  onChange={handleChange} />
                <label htmlFor="male">Masculino</label>
              </div>

              <div className={styles.gender_input}>
                <input id="none" type="radio" name="genero" 
                  value="Prefiro não dizer" checked={formData.genero === 'Prefiro não dizer'} 
                  onChange={handleChange} />
                <label htmlFor="none">Prefiro não dizer</label>
              </div>
            </div>
          </div>

          <div className={styles.team_options}>
            <div className={styles.team_title}>
              <h6>Time</h6>
            </div>
            <div className={styles.team_group}>
              <div className={styles.team_input}>
                <input
                  id="createTeam"
                  type="radio"
                  name="teamOption"
                  onChange={() => handleTeamOptionChange('create')}
                />
                <label htmlFor="createTeam">Criar um time</label>
              </div>
              <div className={styles.team_input}>
                <input
                  id="joinTeam"
                  type="radio"
                  name="teamOption"
                  onChange={() => handleTeamOptionChange('join')}
                />
                <label htmlFor="joinTeam">Participar de um time</label>
              </div>
            </div>
          </div>

          {formData.teamOption === 'create' && (
            <div className={styles.input_group}>
              <div className={styles.input_box}>
                <label htmlFor="teamName">Nome do Time</label>
                <input id="teamName" type="text" name="teamName" placeholder="Digite o nome do time" 
                  value={formData.teamName} onChange={handleChange} />
              </div>
            </div>
          )}

          {formData.teamOption === 'join' && (
            <div className={styles.input_group}>
              <div className={styles.input_box}>
                <label htmlFor="inviteLink">Link do Convite</label>
                <input id="inviteLink" type="text" name="inviteLink" placeholder="Insira o link do convite" 
                  value={formData.inviteLink} onChange={handleChange} />
              </div>
            </div>
          )}

          <div className={styles.continue_button}>
            <button type="submit">Continuar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroForm;
