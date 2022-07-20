import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Gravatar } from 'react-native-gravatar'
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image
} from 'react-native'

import icon from '../../assets/imgs/icon.png'
import * as Font from 'expo-font';

let customFonts = {
    Shelter: require('../../assets/fonts/shelter.otf'),
};

class Header extends Component {

    state = {
        fontsLoaded: false,
    };

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    render() {
        const name = this.props.name || 'Anonymous'
        const gravatar = this.props.email ? <Gravatar options={{ email: this.props.email, secure: true }} style={styles.avatar} /> : null
        if (!this.state.fontsLoaded) {
            return  <></>;
        }

        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={icon} style={styles.image} />
                    <Text style={[styles.title, {fontFamily: 'Shelter'}]}>Cubacown</Text>
                </View>
                <View style={styles.userContainer}>
                    <Text style={styles.user}>{name}</Text>
                    {gravatar}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        padding: 10,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#BBB',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    title: {
        color: '#000',
        height: 30,
        fontSize: 20,
        fontFamily: 'Shelter',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    user: {
        fontSize: 10,
        color: '#888'
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: 10
    }

})

const mapStateToProps = ({ user }) => {
    return {
        name: user.name,
        email: user.email
    }
}

export default connect(mapStateToProps)(Header)