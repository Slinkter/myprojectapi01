

import { useState, useEffect } from "react";


export const useMsw = () => {
  

  const isDev = import.meta.env.MODE === "development";
  
  

  

  const [isReady, setIsReady] = useState(!isDev);

  useEffect(() => {
    if (isDev) {
      

      

      

      const initMocks = async () => {
        try {
          

          const { worker } = await import("@/shared/mocks/browser");

          

          

          await worker.start({
            

            onUnhandledRequest: "bypass",
            serviceWorker: {
              

              url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
            },
          });
          
          

          setIsReady(true);
        } catch (error) {
          console.error("[MSW] Falló al intentar encender los mocks:", error);
          

          

          

          setIsReady(true);
        }
      };
      
      

      initMocks();
    }
  }, [isDev]); 


  return isReady;
};
