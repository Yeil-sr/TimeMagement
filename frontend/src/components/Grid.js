import React from "react";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./Grid.module.css";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto 300px;
  word-break: break-all;
`;

export const Thead = styled.thead``;
export const Tr = styled.tr``;
export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;
export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ tasks, setOnEdit, setTasks }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await fetch(`${apiUrl}/tarefas/` + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete task.");
      }
  
      const data = await response.json();
      const newArray = tasks.filter((task) => task.id !== id);
  
      setTasks(newArray);
      toast.success(data);
    } catch (error) {
      toast.error(error.message);
    }
  
    setOnEdit(null);
  };
  
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Título</Th>
          <Th onlyWeb>Descrição</Th>
          <Th>Prioridade</Th>
          <Th>Status</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <tbody>
        {tasks.map((item, i) => (
          <Tr key={i}>
            <Td width="30%" className={`${styles.titulo}`}>{item.titulo}</Td>
            <Td width="30%" className={`${styles.description}`} onlyWeb>
              {item.descricao}
            </Td>
            <Td
              width="25%"
              className={`${styles["td-center"]} ${
                item.prioridade === "alta"
                  ? styles["td-high"]
                  : item.prioridade === "média"
                  ? styles["td-medium"]
                  : styles["td-low"]
              }`}
            >
              {item.prioridade}
            </Td>
            <Td
              width="25%"
              className={`${
                item.status === "não iniciado"
                  ? styles["td-not-started"]
                  : item.status === "em progresso"
                  ? styles["td-in-progress"]
                  : styles["td-completed"]
              }`}
            >
              {item.status}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Grid;
