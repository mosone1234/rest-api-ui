import {
  Button
} from '@mui/material'

import useFormStyles from '../styles/useFormFields'
import { createUser } from '../redux/user.slice'
import { useDispatch } from "react-redux"
import { Formik} from 'formik'
import { ValidatedField } from '../utils/Input'
import { HandleKeyDownWithoutSpace, HandleKeyDownOnlyNumbers, HandleKeyDownPhoneNumber } from '../utils/Validation'

const Form2 = ({ setStep = () => {}, user, setUser }) => {
  const classes = useFormStyles()
  const dispatch = useDispatch()

  const onSubmitFinish = (event) => {
    dispatch(createUser(user))
    setUser({
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      cc: "",
    })
    setStep(0)
  }

  const validate = values => {
    const errors = {}
    user['name'] = values.name.trim()
    user['lastName'] = values.lastName.trim()
    user['email'] = values.email.trim()
    user['phoneNumber'] = values.phoneNumber.trim()
    user['cc'] = values.cc
    setUser(user)
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
        errors.cc = "El campo solo acepta numeros"
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
      <Formik
        initialValues={user}
        validate={validate}
        onSubmit={(values, { resetForm }) => {
          resetForm({ values: ''})
          onSubmitFinish()
        }}
      >
        {(propform) => (
          <form
            onSubmit={propform.handleSubmit}
            noValidate
            id="form2"
          >
            <ValidatedField
                name="email"
                type="text"
                label="Email"
                value={propform.values.email}
                handleChange={propform.handleChange}
                handleBlur={propform.handleBlur}
                errors={propform.errors}
                touched={propform.touched}
                classe={classes.formField}
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
                classe={classes.formField}
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
                classe={classes.formField}
                classError={classes.helperTextError}
                press={HandleKeyDownOnlyNumbers}
            />
          </form>
        )}
      </Formik>
      <Button
        className={classes.formButtons}
        variant="outlined"
        onClick={() => {
          setStep(0)
        }}
      >
        Anterior
      </Button>
      <Button
        variant="contained"
        type="submit"
        form="form2"
      >
        Enviar
      </Button>
    </>
  )
}

export default Form2
