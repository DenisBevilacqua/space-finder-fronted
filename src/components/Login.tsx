import React, {SyntheticEvent} from "react";
import {AuthService} from "../services/AuthService";
import {User} from "../model/Model";
import history from "../utils/history";

interface LoginProps {
    authService: AuthService
    setUser: (user: User) => void
}

interface LoginState {
    userName: string,
    password: string,
    loginAttenpted: boolean,
    loginSuccesfull: boolean
}

interface CustomEvent {
    target: HTMLInputElement
}

export class Login extends React.Component<LoginProps, LoginState> {

    state: LoginState = {
        userName: '',
        password: '',
        loginAttenpted: false,
        loginSuccesfull: false
    }

    private setUserName(event: CustomEvent) {
        this.setState({userName: event.target.value})
    }

    private setPassword(event: CustomEvent) {
        this.setState({password: event.target.value})
    }

    private async handleSubmit(event: SyntheticEvent) {
        event.preventDefault()
        this.setState({loginAttenpted: true})
        const result = await this.props.authService.login(this.state.userName, this.state.password)

        if (result) {
            this.setState({loginSuccesfull: true})
            this.props.setUser(result)
            history.push('/profile')
        } else {
            this.setState({loginSuccesfull: false})
        }
    }

    render() {
        let loginMessage: any
        if (this.state.loginAttenpted) {
            if (this.state.loginSuccesfull) {
                loginMessage = <label>Login sucessfull</label>
            } else {
                loginMessage = <label style={{color: "red"}}>Login failed</label>
            }
        }

        if (this.state.loginSuccesfull) {
            return (
                <> {loginMessage}
                    <h1>Hello {this.state.userName}</h1>
                </>)
        } else
            return (
                <div>
                    <h2>Please login</h2>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <input onChange={value => this.setUserName(value)} value={this.state.userName}/><br/>
                        <input onChange={value => this.setPassword(value)} value={this.state.password}
                               type='password'/><br/>
                        <br/>
                        <input type='submit' value='Login'/>
                    </form>
                    {loginMessage}
                </div>
            )
    }
}
