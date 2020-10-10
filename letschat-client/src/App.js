import React from 'react';
import Styled from '@emotion/styled'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import { MessageProvider } from './contexts/MessageContext'
import { ContactProvider } from './contexts/ContactContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { store } from './redux/store'
import { Provider } from 'react-redux'

function App() {
    return (
        <Provider store={store}>
        <Router>
            <div className="App">
                <StyledApp>
                <ContactProvider>
                <MessageProvider>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/login" exact component={Login} />
                    </Switch>
                </MessageProvider>
                </ContactProvider>
                </StyledApp>
            </div>
        </Router>
        </Provider>
    );
}

const StyledApp = Styled.div`

`

export default App;
