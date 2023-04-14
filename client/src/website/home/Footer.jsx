import React from 'react';
import styles from './Footer.module.css';

// ICONS
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import InstagramIcon from '@mui/icons-material/Instagram';


const contactData = [
    {
        icon: <ImportContactsIcon />,
        desc: '52 Street Name, City Name Here, United States, 12345'
    },
    {
        icon: <PhoneInTalkIcon />,
        desc: '+1 234 567 8901'
    },
    {
        icon: <InstagramIcon />,
        desc: '@Digitell.co'
    }
]


const Footer = () => {
    return (
        <section className={styles.footer}>
            <h5>@Digitell Company 2023</h5>
        </section>
    );
};

export default Footer;
