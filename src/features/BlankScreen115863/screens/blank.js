import React, { Component } from "react"
import {
  View,
  ImageBackground,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Alert
} from "react-native"
import {
  HOME_SCREEN_NAME,
  BACKGROUND_URL,
  emailValidationRegex,
  LOGO_URL
} from "./constants.js"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Tab, Tabs } from "native-base"
import { styles, buttonStyles, textInputStyles, Color } from "./styles"
import { connect } from "react-redux"
import { apiLoginRequest, apiSignupRequest } from "../../../store/auth/actions"
import {
  API_LOGIN_FAILED,
  API_SIGNUP_FAILED
} from "../../../store/auth/constants"

export const HOME_SCREEN = "BlankScreen015827"

const TextInputField = props => (
  <View>
    <Text style={[textInputStyles.label, props.labelStyle]}>{props.label}</Text>
    <TextInput
      autoCapitalize="none"
      style={[textInputStyles.textInput, props.textInputStyle]}
      placeholderTextColor={Color.steel}
      underlineColorAndroid={"transparent"}
      {...props}
    />

    {!!props.error && <Text style={textInputStyles.error}>{props.error}</Text>}
  </View>
)

const Button = props => (
  <TouchableOpacity onPress={props.onPress} disabled={props.loading}>
    <View style={[buttonStyles.viewStyle, props.viewStyle]}>
      {props.loading ? (
        <ActivityIndicator
          color={props.loadingColor ? props.loadingColor : Color.white}
          style={props.loadingStyle}
        />
      ) : (
        <Text style={[buttonStyles.textStyle, props.textStyle]}>
          {props.title}
        </Text>
      )}
    </View>
  </TouchableOpacity>
)

class SignUpComponent extends Component {
  state = {}

  componentDidUpdate(prevProps) {
    const { requestError, user, success } = this.props
    if (prevProps.isLoading && requestError?.type === API_SIGNUP_FAILED) {
      const error =
        requestError.code == 400
          ? "This email is already registered or password is too weak."
          : requestError.message

      Alert.alert("Error", error)
      this.setState({
        requestError: error
      })
    }
    if (prevProps.isLoading && success && user !== {}) {
      Alert.alert(
        "Signup Success",
        "Registration Successful. A confirmation will be sent to your e-mail address."
      )
    }
  }

  onSignupPress = async () => {
    const { email, password, confirmPassword } = this.state
    if (emailValidationRegex.test(email)) {
      if (password != "") {
        if (password == confirmPassword) {
          this.props.signup(email, password)
        } else {
          this.setState({
            confirmPasswordError: "Confirm password and password do not match"
          })
        }
      } else {
        this.setState({ passwordError: "Please enter a valid password" })
      }
    } else {
      this.setState({ emailError: "Please enter a valid email address" })
    }
  }

  render() {
    const {
      email,
      password,
      emailError,
      passwordError,
      confirmPassword,
      confirmPasswordError
    } = this.state
    return (
      <View>
        <Image source={{ uri: "https://via.placeholder.com/150" }} />
      </View>
    )
  }
}

class SignInComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      authLoading: false,
      fbLoading: false
    }
  }

  componentDidUpdate(prevProps) {
    const { requestError, token } = this.props
    if (prevProps.isLoading && requestError?.type === API_LOGIN_FAILED) {
      Alert.alert("Login Error", requestError.message)
    }
    if (token) {
      this.props.navigation.navigate(HOME_SCREEN_NAME)
    }
  }

  onSigninPress = () => {
    const { email, password } = this.state
    if (emailValidationRegex.test(email)) {
      if (password != "") {
        this.props.login(email, password)
        this.setState({ authLoading: false })
      } else {
        this.setState({ passwordError: "Please enter a valid password" })
      }
    } else {
      this.setState({ emailError: "Please enter a valid email address" })
    }
  }
  render() {
    const { email, password, emailError, passwordError } = this.state
    return (
      <View>
        <Image source={{ uri: "https://via.placeholder.com/150" }} />
      </View>
    )
  }
}

export class Blank extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View>
        <Image source={{ uri: "https://via.placeholder.com/150" }} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.authReducer.token,
    requestError: state.authReducer.error,
    isLoading: state.authReducer.isLoading,
    user: state.authReducer.user,
    success: state.authReducer.success
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) =>
      dispatch(apiLoginRequest({ username: email, password })),
    signup: (email, password) => dispatch(apiSignupRequest({ email, password }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blank)
