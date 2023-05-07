import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { URLEnum } from '../RouterEnum'
import { login } from '../service';
// import { encrypt } from './util'

function Login() {
    
    useEffect(() => {
        console.log(navigator.userAgent);
    }, [])

    const navigate = useNavigate()

    const [remember, setRemember] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const userLogin = (evt:React.FormEvent) => {
        evt.preventDefault()

        
        login(username, password).then( res => {
            console.log("Res data" ,res.data)
            const accessToken = res.data.access_token
            if (accessToken) {
                console.log("TOKEN RECEIVED")
                sessionStorage.setItem('accessToken', accessToken);
            }
            else {
                console.log("NO TOKEN")
            }

            }
        );
    }
       

    return (
        <>
            <div className='row'>
                <div className='col-sm-4'></div>
                <div className='col-sm-4'>
                    <h2>User Login</h2>
    
                    { error !== '' && 
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> { error }
                        <button onClick={() => setError('')} type="button" className="btn-close"></button>
                        </div>
                    }
    
                    <form onSubmit={userLogin}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input onChange={(evt) => setUsername(evt.target.value) }  required type="text" className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={(evt) => setPassword(evt.target.value) } required type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input onClick={() => setRemember(!remember)} type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className='col-sm-4'></div>
            </div>
        </>
    )
}

export default Login