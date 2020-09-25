import React from 'react';
import Styled from '@emotion/styled'
import Axios from 'axios';

function Login() {

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.currentTarget.elements.email.value;
        const password = e.currentTarget.elements.password.value;

        console.log(email, password)
        Axios.post('http://localhost:4000/api/v1/auth/login', {
            email,
            password
        })
    }

    return (
        <StyledLogin>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="field">
                    <input type="email" name="email" id="email" placeholder="Email"/>
                </div>
                <div className="field">
                    <input type="password" name="password" id="password" placeholder="Password"/>
                </div>
                <button>Login</button>
            </form>
        </StyledLogin>
    );
}

const StyledLogin = Styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:90vh;

    form{
        width:400px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        padding: 2rem 1rem 1rem 1rem;

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
            border-radius:4px;
            border:1px solid #ddd;
            padding: 0 1rem;
            width:100%;
        }
    }
    button{
        width:280px;
        padding:.75rem 1rem;
        background:#3D7EFE;
        color:#fff;
        border:none;
        cursor:pointer;
    }
`

export default Login;
