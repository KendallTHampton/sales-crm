import React, {useEffect, useMemo, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useGetAdminsQuery, useGetTicketsSubmittedByUserQuery, useGetUserQuery, useUpdateUserMutation} from '../../reduxSlices/Api'
import {Autocomplete, Box, Button, Grid, ListItemIcon, MenuItem, TextField, Typography} from '@mui/material'
import AccountCircle from "@mui/icons-material/AccountCircle";
import MaterialReactTable from "material-react-table";
import {useNavigate} from "react-router-dom";

const User = () => {
    const {userId} = useParams()
    const {data, isLoading} = useGetUserQuery(userId)
    const {data: adminUsers} = useGetAdminsQuery()
    const {data: userTickets} = useGetTicketsSubmittedByUserQuery(userId)
    const [updateUser] = useUpdateUserMutation()
    const navigate = useNavigate()

    const [userData, setUserData] = useState('')

    const turnDatesIntoStrings = (dates) => {
        const date = new Date(dates);
        return `${ date.toLocaleDateString() }`;
    };

    const columns = useMemo(
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
                header: "Owned By",
                accessorFn: (row) =>
                    row.ownedBy
                        ? `${ row.ownedBy.firstName } ${ row.ownedBy.lastName }`
                        : "None",
                Cell: ({renderedCellValue, row}) => {
                    return (
                        <Box display="flex" flexDirection='column'>
                            <Box component="span" sx={{
                                color: renderedCellValue === "None" ? "#949494" : "#0b369c",
                            }
                            }>

                                {renderedCellValue}

                            </Box>

                        </Box>
                    );
                }
            },
            {
                header: "Submitted By",
                accessorFn: (row) =>
                    `${ row.submittedBy.firstName } ${ row.submittedBy.lastName }`,

            },
            {
                header: "Date",
                accessorKey: "createdAt",
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

    const gridData = useMemo(() => {
        if (!userTickets) return [];
        return userTickets.map((ticket) => {
            return {
                ...ticket,
                createdAt: turnDatesIntoStrings(ticket.createdAt),
                updatedAt: turnDatesIntoStrings(ticket.updatedAt),
            }
        });
    }, [userTickets])

    useEffect(() => {
        if (data) {
            setUserData(data)
        }
    }, [data])

    console.log(userData)

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

    const handleUpdateUser = async (e) => {
        e.preventDefault()
        try {
            await updateUser({userId: userData._id, ...userData}).unwrap();
            navigate('/dashboard/contacts')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        isLoading ? <div>Loading...</div> :
            <Box padding="6rem 2rem" >
                <h2
                    style={{marginBottom: '2rem'}}
                >User Profile
                </h2>
                <form>
                    <Grid container spacing={4} sx={{
                        '.MuiGrid-root': {
                            paddingTop: '0',
                            marginTop: '16px',
                            marginBottom: '32px',
                        }
                    }}
                    >
                        {/* USER NAME, EMAIL, ADDRESS, NUMBER */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Label label='Name' />
                            <Typography>
                                {userData.firstName} {userData.lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Label label='Email' />
                            <Typography>
                                {userData.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Label label='Phone Number' />
                            <Typography>
                                +1-XXX-XXX-XXX
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Label label='Address' />
                            <Typography>
                                123 Street, Los Angeles, CA, 84629
                            </Typography>
                        </Grid>
                        {/* USER MANAGED BY, CAMPAIGN  */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Label label='Managed By' />
                            {adminUsers ? (
                                <Autocomplete
                                    value={userData.managedBy && userData.managedBy.length > 0 ? adminUsers.find((admin) => admin._id === userData.managedBy[0]._id) || null : null}
                                    onChange={(event, newOwner) => {
                                        setUserData({...userData, managedBy: newOwner ? [newOwner] : []});
                                    }}

                                    options={adminUsers || []}
                                    getOptionSelected={(option, value) => option._id === value}

                                    getOptionLabel={(option) => option ? `${ option.firstName } ${ option.lastName }` : ""}
                                    renderInput={(params) => <TextField {...params} />}
                                    sx={{
                                        width: "80%",
                                    }}
                                />

                            ) : (
                                <div>Loading admins...</div>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Label label='Campaigns' />

                            {
                                userData.usersCampaigns && userData.usersCampaigns.length > 0 ? (
                                    userData.usersCampaigns.map((campaign, index) => (
                                        <Box key={index} sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}>
                                            <Typography
                                                sx={{
                                                    fontStyle: 'normal',
                                                    fontWeight: '700',
                                                    color: 'blue',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => navigate(`/dashboard/campaign/${ campaign._id }`)}
                                            >
                                                {campaign.name}
                                            </Typography>
                                            {index < userData.usersCampaigns.length - 1 && ''}
                                        </Box>
                                    ))
                                ) : (
                                    <Typography>No campaigns</Typography>
                                )
                            }

                        </Grid>
                    </Grid>
                    {/* MATERIAL TABLE SHOWING USER'S TICKETS*/}

                    <h3
                        style={{
                            marginBottom: '.75rem',
                            color: '#B7B7B7'
                        }}
                    >
                        User's Tickets
                    </h3>
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
                                    navigate(`/dashboard/tickets/${ ticketId }`)
                                }}
                                sx={{m: 0}}
                            >

                                <ListItemIcon>
                                    <AccountCircle />
                                </ListItemIcon>
                                View Ticket
                            </MenuItem>
                        ]}
                    />

                    {/* UPDATE PROFILE BUTTON */}
                    <Box display="flex" gap='1rem'>
                        <Button type="submit"
                            variant="contained"
                            onClick={handleUpdateUser}
                            sx={{
                                marginTop: '2rem',
                                backgroundColor: "black",

                                '&:hover': {
                                    backgroundColor: 'var(--primary-color)'
                                }
                            }}
                        >
                            Update Profile
                        </Button>
                    </Box>
                </form>
            </Box>
    )
}

export default User
