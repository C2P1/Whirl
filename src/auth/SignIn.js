import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';

import { authenticate, confirmUserLogin } from '../actions';
import { fonts, colors } from '../theme';

import Input from '../components/Input';
import Button from '../components/Button';

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    greetingText: ''
  };

  componentDidMount() {
    this.setState({
      greetingText: this.getGreeting()
    });
    SplashScreen.hide();
  }

  getGreeting() {
    var date = new Date();
    var hour = date.getHours();
    if (hour > 17) {
      return 'evening';
    } else if (hour > 11) {
      return 'afternoon';
    } else {
      return 'morning';
    }
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  signIn() {
    const { username, password } = this.state;
    this.props.dispatchAuthenticate(username, password);
  }

  confirm() {
    const { authCode } = this.state;
    this.props.dispatchConfirmUserLogin(authCode);
  }

  render() {
    const { fontsLoaded } = this.state;
    const {
      auth: {
        signInErrorMessage,
        isAuthenticating,
        signInError,
        showSignInConfirmationModal
      }
    } = this.props;
    return (
      <ImageBackground
        style={styles.image}
        source={require('../assets/DefaultBackground3.jpg')}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>Whirl</Text>
            </View>
            {/* <Text style={[styles.greeting]}>
              Good {this.state.greetingText}
            </Text> */}
            {/* <Text style={[styles.greeting2]}>Sign in to continue</Text> */}
            <View style={styles.inputContainer}>
              <View style={styles.inputLineContainer}>
                <Input
                  placeholder="Email Address"
                  type="username"
                  onChangeText={this.onChangeText}
                  value={this.state.username}
                />
              </View>
              <View style={styles.inputLineContainer}>
                <Input
                  placeholder="Password"
                  type="password"
                  onChangeText={this.onChangeText}
                  value={this.state.password}
                  secureTextEntry
                />
              </View>
            </View>
            <Button
              isLoading={isAuthenticating}
              title="Login"
              onPress={this.signIn.bind(this)}
              style={styles.button}
            />
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = {
  dispatchConfirmUserLogin: authCode => confirmUserLogin(authCode),
  dispatchAuthenticate: (username, password) => authenticate(username, password)
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row'
  },
  inputContainer: {
    marginTop: 20
  },
  inputLineContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primary
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    top: -25
  },
  greeting: {
    fontWeight: '300',
    marginTop: 20,
    fontSize: 31,
    fontFamily: fonts.light
  },
  greeting2: {
    color: '#666',
    fontSize: 24,
    marginTop: 5,
    fontFamily: fonts.light
  },
  image: {
    flexGrow: 1,
    height: null,
    width: null,
    alignItems: 'stretch'
  },
  title: {
    padding: 10,
    fontFamily: 'Billabong',
    fontSize: 60,
    fontWeight: '200',
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowRadius: 0.3,
    textShadowOffset: { width: 0.5, height: 0.5 }
  }
});
