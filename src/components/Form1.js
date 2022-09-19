import {
  Button
} from '@mui/material'

import useFormStyles from '../styles/useFormFields'
import { Formik } from 'formik'
import { ValidatedField } from '../utils/Input'
import { HandleKeyDown, HandleKeyPress } from '../utils/Validation'

const Form1 = ({ setStep = () => {}, user, setUser }) => {
  const classes = useFormStyles()

  const onSubmitNext = (event) => {
    setStep(1)
  }

  const validate = values => {
    const errors = {}
    user['name'] = values.name.trim()
    user['lastName'] = values.lastName.trim()
    setUser(user)
    if (!values.name) {
      errors.name = "El campo es requerido"
    } else {
      if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC\s]*$/i.test(values.name))
        errors.name = "EL campo solo acepta alfabeto latino Americano"
      if (values.name.trim() === "")
        errors.name = "Debe ingrasas valor en el campo"
    }
    if (!values.lastName) {
      errors.lastName = "El campo es requerido"
    } else {
      if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC\s]*$/i.test(values.lastName))
        errors.lastName = "EL campo solo acepta alfabeto latino Americano"
    }
    return errors
  }

  return (
    <>
      <Formik
        initialValues={user}
        validate={validate}
        onSubmit={(values, actions) => {
          onSubmitNext()
        }}
      >
        {(propform) => (
          <form
            onSubmit={propform.handleSubmit}
            noValidate
            id="form1"
          >
            <ValidatedField
                name="name"
                type="text"
                label="Nombre"
                value={propform.values.name}
                handleChange={propform.handleChange}
                handleBlur={propform.handleBlur}
                errors={propform.errors}
                touched={propform.touched}
                classe={classes}
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
                classe={classes}
                press={HandleKeyPress}
                pressSpace={HandleKeyDown}
            />
          </form>
        )}
      </Formik>
      <Button
        variant="contained"
        type="submit"
        form="form1"
      >
        Siguiente
      </Button>
    </>
  )
}

export default Form1
