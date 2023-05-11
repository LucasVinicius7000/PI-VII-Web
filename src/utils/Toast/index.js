import { toast } from 'react-toastify';

export function ToastError(text) {
    toast.error(text, {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export function ToastSucess(text) {

    toast.success(text, {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export function ToastInfo(text) {
    toast.info(text, {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export default { ToastError, ToastSucess, ToastInfo }