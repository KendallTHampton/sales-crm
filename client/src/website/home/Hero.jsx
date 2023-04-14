import React from 'react'
import styles from './Hero.module.css'

// IMAGES
import heroPic from '../../assets/heroPic.png'


const Hero = () => {
    return (
        <section className={styles.section}>

            <div className={styles.container}>
                <div className={styles.hero}>
                    <div className={styles.heroLeft}>
                        <header>
                            <h1 className={styles.title} >  Digital Marketing
                                <span>& <div>Strategy</div></span>
                            </h1>
                        </header>

                        <p className={styles.pitch}>Boost your online sales and reach with our SEO and digital marketing expertise. We specialize in improving your website's search engine rankings, increasing traffic, and conversions. Partner with us for tailored strategies and significant results.</p>

                        <div className={styles.buttonContainer}>
                            <button className={styles.button}>Browse Services</button>
                            <button className={styles.button}>Try A Free Demo</button>
                        </div>

                    </div>
                    <div className={styles.heroRight}>
                        <img src={heroPic} alt="graph" />
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <div className={styles.wavesContainer}>
                <div className={styles.waves}>
                    <div className={`${ styles.wave } ${ styles.wave1 }`} />
                    <div className={`${ styles.wave } ${ styles.wave2 }`} />
                    <div className={`${ styles.wave } ${ styles.wave3 }`} />
                    <div className={`${ styles.wave } ${ styles.wave4 }`} />
                </div>

            </div>
        </section>
    )
}

export default Hero
