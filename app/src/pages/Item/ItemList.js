import './ItemForm.scss';
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
import {Item as ItemAPI} from "../../utils/Api/Api";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastError from "../../components/Toast/ToastError";
import FetchFactory from "../../hooks/FetchFactory";

const initialState = {
  search: "",
  page: 0,
  size: 10,
};

const ItemList = props => {
  const [pagination, setPagination] = useState(initialState);
  const [isModalOpen, setModalOpen] = useState(false);
  const [items, triggerUpdate] = FetchFactory.fetchItems({ ...pagination });
  const history = useHistory();
  const [itemToDelete, setItemToDelete] = useState(null);

  const handlePaginationChange = (futurePage) => {
    setPagination(currentPagination => ({ ...currentPagination, page: futurePage }))
  };

  const handleDeleteItem = (user) => {
    setItemToDelete(user);
  };

  const confirmDeleteItem = async () => {
    const { data, status } = await ItemAPI.delete(itemToDelete.id)
    if (status === 200) {
      ToastSuccess("Item deletado com sucesso!");
    } else {
      ToastError("Erro ao deletar item!");
      console.error(data)
    }
    closeModal();
    triggerUpdate();
  }

  const closeModal = () => {
    setModalOpen(false)
    setItemToDelete(null);
  }

  const handleFormItem = (item = null) => {
    history.push(`/items/form/${item ? item.id : ''}`);
  };

  return (
    <>
      <Base>
        <Row className="Row__Header">
          <Button className="icon icon-shape bg-primary text-white rounded-circle my-lg-auto"
                  onClick={() => handleFormItem()}>
            <i className="fas fa-plus" />
          </Button>
          <BaseHeader title="Itens"/>
        </Row>

        <Table pageRequest={items} handlePaginationChange={handlePaginationChange} >
          <TableHead>
            <TableHeadRow>ID</TableHeadRow>
            <TableHeadRow>Nome</TableHeadRow>
            <TableHeadRow>Valor unitário</TableHeadRow>
            <TableHeadRow>Ações</TableHeadRow>
          </TableHead>
          <TableBody>
            {items.content && items.content.map(user => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.nome}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button className="btn-icon btn-2"
                            color="success"
                            onClick={() => handleFormItem(user)}
                            size="sm"
                            type="button"
                            tooltip="Editar item">
                    <span className="btn-inner--icon">
                      <i className="fas fa-pencil-alt fa-stack-1x"/>
                    </span>
                    </Button>
                    <Button className="btn-icon btn-2"
                            color="danger"
                            onClick={() => {
                              handleDeleteItem(user);
                              setModalOpen(true)
                            }}
                            size="sm"
                            type="button"
                            tooltip="Excluir item">
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
          <h3 className="mb-0">Exclusão de itens</h3>
        </ModalHeader>
        <ModalBody>
          <label>Você gostaria de excluir o item {itemToDelete && itemToDelete.nome}?</label>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={confirmDeleteItem}>Sim</Button>{' '}
          <Button color="secondary" onClick={closeModal}>Não</Button>
        </ModalFooter>
      </Modal>
    </>
  )
};

ItemList.propTypes = {
  
};

export default ItemList;