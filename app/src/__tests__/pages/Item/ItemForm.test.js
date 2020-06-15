import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Item } from "../../../utils/Api/Api";
import ItemForm from "../../../pages/Item/ItemForm";
import { MemoryRouter } from "react-router-dom";

it('should show "Campo obrigatório" if "nome" is empty', async function () {
    const { getByTestId, findAllByText } = render(
        <MemoryRouter>
            {wrapComponentWithRedux(ItemForm)}
        </MemoryRouter>);

    const inputValorUnitario = getByTestId("input-valorUnitario");
    fireEvent.change(inputValorUnitario, {
        target: {
            value: "10"
        }
    });

    const button = getByTestId("button-submit");
    await fireEvent.click(button);

    expect((await findAllByText('Campo obrigatório.')).length).toBe(1)
});

it('should show "Deve ser um número" if "valorUnitario" is empty', async function () {
    const { getByTestId, findAllByText } = render(
        <MemoryRouter>
            {wrapComponentWithRedux(ItemForm)}
        </MemoryRouter>);

    const inputNome = getByTestId("input-nome");
    fireEvent.change(inputNome, {
        target: {
            value: "Item A"
        }
    });

    const button = getByTestId("button-submit");
    await fireEvent.click(button);

    expect((await findAllByText('Deve ser um número')).length).toBe(1)
});

it('should show "Valor unitário deve ser positivo." with negative valorUnitario', async function () {
    const { getByTestId, findAllByText } = render(
        <MemoryRouter>
            {wrapComponentWithRedux(ItemForm)}
        </MemoryRouter>
    );

    const inputValorUnitario = getByTestId("input-valorUnitario");
    fireEvent.change(inputValorUnitario, {
        target: {
            value: "-10"
        }
    });

    const button = getByTestId("button-submit");
    await fireEvent.click(button);

    expect((await findAllByText('Valor unitário deve ser positivo.')).length).toBe(1);
});

it('should call Item.save API with valid input', async function () {
    const { getByTestId, findAllByText } = render(
        <MemoryRouter>
            {wrapComponentWithRedux(ItemForm)}
        </MemoryRouter>
    );

    const inputValorUnitario = getByTestId("input-valorUnitario");
    fireEvent.change(inputValorUnitario, {
        target: {
            value: "10"
        }
    });

    const inputNome = getByTestId("input-nome");
    fireEvent.change(inputNome, {
        target: {
            value: "Item A"
        }
    });

    const button = getByTestId("button-submit");
    await fireEvent.click(button);

    expect(findAllByText('Não é um email válido.').length).toBeUndefined();
    expect(findAllByText('Campo obrigatório.').length).toBeUndefined();
    expect(findAllByText('Valor unitário deve ser positivo.').length).toBeUndefined();

    await wait(() => expect(Item.save).toHaveBeenCalledTimes(1))
});