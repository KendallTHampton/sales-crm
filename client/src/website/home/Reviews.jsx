import React from 'react'
import styles from "./Reviews.module.css"
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined';

const reviewData = [
    {
        stars: 5,
        review: "I couldn't have asked for more than this. Since I invested in it I made over 100,000 dollars profits. I would be lost without it!",
        name: "Kelsey Graham"
    },
    {
        stars: 5,
        review: "I don't know how I survived without this. My business is better than ever!",
        name: "Amari Chidoze"
    },
    {
        stars: 4,
        review: "One word: WOW! My clientele has increased dramatically. I'm so glad I found it!",
        name: "Sarah Parker"
    },
    {
        stars: 5,
        review: " They went above and beyond to help me achieve my goals, and I couldn't be happier with the results.",
        name: "Rachel Davis"
    },
    {
        stars: 5,
        review: "I'm blown away by how effective this product is. It's helped me streamline my work and save so much time. Highly recommend!",
        name: "Michael Nguyen"
    },
    {
        stars: 5,
        review: "I've tried many similar products before, but this one stands out as the best. It's intuitive, reliable, and has helped me grow my business significantly.",
        name: "Daniel Lee"
    }
]


const Reviews = () => {
    return (
        <section className={styles.section}>
            <header className={styles.sectionHeader}>
                <h1 className={styles.title}> Our Reviews</h1>
                <h4 className={styles.subtitle}> What Our Clients Have To Say About Our Work!</h4>
            </header>
            <div className={styles.containerGrid}>

                {reviewData.slice(0, 3).map((review, index) => (
                    <div className={styles.rowOne} key={index}>
                        <div className={styles.card} >

                            <p>
                                {
                                    [...Array(review.stars)].map((amount, index) => {
                                        return <StarIcon className={styles.stars} key={index} />
                                    }
                                    )
                                }

                                {
                                    [...Array((5 - review.stars))].map((amount, index) => {
                                        return <StarBorderOutlined className={styles.stars} key={index} />
                                    })
                                }

                            </p>
                            <p className={styles.review}>{review.review}</p>
                            <h4 className={styles.name}>{review.name}</h4>
                        </div>
                    </div>
                ))}



                {reviewData.slice(3).map((review, index) => (
                    <div className={styles.rowTwo} key={index} >
                        <div className={styles.card} >
                            <p>
                                {
                                    [...Array(review.stars)].map((amount, index) => {
                                        return <StarIcon className={styles.stars} key={index} />
                                    })
                                }
                                {
                                    [...Array((5 - review.stars))].map((amount, index) => {
                                        return <StarBorderOutlined className={styles.stars} key={index} />
                                    })
                                }
                            </p>
                            <p className={styles.review}>{review.review}</p>
                            <h4 className={styles.name}>{review.name}</h4>
                        </div>
                    </div>
                ))}

            </div>


        </section >
    )
}

export default Reviews