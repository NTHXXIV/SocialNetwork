import React from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import { removeComment } from "./commentSlice";
import { useDispatch } from "react-redux";
import ModalBtn from "../../components/ModalBtn";

function CommentCard({ comment }) {
  console.log("comment", comment);
  const disPatch = useDispatch();
  const deleteComment = () => {
    disPatch(removeComment({ commentId: comment?._id, postId: comment?.post }));
  };
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <CommentReaction comment={comment} />
          <ModalBtn
            styleBtn={{
              cursor: "pointer",
              color: "red",
              margin: "0 0.5rem",
            }}
            text={"X"}
            onClick={() => deleteComment()}
          />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
