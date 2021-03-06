import React, { useState } from 'react';
import Styled from '@emotion/styled'
import axios from 'axios';
import { useHistory, NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'

function Login() {
    const history = useHistory();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const email = e.currentTarget.elements.email.value;
        const password = e.currentTarget.elements.password.value;
        const username = e.currentTarget.elements.username.value;

        axios.post('/api/v1/auth/register', {
            email: email,
            password: password,
            username: username
        }).then((response) => {
            setLoading(false)
            Cookies.set('accToken', response.data.token, { expires: 1 });
            window.localStorage.setItem('peggnid', response.data.user._id );
            history.push('/')
        }).catch(err => {
            setLoading(false)
            if(err.response){
                setError(err.response.data.msg)
            }else{
                setError('Unknown error. Please try to reload the page.')
            }
        })
    }

    return (
        <StyledLogin>
            <form onSubmit={handleSubmit}>
                <h2>Signup</h2>
                { error ? <span className="error-message">{error}</span> : '' }
                <div className="field">
                    <input type="text" name="username" id="username" placeholder="Username"/>
                </div>
                <div className="field">
                    <input type="email" name="email" id="email" placeholder="Email"/>
                </div>
                <div className="field">
                    <input type="password" name="password" id="password" placeholder="Password"/>
                </div>
                <button type="submit" disabled={loading ? true : false}>Login</button>
            </form>
            <p>Already have an account? <NavLink to="/login">Log in</NavLink> here</p>
        </StyledLogin>
    );
}

const StyledLogin = Styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:90vh;
    flex-direction:column;

    form{
        width:400px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        padding: 2rem 1rem 1rem 1rem;

        .error-message{
            padding: .6rem;
            background: #ffdddd;
            margin-bottom: 1rem;
            display: flex;
            width: 280px;
            justify-content: center;
            align-items: center;
            color: red;
            border: 1px solid red;
            text-align:center;
        }

        h2{
            text-align:center;
            font-size:2.5rem;
            font-weight:900;
        }
    }

    .field{
        margin-bottom:1rem;
        width:280px;

        input{
            height:40px;
            border:1px solid #ddd;
            padding: 0 1rem;
            width:100%;

            &::placeholder{
                color:#ccc;
            }
        }
    }
    button{
        width:280px;
        padding:.75rem 1rem;
        background:#1890FF;
        color:#fff;
        border:none;
        cursor:pointer;

        &:hover{
            background:#379fff;
        }
    }
`

export default Login;
