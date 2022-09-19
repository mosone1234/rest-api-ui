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

import { useSelector } from "react-redux"

const UserFormModal = (props) => {
  const [open, setOpen] = React.useState(false)
  const classes = useFormStyles()
  const dispatch = useDispatch()
  const { user } = props
  const [newUser, setNewUser] = React.useState({})
  const loading = useSelector((state) => state.user.loading);

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmitFinish = () => {
    dispatch(updateUser(newUser))
    if (!loading)
      handleClose()
  }

  const validate = (values) => {
    const errors = {}
    values['name'] = values.name.trim()
    values['lastName'] = values.lastName.trim()
    values['email'] = values.email.trim()
    values['phoneNumber'] = values.phoneNumber.trim()
    values['cc'] = values.cc
    setNewUser(Object.assign({}, values))
    if (!values.name) {
      errors.name = "El campo es requerido"
    } else {
      if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC\s]*$/i.test(values.name))
        errors.name = "El campo solo acepta alfabeto latino Americano"
      if (values.name.trim() === "")
        errors.name = "El campo no acepta espacios en blanco"
    }
    if (!values.lastName) {
      errors.lastName = "El campo es requerido"
    } else {
      if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC\s]*$/i.test(values.lastName))
        errors.lastName = "El campo solo acepta alfabeto latino Americano"
      if (values.lastName.trim() === "")
        errors.lastName = "El campo no acepta espacios en blanco"
    }
    if (!values.email) {
      errors.email = "El campo es requerido"
    } else {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
        errors.email = "La dirección de correo electrónico no es válida"
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "El campo es requerido"
    } else {
      if (values.phoneNumber.length < 11) {
        errors.phoneNumber = "Los digitos del telefono tienen que ser >= 11"
      }
    }
    if (!values.cc) {
      errors.cc = "El campo es requerido"
    } else {
      if (!/^[0-9\b]+$/i.test(values.cc)) {
        errors.cc = "El campo solo acepta números"
      } else {
        if (values.cc.length < 5) {
          errors.cc = "El CC debe tener almenos 5 números"
        }
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
            initialValues={Object.assign({}, user)}
            validate={validate}
            onSubmit={(values, actions) => {
              onSubmitFinish()
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
                  press={HandleKeyDownWithoutSpace}
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
                  classe={classes.formFieldTwo}
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
