import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';

export default function Root() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
