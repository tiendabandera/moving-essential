import { useEffect } from 'react';

const useScrollToHash = (location) => {    
  useEffect(() => {

    if (!location.hash) return

    const elementId = location.hash.replace('#', '');

    // Función para verificar si el elemento está en el DOM
    const scrollToElement = () => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Opcional: Remover el hash después de hacer scroll
        setTimeout(() => {
          const newUrl = window.location.href.split('#')[0];
          window.history.replaceState(null, '', newUrl);
        }, 2000);

        return true; // Indica que el elemento se encontró
      }
      return false;
    };

    // Intentar encontrar el elemento de inmediato
    if (scrollToElement()) return;

    // Crear el `MutationObserver`
    const observer = new MutationObserver(() => {
      if (scrollToElement()) observer.disconnect(); // Dejar de observar cuando se encuentre el elemento
    });

    // Observar el `body` para detectar cualquier cambio en el DOM
    observer.observe(document.body, { childList: true, subtree: true });

    // Limpiar el observer cuando se desmonte el componente
    return () => observer.disconnect();
    
  }, [location]);
};

export default useScrollToHash;