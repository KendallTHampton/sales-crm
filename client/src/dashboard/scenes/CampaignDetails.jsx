import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useGetCampaignByIdQuery} from '../../reduxSlices/Api';
import {Box, Typography, Grid, Paper} from '@mui/material';
import CommentsSection from './Comments';


const CampaignDetails = () => {
    const {campaignId} = useParams();
    const {data: campaign} = useGetCampaignByIdQuery(campaignId);
    const [campaignData, setCampaignData] = useState(null);

    useEffect(() => {
        if (campaign) {
            setCampaignData(campaign);
        }
    }, [campaign]);

    const Label = ({label}) => {
        return (
            <Typography
                sx={{
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: '18px',
                    lineHeight: '24px',
                    color: '#B7B7B7',
                }}
            >
                {label}
            </Typography>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${ date.toLocaleDateString() }`;
    };

    return (
        <Box padding="6rem 2rem">
            <h2 style={{color: 'rgba(60, 60, 68, 1)', marginBottom: '2rem'}}>
                Campaign Details
            </h2>
            {campaignData && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Label label="Name" />
                        <Typography>{campaignData.name}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Label label="Revenue" />
                        <Typography>${campaignData.revenue}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Label label="Start Date" />
                        <Typography>{formatDate(campaignData.startDate)}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Label label="End Date" />
                        <Typography>{formatDate(campaignData.endDate)}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Label label="Status" />
                        <Typography>{campaignData.status}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Label label="Description" />
                        <Paper
                            sx={{
                                padding: '1rem',
                                backgroundColor: '#F8F8F8',
                                border: '1px solid #E0E0E0',
                            }}
                        >
                            <Typography>{campaignData.description}</Typography>
                        </Paper>
                        <CommentsSection comments={campaignData.comments} />
                    </Grid>
                </Grid>
            )}


        </Box>
    );
};

export default CampaignDetails;
