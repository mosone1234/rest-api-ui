import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material'

import useUsers from '../hooks/useUsers'

import { getUsers, deleteUser } from '../redux/user.slice'
import { useDispatch } from "react-redux"

import DeleteModal from '../modals/DeleteModal';
import UserFormModal from '../modals/UserFormModal';

const TableData = () => {
  const { users, totalElements } = useUsers()
  const dispatch = useDispatch()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
 
  useEffect(() => {
    dispatch(getUsers((page * rowsPerPage), rowsPerPage))
  }, [page, rowsPerPage])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const deleteUserAction = (id) => {
    dispatch(deleteUser(id))
  }

  return (
    <>
      <TableContainer
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nombre</strong>
              </TableCell>
              <TableCell>
                <strong>Apellido</strong>
              </TableCell>
              <TableCell>
                <strong>E-mail</strong>
              </TableCell>
              <TableCell>
                <strong>Teléfono</strong>
              </TableCell>
              <TableCell>
                <strong>C.C.</strong>
              </TableCell>
              <TableCell>
                  <strong>Accciones</strong>
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, key) => (
              <TableRow
                key={key}
              >
                <TableCell>
                  {user.name}
                </TableCell>
                <TableCell>
                  {user.lastName}
                </TableCell>
                <TableCell>
                  {user.email}
                </TableCell>
                <TableCell>
                  {user.phoneNumber}
                </TableCell>
                <TableCell padding={"none"}>
                  {user.cc}
                </TableCell>
                <TableCell padding={"none"}>
                    <UserFormModal
                      user={user}
                    />
                    <DeleteModal
                      title={"Esta seguro de eliminar el usuario"}
                      description={"Se eliminara el usuario (" + user.name + " " + user.lastName + ")" }
                      handleFunction={() => {
                        deleteUserAction(user._id)
                      }}
                    />
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        count={totalElements}
        component="div"
        page={totalElements <= 0 ? 0 : page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Elementos por pagina"}
      />
    </>
  )
}

export default TableData
