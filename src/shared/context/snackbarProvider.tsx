import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { SnackbarType, SnackbarVariant } from '../models/ihm/snackbar.model';
import snackbarReducer, { TAction } from '../utils/snackbar.reducer';
import Snackbar from '../../components/Snackbar/Snackbar';

const SnackbarContext = createContext<{
  queue: SnackbarType[];
  dispatch: React.Dispatch<TAction>;
}>({
  queue: [] as SnackbarType[],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {}
});
//TODO COUCOU COPAIN

export default function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [{ queue }, dispatch] = useReducer(snackbarReducer, { queue: [] });

  useEffect(() => {
    if (queue.length > 0) {
      setTimeout(
        () => {
          dispatch({ type: 'REMOVE_SNACKBAR', payload: { key: queue[0].key } });
        },
        queue[0].variant === SnackbarVariant.ERROR || SnackbarVariant.WARNING ? 5000 : 2000
      );
    }
  });

  return (
    <SnackbarContext.Provider value={{ queue, dispatch }}>
      {queue.map((snack: SnackbarType, index: number) => (
        <Snackbar
          key={snack.key}
          //className={`-mt-${index + 1} left-${index + 4}`}
          text={snack.text}
          variant={snack.variant}
          icon={snack.icon}
          handleClose={() => dispatch({ type: 'REMOVE_SNACKBAR', payload: { key: snack.key } })}
          open={true}
        />
      ))}
      {children}
    </SnackbarContext.Provider>
  );
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar was called outside SnackbarProvider');
  }
  const { dispatch } = context;

  return useCallback(
    (snack: SnackbarType) => {
      dispatch({ type: 'ADD_SNACKBAR', payload: { current: snack } });
    },
    [dispatch]
  );
};
