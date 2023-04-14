import React, {useRef, useState} from 'react'
import styles from './Contact.module.css'

// IMAGES
import businessMan from "../../assets/businessman.png"

// REDUX
import {useDispatch} from 'react-redux';
import {useSendTicketMutation} from '../../reduxSlices/Api';
import {showModal} from '../../reduxSlices/Modal';






const Contact = () => {
    const [characterCount, setCharacterCount] = useState(1500)
    const [sendTicket] = useSendTicketMutation()
    const [category, setCategory] = useState('')

    const messageRef = useRef()

    const categories = ['', 'Web Development', 'Analytics', 'Branding', 'SEO', 'Billing', 'Other']

    const userIsLoggedIn = JSON.parse(localStorage.getItem('user')) || null
    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
        const message = messageRef.current.value
        if (message.length > 1500) {
            alert('Message is too long!')
            return;
        }
        else {
            sendTicket({category, message, userId: userIsLoggedIn._id})
            messageRef.current.value = ''
            setCategory('')
            setCharacterCount(1500)
            dispatch(showModal())
        }
    }



    return (
        <section className={styles.section}>
            <div className={styles.container}>

                {/* ON THE LEFT SIDE */}
                <div className={styles.contactInfo}>
                    <img src={businessMan} alt="Buisness Man" className={styles.contactImage} />
                </div>

                {/* ON THE RIGHT SIDE */}
                <div className={styles.contact}>
                    <h2 className={styles.contactHeader}>Get In Touch!</h2>
                    <form className={`${ styles.contactForm }`} onSubmit={submitHandler}>
                        {!userIsLoggedIn &&
                            <div className={styles.contactFormDisabled}>
                                <div className={styles.disabledMessage}>
                                    Sign In To Send Us A Message!
                                </div>
                            </div>
                        }
                        <div className={styles.formControls}>
                            <div className={styles.inputs}>
                                <input
                                    placeholder='First Name'
                                    type='text'
                                    name='firstName'
                                    value={userIsLoggedIn ? userIsLoggedIn.firstName : ''}
                                    required
                                    readOnly />
                                <input
                                    placeholder='Last Name'
                                    type='text'
                                    name='lastName'
                                    value={userIsLoggedIn ? userIsLoggedIn.lastName : ''}
                                    required
                                    readOnly />
                                <input
                                    placeholder='Email'
                                    type='email'
                                    name='email'
                                    value={userIsLoggedIn ? userIsLoggedIn.email : ''}
                                    required
                                    readOnly />
                                <select
                                    className={styles.select}
                                    placeholder='Category'
                                    name='category'
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                    required
                                >
                                    {categories.map((category) => {
                                        if (category === '') {
                                            return (
                                                <option
                                                    value=''
                                                    key=''
                                                    disabled

                                                >
                                                    Select Category
                                                </option>
                                            )
                                        } else {
                                            return (

                                                <option
                                                    value={category} key={category} > {category}
                                                </option>
                                            )
                                        }
                                    })}
                                </select>
                            </div>

                            <div className={styles.messageContainer}>
                                <textarea
                                    className={styles.textArea}
                                    placeholder='Message...'
                                    ref={messageRef}
                                    name='message'
                                    onChange={(e) => setCharacterCount(1500 - e.target.value.length)}
                                    required
                                />
                                <span>  {characterCount} characters remaining</span>
                            </div>

                            <button className={styles.contactButton}>Send</button>
                        </div>

                    </form>
                </div>
            </div >

        </section >
    )
}

export default Contact