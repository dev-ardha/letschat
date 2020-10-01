import React from 'react';
import Styled from '@emotion/styled'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import { UserProvider } from './contexts/UserContext'
import { MessageProvider } from './contexts/MessageContext'
import { ContactProvider } from './contexts/ContactContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <StyledApp>
                <UserProvider>
                <ContactProvider>
                <MessageProvider>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/login" exact component={Login} />
                    </Switch>
                </MessageProvider>
                </ContactProvider>
                </UserProvider>
                </StyledApp>
            </div>
        </Router>
    );
}

const StyledApp = Styled.div`

`

export default App;
