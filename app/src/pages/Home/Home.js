import React from 'react'
import Base from "../../components/Base/Base";
import BaseHeader from "../../components/Base/BaseHeader";
import TableHead from "../../components/Table/TableHead";
import TableHeadRow from "../../components/Table/TableHeadRow";
import TableBody from "../../components/Table/TableBody";
import useFetchUsers from "../../hooks/useFetchUsers";
import TableRow from "../../components/Table/TableRow";
import TableCell from "../../components/Table/TableCell";
import Table from "../../components/Table/Table";

export default function Home() {

  const [users] = useFetchUsers();

  return (
    <Base>
      <BaseHeader title="Usuários"/>
      <Table>
        <TableHead>
          <TableHeadRow>ID</TableHeadRow>
          <TableHeadRow>Nome</TableHeadRow>
          <TableHeadRow>E-mail</TableHeadRow>
          <TableHeadRow>Ações</TableHeadRow>
        </TableHead>
        <TableBody>
          {users.length > 0 && users.map(user => {
            return (
              <TableRow>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.nome}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>TODO</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Base>
  )
}
