import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useGetUserQuery} from '../../reduxSlices/Api'
import {Box} from '@mui/material'
import MaterialReactTable from "material-react-table";

const User = () => {
    const {userId} = useParams()
    const {data, isLoading} = useGetUserQuery(userId)
    const [userData, setUserData] = useState('')


    useEffect(() => {
        if (data) {
            setUserData(data)
        }
    }, [data])




    return (
        <Box padding="6rem 2rem" >
            <h2
                style={{marginBottom: '1rem'}}
            >User Profile
            </h2>
            {userData &&
                <Box>
                    <h3>{userData.firstName} {userData.lastName}</h3>
                    <p>{userData.email}</p>
                    <p>Tickets Owned: {userData.tickets.length}</p>

                </Box>
            }

        </Box>
    )
}

export default User