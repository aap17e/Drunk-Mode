import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { Constants } from 'react-native-unimodules';
import firebase from 'firebase';

class Login extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    }

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(this.onSuccess)
        .catch(err => {
            this.setState({
                error: err.message
            })
        })
    }

    onSuccess = () => {
        this.setState({
            error: '',
            loading: false
        })
    }

    onRegisterPress = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(this.onSuccess)
        .catch(err => {
            this.setState({
                error: err.message
            })
        })
    }

    render(){
        return (
                <View style={styles.container}>
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                        />

                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={password => this.setState({password})}
                        />

                    <TouchableOpacity style={styles.buttonContainer} onPress={this.onLoginPress}>
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.errorText}>
                        {this.state.error}
                    </Text>

                     <TouchableOpacity style={{padding: 20}}>
                        <Text style={styles.options}>
                            Forgot Password
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onRegisterPress}>
                        <Text style={styles.options}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 0.5,
        paddingLeft: 10,
        marginBottom: 15,
        borderRadius: 5,
        fontSize: 15
    },
    errorText: {
        fontSize: 15,
        color: 'red',
        alignSelf: 'center',
        marginTop: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    buttonContainer: {
        backgroundColor: '#3B3B98',
        padding: 15,
        borderRadius: 8
    },
    options: {
        color: '#1B9CFC',
        alignSelf: 'center',
        margin: 10,
        fontWeight: 'bold'
    }
});

export default Login;