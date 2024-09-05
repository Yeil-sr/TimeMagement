const { openDb } = require('../ConfigDB.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 

class userController {
  async getUsers(_, res) {
    try {
      const db = await openDb();
      const users = await db.all("SELECT * FROM usuarios");
      res.status(200).json(users);
    } catch (err) {
      res.json(err);
    }
  }

  async getUserId(req, res) {
    try {
      const db = await openDb();
      const { id } = req.params;
      const user = await db.get("SELECT * FROM usuarios WHERE id = ?", [id]);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      res.status(200).json(user);
    } catch (err) {
      res.json(err);
    }
  }
  
  async addUser(req, res) {
    try {
      const db = await openDb();
      const hashedPassword = await bcrypt.hash(req.body.senha, 10);
      const q = "INSERT INTO usuarios (nome, email, contato, cidade, senha, genero) VALUES (?, ?, ?, ?, ?, ?)";
  
      const values = [
        req.body.nome,
        req.body.email,
        req.body.contato,
        req.body.cidade,
        hashedPassword,
        req.body.genero,
      ];
  
      await db.run(q, values);
      res.status(200).json({ message: "Usuário criado com sucesso." });
    } catch (err) {
      res.json(err);
    }  
  }

  async login(req, res) {
    try {
      const db = await openDb();
      const { email, senha } = req.body;
      
      const user = await db.get("SELECT * FROM usuarios WHERE email = ?", [email]);
      
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Senha incorreta." });
      }
      
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      
      res.status(200).json({ message: "Login bem-sucedido.", token, id: user.id, nome: user.nome });
    } catch (err) {
      res.json(err);
    }
  }
  
  async updateUser(req, res) {
    try {
      const db = await openDb();
      const { id } = req.params;
      const { nome, email, contato, cidade, senha, genero } = req.body;

      const user = await db.get("SELECT * FROM usuarios WHERE id = ?", [id]);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      let hashedPassword = user.senha;
      if (senha) {
        hashedPassword = await bcrypt.hash(senha, 10);
      }

      const q = "UPDATE usuarios SET nome = ?, email = ?, contato = ?, cidade = ?, senha = ?, genero = ? WHERE id = ?";
      const values = [nome, email, contato, cidade, hashedPassword, genero, id];

      await db.run(q, values);
      res.status(200).json("Usuário atualizado com sucesso.");
    } catch (err) {
      res.json(err);
    }
  }

  async deleteUser(req, res) {
    try {
      const db = await openDb();
      const { id } = req.params;
      const user = await db.get("SELECT * FROM usuarios WHERE id = ?", [id]);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const q = "DELETE FROM usuarios WHERE id = ?";
      await db.run(q, id);
      res.status(200).json("Usuário deletado com sucesso.");
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new userController();
