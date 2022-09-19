import React from 'react'
import { Formik } from 'formik'

import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import useFormStyles from '../styles/useFormFields'

import { ValidatedField } from '../utils/Input'
import { updateUser } from '../redux/user.slice'
import { useDispatch } from 'react-redux'

import {
  HandleKeyDown,
  HandleKeyPress,
  HandleKeyDownWithoutSpace,
  HandleKeyDownOnlyNumbers,
  HandleKeyDownPhoneNumber,
} from '../utils/Validation'

const UserFormModal = (props) => {
  const [open, setOpen] = React.useState(false)
  const classes = useFormStyles()
  const dispatch = useDispatch()
  const { user } = props

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmitFinish = (usr) => {
    dispatch(updateUser(usr))
  }

  const validate = (values) => {
    const errors = {}
    if (!values.name) {
      errors.name = "El campo es requerido"
    } else {
      if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC\s]*$/i.test(values.name))
        errors.name = "EL campo solo acepta alfabeto latino Americano"
    }
    if (!values.lastName) {
      errors.lastName = "El campo es requerido"
    } else {
      if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC\s]*$/i.test(values.lastName))
        errors.lastName = "EL campo solo acepta alfabeto latino Americano"
    }
    if (!values.email) {
      errors.email = "El campo es requerido"
    } else {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
        errors.email = "La dirección de correo electrónico no válida"
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "El campo es requerido"
    }
    if (!values.cc) {
      errors.cc = "El campo es requerido"
    } else {
      if (!/^[0-9\b]+$/i.test(values.cc)) {
        errors.cc = "El campo solo acepta numeros"
      }
    }
    return errors
  }

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <EditIcon fontSize="small" color="info" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"body"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Editar Usuario"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Todos los campos son requeridos"}
          </DialogContentText>
          <Formik
            initialValues={user}
            validate={validate}
            onSubmit={(values, actions) => {
              onSubmitFinish(values)
            }}
          >
            {(propform) => (
              <form onSubmit={propform.handleSubmit} noValidate id="form">
                <ValidatedField
                  name="name"
                  type="text"
                  label="Nombre"
                  value={propform.values.name}
                  handleChange={propform.handleChange}
                  handleBlur={propform.handleBlur}
                  errors={propform.errors}
                  touched={propform.touched}
                  classe={classes.formFieldTwo}
                  classError={classes.helperTextError}
                  press={HandleKeyPress}
                  pressSpace={HandleKeyDown}
                />
                <ValidatedField
                  name="lastName"
                  type="text"
                  label="Apellido"
                  value={propform.values.lastName}
                  handleChange={propform.handleChange}
                  handleBlur={propform.handleBlur}
                  errors={propform.errors}
                  touched={propform.touched}
                  classe={classes.formFieldTwo}
                  classError={classes.helperTextError}
                  press={HandleKeyPress}
                  pressSpace={HandleKeyDown}
                />
                <ValidatedField
                  name="email"
                  type="text"
                  label="Email"
                  value={propform.values.email}
                  handleChange={propform.handleChange}
                  handleBlur={propform.handleBlur}
                  errors={propform.errors}
                  touched={propform.touched}
                  classe={classes.formFieldTwo}
                  classError={classes.helperTextError}
                  pressSpace={HandleKeyDownWithoutSpace}
                />
                <ValidatedField
                  name="phoneNumber"
                  type="text"
                  label="Teléfono"
                  value={propform.values.phoneNumber}
                  handleChange={propform.handleChange}
                  handleBlur={propform.handleBlur}
                  errors={propform.errors}
                  touched={propform.touched}
                  classe={classes.formFieldTwo}
                  classError={classes.helperTextError}
                  pressSpace={HandleKeyDownPhoneNumber}
                  press={HandleKeyDownOnlyNumbers}
                />
                <ValidatedField
                  name="cc"
                  type="text"
                  label="Documento de identidad"
                  value={propform.values.cc}
                  handleChange={propform.handleChange}
                  handleBlur={propform.handleBlur}
                  errors={propform.errors}
                  touched={propform.touched}
                  classe={classes}
                  classError={classes.helperTextError}
                  press={HandleKeyDownOnlyNumbers}
                />
              </form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button type="submit" color="success" autoFocus form="form">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

UserFormModal.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserFormModal
