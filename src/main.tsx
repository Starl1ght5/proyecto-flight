import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ContextComponent from './Context/ContextComponent.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextComponent>
      <App />
    </ContextComponent>
  </StrictMode>,
)
