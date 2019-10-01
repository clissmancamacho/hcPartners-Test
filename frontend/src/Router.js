import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { authServices } from './services/'

import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'
import LayoutContainer from './components/Layout'

const AppRouter = () => {
	const verifyRoute = (Component) => {
		return authServices.isLoggedIn() ? <Component /> : <Redirect to="/" />
	}

	return (
		<Router>
			<LayoutContainer>
				<Switch>
					<Redirect to="/login" exact path="/" />>
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/home" render={() => verifyRoute(Home)} />
				</Switch>
			</LayoutContainer>
		</Router>
	)
}

export default AppRouter
