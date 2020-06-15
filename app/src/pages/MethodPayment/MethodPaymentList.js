import './MethodPaymentForm.scss';
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
import {FormaPagamento as FormaPagamentoAPI} from "../../utils/Api/Api";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastError from "../../components/Toast/ToastError";
import FetchFactory from "../../hooks/FetchFactory";

const initialState = {
  search: "",
  page: 0,
  size: 10,
};

const MethodPaymentList = props => {
  const [pagination, setPagination] = useState(initialState);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formasDePagamentos, triggerUpdate] = FetchFactory.fetchFormasPagamento({ ...pagination });
  const history = useHistory();
  const [formaPagamentoToDelete, setFormaDePagamentoToDelete] = useState(null);

  const handlePaginationChange = (futurePage) => {
    setPagination(currentPagination => ({ ...currentPagination, page: futurePage }))
  };

  const handleDeleteFormaPagamento = (user) => {
    setFormaDePagamentoToDelete(user);
  };

  const confirmDeleteFormaDePagamento = async () => {
    const { data, status } = await FormaPagamentoAPI.delete(formaPagamentoToDelete.id)
    if (status === 200) {
      ToastSuccess("Forma de pagamento deletada com sucesso!");
    } else {
      ToastError("Erro ao deletar forma de pagamento!");
      console.error(data)
    }
    closeModal();
    triggerUpdate();
  }

  const closeModal = () => {
    setModalOpen(false)
    setFormaDePagamentoToDelete(null);
  }

  const handleFormFormaPagamento = (formaPagamento = null) => {
    history.push(`/forma-pagamento/form/${formaPagamento ? formaPagamento.id : ''}`);
  };

  return (
    <>
      <Base>
        <Row className="Row__Header">
          <Button className="icon icon-shape bg-primary text-white rounded-circle my-lg-auto"
                  onClick={() => handleFormFormaPagamento()}>
            <i className="fas fa-plus" />
          </Button>
          <BaseHeader title="Forma de Pagamento"/>
        </Row>

        <Table pageRequest={formasDePagamentos} handlePaginationChange={handlePaginationChange} >
          <TableHead>
            <TableHeadRow>ID</TableHeadRow>
            <TableHeadRow>Nome</TableHeadRow>
            <TableHeadRow>Ações</TableHeadRow>
          </TableHead>
          <TableBody>
            {formasDePagamentos.content && formasDePagamentos.content.map(formaPagamento => {
              return (
                <TableRow key={formaPagamento.id}>
                  <TableCell>{formaPagamento.id}</TableCell>
                  <TableCell>{formaPagamento.descricao}</TableCell>
                  <TableCell>
                    <Button className="btn-icon btn-2"
                            color="success"
                            onClick={() => handleFormFormaPagamento(formaPagamento)}
                            size="sm"
                            type="button"
                            tooltip="Editar forma de pagamento">
                    <span className="btn-inner--icon">
                      <i className="fas fa-pencil-alt fa-stack-1x"/>
                    </span>
                    </Button>
                    <Button className="btn-icon btn-2"
                            color="danger"
                            onClick={() => {
                              handleDeleteFormaPagamento(formaPagamento);
                              setModalOpen(true)
                            }}
                            size="sm"
                            type="button"
                            tooltip="Excluir forma de pagamento">
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
          <h3 className="mb-0">Exclusão de forma de pagamento</h3>
        </ModalHeader>
        <ModalBody>
          <label>Você gostaria de excluir a forma de pagamento {formaPagamentoToDelete && formaPagamentoToDelete.descricao}?</label>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={confirmDeleteFormaDePagamento}>Sim</Button>{' '}
          <Button color="secondary" onClick={closeModal}>Não</Button>
        </ModalFooter>
      </Modal>
    </>
  )
};

MethodPaymentList.propTypes = {
  
};

export default MethodPaymentList;