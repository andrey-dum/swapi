import React, { useState } from 'react'

import Like from '@material-ui/icons/ThumbUpAltOutlined';
import DisLike from '@material-ui/icons/ThumbDownAltOutlined';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);


export function LikeBtns({like, dislike, updateItem, char, userId}) {
    const [state, setState] = useState({
        like: like,
        dislike: dislike,
        likeActive: char.likedBy.includes(userId),
        dislikeActive: false
    });

    function setDislike() {
        setState({
            ...state,
          dislikeActive: !state.dislikeActive,
          dislike: state.dislikeActive
            ? state.dislike - 1
            : state.dislike + 1
        });
      }

    function setLike() {
        setState({
            ...state,
          likeActive: !state.likeActive,
          like: state.likeActive ? state.like - 1 : state.like + 1
        });
      }

      function handleLike() {
        if (state.dislikeActive) {
          setLike();
          setDislike();
        }
        setLike();
        updateItem(char, {id: userId})
      }
    
      function handleDislike() {
        if (state.likeActive) {
          setDislike();
          setLike();
        }
        setDislike();
      }
    
    return (
      <>
        <IconButton 
            aria-label="Like" 
            className={state.likeActive ? "active" : '' }
            onClick={handleLike}
            >
            <StyledBadge badgeContent={state.like} color="secondary">
            <Like />
            </StyledBadge>
        </IconButton>
        <IconButton 
            aria-label="disLike" 
            className={state.dislikeActive ? "active" : ''}
            onClick={handleDislike}
            >
            <StyledBadge badgeContent={state.dislike} color="secondary">
            <DisLike />
            </StyledBadge>
        </IconButton>
      </>
    )
}
