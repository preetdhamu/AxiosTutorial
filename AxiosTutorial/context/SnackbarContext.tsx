import React, { createContext, useCallback, useContext, useState } from 'react';
import colors from '../constants/color';
import CommonErrorDialog from '../shared/components/CommonErrorDialog';

interface SnackbarContextType {
  showError: (msg: string, color?: string, duration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  showError: () => {},
});

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(2000);
  const [color, setColor] = useState(colors.snackbarLightColor);

  const showError = useCallback(
    (msg: string, color1 = colors.snackbarLightColor, durationMs = 2000) => {
      setMessage(msg);
      setDuration(durationMs);
      setVisible(true);
      setColor(color1);
    },
    [],
  );

  const handleClose = () => setVisible(false);

  return (
    <SnackbarContext.Provider value={{ showError }}>
      {children}
      <CommonErrorDialog
        visible={visible}
        message={message}
        color={color}
        duration={duration}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
