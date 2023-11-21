import RNModal from "react-native-modal";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Text, TouchableOpacity } from "react-native";
import {
  CenteredView,
  ModalView,
  ModalText,
  EditInput,
  SaveButton,
  SaveButtonText,
  CloseButton,
  CloseButtonText,
  ViewButtons,
} from "./styles";
import { Ionicons } from "@expo/vector-icons";

export const Modal = ({ open, onEditFinish, close, item }) => {
  const [editedTitle, setEditedTitle] = useState();
  const [editedDate, setEditedDate] = useState();
  const [selectData, setSelectData] = useState(false);
  const [alter, setAlter] = useState(false);

  const openSelectTime = () => {
    setSelectData((prevState) => !prevState);
  };

  useEffect(() => {
    setAlter(false);
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
          <ModalText>Titulo:</ModalText>
          <EditInput
            placeholder="Enter new title"
            value={editedTitle}
            onChangeText={(text) => setEditedTitle(text)}
          />

          <ModalText>Data:</ModalText>
          <TouchableOpacity onPress={() => openSelectTime()}>
            <Text>Data atual {moment(editedDate).format("LLL")}</Text>
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
          <ViewButtons>
            <SaveButton
              onPress={() =>
                onEditFinish(
                  {
                    deadline: alter
                      ? editedDate.toLocaleString()
                      : item?.task?.deadline,
                    title: editedTitle,
                  },
                  item?.index
                )
              }
            >
              <Ionicons name="save" size={20} color="#fff" />

              <SaveButtonText>Salvar</SaveButtonText>
            </SaveButton>

            <CloseButton onPress={close}>
              <Ionicons name="close" size={20} color="#fff" />
              <CloseButtonText>Fechar</CloseButtonText>
            </CloseButton>
          </ViewButtons>
        </ModalView>
      </CenteredView>
    </RNModal>
  );
};
