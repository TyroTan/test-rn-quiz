import { View, Text, StyleSheet, ImageBackground, Keyboard } from 'react-native';
import React from 'react';
import { Card, Input, Button, Divider } from "react-native-elements";
import { setCurrentSession } from '../utils';
import { loginPOST } from '../services/backend';
import { FlatList } from 'react-native-gesture-handler';

const LOGIN_ERROR_MSG = 'Invalid username/password.';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            errorMsg: ''
        }
        this.pwRef = React.createRef();

        this.onLogin = this.onLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }
    
    async onLogin() {
        try {
            if (this.state.loading) {
                return;
            }

            console.log('this.state', this.state);
            this.setState({ loading: true, errorMsg: '' })
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
            } else {
                this.setState({ loading: false, errorMsg: res?.msg ?? LOGIN_ERROR_MSG })
            }
        } catch (e) {
            this.setState({ loading: false, errorMsg: e?.response?.data?.msg ?? LOGIN_ERROR_MSG })
            console.log('onLogin e', e)
        }
    }

    onChangeEmail(text) {
        this.setState({ 
            email: text,
            errorMsg: ''
        })
    }

    onChangePassword(text) {
        this.setState({ 
            password: text,
            errorMsg: ''
        })
    }

    renderForm() {
        return (
            <View>
                <Input
                    autoFocus
                    style={styles.input}
                    leftIconContainerStyle={{ paddingRight: 5 }}
                    returnKeyType='next'
                    placeholder='email'
                    leftIcon={{ name: 'email' }}
                    errorStyle={{ color: 'red' }}
                    onChangeText={this.onChangeEmail}
                    onSubmitEditing={() => this.pwRef?.current?.focus?.()}
                    errorMessage=''
                />
                <Input
                    ref={this.pwRef}
                    style={styles.input}
                    leftIconContainerStyle={{ paddingRight: 5 }}
                    returnKeyType='send'
                    placeholder='password'
                    secureTextEntry={true}
                    leftIcon={{ name: 'lock' }}
                    errorStyle={{ color: 'red' }}
                    onChangeText={this.onChangePassword}
                    onSubmitEditing={this.onLogin}
                    errorMessage={this.state.errorMsg}
                />
                <View style={{ height: 15 }} />
                <Button
                    loading={this.state.loading}
                    buttonStyle={styles.newQuizButton}
                    title="Login"
                    onPress={this.onLogin}
                />
            </View>
        )
    }
    
    render() {
        return (
            <ImageBackground 
                style={styles.container}
                source={require("../assets/images/color_bg2.jpg")}
            >
                <Card
                    onPress={() => Keyboard?.dismiss?.()}
                    title={<Text style={styles.title}>LOGIN</Text>}
                >
                    <FlatList
                        keyboardShouldPersistTaps='handled'
                        data={['dummy']}
                        renderItem={() => this.renderForm()}
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
  