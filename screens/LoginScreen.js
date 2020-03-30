import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { Card, Input, Button, Divider } from "react-native-elements";
import autobind from 'autobind-decorator';
import { setCurrentSession } from '../utils';
import { loginPOST } from '../services/backend';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    
    @autobind
    async onLogin() {
        try {
            const res = await loginPOST({
                data: {
                    email: this.state.email,
                    password: this.state.password
                }
            });

            console.log('res', res);
            if (res && res.token) {
                await setCurrentSession(res);
                this.props.setIsLoggedIn();
            }
        } catch (e) {
            console.log('onLogin e', e)
        }
    }

    @autobind
    onChangeEmail(text) {
        this.setState({ 
            email: text
        })
    }

    @autobind
    onChangePassword(text) {
        this.setState({ 
            password: text
        })
    }
    
    render() {
        return (
            <ImageBackground 
                style={styles.container}
                source={require("../assets/images/color_bg2.jpg")}
            >
                <Card
                    title={<Text style={styles.title}>LOGIN</Text>}
                >
                <Input
                    style={styles.input}
                    leftIconContainerStyle={{ paddingRight: 5 }}
                    returnKeyType='next'
                    placeholder='email'
                    leftIcon={{ name: 'email' }}
                    errorStyle={{ color: 'red' }}
                    onChangeText={this.onChangeEmail}
                    errorMessage=''
                />
                <Input
                    style={styles.input}
                    leftIconContainerStyle={{ paddingRight: 5 }}
                    returnKeyType='send'
                    placeholder='password'
                    secureTextEntry={true}
                    leftIcon={{ name: 'lock' }}
                    errorStyle={{ color: 'red' }}
                    onChangeText={this.onChangePassword}
                    onSubmitEditing={this.onLogin}
                    errorMessage=''
                />
                <View style={{ height: 15 }} />
                <Button
                    buttonStyle={styles.newQuizButton}
                    title="Login"
                    onPress={this.onLogin}
                />
                </Card>
            </ImageBackground>
        )
    }
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#ccc",
      flex: 1,
      resizeMode: "center",
      position: "absolute",
      width: "100%",
      height: "100%",
      justifyContent: "center"
    },
    newQuizButton: {
        backgroundColor: "blue"
    },
    input: {
        paddingVertical: 5
    },
    title: {
        fontFamily: 'Avenir',
        fontWeight: '800',
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 22
    }
});
  