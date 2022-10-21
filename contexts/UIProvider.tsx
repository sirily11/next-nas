import { useSnackbar, VariantType } from "notistack";
import { createContext, useCallback, useState } from "react";

interface UIProvider {
  showDialog: (children: JSX.Element) => void;
  closeDialog: () => void;
  dialog?: JSX.Element;
  isDialogOpen: boolean;
  setTitle: (title: string) => void;
  title?: string;
  notify: (message: string, variant: VariantType) => void;
}

//@ts-ignore
export const UIContext = createContext<UIProvider>({});

export function UIContextProvider(props: any) {
  const [dialog, setDialog] = useState<JSX.Element>();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState<string>();
  const { enqueueSnackbar } = useSnackbar();

  const showDialog = useCallback((children: JSX.Element) => {
    console.log("Showing dialog");
    setDialog(children);
    setTimeout(() => {
      setDialogOpen(true);
    }, 200);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
    setTimeout(() => {
      setDialog(undefined);
    }, 500);
  }, []);

  const notify = useCallback(
    (message: string, variant: VariantType) => {
      enqueueSnackbar(message, {
        variant: variant,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    },
    [enqueueSnackbar]
  );

  const value: UIProvider = {
    showDialog,
    closeDialog,
    dialog,
    setTitle,
    title,
    isDialogOpen,
    notify,
  };

  return (
    <UIContext.Provider value={value}>{props.children}</UIContext.Provider>
  );
}
