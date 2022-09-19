import {
  makeStyles
} from '@mui/styles'

const useFormStyles = makeStyles(() => ({
  formField: {
    marginBottom: '2.5em'
  },
  formFieldTwo: {
    marginBottom: '1.5em'
  },
  formButtons: {
    marginRight: '1em'
  },
  helperTextError: {
    position: "absolute",
    bottom: "-40%",
    right: "0",
    color: "#dc3545 !important",
  },
}))

export default useFormStyles
