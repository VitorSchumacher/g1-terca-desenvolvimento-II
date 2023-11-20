// Task.js
import moment from "moment";
import React from "react";
import styled from "styled-components/native";

export const TaskContainer = styled.View`
  background-color: #f0f0f0; /* Cor de fundo cinza claro */
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  shadow-color: #000;
  shadow-offset: { width: 0; height: 2 };
  shadow-opacity: 0.25;
  shadow-radius: 3.84;
  elevation: 5;
`;

export const TaskInfoContainer = styled.View`
  flex: 1;
  margin-right: 10px;
`;

export const TaskTitle = styled.Text`
  font-size: 18px;
  color: #333; /* Cor do texto preto */
  font-weight: bold;
`;

export const TaskDate = styled.Text`
  font-size: 14px;
  color: #555; /* Cor do texto cinza escuro */
`;

export const EditButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #3498db; /* Cor azul */
  border-radius: 5px;
`;

export const EditButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const DeleteButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #ff4b4b; /* Cor vermelha */
  border-radius: 5px;
`;

export const DeleteButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const Task = ({ task, onDelete, onEdit }) => {
  return (
    <TaskContainer>
      <TaskInfoContainer>
        <TaskTitle>{task.title}</TaskTitle>
        <TaskDate>
          Date: {moment(task.deadline, 'DD/MM/YYYY, HH:mm:ss').locale('pt-BR').format('LLL')}
        </TaskDate>
      </TaskInfoContainer>

      <EditButton onPress={onEdit}>
        <EditButtonText>Edit</EditButtonText>
      </EditButton>

      <DeleteButton onPress={onDelete}>
        <DeleteButtonText>Delete</DeleteButtonText>
      </DeleteButton>
    </TaskContainer>
  );
};

export default Task;
