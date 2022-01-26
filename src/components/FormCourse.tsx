import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { api } from "../service/api";
import { toast } from "react-toastify";
import router from "next/router";

interface ICourseData {
  id?: number;
  name: string;
}

export default function ResponsiveDialog({ show }: { show?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [courseData, setCourseData] = React.useState<ICourseData>({ name: "" });

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ICourseData>({ defaultValues: courseData });

  const onSubmit: SubmitHandler<ICourseData> = (data) => {
    setOpen(false);
    const token = localStorage.getItem("token");
    async function fetchCourse() {
      await api
        .post("/courses", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          toast.success(response.data.message || "Course successfully.");
        })
        .catch((error) => {
          console.log(error.response.data);
          toast.error(error.response.data.error || "Error.");
        });
    }
    token ? fetchCourse() : router.push("/");
    setCourseData(data);
  };

  const handleClose = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    if (show) setOpen(show);
  }, [show]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Register course</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ marginBottom: 8, marginTop: 8, width: "400px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2} direction="row">
            <Grid item xs={12}>
              <TextField
                label={courseData?.name ? "" : "Course name"}
                type="text"
                placeholder={courseData?.name ? "" : "Course name"}
                fullWidth
                color="secondary"
                defaultValue={getValues("name") || courseData?.name}
                {...register("name", { required: true })}
              />
              <Typography variant="caption" component="span" color="error.main">
                {errors.name && "Course name is required"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                onClick={handleClose}
                color="secondary"
                fullWidth
                sx={{ padding: 2 }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
