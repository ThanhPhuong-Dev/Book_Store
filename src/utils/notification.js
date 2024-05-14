import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const successToast = ({ title, position = 'top-center' }) => {
  toast.success(title, { position: position, autoClose: 1500 });
};

export const errorToast = ({ title, position = 'top-center' }) => {
  toast.error(title, { position: position, autoClose: 1500 });
};
