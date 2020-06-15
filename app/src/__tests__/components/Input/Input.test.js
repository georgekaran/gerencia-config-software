import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import Input from "../../../components/Input/Input";
import * as Yup from "yup";
import {act} from "react-dom/test-utils";

it('renders without error', async function () {
    const InputWrapped = formWrapper(Input);
    const { getByTestId } = render(<InputWrapped name={"test-input"}
                                                 data-testid={"test-input"}
                                                 type={"text"}
                                                 placeholder={"Testing"} />);


    expect(await getByTestId('test-input')).toBeDefined()
});

it('allow only numbers when ', async function () {
    const NumberSchema = Yup.object().shape({
        test_input: Yup.number().required("Campo obrigatório.")
    });
    const InputWrapped = formWrapper(Input, NumberSchema);

    const { getByTestId } = render(<InputWrapped name={"test_input"}
                                                 data-testid={"test-input"}
                                                 type={"text"}
                                                 placeholder={"Testing"} />);

    await act(async () => {
        fireEvent.change(getByTestId('test-input'), {
            target: {
                value: "23.0"
            }
        });
    });

    await wait(() => expect(getByTestId('test-input').value).toBe('23.0'))
});