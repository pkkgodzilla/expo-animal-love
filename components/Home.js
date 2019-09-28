import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { Dimensions, KeyboardAvoidingView } from 'react-native';
import { Container, Text, Row, Col, View, Grid, Content, Icon, Button, Item, Input, Label, Card, CardItem, Body } from 'native-base';
import Gallery from './shared/Gallery';

const WIDTH = Dimensions.get('window').width;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDisplay: {
                uri: 'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg'
            },
            imageGalleries: [
                {
                    text: 'cat happy',
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg'
                },
                {
                    text: 'cat happy',
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg'
                },
                {
                    text: 'cat happy',
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg'
                },
                {
                    text: 'cat happy',
                    uri: 'https://www.thesprucepets.com/thmb/XZGc64xHcGxzkgdx6_cj7evr8co=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/Stocksy_txp33a24e10lxw100_Medium_214761-5af9d6d7875db900360440a7.jpg'
                },

            ],
            imageForm: {
                text: '',
                uri: ''
            },
            notes: [
                {
                    text: 'อาบน้ำเจ้าเหมียว',
                    index: 0
                },
                {
                    text: 'พาไปตัดขนตอนเย็น',
                    index: 1
                }
            ],

            noteForm: {
                text: '',
                index: null
            }
        }
    }

    handleSelectedDisplay = (image) => {
        this.setState({ selectedDisplay: image });
    }

    handleUploadImage = () => {
        let { imageGalleries, imageForm } = this.state;
        imageGalleries.push(imageForm);
        imageForm = {
            text: '',
            uri: ''
        }

        this.setState({ imageGalleries, imageForm });
    }

    handleImageFormChange = (target) => value => {
        const { imageForm } = this.state;
        imageForm[target] = value;
        this.setState({ imageForm });
    }

    handleDeleteNote = (note) => {
        let { notes } = this.state;
        notes = notes.filter(n => n.index !== note.index );
        this.setState({ notes });
    }

    handleNoteFormChange = (target) => value => {
        const { noteForm } = this.state;
        noteForm[target] = value;
        this.setState({  noteForm });
    }

    handleAddNotes = () => {
        let { noteForm, notes } = this.state;
        noteForm.index = notes.length;
        notes.push(noteForm);
        noteForm = {
            text: '',
            index: null
        }

        this.setState({ notes, noteForm });
    }

    hanldeAlert = (note) => () => {
        Alert.alert(
            'Confirm ?',
            'Do you want to delete this note?',
            [
                {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                {text: 'YES', onPress: () => this.handleDeleteNote(note)},
            ]
        )
    }

    renderCardNotes = () => {
        const { notes }  = this.state;
        return notes.map((note, index) => {
            return (
                <View key={index} style={{
                    padding: 5,
                    width: '100%'
                }}>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>
                                    {note.text}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem 
                            style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }} 
                            footer 
                            button 
                            onPress={this.hanldeAlert(note)}>
                            <Text
                                style={{
                                    color: 'red'
                                }}
                            >Delete</Text>
                        </CardItem>
                    </Card>
                </View>
            );
        })
    }

    render() {
        const { selectedDisplay, imageGalleries } = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <Content contentContainerStyle={{
                padding: 15,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Grid>
                    <Row>
                        <Col
                            size={6}
                            style={{
                                padding: 2.5
                            }}
                        >
                            <View>
                                <Image
                                    style={{ width: '100%', height: 200, borderRadius: 4 }}
                                    source={{ uri: selectedDisplay.uri }} />
                            </View>
                        </Col>
                        <Col
                            size={6}
                            style={{
                                padding: 2.5
                            }}
                        >
                            <Text style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    fontWeight: 'bold'
                                }}>Name: </Text>
                                <Text>Momos</Text>
                            </Text>
                            <Text style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    fontWeight: 'bold'
                                }}>DOB: </Text>
                                <Text>05-01-2018</Text>
                            </Text>
                        </Col>
                    </Row>
                    <Row
                        style={{
                            marginTop: 50
                        }}
                    >
                        <Col>
                            <Text
                                style={{
                                    backgroundColor: '#444EAD',
                                    padding: 5,
                                    borderTopRightRadius: 4,
                                    borderTopLeftRadius: 4,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                <Text style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon style={{ color: '#fff' }} type="FontAwesome" name="image" />
                                    <Text style={{ color: '#fff' }}> Gallery</Text>
                                </Text>
                            </Text>
                            <View
                                style={{
                                    padding: 5
                                }}
                            >
                                <Gallery
                                    handleSelectedDisplay={this.handleSelectedDisplay}
                                    images={imageGalleries}
                                />
                            </View>
                            <View
                                style={{
                                    padding: 5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Item fixedLabel>
                                    <Label>Image URL: </Label>
                                
                                        <Input
                                            value={this.state.imageForm.uri}
                                            onChangeText={this.handleImageFormChange('uri')} />
                            
                                </Item>
                                <Item fixedLabel>
                                    <Label>Text Alert: </Label>
                                
                                        <Input
                                            value={this.state.imageForm.text}
                                            onChangeText={this.handleImageFormChange('text')} />
                               
                                </Item>
                                <Button
                                    onPress={this.handleUploadImage}
                                    style={{
                                        marginTop: 5,
                                        width: '30%',
                                        borderRadius: 4,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text> + ADD </Text>
                                </Button>
                            </View>

                        </Col>
                    </Row>
                    <Row
                        style={{
                            marginTop: 15
                        }}
                    >
                        <Col>
                            <Text
                                style={{
                                    backgroundColor: '#444EAD',
                                    padding: 5,
                                    borderTopRightRadius: 4,
                                    borderTopLeftRadius: 4,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignContent: 'center'
                                }}>
                                <Icon style={{ color: '#fff' }} type="FontAwesome" name="sticky-note" />
                                <Text style={{ color: '#fff' }}> Note</Text>
                            </Text>
                            <View
                                style={{
                                    padding: 5,
                                    display: 'flex',
                                    width: '100%',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                {this.renderCardNotes() }
                                <Item fixedLabel>
                                    <Label>Text: </Label>
                                
                                        <Input
                                            value={this.state.noteForm.text}
                                            onChangeText={this.handleNoteFormChange('text')} />
                               
                                </Item>
                                <Button
                                    onPress={this.handleAddNotes}
                                    style={{
                                        marginTop: 5,
                                        width: '30%',
                                        borderRadius: 4,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text> + ADD </Text>
                                </Button>
                            </View>
                        </Col>
                    </Row>
                </Grid>

            </Content>
            </KeyboardAvoidingView>
        )
    }
}

export default Home;