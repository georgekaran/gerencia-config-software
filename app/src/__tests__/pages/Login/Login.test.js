import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import Login from "../../../pages/Login/Login";
import { User } from "../../../utils/Api/Api";

it('should show "Campo obrigatório" with invalid input', async function () {
     const { getByTestId, findAllByText } = render(wrapComponentWithRedux(Login));

    const buttonLogin = getByTestId("button-login");
    await fireEvent.click(buttonLogin);

    expect((await findAllByText('Campo obrigatório.')).length).toBe(2)
});

it('should show "Não é um email válido." with invalid email', async function () {
    const { getByTestId, findAllByText } = render(wrapComponentWithRedux(Login));

    const emailInput = getByTestId('input-username');
    emailInput.value = 'invalid-email';

    const buttonLogin = getByTestId("button-login");
    await fireEvent.click(buttonLogin);

    expect((await findAllByText('Não é um email válido.')).length).toBe(1);
});

it('should call signin api with valid input', async function () {
    const { getByTestId, findAllByText } = render(wrapComponentWithRedux(Login));

    const emailInput = getByTestId('input-username');
    const passwordInput = getByTestId('input-password');
    emailInput.value = 'test@test.com';
    passwordInput.value = '123456';

    const buttonLogin = getByTestId("button-login");
    await fireEvent.click(buttonLogin);

    expect(findAllByText('Não é um email válido.').length).toBeUndefined();
    expect(findAllByText('Campo obrigatório.').length).toBeUndefined();

    await wait(() => expect(User.signIn).toHaveBeenCalledTimes(1))
});