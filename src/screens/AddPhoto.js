import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../store/actions/posts'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    Alert,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const noUser = 'você precisa estar logado para adicionar imagens'

class AddPhoto extends Component {

    state = {
        image: null,
        comment: '',
    }

    componentDidUpdate = prevProps => {
        if (prevProps.loading && !this.props.loading) {
            this.setState({
                image: null,
                comment: '',
            })
            this.props.navigation.navigate('Feed')
        }
    }

    pickImage = async () => {
        if (!this.props.name) {
            Alert.alert('Falha! ', noUser)
            return
        }
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1
        }).then(res => {
            if (res.cancelled) {
                return
            }
            this.setState({ image: { uri: res.uri, base64: res.base64 } })
        }).catch(err => {
            console.log(err)
        })

    }

    save = async () => {

        if (!this.props.name) {
            Alert.alert('Falha! ', noUser)
            return
        }

        this.props.onAddPost({
            id: Math.random(),
            nickname: this.props.name,
            email: this.props.email,
            image: this.state.image,
            comments: [{
                nickname: this.props.name,
                comment: this.state.comment
            }]
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Compartilhe sua imagem
                    </Text>
                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image} />
                    </View>
                    <TouchableOpacity onPress={this.pickImage} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Escolha a foto
                        </Text>
                    </TouchableOpacity>
                    <TextInput placeholder='Algum comentário para a foto?' style={styles.input} value={this.state.comment} editable={!!this.props.name} onChangeText={comment => this.setState({ comment })} />
                    <TouchableOpacity onPress={this.save} style={[styles.button, this.props.loading ? styles.buttonDisabled : null]} disabled={this.props.loading}>
                        <Text style={styles.buttonText}>
                            Salvar
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width * 2 / 4,
        backgroundColor: '#EEE',
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').width * 2 / 4,
        resizeMode: 'center',
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%',
    },
    buttonDisabled: {
        backgroundColor: '#AAA'
    }
})

const MapStateToProps = ({ user, posts }) => {
    return {
        name: user.name,
        email: user.email,
        loading: posts.isUploading
    }

}

const MapDispatchToProps = dispatch => ({
    onAddPost: post => dispatch(addPost(post))
})

export default connect(MapStateToProps, MapDispatchToProps)(AddPhoto)
