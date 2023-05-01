import {Autocomplete, Box, Button, Grid, Input, MenuItem, Select, TextField, Typography} from '@mui/material'
import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useMediaQuery} from '@mui/material';
import {useGetNonAdminsQuery} from '../../reduxSlices/Api';


const CreateCampaign = () => {

    const userObject = useSelector((state) => state.user.currentUser)
    const {data: nonAdmins} = useGetNonAdminsQuery()
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const categories = ['Web Development', 'Analytics', 'Branding', 'SEO', 'Social Media']
    const statuses = ['New', 'In Progress', 'On Hold', 'Cancelled', 'Completed']


    const [targetUser, setTargetUser] = useState()


    const Label = ({label}) => {
        return (
            <Typography
                sx={{
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: '18px',
                    lineHeight: '24px',
                    color: '#B7B7B7'
                }}
            >
                {label}
            </Typography>
        )
    }

    const [newComment, setNewComment] = useState('');
    const [category, setCategory] = useState('');
    const [campaignStatus, setCampaignStatus] = useState('New');
    const navigate = useNavigate()

    const handleSUbmit = (e) => {
        e.preventDefault()
        alert('For demo purposes, this feature cannot create a campaign. Please contact the developer for more information.')
        navigate('/dashboard/campaigns')
    }

    return (
        <Box padding="6rem 2rem">
            <h2>
                Create A Campaign
            </h2>
            <form style={{marginTop: '2rem'}} onSubmit={handleSUbmit}>
                <Grid container spacing={4} sx={{'.MuiGrid-root': {paddingTop: '0', marginTop: '16px'}}}>
                    <Grid item xs={12} md={12}>
                        <Label label="Campaign Name" />
                        <TextField id="outlined-basic" variant="outlined" fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <Label label="Target User" />
                        <Autocomplete
                            required
                            id="combo-box-demo"
                            options={nonAdmins || []}
                            getOptionLabel={(option) => option.firstName + ' ' + option.lastName}

                            onChange={(e, value) => setTargetUser(value)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <Label label="Type" />
                        <Select
                            value={category || ''}
                            placeholder='Category'
                            onChange={(e) => setCategory(e.target.value)}
                            sx={{
                                width: "100%",
                            }}
                            required
                        >
                            {categories.map((category) => {
                                return (
                                    <MenuItem value={category} key={category}>
                                        {category}
                                    </MenuItem>
                                );

                            })}
                        </Select>
                    </Grid>



                    <Grid item xs={12} md={2}>
                        <Label label="Status" />
                        <Select
                            required
                            value={campaignStatus || 'Status'}
                            placeholder='Status'
                            onChange={(e) => setCampaignStatus(e.target.value)}
                            sx={{
                                width: "100%",
                            }}
                        >
                            {statuses.map((status) => {
                                return (
                                    <MenuItem value={status} key={status}>
                                        {status}
                                    </MenuItem>
                                );

                            })}
                        </Select>
                    </Grid>




                    <Grid item xs={12} md={12}>
                        <Label label="Start Date" />
                        <input
                            required
                            style={{
                                padding: '.75rem',
                                border: '1px solid #b7b7b7',
                                borderRadius: '4px',
                                marginBottom: '1rem',
                                fontSize: '16px',
                                lineHeight: '24px',
                            }}
                            type="date" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Label label="End Date" />
                        <input
                            required
                            style={{
                                padding: '.75rem',
                                border: '1px solid #b7b7b7',
                                borderRadius: '4px',
                                marginBottom: '1rem',
                                fontSize: '16px',
                                lineHeight: '24px',
                            }}
                            type="date" />
                    </Grid>
                    <Grid item xs={12} >
                        <Label label="Description" />
                        <TextField
                            required
                            fullWidth
                            multiline
                            rows={isNonMobile ? 3 : 1}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}

                        />
                    </Grid>
                </Grid>
                <Button type="submit"
                    variant="contained"
                    onClick={() => {
                        console.log('clicked')

                    }}
                    sx={{
                        marginTop: '2rem',
                        backgroundColor: "black",

                        '&:hover': {
                            backgroundColor: 'var(--primary-color)'
                        }
                    }}

                >
                    Create Campaign
                </Button>
            </form>
        </Box>
    )
}

export default CreateCampaign