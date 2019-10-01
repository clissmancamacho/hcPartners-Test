import React, { useState, useEffect } from 'react'
import { Button, Card, Input, Form, Icon, message } from "antd"
import { Link, withRouter } from "react-router-dom"
import "./style.css"
import { authServices } from "../../services/"

const Register = props => {
  const [loading, setLoading] = useState(false)

  const { getFieldDecorator } = props.form

  /* Function and Methods */

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true)
        try {
          const user = {
            email: values.email,
            name: values.name,
            password: values.password
          }
          const response = await authServices.register(user)
          if (response.status) {
            setLoading(false)
            RegisterSuccess(response.user)
          }
        } catch (error) {
          setLoading(false)
        }
      }
    })
  }

  const RegisterSuccess = user => {
    localStorage.setItem("user", JSON.stringify(user))
    setTimeout(() => {
      props.history.push("home")
    }, 2000)
  }

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== props.form.getFieldValue("password")) {
      callback("Las Contraseñas no coinciden")
    } else {
      callback()
    }
  }

  // Function to activate passwords match validation
  const validateToNextPassword = (rule, value, callback) => {
    if (value) {
      props.form.validateFields(["confirm"], { force: true })
    }
    callback()
  }

  return (
    <div className="container">
      <Card className="card-login" title="Registro">
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "¡Por favor introduce tu email!" }]
            })(<Input prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Email" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "¡Por favor introduce tu nombre!" }]
            })(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} type="text" placeholder="Nombre" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: `La contraseña esta vacia`
                },
                {
                  min: 4,
                  message: `¡La contraseña es muy corta! Mínimo 4 caracteres`
                },
                {
                  validator: validateToNextPassword
                }
              ]
            })(<Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="Contraseña" />)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("confirm_password", {
              rules: [
                {
                  required: true,
                  message: `La contraseña esta vacia`
                },
                {
                  min: 4,
                  message: `¡La contraseña es muy corta! Mínimo 4 caracteres`
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            })(<Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="Repite la contraseña" />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={loading} htmlType="submit" block>
              Registrarse
            </Button>
          </Form.Item>
          <div style={{ textAlign: "center", marginTop: "5px" }}>
            ¿Ya tienes una cuenta?
            <Link to="/login" style={{ marginLeft: "5px", color: "#000" }}>
              <strong>Inicia Sesión</strong>
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}

const WrappedRegisterForm = Form.create({ name: "register_form" })(Register)

export default withRouter(WrappedRegisterForm)
