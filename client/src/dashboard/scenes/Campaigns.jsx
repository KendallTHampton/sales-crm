import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useGetCampaignsQuery} from '../../reduxSlices/Api';
import {Box, Button, MenuItem, ListItemIcon} from '@mui/material';
import AccountCircle from "@mui/icons-material/AccountCircle";
import {useNavigate} from 'react-router-dom';
import MaterialReactTable from "material-react-table";

const Campaigns = () => {
    const userObject = useSelector((state) => state.user.currentUser);
    const userId = userObject._id;
    const {data: campaignData} = useGetCampaignsQuery(userId);
    const navigate = useNavigate();

    const gridData = useMemo(() => {
        if (!campaignData) return [];
        return campaignData.map((campaign) => {
            return {
                ...campaign,
                startDate: campaign.startDate,
                endDate: campaign.endDate,
            }
        });
    }, [campaignData])

    const columns = useMemo(
        () => [
            {
                header: "Target User",
                accessorFn: (row) => {
                    return `${ row.targetUser.firstName } ${ row.targetUser.lastName }`
                }
            },
            {
                header: 'Campaign Name',
                accessorKey: 'name'
            },
            {
                header: "Desc",
                accessorKey: 'description'
            },
            {
                header: "Start Date",
                accessorFn: (row) => {
                    return new Date(row.startDate).toLocaleDateString()
                }
            },
            {
                header: "End Date",
                accessorFn: (row) => {
                    return new Date(row.endDate).toLocaleDateString()
                }
            }
            ,
            {
                header: "Status",
                accessorFn: (row) => {
                    return row.status
                }
            },
        ],
        []
    );



    return (
        <Box padding="6rem 2rem">
            <h2 style={{marginBottom: '2rem'}}>Campaigns</h2>

            <MaterialReactTable
                data={gridData}
                columns={columns}
                enableColumnOrdering
                enableGrouping
                enableRowActions
                initialState={{
                    showColumnFilters: false,
                    density: 'compact'
                }}
                positionToolbarAlertBanner="bottom"
                renderRowActionMenuItems={({closeMenu, row}) => [
                    <MenuItem
                        key={1}
                        onClick={() => {
                            closeMenu();
                            const ticketId = row.original._id
                            navigate(`/dashboard/campaign/${ ticketId }`)
                        }}
                        sx={{m: 0}}
                    >

                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        Campaign Details
                    </MenuItem>
                    ,

                    <MenuItem
                        key={0}
                        onClick={() => {
                            closeMenu();
                            const userId = row.original.targetUser._id
                            navigate(`/dashboard/user/${ userId }`)
                        }}
                        sx={{m: 0}}
                    >
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        View Profile
                    </MenuItem>,

                ]}
            />


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
