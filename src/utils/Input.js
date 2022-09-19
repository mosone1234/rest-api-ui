import React, { memo } from "react";
import { TextField } from "@mui/material";

export const ValidatedField = memo(
  ({
    name,
    type,
    value,
    label,
    handleChange,
    handleBlur,
    errors,
    touched,
    press,
    pressSpace,
    classe,
    classError
  }) => {
    return (
      <>
        <TextField
          name={name}
          id={name}
          fullWidth
          required
          variant="outlined"
          type={type}
          label={label}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors[name] && touched[name]}
          helperText={errors[name] && touched[name] ? errors[name] : null}
          onKeyPress={press}
          onKeyDown={pressSpace}
          className={classe}
          FormHelperTextProps={{ classes: { root: classError } }}
        />
      </>
    );
  }
);
