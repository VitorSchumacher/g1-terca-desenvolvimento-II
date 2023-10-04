import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import { format } from 'date-fns';
import api from '../../services/api';
import {
    Container,
    ScrollViewContent,
    Card,
    PerfilImage,
    Label,
    Text as StyledText,
    Button,
    ButtonText
} from './styles';

function Details() {
    const route = useRoute();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [user, setUser] = useState();
    const [loadingUser, setLoadingUser] = useState(false);

    async function loadUser() {
        try {
            setLoadingUser(true);
            const response = await api.get(`users/${route.params?.id}`);
            console.log(response.data)
            setUser(response.data);
        } catch (error) {
            console.error('Erro ao carregar os usuários:', error);
        } finally {
            setLoadingUser(false);
        }
    }

    useEffect(() => {
        console.log(isFocused)
        if (isFocused) {
            loadUser();
        }
    }, [isFocused]);

    if (loadingUser) {
        return (
            <Container>
                <ActivityIndicator size={36} color="#000" />
            </Container>
        )
    }

    return (
        <>
            {user && (
                <ScrollViewContent>
                    <Container>

                        <Card>
                            <PerfilImage
                                source={{ uri: user.image }}
                            />
                            <Label>Name</Label>
                            <StyledText>{user.name}</StyledText>
                            <Label>Email</Label>
                            <StyledText>{user.email}</StyledText>
                            <Label>CPF</Label>
                            <StyledText>{user.cpf}</StyledText>
                            <Label>Birth Date</Label>
                            <StyledText>{format(new Date(user.birth_date), 'dd/MM/yyyy')}</StyledText>
                            <Label>Profile</Label>
                            <StyledText>{user.admin ? 'Admin' : 'User'}</StyledText>
                            <Label>Salary</Label>
                            <StyledText>R$ {user.salary}</StyledText>
                            <Label>City</Label>
                            <StyledText>{user.city}</StyledText>
                        </Card>

                        <Button onPress={() => navigation.navigate('EditUser', { id: user.id })}>
                            <ButtonText>Editar</ButtonText>
                        </Button>

                        <Button onPress={() => navigation.goBack()}>
                            <ButtonText>Voltar</ButtonText>
                        </Button>
                    </Container>
                </ScrollViewContent>
            )}
        </>
    );
}

export default Details;
