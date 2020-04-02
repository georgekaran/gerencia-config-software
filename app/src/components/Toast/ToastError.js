import React from 'react';
import BaseToast from "./BaseToast";

let toastId = null;

export default function ToastError(message) {
    if (!BaseToast.isActive(toastId)) {
        toastId = BaseToast.error(message);
    }
}