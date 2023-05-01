import {Box, ListItemIcon, MenuItem} from '@mui/material'
import AccountCircle from "@mui/icons-material/AccountCircle";
import React, {useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useGetContactsQuery} from '../../reduxSlices/Api'
import MaterialReactTable from "material-react-table";



const Contacts = () => {
    const userObject = useSelector((state) => state.user.currentUser)
    const userId = userObject._id
    const contacts = useGetContactsQuery(userId)
    const [contactsData, setContactsData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (contacts.isSuccess) {
            setContactsData(contacts.data)
        }
    }, [contacts])



    const columns = useMemo(
        () => [
            {
                header: "Name",
                accessorFn: (row) => row.firstName + ' ' + row.lastName,
                size: 50,
            },
            {
                header: "Email",
                size: 50,
                accessorKey: "email",

            },
            {
                header: 'Campaigns',
                size: 50,
                accessorFn: (row) => row.usersCampaigns.length,
                Cell: ({renderedCellValue, row}) => {
                    return (
                        <Box display="flex" flexDirection='column'>
                            {renderedCellValue}
                        </Box>


                    );
                }


            },

        ],
        []
    );




    return (
        <Box padding="6rem 2rem">
            <h2 style={{marginBottom: '2rem'}}>
                Contacts
            </h2>

            <MaterialReactTable
                data={contactsData}
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
                        key={0}
                        onClick={() => {
                            const userId = row.original._id

                            closeMenu();
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


        </Box>
    )
}

export default Contacts