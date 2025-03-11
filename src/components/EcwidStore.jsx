import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
const EcwidStore = () => {
  const { profile } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  // Pagina segun el tipo de empresa
  const pages = {
    1: "691004197", //Local moving
    2: "706226854", //Realtors
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await profile();
      setUserInfo(res);
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (userInfo) {
      // Agregar el script de Ecwid dinámicamente
      const script = document.createElement("script");
      script.src =
        "https://app.shopsettings.com/script.js?95308313&data_platform=code&data_date=2025-03-07";
      script.async = true;
      script.dataset.cfasync = "true";
      document.body.appendChild(script);

      // Esperar a que el script se cargue e inicializar la tienda
      script.onload = () => {
        if (window.xProductBrowser) {
          window.xProductBrowser(
            "categoriesPerRow=3",
            "views=grid(20,3) list(60) table(60)",
            "categoryView=grid",
            "searchView=list",
            "id=my-store-95308313"
          );
        }

        // Agregar la función de Ecwid.OnAPILoaded
        if (window.Ecwid) {
          window.Ecwid.OnAPILoaded.add(function () {
            window.Ecwid.openPage("product", {
              id: pages[userInfo.company.business_type_id],
            });

            // Agregar email de la empresa al campo del carrito
            window.Ecwid.OnPageLoaded.add(async function (page) {
              if (page.type === "CART") {
                /* const inputEmail = document.getElementById(
                  "ec-cart-email-input"
                );
                inputEmail.style.display = "none"; */
                window.Ecwid.Cart.setCustomerEmail(userInfo.email);
                window.Ecwid && window.Ecwid.refreshConfig();
              }
            });
          });
        }
      };

      // Limpieza al desmontar el componente
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [userInfo]);

  return <div id="my-store-95308313"></div>;
};

export default EcwidStore;
