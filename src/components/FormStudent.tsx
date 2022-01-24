import React from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

import { TextField, Button, Box, Grid, Typography } from "@mui/material";

import { IStudent } from "../interfaces/Students";
import { api } from "../service/api";
import { toast } from "react-toastify";

export default function FormStudent({ id }: { id?: number }) {
  const defaultValues = { name: "", email: "", course: "" };
  const [studentData, setStudentData] = React.useState<IStudent>();
  const router = useRouter();

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IStudent>({ defaultValues: defaultValues });

  React.useEffect(() => {
    if (id) {
      api
        .get(`/students/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setStudentData(response.data);
          setValue("id", response.data.id);
          setValue("name", response.data.name);
          setValue("email", response.data.email);
          setValue("course", response.data.course);
        });
    }
  }, [id]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) router.push("/");
  }, []);

  const onSubmit: SubmitHandler<IStudent> = (data) => {
    if (id) {
      api
        .put(`/students/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Student updated successfully!", { autoClose: 1000 });
            router.push("/students");
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response.data.error || "Error updating student!");
        });
    } else {
      api
        .post("/students", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Student created successfully!");
            router.push("/students");
          }
        })
        .catch((error) => {
          toast.error(error.response.data.error || "Error creating student!");
        });
    }
  };

  return (
    <Box
      component="form"
      sx={{ marginBottom: 8, marginTop: 8 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2} direction="row">
        <Grid item xs={12}>
          <TextField
            label={studentData?.name ? "" : "Student name"}
            type="text"
            placeholder={studentData?.name ? "" : "Student name"}
            fullWidth
            defaultValue={getValues("name") || studentData?.name}
            {...register("name", { required: true })}
          />
          <Typography variant="caption" component="span" color="error.main">
            {errors.name && "Student name is required"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label={studentData?.email ? "" : "Student email"}
            type="text"
            placeholder={studentData?.email ? "" : "Student email"}
            fullWidth
            defaultValue={getValues("email") || studentData?.email}
            {...register("email", { required: true })}
          />
          <Typography variant="caption" component="span" color="error.main">
            {errors.email && "Student email is required"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label={studentData?.course ? "" : "Student course"}
            type="text"
            placeholder={studentData?.course ? "" : "Student course"}
            fullWidth
            defaultValue={getValues("course") || studentData?.course}
            {...register("course", { required: true })}
          />
          <Typography variant="caption" component="span" color="error.main">
            {errors.course && "Student course is required"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
            sx={{ padding: 2 }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
