import React, {useRef, useState} from "react";
import styles from "./auths.module.css";
import {Link, useNavigate} from "react-router-dom";
import {useCreateUserMutation} from "../../reduxSlices/Api.jsx";
import {auth} from "../../firebase.js";
import {createUserWithEmailAndPassword} from "@firebase/auth";

function Signup() {

    const navigate = useNavigate();
    const [createUser] = useCreateUserMutation();
    const [error, setError] = useState(null);



    /* REFS FOR THE INPUTS */
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    /* HANDLE SUBMIT */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = firstNameRef.current.value.trim();
        const lastName = lastNameRef.current.value.trim();
        const email = emailRef.current.value.trim().toLowerCase();
        const password = passwordRef.current.value.trim();

        if (password !== confirmPasswordRef.current.value) {
            setError("Passwords do not match")
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        /* CREATING THE USER */
        try {
            // This Will Put The User In The Firebase Database If not already there
            const createFirebaseUser = await createUserWithEmailAndPassword(auth, email, password);

            // This Will Put The User In The MongoDB Database if the user is not already there and is added to the firebase user
            const createMongoDBUser = await createUser({firstName, lastName, email, password});

            // Clear the form
            firstNameRef.current.value = "";
            lastNameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            confirmPasswordRef.current.value = "";

            navigate('/login')

        } catch (error) {
            setError(error.message)
        }
    };

    // Clear the error message after 2 seconds
    const clearError = () => {
        setTimeout(() => {
            setError(null);
        }, 200);
        clearInterval();
    };


    return (
        <section className={styles.section}>
            <div className={styles.formContainer}>
                <h2>Create An Account</h2>
                {error !== null && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formControls}>
                        <input
                            type='text'
                            name='firstName'
                            placeholder='First Name'
                            ref={firstNameRef}
                            onChange={clearError}
                            required
                        />
                        <input
                            type='text'
                            name='lastName'
                            placeholder='Last Name'
                            ref={lastNameRef}
                            onChange={clearError}
                            required
                        />
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            ref={emailRef}
                            required
                            onChange={clearError}
                        />
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            ref={passwordRef}
                            required
                            onChange={clearError}
                        />
                        <input
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            ref={confirmPasswordRef}
                            required
                            onChange={clearError}
                        />
                    </div>
                    <button type='submit'>Sign Up</button>
                    <p>
                        Already Have An Account? <Link to='/login'>Login</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Signup;
