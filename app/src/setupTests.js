// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import store from "./store/configureStore";
import { Provider } from "react-redux";
import React from "react";
import 'mutationobserver-shim';

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

global.MutationObserver = window.MutationObserver;