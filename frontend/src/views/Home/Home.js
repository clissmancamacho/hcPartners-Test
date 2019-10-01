import React, {forwardRef} from 'react'
import { Link, withRouter } from 'react-router-dom'
import ListUser  from '../../components/Ticket/ListUser'
import ListAdmin from '../../components/Ticket/ListAdmin'

import { authServices } from '../../services'
import './style.css'

import { Typography } from 'antd'
const { Title } = Typography

const Home = forwardRef((props, ref) => {
	const user = JSON.parse(localStorage.getItem('user'))

	const renderByRol = () => {
		if(!authServices.isAdmin()) {
			return <ListUser></ListUser>
		}
		return <ListAdmin></ListAdmin>
	}
	return (
		<div className="home-container">
			<Title id="welcome-title">Bienvenido, <b>{user.name}</b></Title>
			{ renderByRol() }
		</div>
	)
})

export default withRouter(Home)
