import React, {useMemo} from "react";
import {useGetTicketsQuery} from "../../reduxSlices/Api";


// MATERIAL UI
import Box from "@mui/material/Box";
import {ListItemIcon, MenuItem} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MaterialReactTable from "material-react-table";
import {useNavigate} from "react-router-dom";


const Tickets = () => {
    const {data, isLoading} = useGetTicketsQuery();
    const navigate = useNavigate();


    const turnDatesIntoStrings = (dates) => {
        const date = new Date(dates);
        return `${ date.toLocaleDateString() }`;
    };

    const gridData = useMemo(() => {
        if (!data) return [];
        return data.map((ticket) => {
            return {
                ...ticket,
                createdAt: turnDatesIntoStrings(ticket.createdAt),
                updatedAt: turnDatesIntoStrings(ticket.updatedAt),
            }
        });
    }, [data])



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

    return (
        <Box width="100vw" maxWidth="100%" >
            <Box padding="6rem 2rem">
                <h2 style=
                    {{
                        color: 'rgba(60, 60, 68, 1)',
                        marginBottom: '1rem'
                    }}>
                    All Tickets
                </h2>
                {isLoading && <h1>Loading...</h1>}
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
            </Box>
        </Box>
    );
};

export default Tickets;
