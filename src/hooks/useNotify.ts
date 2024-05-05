import { useCallback } from "react";
import { toast as nativeToast, TypeOptions } from 'react-toastify';

const toast = (msg: string, type: TypeOptions) => {
    return nativeToast(msg, {
        progress: undefined,
        theme: "dark",
        type,
    });
};

export const useNotify = () => {

    const onError = useCallback((msg: string) => {
        toast(msg, 'error');
    }, []);

    const onSuccess = useCallback((msg: string) => {
        toast(msg, 'success');
    }, []);

    return {
        onError,
        onSuccess,
    };
};