import React, { useState, useEffect } from "react";
import { Keyboard, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ImagePicker from "../../components/ImagePicker";
import CityPicker from "../../components/CityPicker";
import DatePicker from "../../components/DatePicker";
import TextInput from "../../components/TextInput";
import { createUserSchema } from '../../utils/createUserValidation';
import { format } from 'date-fns';
import api from '../../services/api';
import { Container, ContainerLoading, ErrorText, Header, FormArea, InputContainer, Label, ScrollViewContent, StyledSwitch, Button, ButtonText } from './styles';

export default function App() {
    const route = useRoute();
    const navigation = useNavigation();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [user, setUser] = useState();
    const [loadingUser, setLoadingUser] = useState(false);

    async function loadUser() {
        try {
            setLoadingUser(true);
            const response = await api.get(`users/${route.params?.id}`);
            //console.log(response.data)
            setUser(response.data);
        } catch (error) {
            console.error('Erro ao carregar os usuários:', error);
        } finally {
            setLoadingUser(false);
        }
    }

    useEffect(() => {
        loadUser();
    }, [setLoadingUser]);

    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(createUserSchema),
    });

    useEffect(() => {
        if (user) {
            const cpfSemPontosETraço = user?.cpf.replace(/[.-]/g, '');
            // Configure os valores padrão quando o usuário estiver pronto
            setValue("name", user?.name || "");
            setValue("email", user?.email || "");
            setValue("password", ""); // Não exiba a senha atual, deixe em branco
            setValue("cpf", cpfSemPontosETraço || "");
            setValue("birth_date", new Date(user?.birth_date) || new Date());
            setValue("admin", user?.admin || false);
            setValue("salary", user?.salary || "");
            setValue("city", user?.city || "");
            setValue("image", user?.image || "");
        }
    }, [user]);

    const onSubmit = async (data) => {
        Keyboard.dismiss();

        try {
            const token = await AsyncStorage.getItem('@authToken');
            const birthDate = format(new Date(data.birth_date), 'yyyy-MM-dd');

            const dataApi = {
                id: user.id,
                name: data.name,
                email: data.email.toLowerCase(),
                password: data.password, // Mantenha a senha atual, se não for modificada
                cpf: data.cpf,
                birth_date: birthDate,
                admin: data.admin,
                salary: data.salary.toString(),
                city: data.city,
                image: data.image,
            };

            //console.log('put', dataApi)
            //console.log('put', user)

            // Envie os dados para a API
            const response = await api.put(`/users/${user.id}`, dataApi, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            //console.log(response)

            // Redirecione de volta à tela anterior
            navigation.navigate('DetailsUser', { id: user.id });
        } catch (error) {
            // Lide com erros de atualização aqui
            console.error("Erro ao atualizar dados:", error.message);
        }
    }

    if (loadingUser) {
        return (
            <ContainerLoading>
                <ActivityIndicator size={36} color="#000" />
            </ContainerLoading>
        )
    }

    return (
        <Container>
            <ScrollViewContent>
                <Header>Editar Usuário</Header>
                <FormArea>
                    <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>Nome</Label>
                                    <TextInput
                                        name="name"
                                        placeholder="Nome"
                                        onChange={onChange}
                                        value={value}
                                        error={errors.name}
                                    />
                                </>
                            )}
                            name="name"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>E-mail</Label>
                                    <TextInput
                                        name="email"
                                        placeholder="E-mail"
                                        onChange={onChange}
                                        value={value}
                                        error={errors.email}
                                    />
                                </>
                            )}
                            name="email"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>Senha</Label>
                                    <TextInput
                                        name="password"
                                        placeholder="Senha"
                                        onChange={onChange}
                                        value={value}
                                        secureTextEntry={true}
                                        error={errors.password}
                                    />
                                </>
                            )}
                            name="password"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>CPF</Label>
                                    <TextInput
                                        name="cpf"
                                        placeholder="CPF"
                                        onChange={onChange}
                                        value={value}
                                        error={errors.cpf}
                                        keyboardType="numeric"
                                    />
                                </>
                            )}
                            name="cpf"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>Data de Nascimento</Label>
                                    <DatePicker
                                        value={value}
                                        onChange={onChange}
                                        showPicker={showDatePicker}
                                        setShowPicker={setShowDatePicker}
                                    />
                                    {errors.birth_date && <ErrorText>{errors.birth_date.message}</ErrorText>}
                                </>
                            )}
                            name="birth_date"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Label>Admin:</Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <StyledSwitch
                                    value={value}
                                    onValueChange={onChange}
                                />
                            )}
                            name="admin"
                        />
                        {errors.admin && <ErrorText>{errors.admin.message}</ErrorText>}
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>Salário</Label>
                                    <TextInput
                                        name="salary"
                                        placeholder="Salário"
                                        onChange={onChange}
                                        value={value}
                                        error={errors.salary}
                                        keyboardType="numeric"
                                    />
                                </>
                            )}
                            name="salary"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>Cidade</Label>
                                    <CityPicker
                                        control={control}
                                        value={value}
                                        onChange={onChange}
                                        errors={errors}
                                    />
                                </>
                            )}
                            name="city"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>Imagem</Label>
                                    <ImagePicker
                                        onChange={onChange}
                                        value={value}
                                    />
                                    {errors.image && <ErrorText>{errors.image.message}</ErrorText>}
                                </>
                            )}
                            name="image"
                        />
                    </InputContainer>
                </FormArea>
                <InputContainer>
                    <Button onPress={handleSubmit(onSubmit)}>
                        <ButtonText>Atualizar</ButtonText>
                    </Button>
                    <Button onPress={() => navigation.goBack()}>
                        <ButtonText>Voltar</ButtonText>
                    </Button>
                </InputContainer>

            </ScrollViewContent>
        </Container>
    );
}