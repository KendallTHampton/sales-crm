import React from 'react'
import Hero from './Hero'
import Services from './Services'
import About from './About'
import Reviews from "./Reviews"
import Contact from './Contact'
import {Modal} from '../components/Modal'

import {useSelector} from 'react-redux'
import Footer from './Footer'



function Home() {


    const showModal = useSelector((state) => state.modal.showModal)


    return (
        <>
            <Hero />
            <Services />
            <About />
            <Reviews />
            <Contact />
            {showModal && <Modal />
            }
            <Footer />

        </>
    )
}

export default Home