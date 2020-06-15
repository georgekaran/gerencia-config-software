// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import store from "./store/configureStore";
import { Provider } from "react-redux";
import React from "react";
import 'mutationobserver-shim';
import { useForm } from "react-hook-form";

jest.mock('./utils/Api/Api');

beforeEach(async () => {
    jest.clearAllMocks();
});

global.wrapComponentWithRedux = (Component) => {
    return (
        <Provider store={store}>
            <Component />
        </Provider>
    )
};

global.formWrapper = (Component, schemaValidation) => {
    return function ComposedComponent(props) {
        const onSubmit = data => {
            console.log(data);
        };
        const { register, handleSubmit, errors } = useForm({
            validationSchema: schemaValidation,
            mode: 'onChange',
            reValidateMode: 'onChange'
        });
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Component register={register} errors={errors} {...props} />
            </form>
        )
    }
}

global.MutationObserver = window.MutationObserver;