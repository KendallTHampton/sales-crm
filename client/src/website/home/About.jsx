import React from 'react';
import styles from './About.module.css';

// IMAGES
import chart from '../../assets/chart.png';
import group from '../../assets/group.png';

// Material UI Components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const About = () => {
    return (
        <section className={styles.section}>
            <div className={styles.aboutContainer}>
                {/* Original Content */}
                <div className={`${ styles.showAbove540 }`}>
                    {/* LEFT SIDE */}
                    <div className={`${ styles.about } ${ styles.about1 }`}>
                        <div className={styles.aboutLeft}>
                            <h1 className={styles.aboutTitle}>Why Digitell?</h1>
                            <p className={styles.aboutDesc}>
                                Choose our digital marketing company for exceptional results, an
                                experienced team and a fully-customized approach to promoting your
                                business online. We understand the importance of a well-rounded
                                digital strategy, which is why we go above and beyond to provide a
                                wide range of services including SEO, SEM, PPC, Social Media, and
                                Email Marketing.
                            </p>
                        </div>
                        <div className={styles.aboutRight}>
                            <img className={styles.aboutImage} src={group} alt="group" />
                        </div>
                    </div>
                    {/* RIGHT SIDE */}
                    <div className={`${ styles.about } ${ styles.about2 }`}>
                        <div className={styles.aboutLeft}>
                            <img
                                className={`${ styles.aboutImage } ${ styles.chartImage }`}
                                src={chart}
                                alt="chart"
                            />
                        </div>
                        <div className={styles.aboutRight}>
                            <h2 className={styles.aboutTitleSmaller}>
                                Spark Life Into Your Business!
                            </h2>
                            <p className={styles.aboutDesc}>
                                We will work closely with you to understand your unique needs and
                                tailor our approach to achieve the best possible outcomes.
                                Additionally, we pride ourselves on our transparency and
                                communication with our clients, providing regular updates and
                                detailed reporting to ensure that you are always in the loop.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Accordion Content (hidden above 540px) */}
                <div className={`${ styles.hideAbove540 }`}>
                    {/* Accordion 1 */}
                    <Accordion sx={{
                        backgroundColor: "#2b5477",
                    }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <h1 className={styles.aboutTitle}>Why Digitell?</h1>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={`${ styles.about } ${ styles.about1 }`}>
                                <div className={styles.aboutLeft}>
                                    <p className={styles.aboutDesc}>
                                        Choose our digital marketing company for exceptional results, an
                                        experienced team and a fully-customized approach to promoting your
                                        business online. We understand the importance of a well-rounded
                                        digital strategy, which is why we go above and beyond to provide a
                                        wide range of services including SEO, SEM, PPC, Social Media, and
                                        Email Marketing.
                                    </p>
                                </div>
                                <div className={styles.aboutRight}>
                                    <img className={styles.aboutImage} src={group} alt="group" />
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    {/* Accordion 2 */}
                    <Accordion sx={{
                        backgroundColor: "#2b5477",
                    }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <h2 className={styles.aboutTitleSmaller}>
                                Spark Life Into Your Business!
                            </h2>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={`${ styles.about } ${ styles.about2 }`}>
                                <div className={styles.aboutLeft}>
                                    <img
                                        className={`${ styles.aboutImage } ${ styles.chartImage }`}
                                        src={chart}
                                        alt="chart"
                                    />
                                </div>
                                <div className={styles.aboutRight}>
                                    <p className={styles.aboutDesc}>
                                        We will work closely with you to understand your unique needs and
                                        tailor our approach to achieve the best possible outcomes.
                                        Additionally, we pride ourselves on our transparency and
                                        communication with our clients, providing regular updates and
                                        detailed reporting to ensure that you are always in the loop.
                                    </p>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default About;

