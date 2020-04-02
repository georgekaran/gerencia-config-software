import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import uniqid from 'uniqid';
import './BaseToast.css';

toast.configure({
    toastId: `toast-${uniqid()}`,
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    bodyClassName: 'Toastify__toast-custom-body'
});

export default toast;
