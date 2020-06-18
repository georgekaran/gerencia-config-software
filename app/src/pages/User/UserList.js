import './UserForm.scss';
import React, { useState } from 'react';
import { Row } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Base from "../../components/Base/Base";
import BaseHeader from "../../components/Base/BaseHeader";
import TableHead from "../../components/Table/TableHead";
import TableHeadRow from "../../components/Table/TableHeadRow";
import TableBody from "../../components/Table/TableBody";
import TableRow from "../../components/Table/TableRow";
import TableCell from "../../components/Table/TableCell";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import { User as UserAPI } from "../../utils/Api/Api";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastError from "../../components/Toast/ToastError";
import FetchFactory from "../../hooks/FetchFactory";

const initialState = {
  search: "",
  page: 0,
  size: 10,
};


const UserList = props => {
  const [pagination, setPagination] = useState(initialState);
  const [isModalOpen, setModalOpen] = useState(false);
  const [users, triggerUpdate] = FetchFactory.fetchUsers({ ...pagination });
  const history = useHistory();
  const [userToDelete, setUserToDelete] = useState(null);

  const handlePaginationChange = (futurePage) => {
    setPagination(currentPagination => ({ ...currentPagination, page: futurePage }))
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
  };

  const confirmDeleteUser = async () => {
    const { data, status } = await UserAPI.deleteUser(userToDelete.id)
    if (status === 200) {
      ToastSuccess("Usuário deletado com sucesso!");
    } else {
      ToastError("Erro ao deletar usuário!");
      console.error(data)
    }
    closeModal();
    triggerUpdate();
  }

  const closeModal = () => {
    setModalOpen(false)
    setUserToDelete(null);
  }

  const handleFormUser = (user = null) => {
    history.push(`/users/form/${user ? user.id : ''}`);
  };

  return (
    <>
      <Base>
        <Row className="Row__Header">
          <Button className="icon icon-shape bg-primary text-white rounded-circle my-lg-auto"
                  onClick={() => handleFormUser()}>
            <i className="fas fa-plus" />
          </Button>
          <BaseHeader title="Usuários - George"/>
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
                            onClick={() => handleFormUser(user)}
                            size="sm"
                            type="button"
                            tooltip="Editar usuário">
                    <span className="btn-inner--icon">
                      <i className="fas fa-pencil-alt fa-stack-1x"/>
                    </span>
                    </Button>
                    <Button className="btn-icon btn-2"
                            color="danger"
                            onClick={() => {
                              handleDeleteUser(user);
                              setModalOpen(true)
                            }}
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

      <Modal isOpen={isModalOpen}
             autoFocus
             toggle={closeModal}
             centered>
        <ModalHeader>
          <h3 className="mb-0">Exclusão de usuários</h3>
        </ModalHeader>
        <ModalBody>
          <label>Você gostaria de excluir o usuário {userToDelete && userToDelete.nome}?</label>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={confirmDeleteUser}>Sim</Button>{' '}
          <Button color="secondary" onClick={closeModal}>Não</Button>
        </ModalFooter>
      </Modal>
    </>
  )
};

UserList.propTypes = {
  
};

export default UserList;