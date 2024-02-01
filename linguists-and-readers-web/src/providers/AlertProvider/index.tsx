import { ReactNode, useCallback, useMemo, useState } from 'react';
import { AlertContext } from './context.ts';
import { Alert, Snackbar } from '@mui/material';
import { DEFAULT_ALERT_DURATION } from '../../utils/defines.ts';

const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertDuration, setAlertDuration] = useState<number>(DEFAULT_ALERT_DURATION);

  const showAlert = useCallback(
    (type: 'success' | 'error' | 'info' | 'warning', message: string, duration?: number) => {
      setAlertType(type);
      setAlertMessage(message);
      setAlertDuration(duration || DEFAULT_ALERT_DURATION);
      setAlert(true);
    },
    [],
  );

  const value = useMemo(() => ({ showAlert }), [showAlert]);

  return (
    <AlertContext.Provider value={value}>
      <>
        {children}
        <Snackbar
          open={alert}
          autoHideDuration={alertDuration}
          onClose={() => setAlert(false)}
          ClickAwayListenerProps={{ onClickAway: () => null }}>
          <Alert
            onClose={() => setAlert(false)}
            severity={alertType}
            sx={{ '& .MuiAlert-message': { textAlign: 'center', marginTop: 0.5 } }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </>
    </AlertContext.Provider>
  );
};

export default AlertProvider;
