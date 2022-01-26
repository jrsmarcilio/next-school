import React from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from "@mui/material";

import { IStudent, ICourseData } from "../interfaces/Students";
import { api } from "../service/api";
import { toast } from "react-toastify";

export default function FormStudent({ id }: { id?: number }) {
  const defaultValues: IStudent = {
    name: "",
    email: "",
    course: 0,
    register: "",
    gender: "",
  };
  const [studentData, setStudentData] = React.useState<IStudent>();
  const [courseData, setCourseData] = React.useState<ICourseData[]>([]);

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
          setValue("register", response.data.register);
        });
    }
  }, [id]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchCourse() {
      await api
        .get("/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCourseData(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          toast.error("Error.");
        });
    }
    token ? fetchCourse() : router.push("/");
  }, []);

  const onSubmit: SubmitHandler<IStudent> = (data) => {
    const token = localStorage.getItem("token");
    console.log(data);
    if (id) {
      api
        .put(`/students/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Student created successfully!");
            router.push("/students");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          toast.error(error.response.data.error);
          toast.error("Error creating student!");
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
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextField
              label={studentData?.name ? "" : "Student name"}
              type="text"
              color="secondary"
              placeholder={studentData?.name ? "" : "Student name"}
              fullWidth
              defaultValue={getValues("name") || studentData?.name}
              {...register("name", { required: true })}
            />
            <Typography variant="caption" component="span" color="error.main">
              {errors.name && "Student name is required"}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label={studentData?.email ? "" : "Student email"}
              type="text"
              color="secondary"
              placeholder={studentData?.email ? "" : "Student email"}
              fullWidth
              defaultValue={getValues("email") || studentData?.email}
              {...register("email", { required: true })}
            />
            <Typography variant="caption" component="span" color="error.main">
              {errors.email && "Student email is required"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextField
              label={studentData?.register ? "" : "Student register"}
              type="text"
              color="secondary"
              placeholder={studentData?.register ? "" : "Student register"}
              fullWidth
              defaultValue={getValues("register") || studentData?.register}
              {...register("register", { required: true })}
            />
            <Typography variant="caption" component="span" color="error.main">
              {errors.register && "Student register is required"}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Select
              labelId="select-course"
              fullWidth
              color="secondary"
              defaultValue=""
              {...register("course", { required: true })}
            >
              <MenuItem value="" disabled>
                <em>Select a course</em>
              </MenuItem>
              {courseData &&
                courseData.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <FormControl variant="outlined">
            <FormLabel id="radio-gender" color="secondary">
              Gender
            </FormLabel>
            <RadioGroup row color="secondary" aria-labelledby="radio-gender">
              <FormControlLabel
                {...register("gender", { required: true })}
                value="Female"
                control={<Radio color="secondary" />}
                label="Female"
              />
              <FormControlLabel
                {...register("gender", { required: true })}
                value="Male"
                control={<Radio color="secondary" />}
                label="Male"
              />
              <FormControlLabel
                {...register("gender", { required: true })}
                value="Other"
                control={<Radio defaultChecked color="secondary" />}
                label="Outro"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          fullWidth
          sx={{ padding: 2 }}
        >
          Save
        </Button>
      </Grid>
    </Box>
  );
}
