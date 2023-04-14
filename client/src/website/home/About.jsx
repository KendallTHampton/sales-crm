import React from 'react'
import styles from "./About.module.css"

// IMAGES
import chart from "../../assets/chart.png"
import group from "../../assets/group.png"


export const About = () => {
    return (
        <section className={styles.section}>
            <div className={styles.aboutContainer}>
                <div className={`${ styles.about } ${ styles.about1 }`}>
                    <div className={styles.aboutLeft}>
                        <h1 className={styles.aboutTitle}>Why Digitell?</h1>
                        <p className={styles.aboutDesc}>Choose our digital marketing company for exceptional results, an experienced team and a fully-customized approach to promoting your business online. We understand the importance of a well-rounded digital strategy, which is why we go above and beyond to provide a wide range of services including SEO, SEM, PPC, Social Media, and Email Marketing.
                        </p>
                    </div>
                    <div className={styles.aboutRight}>
                        <img className={styles.aboutImage} src={group} alt='group' />
                    </div>
                </div>
                <div className={`${ styles.about } ${ styles.about2 }`}>
                    <div className={styles.aboutLeft}>
                        <img className={`${ styles.aboutImage } ${ styles.chartImage }`}
                            src={chart}
                            alt='chart'

                        />
                    </div>
                    <div className={styles.aboutRight}>
                        <h2 className={styles.aboutTitleSmaller}>Spark Life Into Your Business!</h2>
                        <p className={styles.aboutDesc}>We will work closely with you to understand your unique needs and tailor our approach to achieve the best possible outcomes. Additionally, we pride ourselves on our transparency and communication with our clients, providing regular updates and detailed reporting to ensure that you are always in the loop. We are confident that our approach will provide a clear competitive advantage for your business.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About