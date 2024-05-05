import React from "react";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

const SearchInput = ({ label, value, onChange }) => {
  return (
    <Grid item xs={2}>
      <TextField
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        fullWidth
      />
    </Grid>
  );
};

export default SearchInput;
