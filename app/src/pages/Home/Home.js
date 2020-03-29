import React, { useState } from 'react'
import Base from "../../components/Base/Base";
import BaseHeader from "../../components/Base/BaseHeader";
import TableHead from "../../components/Table/TableHead";
import TableHeadRow from "../../components/Table/TableHeadRow";
import TableBody from "../../components/Table/TableBody";
import useFetchUsers from "../../hooks/useFetchUsers";
import TableRow from "../../components/Table/TableRow";
import TableCell from "../../components/Table/TableCell";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";

const initialState = {
  search: "",
  page: 0,
  size: 10,
};

export default function Home() {
  const [pagination, setPagination] = useState(initialState);
  const [users] = useFetchUsers({ ...pagination });

  const handlePaginationChange = (futurePage) => {
    console.log("Chamou", futurePage);
    setPagination(currentPagination => ({ ...currentPagination, page: futurePage }))
  };

  return (
    <Base>
      <BaseHeader title="Usuários"/>
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
                          size="sm"
                          type="button"
                          tooltip="Editar usuário">
                    <span className="btn-inner--icon">
                      <i className="fas fa-pencil-alt fa-stack-1x"/>
                    </span>
                  </Button>
                  <Button className="btn-icon btn-2"
                          color="danger"
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
}
