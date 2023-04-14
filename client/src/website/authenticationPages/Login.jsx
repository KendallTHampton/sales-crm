import React, {useRef, useState} from 'react'
import styles from './auths.module.css'
import {Link, useNavigate} from 'react-router-dom'
import {auth} from "../../firebase.js";
import {useLoginUserMutation} from '../../reduxSlices/Api';
import {signInWithEmailAndPassword} from "firebase/auth";
import {setCurrentUser} from '../../reduxSlices/User';
import {useDispatch} from "react-redux";





function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginUser,] = useLoginUserMutation()
    const [error, setError] = useState(null);
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value.trim().toLowerCase();
        const password = passwordRef.current.value.trim();
        const confirmPassword = confirmPasswordRef.current.value.trim();

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return;
        }
        if (password.trim().length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password)
            await loginUser({email, password}).then(results => {
                localStorage.setItem('user', JSON.stringify(results.data[0]))
                localStorage.setItem('token', JSON.stringify(results.data[1]))
                dispatch(setCurrentUser(results.data.user))
            })
            emailRef.current.value = "";
            passwordRef.current.value = "";
            confirmPasswordRef.current.value = "";
            navigate("/")

        } catch (error) {
            setError(error.message)
        }

    }


    const clearError = () => {
        setTimeout(() => {
            setError(null);
        }, 200);
        clearInterval();
    };




    return (
        <section className={styles.section}>
            <div className={styles.formContainer}>
                <h2>Sign In</h2>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formControls}>
                        <input type="email" name="email" placeholder="Email" ref={emailRef} onChange={clearError} required />
                        <input type="password" name="password" placeholder="Password" ref={passwordRef} onChange={clearError} required />
                        <input type="password" name='confirmPassword' placeholder="Confirm Password" ref={confirmPasswordRef} onChange={clearError} required />
                    </div>
                    <button type="submit">Log In</button>
                    <p> Don’t have an Account? <Link to="/signup">Sign-up</Link></p>
                </form>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    top: '2%',
                    left: '50%',
                    transform: 'translate(-50%, 0%)',
                    backgroundColor: 'white',
                }}>
                <h4>Admin Credentials</h4>
                <p style={{color: 'gray'}}>Email: <span style={{color: 'black'}}>Admin@gmail.com</span> </p>
                <p style={{color: 'gray'}}>Password: <span style={{color: 'black'}}>Admin1</span></p>
            </div>

        </section>
    )
}

export default Login