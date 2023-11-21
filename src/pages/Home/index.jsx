// App.js
import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import {
  Container,
  Title,
  InputContainer,
  StyledTouchableOpacity,
  TouchableOpacityText,
  Input,
  ViewAbsolute,
  ViewTop,
} from "./style";
import Task from "../../components/Task";
import DateTimePicker from "react-native-modal-datetime-picker";
import { db } from "../../firebaseConnection";
import { ref, onValue } from "firebase/database";
import { Modal } from "../../containers/modals/Modal";
import { AuthContext } from "../../contexts/auth";
import { Ionicons } from "@expo/vector-icons";
import { addNewUTask, checkComplete, deleteTask, submitEditService } from "../../services/task";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectData, setSelectData] = useState(false);
  const [editModal, setEditModal] = useState();
  const [componentHeight, setComponentHeight] = useState(0);
  const { signOut } = useContext(AuthContext);

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setComponentHeight(height);
  };

  const fetchData = async () => {
    try {
      onValue(ref(db, "/tasks"), (querySnapShot) => {
        const TasData = querySnapShot.val() || {};
        setTasks(TasData); // Atualize o estado com os dados do Firebase
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTask = () => {
    if (taskText) {
      const formattedDate = selectedDate;
      const newTask = {
        title: taskText,
        dateTime: formattedDate,
      };
      addNewUTask(newTask);
      setTaskText("");
      Keyboard.dismiss();
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const openSelectTime = () => {
    setSelectData((prevState) => !prevState);
  };

  const editModalFunc = (task) => {
    setEditModal({ task: tasks[task], index: task });
  };
  const submitEdit = (newData, index) => {
    submitEditService(newData, index)
    setEditModal();
  };

  return (
    <Container>
      <ViewAbsolute onLayout={handleLayout}>
        <ViewTop>
          <Title>ToDo List</Title>
          <TouchableOpacity onPress={() => signOut()}>
            <Ionicons name="exit" size={32} color="#ff69b4" />
          </TouchableOpacity>
        </ViewTop>
        <InputContainer>
          <StyledTouchableOpacity onPress={() => openSelectTime()}>
            <TouchableOpacityText>
              Selecionar data {selectedDate.toLocaleString()}
            </TouchableOpacityText>
          </StyledTouchableOpacity>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            disabled={false}
            isVisible={selectData}
            onChange={(date) => handleDateChange(date)}
            onCancel={() => openSelectTime()}
            onConfirm={() => openSelectTime()}
          />
        </InputContainer>
        <InputContainer>
          <Input
            placeholder="Add a new task"
            value={taskText}
            onChangeText={(text) => setTaskText(text)}
          />

          <Button title="Add" onPress={addTask} />
        </InputContainer>
      </ViewAbsolute>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ height: componentHeight / 1.3, width: 1 }} />
        {tasks &&
          Object.keys(tasks).map((task, index) => (
            <>
              <Task
                key={index}
                task={tasks[task]}
                onDelete={() => deleteTask(task)}
                onEdit={() => editModalFunc(task, index)}
                markComplete={() => checkComplete(task, tasks[task])}
              />
            </>
          ))}
        <View style={{ height: 50, width: 1 }} />
      </ScrollView>
      <Modal
        open={!!editModal}
        item={editModal}
        onEditFinish={submitEdit}
        close={() => setEditModal()}
      />
    </Container>
  );
};

export default TodoList;
