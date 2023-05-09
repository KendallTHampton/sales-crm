// CommentsSection.jsx
import React, {useState} from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
} from '@mui/material';

const CommentsSection = ({comments}) => {
    const [newComment, setNewComment] = useState('');
    const [commentsActive, setCommentsActive] = useState(false);

    const handleAddComment = () => {
        if (newComment.trim()) {
            // Add your logic to handle the addition of a new comment here
            console.log('New comment:', newComment);
            alert('For this demo, new comments are not saved. Check the console to see the new comment.')
            setNewComment('');
        }
    };


    return (
        <Box mt={4}>
            <Typography variant="h6">Comments</Typography>
            {comments.map((commentObj, index) => (
                <Box key={index}>
                    <Typography marginTop='1rem' sx={{
                        color: '#b1b1b1'
                    }}>
                        {commentObj.user.firstName + ' ' + commentObj.user.lastName} - {new Date(commentObj.createdAt).toLocaleDateString()}
                    </Typography>
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
                        onClick={(e) => {
                            handleAddComment();
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
