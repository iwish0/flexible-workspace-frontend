export type SnackbarType = {
  key: string; // snackbar identifier
  text: string; //  text to show within snackbar
  variant: SnackbarVariant;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>; // snackbar icon
};

export type TSnackbarProps = Omit<SnackbarType, 'key'> & {
  handleClose: () => void; // Function that is run when the snackbar is closed
  open: boolean; //whether to open the snackbar or not
};

export enum SnackbarVariant {
  SUCCESS = '$colors$success',
  ERROR = '$colors$error',
  WARNING = '$colors$warning'
}
