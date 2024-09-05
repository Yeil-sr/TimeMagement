const { openDb } = require('../ConfigDB.js');

class taskController {
  async getTasks(req, res) {
    try {
      const db = await openDb();
      const userId = req.user.id;

      const tasks = await db.all("SELECT * FROM tarefas WHERE usuario_id = ?", [userId]);
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async addTask(req, res) {
    try {
      const db = await openDb();
      const q = `
        INSERT INTO tarefas (titulo, descricao, usuario_id, status, prioridade, time_name) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const values = [
        req.body.titulo,
        req.body.descricao,
        req.user.id, 
        req.body.status,
        req.body.prioridade,
        req.body.time_name,
      ];

      await db.run(q, values);
      res.status(200).json("Tarefa criada com sucesso.");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateTask(req, res) {
    try {
      const db = await openDb();
      const q = `
        UPDATE tarefas 
        SET titulo = ?, descricao = ?, status = ?, prioridade = ?, time_name = ?
        WHERE id = ? AND usuario_id = ?
      `;

      const values = [
        req.body.titulo,
        req.body.descricao,
        req.body.status,
        req.body.prioridade,
        req.body.time_name,
        req.params.id,
        req.user.id,
      ];

      await db.run(q, values);
      res.status(200).json("Tarefa atualizada com sucesso.");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const db = await openDb();
      const q = "DELETE FROM tarefas WHERE id = ? AND usuario_id = ?";

      await db.run(q, [req.params.id, req.user.id]);
      res.status(200).json("Tarefa deletada com sucesso.");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new taskController();
