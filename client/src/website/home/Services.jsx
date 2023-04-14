import React, {useState} from 'react'
import styles from './Services.module.css'
import seoImage from '../../assets/seoImage.png'
import analyticsImage from '../../assets/analyticsImage.png'
import campaignImage from '../../assets/campaignImage.png'
import {InView} from 'react-intersection-observer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const serviceData = [
    {
        image: seoImage,
        title: 'Search Engine Optimization',
        desc: 'Expert team improves website visibility, rankings, traffic, & conversions through SEO.'
    },
    {
        image: analyticsImage,
        title: 'Analytics',
        desc: "Expert in providing valuable insights, strategies and data-driven decisions to boost ROI."
    },

    {
        image: campaignImage,
        title: 'Email Marketing',
        desc: 'Expand your reach and increase your conversions with our email marketing services.'
    },
]

const Services = () => {

    const [expandedCard, setExpandedCard] = useState(null)

    return (
        <section className={styles.section}>
            <InView as="section" onChange={(inView, entry) => console.log('Inview', inView)} className={styles.container} >
                <header className={styles.sectionHeader}>
                    <h2 className={styles.title}>
                        Services We Provide
                    </h2>
                    <p className={styles.subtitle}>Expertly curated digital marketing services designed to grow your business</p>
                </header>



                <div className={styles.servicesContainer}>
                    {serviceData.map((serviceData, index) => (
                        <div className={styles.serviceCard} key={index} >

                            <img src={serviceData.image} alt={serviceData.title} className={styles.serviceImage} />

                            <div className={styles.serviceContent}>
                                <h4 className={styles.serviceTitle}>
                                    {serviceData.title}
                                </h4>
                                <p className={styles.serviceDesc}>
                                    {serviceData.desc}
                                </p>
                            </div>

                            <p>Click Me</p>

                        </div>
                    ))}
                </div>

                <div className={styles.learnMoreDiv}>
                    <ArrowForwardIcon className={styles.learnMoreIcon} />
                    <h4 className={styles.learnMore}>Learn More About What We can Do For You!</h4>
                </div>

            </InView>
        </section>
    )
}

export default Services