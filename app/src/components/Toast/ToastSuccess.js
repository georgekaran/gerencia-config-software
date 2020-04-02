import BaseToast from "./BaseToast";

let toastId = null;

export default function ToastSuccess(message) {
    if (!BaseToast.isActive(toastId)) {
        toastId = BaseToast.success(message);
    }
}