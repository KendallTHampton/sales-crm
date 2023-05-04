import {Box, Grid, ListItemIcon, MenuItem, Typography} from '@mui/material'
import React, {useEffect, useMemo, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useGetAdminByIdQuery} from '../../reduxSlices/Api'
import AccountCircle from "@mui/icons-material/AccountCircle";
import MaterialReactTable from "material-react-table";

const AdminDetails = () => {
    const {adminId} = useParams()
    const {data: admin, error, isLoading} = useGetAdminByIdQuery(adminId)
    const [adminData, setAdminData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (admin) {
            setAdminData(admin)
        }
    }, [admin])

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

    const campaignColumns = useMemo(
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
                accessorFn: (row) => row.description.substring(0, 25) + '...'
            },
            {
                header: "Type",
                accessorKey: 'type'
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

    const ticketColumns = useMemo(
        () => [
            {
                header: "Priority",
                accessorKey: "priority",
                size: 150,
                Cell: ({row}) => {
                    return (
                        <Box
                            component="span"
                            sx={{
                                backgroundColor: row.original.priority === "Closed"
                                    ? "#949494"
                                    : row.original.priority === "New"
                                        ? "green"
                                        : row.original.priority === "Low"
                                            ? "#0AB5E7"
                                            : row.original.priority === "Medium"
                                                ? "#e67d0e"
                                                : row.original.priority === "High"
                                                    ? "#ed0202"
                                                    : "#9e02d6",

                                borderRadius: '10px',
                                color: '#fff',
                                fontWeight: 'bold',
                                width: 'fit-content',
                                p: '0.5rem',
                            }
                            }
                        >

                            {row.original.priority}
                        </Box >
                    )
                }
            },

            {
                header: "Submitted By",
                accessorFn: (row) =>
                    `${ row.submittedBy.firstName } ${ row.submittedBy.lastName }`,

            },
            {
                header: "Date",
                accessorFn: (row) => {
                    return new Date(row.createdAt).toLocaleDateString()
                }
            },
            {
                header: "Email",
                accessorFn: (row) => row.submittedBy.email,

            },
            {
                header: "Category",
                accessorKey: "category",
            },

            {
                header: "Message",
                accessorFn: (row) => row.message.substring(0, 25) + '...',
            },


            {
                header: "Status",
                accessorKey: "status",
            },

        ],
        []
    );


    console.log(adminData)

    return (
        <Box width="100vw" maxWidth="100%" >
            <Box padding="6rem 2rem">
                <h2 style={{marginBottom: "2rem"}}>
                    Admin Details
                </h2>
                {!isLoading && adminData &&
                    <Box>
                        <Grid container spacing={4} sx={{'.MuiGrid-root': {paddingTop: '0', marginTop: '16px'}}}>
                            <Grid item xs={12} md={4}>
                                <Label label="Name" />
                                {adminData.firstName} {adminData.lastName}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Label label="Email" />
                                {adminData.email}
                            </Grid>
                        </Grid>

                        <Box sx={{marginTop: '2rem'}}>
                            <h3
                                style={{marginBottom: ".5rem"}}
                            >
                                Campaigns
                            </h3>
                            {adminData.ownedCampaigns &&
                                <MaterialReactTable
                                    columns={campaignColumns}
                                    data={adminData.ownedCampaigns}
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
                                                const campaignId = row.original._id
                                                navigate(`/dashboard/campaign/${ campaignId }`)
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

                            }
                        </Box>

                        <Box sx={{marginTop: '2rem'}}>
                            <h3
                                style={{marginBottom: ".5rem"}}
                            >
                                Tickets
                            </h3>
                            {adminData.ownedCampaigns &&
                                <MaterialReactTable
                                    columns={ticketColumns}
                                    data={adminData.ticketsOwned}
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
                                                navigate(`/dashboard/tickets/${ ticketId }`)
                                            }}
                                            sx={{m: 0}}
                                        >

                                            <ListItemIcon>
                                                <AccountCircle />
                                            </ListItemIcon>
                                            View Ticket
                                        </MenuItem>
                                        ,

                                        <MenuItem
                                            key={0}
                                            onClick={() => {
                                                closeMenu();
                                                const userId = row.original.submittedBy._id
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
                            }
                        </Box>

                    </Box>
                }

            </Box>
        </Box>
    )
}

export default AdminDetails