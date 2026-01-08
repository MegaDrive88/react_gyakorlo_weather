import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App/App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import { UnitContextProvider } from './context.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UnitContextProvider>
      <App />
    </UnitContextProvider>
  </StrictMode>,
)
