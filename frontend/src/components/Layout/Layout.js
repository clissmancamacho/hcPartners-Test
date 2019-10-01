import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Typography, Button } from 'antd'
import './style.css'

import { authServices } from '../../services'

const { Header, Content, Footer } = Layout

const { Title } = Typography

const LayoutContainer = (props) => {

	const enableLogoutButton = () => {
		if (authServices.isLoggedIn()) {
			return (
				<Fragment>
					<Button type="danger" id="logout-button" onClick={() => authServices.logout()}>
						<Link to="/login">Cerrar Sesión</Link>
					</Button>
				</Fragment>
			)
		}
	}

	return (
		<Layout className="layout">
			<Header className="header">
			<div className="flex-container">
				<Title className="main-title">HC Partners Test</Title>		
					{enableLogoutButton()}
			</div>
			
			</Header>

			<Content id="content">{props.children}</Content>

			<Footer style={{ textAlign: 'center' }}>HC Partners Test ©2019 Creado por Clissman Camacho</Footer>
		</Layout>
	)
}

export default withRouter(LayoutContainer)
