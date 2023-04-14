import React, {useState} from 'react'
import {createPortal} from 'react-dom'
import styles from './Modal.module.css'
import techGuy from "../../assets/techGuy.png"
import techGuy2 from "../../assets/techGuy2.png"
import {useDispatch} from 'react-redux'
import {showModal} from '../../reduxSlices/Modal'



export const Backdrop = (props) => {
    return (
        <div id="backdrop-root" className={styles.backdrop} onClick={props.onClick}></div>
    )
}

const ModalCard = (props) => {
    return (
        <div id='modal-root' className={styles.modalCard}>
            <div className={styles.thankYou}>
                <h1 className={styles.thankYouHeading}>Thank You For Submitting!</h1>
                <p className={styles.thankYouDesc}>One of our representatives will reach out to you soon!</p>
            </div>
            <div className={styles.imgContainer}>
                <img src={techGuy} alt="techGuy" />
                <button className={styles.button} onClick={props.onClick}>Continue</button>
                <img src={techGuy2} alt="techGuy2" />
            </div>

        </div>
    )
}




export const Modal = (props) => {
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false)
    return (
        <div>
            {createPortal(<Backdrop
                onClick={() => dispatch(showModal())} />, document.getElementById('backdrop-root'))
            }
            {
                createPortal(<ModalCard
                    onClick={() => dispatch(showModal())}
                />, document.getElementById('modal'))
            }
        </div>
    )
}

export default Modal