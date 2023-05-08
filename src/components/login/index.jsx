import React, { useState, useEffect } from 'react'
import { usePostLoginMutation, usePostSignUpMutation } from '@/state/api'

function Login( {setUser, setSecret }) {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [triggerLogin, resultLogin] = usePostLoginMutation();
    const [triggerSignUp, resultSignUp] = usePostSignUpMutation();

    const handleLogin = () => {
        triggerLogin({ username, password });
    };

    const handleRegister = () => {
        triggerSignUp({ username, password });
    }

    useEffect(() => {
        if(resultLogin.data?.response) {
            setUser(username);
            setSecret(password);
        } else if(resultLogin.isError){
            alert("username or password incorrect!");
        }
    }, [resultLogin]); //eslint-disable-line

    useEffect(() => {
        if(resultSignUp.isError){
            alert("username already existing!");
        } else if(resultSignUp.data?.response){
            alert("Register successful");
        }
    }, [resultSignUp]); //eslint-disable-line

  return <div className='login-page'>
    <div className='login-container'>
        <h2 className='title'>CHATBOT APP</h2>
        <p className='register-change' onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Already a user?" : "Are you a new user?"}
        </p>
        
        <div>
            <input 
                className='login-input' 
                type='text' 
                placeholder='Username' 
                value={username}
                onChange={(e) => setUsername(e.target.value)}>
            </input>
            <input 
                className='login-input' 
                type='password' 
                placeholder='Password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}>
            </input>
        </div>

        <div className='login-actions'>
            {isRegister ? (
                <button type='button' onClick={handleRegister}>
                    Register
                </button> 
            ) : (
                <button type='button' onClick={handleLogin}>
                    Login
                </button> 
            )
            }
        </div>
    </div>
  </div>
}

export default Login