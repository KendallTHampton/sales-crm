import React from 'react';
import {useSelector} from 'react-redux';
import {useGetCampaignsQuery} from '../../reduxSlices/Api';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {useNavigate} from 'react-router-dom';

const Campaigns = () => {
    const userObject = useSelector((state) => state.user.currentUser);
    const userId = userObject._id;
    const getCampaigns = useGetCampaignsQuery(userId);
    const navigate = useNavigate();

    console.log(getCampaigns.data);

    return (
        <Box padding="6rem 2rem">
            <h2 style={{marginBottom: '2rem'}}>Campaigns</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <BorderColorIcon />
                            </TableCell>
                            <TableCell>FOR</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Revenue</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getCampaigns.data?.map((campaign) => (
                            <TableRow key={campaign._id}>
                                <TableCell
                                    onClick={() => {
                                        const campaignId = campaign._id;
                                        navigate(`/dashboard/campaign/${ campaignId }`)
                                    }}
                                >
                                    <Checkbox />
                                </TableCell>
                                <TableCell>{campaign.targetUser.firstName} {campaign.targetUser.lastName}</TableCell>
                                <TableCell>{campaign.name}</TableCell>
                                <TableCell>{campaign.description}</TableCell>
                                <TableCell>{campaign.type}</TableCell>
                                <TableCell>{new Date(campaign.startDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(campaign.endDate).toLocaleDateString()}</TableCell>
                                <TableCell>{campaign.revenue}</TableCell>
                                <TableCell>{campaign.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <Button type="button"
                variant="contained"
                onClick={() => navigate('/dashboard/campaigns/create')}
                sx={{
                    marginTop: '2rem',
                    backgroundColor: "black",
                    '&:hover': {
                        backgroundColor: 'var(--primary-color)'
                    }
                }}
            >
                Create A New Campaign
            </Button>
        </Box>
    );
};

export default Campaigns;
