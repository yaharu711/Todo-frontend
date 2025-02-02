import { toast } from "react-toastify"

export const showSuccessToast = (message: string) => {
    toast(message, {
        progressStyle: {
            background:
            "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
        },
    });
}

export const showInfoToast = (message: string) => {
    toast.info(message, {
        progressStyle: {
          background:
            "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
        },
      });
}
