import React, { useCallback, useEffect } from "react";
import { Box, Card, alpha, Stack } from "@mui/material";

import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createPost } from "./postSlice";
import { LoadingButton } from "@mui/lab";
import { selectPost, updatePost } from "../post/postSlice";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

function PostForm() {
  const { isLoading, editingPostId, postsById } = useSelector(
    (state) => state.post
  );
  const defaultValues = {
    content: "",
    image: null,
  };

  useEffect(() => {
    setValue("content", editingPostId ? postsById[editingPostId].content : "");
    setValue("image", editingPostId ? postsById[editingPostId].image : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingPostId]);

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    // update
    if (editingPostId) {
      dispatch(updatePost({ ...data, id: editingPostId })).then(() => reset());
    } else {
      dispatch(createPost(data)).then(() => reset());
    }

    // create
  };

  return (
    <Card id="create-form" sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            placeholder="Share what you are thinking here..."
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />

          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Post
            </LoadingButton>
            <button
              type="button"
              onClick={() => {
                dispatch(selectPost(""));
              }}
            >
              Cancel
            </button>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostForm;
