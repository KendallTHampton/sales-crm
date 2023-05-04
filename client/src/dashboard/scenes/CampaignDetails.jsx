import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useGetCampaignByIdQuery, useDeleteCampaignMutation, useUpdateCampaignMutation} from '../../reduxSlices/Api';
import {Box, Typography, Grid, Paper, Input, Select, MenuItem, Button, TextField} from '@mui/material';
import CommentsSection from './Comments';
import BorderColorIcon from '@mui/icons-material/BorderColor';



const CampaignDetails = () => {
    const {campaignId} = useParams();
    const navigate = useNavigate();
    const {data: campaign} = useGetCampaignByIdQuery(campaignId);
    const [campaignData, setCampaignData] = useState(null);
    const [editStartDate, setEditStartDate] = useState(false);
    const [editEndDate, setEditEndDate] = useState(false);
    const [deleteCampaign] = useDeleteCampaignMutation();
    const [updateCampaign] = useUpdateCampaignMutation();

    useEffect(() => {
        if (campaign) {
            setCampaignData(campaign);
        }
    }, [campaign]);


    const statuses = ['New', 'Open', 'In Progress', 'Completed']
    const types = ['SEO', 'Web Development', 'Analytics', 'Branding', 'Social Media']

    const updateHandler = () => {

        updateCampaign({campaignId: campaign._id, ...campaignData}).unwrap()
        navigate('/dashboard/campaigns')

    }



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

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        return `${ year }-${ month }-${ day }`;
    };


    return (
        <Box padding="6rem 2rem">
            <h2 style={{color: 'rgba(60, 60, 68, 1)', marginBottom: '2rem'}}>
                Campaign Details
            </h2>
            {campaignData && (
                <Grid container spacing={4} >
                    <Grid item xs={12} md={12}>
                        <Label label="Owned By" />
                        <Typography
                            fontWeight='bold'
                            onClick={() => navigate(`/dashboard/admin/${ campaignData.ownedBy._id }`)}
                            sx={{
                                cursor: 'pointer',
                                color: '#3C3C44',
                                '&:hover': {
                                    color: '#3C3C44',
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            {campaignData.ownedBy.firstName} {campaignData.ownedBy.lastName}</Typography>
                    </Grid>
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
                        <Box sx={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center',

                        }}>
                            {editStartDate ? (
                                <>
                                    <Typography>{formatDate(campaignData.startDate)}</Typography>
                                    <BorderColorIcon
                                        onClick={() => setEditStartDate(!editStartDate)}
                                        sx={{
                                            cursor: 'pointer',
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <TextField
                                        id="date"
                                        type="date"
                                        defaultValue={formatDate(campaignData.startDate)}
                                        sx={{
                                            width: '80%',
                                        }}
                                        onChange={(e) =>
                                            setCampaignData({
                                                ...campaignData,
                                                startDate: e.target.value
                                            })
                                        }
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <BorderColorIcon
                                        onClick={() => setEditStartDate(!editStartDate)}
                                        sx={{
                                            cursor: 'pointer',
                                        }}
                                    />
                                </>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Label label="End Date" />

                        <Box sx={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center',

                        }}>
                            {editEndDate ? (
                                <>
                                    <Typography>{formatDate(campaignData.endDate)}</Typography>
                                    <BorderColorIcon
                                        onClick={() => setEditEndDate(!editEndDate)}
                                        sx={{
                                            cursor: 'pointer',
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <TextField
                                        id="date"
                                        type="date"
                                        defaultValue={formatDate(campaignData.endDate)}
                                        sx={{
                                            width: '80%',
                                        }}
                                        onChange={(e) =>
                                            setCampaignData({
                                                ...campaignData,
                                                endDate: e.target.value
                                            })
                                        }
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <BorderColorIcon
                                        onClick={() => setEditEndDate(!editEndDate)}
                                        sx={{
                                            cursor: 'pointer',
                                        }}
                                    />
                                </>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Label label="Status" />
                        <Select
                            value={campaignData.status}
                            onChange={(e) =>
                                setCampaignData({...campaignData, status: e.target.value})
                            }
                            sx={{
                                width: "80%",
                            }}
                        >
                            <MenuItem value={campaignData.status}>
                                {campaignData.status}
                            </MenuItem>
                            {statuses.map((status) => {
                                if (status !== campaignData.status) {
                                    return (
                                        <MenuItem value={status} key={status}>
                                            {status}
                                        </MenuItem>
                                    );
                                }
                            })}
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Label label="Type" />
                        <Select
                            value={campaignData.type}
                            onChange={(e) =>
                                setCampaignData({...campaignData, type: e.target.value})
                            }
                            sx={{
                                width: "80%",
                            }}
                        >
                            <MenuItem value={campaignData.type}>
                                {campaignData.type}
                            </MenuItem>
                            {types.map((type) => {
                                if (type !== campaignData.type) {
                                    return (
                                        <MenuItem value={type} key={type}>
                                            {type}
                                        </MenuItem>
                                    );
                                }
                            })}
                        </Select>
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
            )
            }
            <Box display='flex' justifyContent="space-between">
                <Button variant="contained"
                    sx={{
                        marginTop: '2rem',

                        '&:hover': {
                            backgroundColor: "black"
                        }
                    }}
                    onClick={(e) => {
                        updateHandler()
                        // navigate('/dashboard/campaigns')
                    }}

                >
                    Save Campaign
                </Button>
                {/* DELETE CAMPAIGN */}
                <Button variant="contained"
                    sx={{
                        marginTop: '2rem',
                        backgroundColor: 'red',

                        '&:hover': {
                            backgroundColor: "black"
                        }
                    }}
                    onClick={(e) => {
                        deleteCampaign(campaignData._id)
                        navigate('/dashboard/campaigns')
                    }}
                >
                    Delete Campaign
                </Button>
            </Box>

        </Box>
    );
};

export default CampaignDetails;
