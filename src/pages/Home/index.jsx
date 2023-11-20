// App.js
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
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
} from "./style";
import Task from "../../components/Task";
import DateTimePicker from "react-native-modal-datetime-picker";
import { db } from "../../firebaseConnection";
import { ref, onValue, push, remove, update } from "firebase/database";
import { Modal } from "../../containers/modals/Modal";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectData, setSelectData] = useState(false);
  const [editModal, setEditModal] = useState();
  const [componentHeight, setComponentHeight] = useState(0);

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setComponentHeight(height);
  };

  const showDateTimePicker = (index) => {
    setSelectedTaskIndex(index);
    setDateTimePickerVisible(true);
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

  function addNewUTask(task) {
    push(ref(db, "/tasks"), {
      title: task.title,
      deadline: task.dateTime.toLocaleString(),
      finished: false,
    });
  }

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

  const deleteTask = (index) => {
    const userRef = ref(db, `/tasks/${index}`);
    remove(userRef)
      .then(() => {
        console.log(`Usuário com chave ${index} removido com sucesso.`);
      })
      .catch((error) => {
        console.error(`Erro ao remover o usuário: ${error}`);
      });
  };

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const openSelectTime = () => {
    setSelectData((prevState) => !prevState);
  };

  const editModalFunc = (task, index) => {
    setEditModal({ task: tasks[task], index: task });
  };
  const submitEdit = (newData, index) => {
    const userRef = ref(db, `/tasks/${index}`);
    update(userRef, newData)
      .then(() => {
        console.log(`Usuário com chave ${index} removido com sucesso.`);
      })
      .catch((error) => {
        console.error(`Erro ao remover o usuário: ${error}`);
      });
    setEditModal();
  };

  return (
    <Container>
      <ViewAbsolute onLayout={handleLayout}>
        <Title>ToDo List</Title>
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
                onSetDateTime={() => showDateTimePicker(task)}
                onEdit={() => editModalFunc(task, index)}
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
