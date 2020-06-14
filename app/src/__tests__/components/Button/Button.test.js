import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from "../../../components/Button/Button";

it('call function on click', async function () {
    const onClickMock = jest.fn()

    const { getByTestId } = render(<Button id={"button-test"} onClick={onClickMock} />);
    const button = getByTestId('button-test');
    await fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
});