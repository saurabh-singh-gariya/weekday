/* eslint-disable react/prop-types */
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export const Dropdown = ({ label, value, onSelect, options }) => {
  return (
    <FormControl
      variant="filled"
      sx={{
        width: 120,
        "& .MuiSelect-select": {
          height: 10,
        },
      }}
    >
      <InputLabel shrink>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={(e) => {
          onSelect(e?.target?.value);
        }}
      >
        {options?.map((option) => (
          <MenuItem
            key={option}
            onSelect={(e) => console.log(e)}
            value={option}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default Dropdown;
