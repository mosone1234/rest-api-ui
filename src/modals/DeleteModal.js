import React from 'react'
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
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector } from "react-redux"

const DeleteModal = (props) => {
  const [open, setOpen] = React.useState(false)
  const { title, description, handleFunction } = props
  const loading = useSelector((state) => state.user.loading);

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteOne = () => {
    handleFunction()
    if (!loading)
      handleClose()
  }
  
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon fontSize="small" color="error" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info">
            Cancelar
          </Button>
          <Button onClick={deleteOne} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

DeleteModal.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleFunction: PropTypes.func.isRequired,
}

export default DeleteModal
