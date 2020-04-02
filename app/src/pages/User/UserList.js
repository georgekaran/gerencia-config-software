import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row } from "reactstrap";
import { useHistory } from 'react-router-dom';

import Base from "../../components/Base/Base";
import BaseHeader from "../../components/Base/BaseHeader";
import TableHead from "../../components/Table/TableHead";
import TableHeadRow from "../../components/Table/TableHeadRow";
import TableBody from "../../components/Table/TableBody";
import useFetchUsers from "../../hooks/users/useFetchUsers";
import TableRow from "../../components/Table/TableRow";
import TableCell from "../../components/Table/TableCell";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";

const initialState = {
  search: "",
  page: 0,
  size: 10,
};


const UserList = props => {
  const [pagination, setPagination] = useState(initialState);
  const [users] = useFetchUsers({ ...pagination });
  const history = useHistory();

  const handlePaginationChange = (futurePage) => {
    console.log("Chamou", futurePage);
    setPagination(currentPagination => ({ ...currentPagination, page: futurePage }))
  };

  const handleDeleteUser = (user) => {
    console.log("User", user);
  };

  const handleEditUser = (user) => {
    console.log("User", user);
    history.push(`/users/form/${user.id}`);
  };

  return (
    <Base>
      <Row>
          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
            <i className="fas fa-plus" />
          </div>
          <BaseHeader title="Usuários"/>
      </Row>

      <Table pageRequest={users} handlePaginationChange={handlePaginationChange} >
        <TableHead>
          <TableHeadRow>ID</TableHeadRow>
          <TableHeadRow>Nome</TableHeadRow>
          <TableHeadRow>E-mail</TableHeadRow>
          <TableHeadRow>Ações</TableHeadRow>
        </TableHead>
        <TableBody>
          {users.content && users.content.map(user => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.nome}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button className="btn-icon btn-2"
                          color="success"
                          onClick={() => handleEditUser(user)}
                          size="sm"
                          type="button"
                          tooltip="Editar usuário">
                    <span className="btn-inner--icon">
                      <i className="fas fa-pencil-alt fa-stack-1x"/>
                    </span>
                  </Button>
                  <Button className="btn-icon btn-2"
                          color="danger"
                          onClick={() => handleDeleteUser(user)}
                          size="sm"
                          type="button"
                          tooltip="Excluir usuário">
                    <span className="btn-inner--icon">
                      <i className="fas fa-trash-alt fa-stack-1x"/>
                    </span>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Base>
  )
};

UserList.propTypes = {
  
};

export default UserList;