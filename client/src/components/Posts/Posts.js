import React from 'react';
import {Grid, CircularProgress} from '@material-ui/core';
import {useSelector} from 'react-redux';//to fetch the data for this component
import Post from './Post/Post.js';
import useStyles from './styles.js';

const Posts = ({setCurrentId}) => {
    const { posts, isLoading } = useSelector((state) => state.posts);//extracting state of posts and loading state from Redux store
    const classes = useStyles();
    //console.log(posts);

    if(!posts.length && !isLoading) return "No posts.";
    
    return(
       isLoading ? <CircularProgress style={{marginTop: '100px'}} /> : (
           <Grid className={classes.topMargin} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
           </Grid>
       )
    );
}

export default Posts;