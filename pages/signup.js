import React, { Component } from 'react'

import Error from './_error'
import Layout from '../components/layout'

const { SIGNUP_DISABLED } = process.env

class Signup extends Component {
	constructor(props) {
		super(props)
		this.state = {
			displayName: '',
			username: '',
			password: '',
		}
	}

	changeState(e) {
		var newState = {}
		newState[e.target.name] = e.target.value
		this.setState(newState)
	}

	submit() {
		alert(JSON.stringify(this.state))
	}

	render() {
		if (SIGNUP_DISABLED) {
			return <Error statusCode={404} />
		}
		
		return (
			<Layout title="signup">
				<style jsx>{`
                    input.input::placeholder {
                        color: #5e5e5e;
                    }
                    input.input {
                        border: 2px solid #5e5e5e;
                        height: 51px;
                    }
                `}</style>
				<div className="hero is-fullheight">
					<div className="hero-body">
						<div className="container has-text-centered" style={{ maxWidth: '360px' }}>
							<img src="../branding/kilobit-wordmark-color.svg" alt="kilobit wordmark" />
							<br />
							<br />
							<input
								type="input"
								name="displayName"
								className="input"
								style={{ fontWeight: 'bold' }}
								placeholder="display name"
								onChange={this.changeState.bind(this)}
								value={this.state.displayName}
							/>
							<br />
							<br />
							<input
								type="input"
								name="username"
								className="input"
								style={{ fontWeight: 'bold' }}
								placeholder="username"
								onChange={this.changeState.bind(this)}
								value={this.state.username}
							/>
							<br />
							<br />
							<input
								type="password"
								name="password"
								className="input"
								style={{ fontWeight: 'bold' }}
								placeholder="password"
								onChange={this.changeState.bind(this)}
								value={this.state.password}
							/>
							<br />
							<br />
							<button className="button is-rounded is-primary" onClick={this.submit.bind(this)}><strong>Sign up</strong></button>
						</div>
					</div>
				</div>
			</Layout>
		)
	}
}


export default Signup