import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Grid from "./Grid";
import styles from "./TaskForm.module.css";

const Form = ({ onEdit, setOnEdit }) => {
  const ref = useRef();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (onEdit) {
      const task = ref.current;

      if (task) {
        task.titulo.value = onEdit.titulo || "";
        task.descricao.value = onEdit.descricao || "";
        task.status.value = onEdit.status || "";
        task.prioridade.value = onEdit.prioridade || "";
      }
    }
  }, [onEdit]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await fetch(`${apiUrl}/tarefas`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks.");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = ref.current;

    if (
      !task.titulo.value ||
      !task.descricao.value ||
      !task.status.value ||
      !task.prioridade.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const method = onEdit ? "PUT" : "POST";
    const url = `http://localhost:8080/tarefas/${onEdit ? onEdit.id : ""}`;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 

        },
        body: JSON.stringify({
          titulo: task.titulo.value,
          descricao: task.descricao.value,
          status: task.status.value,
          prioridade: task.prioridade.value,
        }),
      });

      if (!response.ok) {
        throw new Error(onEdit ? "Failed to update task." : "Failed to create task.");
      }

      toast.success(onEdit ? "Task updated successfully!" : "Task created successfully!");
    } catch (error) {
      toast.error(error.message);
    }

    task.titulo.value = "";
    task.descricao.value = "";
    task.status.value = "";
    task.prioridade.value = "";

    setOnEdit(null);
    getTasks();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gestão de Tarefas</h2>
      <form ref={ref} onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.input_area}>
          <label className={styles.label}>Título</label>
          <input name="titulo" className={styles.input} />
        </div>
        <div className={styles.input_area}>
          <label className={styles.label}>Descrição</label>
          <input name="descricao" type="text" className={styles.input} />
        </div>
        <div className={styles.input_area}>
          <label className={styles.label}>Status</label>
          <select name="status" className={styles.input}>
            <option value="não iniciado">Não Iniciado</option>
            <option value="em progresso">Em Progresso</option>
            <option value="concluído">Concluído</option>
          </select>
        </div>
        <div className={styles.input_area}>
            <label className={styles.label}>Prioridade</label>
            <select name="prioridade" className={styles.input}>
              <option value="baixa">Baixa</option>
              <option value="média">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
        <button type="submit" className={styles.button}>SALVAR</button>
      </form>
      <Grid tasks={tasks} setTasks={setTasks} setOnEdit={setOnEdit} />
    </div>
  );
};

export default Form;
