import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Card, Input, Form, Icon, message } from 'antd'
import './style.css'
import { authServices } from '../../services/'

const Login = (props) => {
	const [ loading, setLoading ] = useState(false)

	const { getFieldDecorator } = props.form
	const handleSubmit = (e) => {
		e.preventDefault()
		props.form.validateFields(async (err, values) => {
			if (!err) {
				setLoading(true)
				try {
					const response = await authServices.login(values)
					if (response.status) {
						setLoading(false)
						LoginSuccess(response.user)
					}
				} catch (error) {
					setLoading(false)
					message.error('Credenciales Inválidas.')
				}
			}
		})
	}

	const LoginSuccess = (user) => {
		localStorage.setItem('user', JSON.stringify(user))
		setTimeout(() => {
			props.history.push('home')
		}, 2000)
	}

	return (
		<div className="container">
			<Card className="card-login" title="Iniciar Sesión">
				<Form onSubmit={handleSubmit}>
					<Form.Item>
						{getFieldDecorator('identity', {
							rules: [ { required: true, message: '¡Por favor introduce tu email!' } ]
						})(
							<Input
								prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Email"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [ { required: true, message: '¡Por favor introduce tu password!' } ]
						})(
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="Contraseña"
							/>
						)}
					</Form.Item>
					<Form.Item>
						<Button type="primary" loading={loading} htmlType="submit" block>
							Inicia Sesión
						</Button>

						<div style={{ textAlign: 'center', marginTop: '5px' }}>
							¿No tienes cuenta?
							<Link to="/register" style={{ marginLeft: '5px', color: '#000' }}>
								<strong>Registrate aquí</strong>
							</Link>
						</div>
					</Form.Item>
				</Form>
			</Card>
		</div>
	)
}

const WrappedLoginForm = Form.create({ name: 'login_form' })(Login)

export default withRouter(WrappedLoginForm)
