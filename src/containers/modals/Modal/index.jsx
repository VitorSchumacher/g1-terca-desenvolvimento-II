import RNModal from "react-native-modal";
import moment from "moment";
import {
  CenteredView,
  ModalView,
  ModalText,
  EditInput,
  SaveButton,
  SaveButtonText,
} from "./styles";
import { useEffect, useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Text, TouchableOpacity } from "react-native";

export const Modal = ({ open, onEditFinish, close, item }) => {
  const [editedTitle, setEditedTitle] = useState();
  const [editedDate, setEditedDate] = useState();
  const [selectData, setSelectData] = useState(false);
  const [alter, setAlter] = useState(false);

  const openSelectTime = () => {
    setSelectData((prevState) => !prevState);
  };

  useEffect(() => {
    setAlter(false)
    setEditedTitle(item?.task?.title);
    setEditedDate(
      moment(item?.task?.deadline, "DD/MM/YYYY, HH:mm:ss").toISOString()
    );
  }, [item]);
  return (
    <RNModal
      isVisible={open}
      onBackButtonPress={close}
      onBackdropPress={close}
      backdropOpacity={0.2}
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      coverScreen
    >
      <CenteredView>
        <ModalView>
          <ModalText>Edit Title:</ModalText>
          <EditInput
            placeholder="Enter new title"
            value={editedTitle}
            onChangeText={(text) => setEditedTitle(text)}
          />

          <ModalText>Edit Date:</ModalText>
          <TouchableOpacity onPress={() => openSelectTime()}>
            <Text>Selecionar data {moment(editedDate).format("LLL")}</Text>
          </TouchableOpacity>

          <DateTimePicker
            value={editedDate}
            mode="date"
            disabled={false}
            isVisible={selectData}
            onChange={(date) => {
              setAlter(true);
              setEditedDate(date);
            }}
            onCancel={() => openSelectTime()}
            onConfirm={() => openSelectTime()}
          />
          <SaveButton
            onPress={() =>
              onEditFinish(
                {
                  deadline: alter ? editedDate.toLocaleString() : item?.task?.deadline,
                  title: editedTitle,
                },
                item?.index
              )
            }
          >
            <SaveButtonText>Save</SaveButtonText>
          </SaveButton>
        </ModalView>
      </CenteredView>
    </RNModal>
  );
};
