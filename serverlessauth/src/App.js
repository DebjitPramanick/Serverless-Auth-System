import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Pages/Home'
import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login'
import Register from './Pages/Register'

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/"
                        component={LandingPage}
                    />
                    <Route exact path="/home"
                        component={Home}
                    />
                    <Route exact path="/login"
                        component={Login}
                    />
                    <Route exact path="/register"
                        component={Register}
                    />
                </Switch>
            </Router>
        </div>
    )
}

export default App
