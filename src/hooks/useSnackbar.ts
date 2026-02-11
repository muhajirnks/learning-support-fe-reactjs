import { useSnackbarStore } from "@/store/useSnackbarStore"

const useSnackbar = () => {
    const setSnackbar = useSnackbarStore(s =>s.setSnackbar)
    return setSnackbar
}

export default useSnackbar