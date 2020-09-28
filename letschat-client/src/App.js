import React from 'react';
import Styled from '@emotion/styled'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import { UserProvider } from './contexts/UserContext'
import { MessageProvider } from './contexts/MessageContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <StyledApp>
                <UserProvider>
                <MessageProvider>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/login" exact component={Login} />
                    </Switch>
                </MessageProvider>
                </UserProvider>
                </StyledApp>
            </div>
        </Router>
    );
}

const StyledApp = Styled.div`

`

export default App;
