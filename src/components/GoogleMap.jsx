import { formatPrice } from "@/constants";
import { useRef, useEffect } from "react";

const GoogleMap = ({ center, properties = [], height = 500 }) => {
  const mapRef = useRef(null);
  const urlSite = location.origin;
  const propertiesMarkers = useRef([]);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_API_KEY || ""
        }&libraries=maps,marker,places`;
        script.async = true;
        script.onload = initMap;
        document.body.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = async () => {
      const { Map } = await google.maps.importLibrary("maps");
      const { PlacesService } = await google.maps.importLibrary("places");
      const { AdvancedMarkerElement } = await google.maps.importLibrary(
        "marker"
      );

      if (mapRef.current) {
        const service = new PlacesService(document.createElement("div"));
        const request = {
          placeId: center.place_id,
          fields: ["geometry"], // Agrega más campos según tus necesidades
        };

        const place = await new Promise((resolve, reject) => {
          service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              resolve(place);
            } else {
              reject(`Error obteniendo el lugar: ${status}`);
            }
          });
        });

        const centerLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        const map = new Map(mapRef.current, {
          zoom: center.zoom,
          center: { ...centerLocation },
          mapId: "4504f8b37365c3d0",
        });

        // Si viene de la pagina interna de la propiedad
        if (center.type) {
          new AdvancedMarkerElement({
            map,
            content: buildContentCenter(center),
            position: {
              ...centerLocation,
            },
          });
        }

        // Si hay propiedades, agregar marcadores
        properties.forEach((property) => {
          const service = new PlacesService(document.createElement("div"));
          const request = {
            placeId: property.place_id,
            fields: ["geometry"], // Agrega más campos según tus necesidades
          };

          service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              const position = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              };

              const AdvancedMarker = new AdvancedMarkerElement({
                map,
                content: buildContent(property),
                position,
              });

              let lastClickTime = 0;
              AdvancedMarker.addListener("click", () => {
                const now = Date.now();
                if (now - lastClickTime < 300) return; // Evita la doble ejecución en menos de 300ms
                lastClickTime = now;
                toggleHighlight(map, AdvancedMarker, position, property);
              });
            }
          });
        });
      }
    };

    const toggleHighlight = (map, marker, position, property) => {
      if (marker.content.classList.contains("open")) {
        console.log("Eliminar el marcador", property.id);

        // Si el marcador ya estaba abierto, cerrarlo
        propertiesMarkers.current = propertiesMarkers.current.filter(
          (id) => id !== property.id
        );

        marker.content.classList.remove("open");
        marker.zIndex = null;
      } else {
        marker.content.classList.add("open");
        marker.zIndex = 1;

        // Si el marcador esta cerrado, abrirlo
        propertiesMarkers.current.push(property.id);

        // Mover el mapa al marcador
        map.panTo(position);
      }
    };

    const buildContent = (property) => {
      let image = property.images[0] || property.images.img_1;
      const urlProperty = `${urlSite}/properties/${property.id}`;

      //Validar si la imagen no se a subido a Supabase
      if (image.file) image = URL.createObjectURL(image.file);

      const content = document.createElement("div");
      content.classList.add("property");
      content.innerHTML = `
        <div class="container">
          <div class="icon">
            <i aria-hidden="true" class="fa fa-icon fa-home type-${
              property.types
            }" title="${property.types}"></i>
            <span class="fa-sr-only">${property.types}</span>    
          </div>    
          <div class="details">
            <img src="${image}" alt="${property.type}"/>
            <div class="content">
              <div class="price">$ ${formatPrice(property.price)}</div>
              <div class="address">${property.address}</div>
              <div class="features">
                <div>
                  <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
                  <span>${property.bed}</span>
                </div>
                <div>
                  <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
                  <span>${property.bath}</span>
                </div>
                <div>
                  <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
                  <span>${property.size} ft²</span>
                </div>              
              </div>
              <button type="button" class="btn-redirect">
                See property
              </button>
            </div>
          </div>
        </div>     
      `;

      const btnRedirect = content.querySelector(".btn-redirect");
      const container = content.querySelector(".container");

      container.addEventListener("click", () => {
        //console.log(propertiesMarkers.current);
        if (propertiesMarkers.current.includes(property.id)) {
          window.open(urlProperty, "_blank");
        }
      });

      btnRedirect.addEventListener("click", (event) => {
        event.stopPropagation();
        window.open(urlProperty, "_blank");
      });

      btnRedirect.addEventListener("touchstart", (event) => {
        event.stopPropagation();
        window.open(urlProperty, "_blank");
      });

      return content;
    };

    function buildContentCenter(data) {
      const content = document.createElement("div");

      content.classList.add("property");
      content.innerHTML = `
          <div class="icon">  
              <i aria-hidden="true" class="fa fa-icon fa-home type-${data.type}" title="${data.type}"></i>
              <span class="fa-sr-only">${data.type}</span>                                    
          </div>                              
      `;

      return content;
    }

    loadGoogleMaps();
  }, [center, properties]);

  return (
    <>
      <style>
        {`                       
          .property .container{      
            display: flex;
            align-items: center;
            color: #263238;
            gap: 15px;
            justify-content: center;
            padding: 4px; 
            z-index: 3;   
          } 
            
          /* .property:hover{      
            background-color: #efca8f;  
          }  */
            
          .property .icon {
            align-items: center;
            background-color: #FFFFFF;
            border-radius: 50%;
            color: #FFFFFF;
            display: flex;
            font-size: 14px;
            gap: 15px;
            height: 30px;
            justify-content: center;
            padding: 4px;
            position: relative;
            transition: all 0.3s ease-out;
            width: 30px;
            z-index: 10;
          }

          .property .icon::after {
            display: flex;
            border-left: 9px solid transparent;
            border-right: 9px solid transparent;
            border-top: 9px solid #FFFFFF;
            content: "";
            height: 0;
            left: 50%;
            position: absolute;
            top: 90%;
            transform: translate(-50%, 0);
            transition: all 0.3s ease-out;
            width: 0;
            z-index: 10;                        
          }                       

          /* Details */

          .property .details {
            display: none;
            padding: 10px;
            border-radius: 10px;
            background-color: #FFFFFF; 
            gap: 10px;
            align-items: center;            
          }

          .property .details img {
            width: 120px;
            height: 120px;
            border-radius: 10px;
          }

          .property .details .content {
            max-width: 180px;                       
            display: flex;
            flex-direction: column;
            height: auto;
            z-index: 2;
          }

          .property .price {
            font-size: 15px;
            font-weight: bold;
          }

          .property .address {
            color: #9E9E9E;
            font-size: 13px;
            margin-bottom: 10px;
            margin-top: 5px;
          }

          .property .features {
            align-items: flex-end;
            display: flex;
            flex-direction: row;
            gap: 10px;
            margin-bottom: 10px;
            font-weight: bold;

          }

          .property .features > div {
            align-items: center;
            background: #F5F5F5;
            border-radius: 5px;
            border: 1px solid #ccc;
            display: flex;
            font-size: 10px;
            gap: 5px;
            padding: 5px;
          } 

          .property .bed {
            color: #FFA000;
          }

          .property .bath {
            color: #03A9F4;
          }

          .property .size {
            color: #388E3C;
          }

          .property .btn-redirect {
            color: #FFFFFF;
            background: #ea6020;
            border-radius: 5px;
            border: 1px solid #ea6020;
            font-size: 10px;
            padding: 5px;
            text-align: center;
            z-index: 2;
          }

          .property .btn-redirect:hover {
            color: #ea6020;
            background: #fff;
            border-radius: 5px;
            border: 1px solid #ea6020;            
          }

          /* houses-for-sales */
          .property .icon:has(.type-houses-for-sales) {
            background-color: var(--blue-color);
          }

          .property .icon:has(.type-houses-for-sales)::after {
            border-top: 9px solid var(--blue-color);
          }

          /* pending-houses */
          .property .icon:has(.type-pending-houses) {
            background-color: var(--yellow-color);
          }

          .property .icon:has(.type-pending-houses)::after {
            border-top: 9px solid var(--yellow-color);
          }

          /* sold-houses */
          .property .icon:has(.type-sold-houses) {
            background-color: var(--red-color);
          }

          .property .icon:has(.type-sold-houses)::after {
            border-top: 9px solid var(--red-color);
          }

          /* open-houses */
          .property .icon:has(.type-open-houses) {
            background-color: var(--green-color);
          }

          .property .icon:has(.type-open-houses)::after {
            border-top: 9px solid var(--green-color);
          }

          /* Open */
          .property.open .icon {
            display: none;
          }

          .property.open .details {
            display: flex;
          }


          /* Media Queries */
          @media screen and (max-width: 400px) {
            .property .details img {
              width: 90px;
              height: 90px;
              border-radius: 10px;
            }
          }

        `}
      </style>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: `${height}px`,
        }}
        className="rounded-lg"
      />
    </>
  );
};

export default GoogleMap;
