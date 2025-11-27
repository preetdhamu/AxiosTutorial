import { Provider } from 'react-redux';
import { persistor, store } from './shared/store/store';
import App from './features/App';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthViewModelProvider } from './features/auth/context/AuthViewModelProvider';
import { SnackbarProvider } from './shared/context/SnackbarContext';
import { getDeviceLang, initI18N } from './shared/i18n/i18n';
export default function Root() {
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        onBeforeLift={() => {
          const lang = store.getState().lang.selectedAppLanguage;
          console.log('Language  is : ', lang);

          initI18N(lang ?? getDeviceLang());
        }}
      >
        <SnackbarProvider>
          <AuthViewModelProvider>
            <App />
          </AuthViewModelProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}
