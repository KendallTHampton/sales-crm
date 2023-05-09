// CommentsSection.jsx
import React, {useState} from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
} from '@mui/material';
import {useSelector} from 'react-redux';
import {useCreateCommentMutation} from '../../reduxSlices/Api';
import {useDeleteCommentMutation} from '../../reduxSlices/Api';



const CommentsSection = ({data}) => {
    const [newComment, setNewComment] = useState('');
    const [commentsActive, setCommentsActive] = useState(false);
    const userObject = useSelector((state) => state.user.currentUser)
    const [createComment] = useCreateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();


    const currentUser = userObject._id; // current User Id
    const campaignId = data._id; // current Campaign Id


    const {comments} = data;

    const handleAddComment = async (e) => {
        e.preventDefault();

        const comment = newComment;
        if (comment === '') {
            alert('Please enter a comment');
            return;
        }


        const user = currentUser;
        const commentObj = {campaign: campaignId, comment, user};  // it should be campaign not campaignId


        await createComment(commentObj);


        setNewComment('');
        setCommentsActive(!commentsActive);
    }




    return (
        <Box mt={4}>
            <Typography variant="h6">Comments</Typography>
            {comments.map((commentObj, index) => (
                <Box key={index}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',

                    }}>
                        <Typography marginTop='1rem' sx={{
                            color: '#b1b1b1'
                        }}>
                            {commentObj.user.firstName + ' ' + commentObj.user.lastName} - {new Date(commentObj.createdAt).toLocaleDateString()}
                        </Typography>
                        <Button
                            sx={{
                                marginLeft: 'auto'
                            }}

                            onClick={(e) => {
                                deleteComment({commentId: commentObj._id});
                            }}
                        >
                            Delete
                        </Button>
                    </Box>
                    <Paper key={index} sx={{padding: '1rem', mb: 2}}>
                        <Typography>{commentObj.comment}</Typography>
                    </Paper>
                </Box>
            ))}
            {commentsActive &&
                <TextField
                    label="Add a comment"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{mt: 2}}
                />
            }
            {!commentsActive ?
                <Button
                    variant="contained"
                    onClick={(e) => setCommentsActive(!commentsActive)}
                    sx={{
                        mt: 2,
                        backgroundColor: 'black',
                        '&:hover': {
                            backgroundColor: 'var(--primary-color)',
                        },
                    }}
                >
                    Create Comment
                </Button>
                :
                <Box sx={{
                    display: 'flex',
                    gap: '1rem',
                }}>
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={(e) => {
                            handleAddComment(e);
                            setCommentsActive(!commentsActive);
                        }}
                        sx={{
                            mt: 2,
                            backgroundColor: 'black',
                            '&:hover': {
                                backgroundColor: 'var(--primary-color)',
                            },
                        }}
                    >
                        Add Comment
                    </Button>
                    <Button
                        variant="contained"
                        onClick={(e) => setCommentsActive(!commentsActive)}
                        sx={{
                            mt: 2,
                            backgroundColor: 'gray',
                            '&:hover': {
                                backgroundColor: 'black',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            }
        </Box>
    );
};

export default CommentsSection;
