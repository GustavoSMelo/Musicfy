import React, { useState, useEffect } from 'react';
import { AsyncStorage, TouchableOpacity, FlatList } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import api from '../../api/api';
import {
    Container,
    MusicContainer,
    Figure,
    TextDark,
    ButtonListen,
    ActionContainer,
    TextLight,
} from './style';
import getTheme from '../../utils/getTheme';
import DarkMode from '../../styles/themes/dark';
import LightMode from '../../styles/themes/light';
import Header from '../../components/header';
import URL from '../../config/url.config';

function Home() {
    const [theme, setTheme] = useState('');
    const [allMusics, setAllMusics] = useState([]);
    const [likes, setLikes] = useState([]);
    const navigation = useNavigation();

    async function Theme() {
        const response = await getTheme();
        setTheme(response);
    }

    async function getDataByAPI() {
        Theme();
        try {
            const token = await AsyncStorage.getItem('token');
            const resolve = await api.get('/musics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            await setAllMusics(resolve.data.allmusics);
            await setLikes(resolve.data.likes_of_user);
        } catch (err) {
            console.log(err);
            navigation.navigate('Welcome');
        }
    }

    async function handlerLikeAdd(music) {
        try {
            const token = await AsyncStorage.getItem('token');
            await api.post(
                '/users/musics',
                { music },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const newLikes = await api.get('/users/musics', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const newItem = newLikes.data.filter((lk) =>
                likes.map((allLks) => lk !== allLks)
            );

            setLikes([...likes, newItem]);
        } catch (err) {
            console.error(err);
        }
    }

    async function handlerLikeRemove(music) {
        try {
            const token = await AsyncStorage.getItem('token');
            await api.delete('/users/musics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    music,
                },
            });

            const rmvItem = likes.filter((lk) => lk.music === music);

            setLikes(rmvItem);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getDataByAPI();
    }, [likes]);

    function Layout() {
        if (theme === 'DarkMode') {
            return (
                <>
                    <Header theme={theme} />
                    <Container theme={DarkMode}>
                        <FlatList
                            data={allMusics}
                            onEndReachedThreshold={0.2}
                            keyExtractor={(allMusics) => allMusics.id}
                            renderItem={({ item: music }) => (
                                <MusicContainer>
                                    <Figure
                                        source={{
                                            uri: `${URL}/img/${music.banner_path}`,
                                        }}
                                        resizeMode='stretch'
                                    />
                                    <TextDark>{music.name}</TextDark>
                                    <TextDark>{music.genre}</TextDark>
                                    <ActionContainer>
                                        <ButtonListen
                                            onPress={() =>
                                                navigation.navigate('Sound', {
                                                    image: music.banner_path,
                                                    name: music.name,
                                                    sound: music.path,
                                                })
                                            }
                                        >
                                            <TextDark>
                                                <Icons
                                                    name='headphones'
                                                    size={18}
                                                />{' '}
                                                Listen
                                            </TextDark>
                                        </ButtonListen>

                                        {likes.find(
                                            (msc) => msc.music === music.id
                                        ) ? (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handlerLikeRemove(music.id)
                                                }
                                            >
                                                <Icons
                                                    name='heart'
                                                    size={28}
                                                    color={'#f00'}
                                                />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handlerLikeAdd(music.id)
                                                }
                                            >
                                                <Icons
                                                    name='heart-o'
                                                    size={28}
                                                    color={'#f00'}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    </ActionContainer>
                                </MusicContainer>
                            )}
                        />
                    </Container>
                </>
            );
        }
        return (
            <>
                <Header theme={theme} />
                <Container theme={LightMode}>
                    <FlatList
                        data={allMusics}
                        onEndReachedThreshold={0.2}
                        keyExtractor={(allMusics) => allMusics.id}
                        renderItem={({ item: music }) => (
                            <MusicContainer>
                                <Figure
                                    source={{
                                        uri: `${URL}/img/${music.banner_path}`,
                                    }}
                                    resizeMode='stretch'
                                />
                                <TextLight>{music.name}</TextLight>
                                <TextLight>{music.genre}</TextLight>
                                <ActionContainer>
                                    <ButtonListen
                                        onPress={() =>
                                            navigation.navigate('Sound', {
                                                image: music.banner_path,
                                                name: music.name,
                                                sound: music.path,
                                            })
                                        }
                                    >
                                        <TextLight>
                                            <Icons
                                                name='headphones'
                                                size={18}
                                            />{' '}
                                            Listen
                                        </TextLight>
                                    </ButtonListen>

                                    {likes.find(
                                        (msc) => msc.music === music.id
                                    ) ? (
                                        <TouchableOpacity
                                            onPress={() =>
                                                handlerLikeRemove(music.id)
                                            }
                                        >
                                            <Icons
                                                name='heart'
                                                size={28}
                                                color={'#f00'}
                                            />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() =>
                                                handlerLikeAdd(music.id)
                                            }
                                        >
                                            <Icons
                                                name='heart-o'
                                                size={28}
                                                color={'#f00'}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </ActionContainer>
                            </MusicContainer>
                        )}
                    />
                </Container>
            </>
        );
    }

    return Layout();
}

export default Home;
