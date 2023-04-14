import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    Box,
    Typography,
    Paper,
    Button,
    Select,
    MenuItem,
    Grid,
    Autocomplete,
    TextField,
} from "@mui/material";
import {useGetAdminsQuery, useViewTicketQuery} from "../../reduxSlices/Api";
import {useUpdateTicketMutation} from "../../reduxSlices/Api";

const TicketDetails = () => {

    // QUERIES
    const {ticketId} = useParams();
    const {data: ticket} = useViewTicketQuery(ticketId);
    const {data: adminUsers} = useGetAdminsQuery();
    const [updateTicket] = useUpdateTicketMutation();

    const [ticketData, setTicketData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (ticket) {
            setTicketData(ticket);
        }
    }, [ticket]);

    console.log(ticketData)


    const categories = ['Web Development', 'Analytics', 'Branding', 'SEO', 'Billing', 'Other']
    const priorities = ['New', 'Low', 'Medium', 'High', 'Urgent']

    const statuses = ['Open', 'Negotiating', 'In Progress', 'Closed', 'Reopened']

    /* Takes a string and limits the number of consecutive line breaks to the specified number
     RegExp is used to match a \n (space) and a max limit of 2 line breaks and is globally searched
     Then we return the text passed in and replace all findings of more than 2 line breaks
     */
    const limitConsecutiveLineBreaks = (text, maxLineBreaks = 2) => {
        const lineBreakPattern = new RegExp(`(\\n){${ maxLineBreaks + 1 },}`, 'g');
        return text.replace(lineBreakPattern, '\n'.repeat(maxLineBreaks));
    };


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

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const updatedTicket = await updateTicket({ticketId: ticketData._id, ...ticketData}).unwrap();
            setTicketData(updatedTicket);
            navigate(`/dashboard/tickets`);

        } catch (error) {
            console.error('Failed to update the ticket:', error);
        }


    }


    return (
        <Box padding="6rem 2rem">
            <h2 style={{color: "rgba(60, 60, 68, 1)", marginBottom: "2rem"}}>
                Ticket Details
            </h2>
            {ticketData && (
                <form onSubmit={submitHandler}>
                    <Grid container spacing={4} sx={{'.MuiGrid-root': {paddingTop: '0', marginTop: '16px'}}}>
                        {/* ROW 1 */}
                        {/* Submitted */}
                        <Grid item xs={12} md={4}>
                            <Label label="Submitted By" />
                            <Typography>
                                {ticketData.submittedBy.firstName} {ticketData.submittedBy.lastName}
                            </Typography>
                        </Grid>
                        {/* Email */}
                        <Grid item xs={12} md={4}>
                            <Label label="Email" />
                            <Typography>{ticketData.submittedBy.email}</Typography>
                        </Grid>
                        {/* OwnedBy */}
                        <Grid item xs={12} md={4}>
                            <Autocomplete
                                value={ticketData.ownedBy || null}
                                onChange={(event, newOwner) => {
                                    setTicketData({...ticketData, ownedBy: newOwner});
                                }}
                                options={adminUsers || []}
                                getOptionLabel={(option) => option ? `${ option.firstName } ${ option.lastName }` : ""}
                                getOptionSelected={(option, value) => option._id === value}
                                isOptionEqualToValue={(option, value) => option._id === value._id}
                                renderInput={(params) => (
                                    <TextField {...params} label="Owned By" variant="outlined" />
                                )}
                            />


                        </Grid>
                        {/* ROW 2 */}
                        {/* Category */}
                        <Grid item xs={12} md={4}>
                            <Label label="Category" />
                            <Select
                                value={ticketData.category}
                                onChange={(e) =>
                                    setTicketData({...ticketData, category: e.target.value})
                                }
                                sx={{
                                    width: "80%",
                                }}
                            >
                                <MenuItem value={ticketData.category}>
                                    {ticketData.category}
                                </MenuItem>
                                {categories.map((category) => {
                                    if (category !== ticketData.category) {
                                        return (
                                            <MenuItem value={category} key={category}>
                                                {category}
                                            </MenuItem>
                                        );
                                    }
                                })}
                            </Select>
                        </Grid>
                        {/* Priority */}
                        <Grid item xs={12} md={4}>
                            <Label label="Priority" />
                            <Select
                                value={ticketData.priority}
                                onChange={(e) =>
                                    setTicketData({...ticketData, priority: e.target.value})
                                }
                                sx={{
                                    width: "80%",
                                }}
                            >
                                <MenuItem value={ticketData.priority}>
                                    {ticketData.priority}
                                </MenuItem>
                                {priorities.map((priority) => {
                                    if (priority !== ticketData.priority) {
                                        return (
                                            <MenuItem value={priority} key={priority}>
                                                {priority}
                                            </MenuItem>
                                        );
                                    }
                                })}
                            </Select>
                        </Grid>
                        {/* Status */}
                        <Grid item xs={12} md={4}>
                            <Label label="Status" />
                            <Select
                                value={ticketData.status}
                                onChange={(e) =>
                                    setTicketData({...ticketData, status: e.target.value})
                                }
                                sx={{
                                    width: "80%",
                                }}
                            >
                                <MenuItem value={ticketData.status}>
                                    {ticketData.status}
                                </MenuItem>
                                {statuses.map((status) => {
                                    if (status !== ticketData.status) {
                                        return (
                                            <MenuItem value={status} key={status}>
                                                {status}
                                            </MenuItem>
                                        );
                                    }
                                })}
                            </Select>
                        </Grid>
                        {/* ROW 3 */}
                        {/* Message */}
                        <Grid item xs={12}>
                            <Label label="Message" />
                            <Paper sx={{
                                padding: '1rem',
                                backgroundColor: '#F8F8F8',
                                border: '1px solid #E0E0E0',
                            }}>
                                <Typography
                                    sx={{whiteSpace: 'pre-wrap', }}>
                                    {limitConsecutiveLineBreaks(ticketData.message)}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Button type="submit"
                        variant="contained"
                        sx={{
                            marginTop: '2rem',
                            backgroundColor: "black",

                            '&:hover': {
                                backgroundColor: 'var(--primary-color)'
                            }
                        }}

                    >
                        Update Ticket
                    </Button>
                </form>
            )}
        </Box>
    );
};

export default TicketDetails;
