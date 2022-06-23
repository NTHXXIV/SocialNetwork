import React from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import { useDispatch } from "react-redux";
import { removePost, selectPost } from "../post/postSlice";
import useAuth from "../../hooks/useAuth";

function PostCard({ post }) {
  const dispatch = useDispatch();
  const auth = useAuth();

  const editPost = () => {
    dispatch(selectPost(post._id));
    const element = document.getElementById("create-form");
    element.scrollIntoView();
  };

  return (
    <Card id={post?._id}>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          auth?.user?._id === post.author._id && (
            <>
              {/* <MoreVertIcon sx={{ fontSize: 30 }} /> */}
              <button
                onClick={() =>
                  dispatch(
                    removePost({
                      postId: post._id,
                      authorId: post.author._id,
                    })
                  )
                }
              >
                Delete
              </button>

              {/* <MoreVertIcon sx={{ fontSize: 30 }} /> */}
              <button onClick={editPost}>Edit</button>
            </>
          )
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
