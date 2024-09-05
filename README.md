# Time Management

## Descrição do Projeto

A aplicação Time Management é uma plataforma web simples que permite aos usuários gerenciar suas tarefas de forma eficiente. Com funcionalidades de criação, leitura, atualização e exclusão (CRUD) de tarefas, o projeto visa oferecer uma solução prática para a organização pessoal e profissional dos usuários.

O objetivo principal da aplicação é facilitar o gerenciamento das tarefas diárias, permitindo que os usuários adicionem novas tarefas, atualizem o status das tarefas existentes e removam tarefas concluídas.

<h2>Layout</h2>
<div>
<img src="https://github.com/user-attachments/assets/85447848-b996-4a83-a482-3b44b91e4eef" alt="time-magement: Página Principal">
</div>

## Tecnologias Utilizadas

- **Backend:** Node.js
- **Frontend:** React
- **Banco de Dados:** SQLite

## Instalação de Pré-requisitos e Dependências

### Pré-requisitos

- **Node.js e npm (Node Package Manager):** Você pode baixá-los [aqui](https://nodejs.org/).
- **SQLite:** Para instalação, veja as instruções [aqui](https://www.sqlite.org/download.html).

### Instruções de Instalação

1. **Clone o repositório do projeto:**

   ```bash
   git clone https://github.com/Yeil-sr/TimeManagement.git

2. **Navegue até o diretório do projeto:**

   ```bash
   cd TimeManagement

3. **Instale as dependências do backend:**
Navegue até o diretório /api e instale as dependências:


   ```bash
    cd api
    npm install
  

4. **Instale as dependências do backend:**
Navegue até o diretório /frontend e instale as dependências:

   ```bash
   cd ../frontend
    npm install

4. **Crie um arquivo .env na raiz do diretório /api e configure suas variáveis de ambiente conforme necessário. Exemplo:**


   ```bash
    DB_NAME = 'BizManager',
    JWT_SECRET= 'SeuToken'
   

5. **Crie um arquivo .env na raiz do diretório /frontend e configure suas variáveis de ambiente conforme necessário. Exemplo:**


   ```bash
    REACT_APP_API_URL=http://localhost:8080
   

6. **Inicialize o servidor backend:**

   ```bash
   cd ../api
    npm start

7. **Inicialize o frontend:**

   ```bash
   cd ../frontend
    npm start

<h2>API Endpoints</h2>
<h3>Usuário</h3>
<ul>
  <p><code>GET /</code> - Lista os Tarefas. (Autenticado)</li>
  <p><code>POST /</code> - Cria um novo Usuário. (Autenticado)</li>
   <p><code>POST /</code> -Login do Usuário. (</li>
  <p><code>PUT /:id</code> - Atualiza um Usuário pelo ID. (Autenticado)</p>
  <p><code>DELETE /:id</code> - Deleta um Usuário pelo ID. (Autenticado)</p>
</ul>
<h3>Tarefas</h3>
<ul>
  <p><code>GET /</code> - Lista as Tarefas. (Autenticado)</li>
  <p><code>POST /</code> - Cria um novo Tarefa. (Autenticado)</li>
  <p><code>PUT /:id</code> - Atualiza um Tarefa pelo ID. (Autenticado)</p>
  <p><code>DELETE /:id</code> - Deleta um Tarefa pelo ID. (Autenticado)</p>
</ul>

## Autor ##
<h3>Yale Souza</h3>
 Linkedin:
https://www.linkedin.com/in/yale-souza/
<br>
 e-mail: 
<a href="#!">yalesouzatwd@gmail.com</a>


