import React from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

import { TextField, Button, Box, Grid, Typography } from "@mui/material";

import { api } from "../service/api";
import { toast } from "react-toastify";

interface UserRegister {
  name: string;
  email: string;
  password: string;
  username: string;
}

export default function FormRegister({ user }: { user?: UserRegister }) {
  const defaultValues = { name: "", email: "", username: "", password: "" };
  const [userData, setUserData] = React.useState<UserRegister>();

  const router = useRouter();

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({ defaultValues: defaultValues });

  React.useEffect(() => {
    if (user) {
      setUserData(user);
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("username", user.username);
      setValue("password", user.password);
    }
  }, [user]);

  const onSubmit: SubmitHandler<UserRegister> = (data) => {
    api
      .post("/users", data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("User created successfully!");
          router.push("/");
          localStorage.removeItem("token");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error creating user!");
      });
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
            label="Name"
            type="text"
            placeholder="Name"
            fullWidth
            defaultValue={getValues("name") || userData?.name}
            {...register("name", { required: true })}
          />
          <Typography variant="caption" component="span" color="error.main">
            {errors.name && "Student name is required"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Username"
            type="text"
            placeholder="Username"
            fullWidth
            defaultValue={getValues("username") || userData?.username}
            {...register("username", { required: true })}
          />
          <Typography variant="caption" component="span" color="error.main">
            {errors.username && "Student username is required"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Passoword"
            type="password"
            placeholder="Password"
            fullWidth
            defaultValue={getValues("password") || userData?.password}
            {...register("password", { required: true })}
          />
          <Typography variant="caption" component="span" color="error.main">
            {errors.password && "Password is required"}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            type="text"
            placeholder="Email"
            fullWidth
            defaultValue={getValues("email") || userData?.email}
            {...register("email", { required: true })}
          />
          <Typography variant="caption" component="span" color="error.main">
            {errors.email && "Email is required"}
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
