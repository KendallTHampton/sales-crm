import {Box, ListItemIcon, MenuItem} from '@mui/material'
import React, {useState} from 'react'
import {useGetAdminsQuery} from '../../reduxSlices/Api'
import {useMemo} from 'react'
import MaterialReactTable from "material-react-table";
import {useNavigate, useParams} from 'react-router-dom';
import AccountCircle from "@mui/icons-material/AccountCircle";


const Admins = () => {

    const navigate = useNavigate()

    const {data: admins, error, isLoading} = useGetAdminsQuery()
    const [adminData, setAdminData] = useState([])

    useMemo(() => {
        if (admins) {
            setAdminData(admins)
        }
    }, [admins])

    const columns = useMemo(
        () => [
            {
                header: "Name",
                accessorFn: (row) => {return `${ row.firstName } ${ row.lastName }`}
            },
            {
                header: "Email",
                accessorKey: 'email'
            },
            {
                header: "Tickets",
                accessorFn: (row) => {return row.ticketsOwned.length}
            },
            {
                header: "Contacts",
                accessorFn: (row) => {return row.managedUsers.length}
            },
            {
                header: "Campaigns",
                accessorFn: (row) => {return row.ownedCampaigns.length}
            },
        ]
        , [])




    return (
        <Box width="100vw" maxWidth="100%" >
            <Box padding="6rem 2rem">
                <h2 style=
                    {{
                        color: 'rgba(60, 60, 68, 1)',
                        marginBottom: '1rem'
                    }}>
                    Admins
                </h2>
                {isLoading && <h1>Loading...</h1>}
                <MaterialReactTable
                    data={adminData}
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
                                const adminId = row.original._id
                                navigate(`/dashboard/admin/${ adminId }`)
                            }}
                            sx={{m: 0}}
                        >
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            View Profile
                        </MenuItem>
                    ]}
                />
            </Box>
        </Box>
    )
}

export default Admins