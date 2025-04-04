import { useEffect, useRef } from "react";

const GoogleMap = ({ center, properties }) => {
  const mapRef = useRef(null);
  const urlSite = location.origin;

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBG-QcC_qbtjs_tuLJuGU8jpqwXNG3dSS0&libraries=maps,marker,places`;
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

        properties.forEach((property) => {
          console.log(property);

          const service = new PlacesService(document.createElement("div"));
          const request = {
            placeId: property.place_id,
            fields: ["geometry"], // Agrega más campos según tus necesidades
          };

          service.getDetails(request, (place, status) => {
            const AdvancedMarker = new AdvancedMarkerElement({
              map,
              content: buildContent(property),
              position: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              },
            });

            /* AdvancedMarker.addListener("click", () => {
              toggleHighlight(AdvancedMarker, property);
            }); */
            let lastClickTime = 0;
            AdvancedMarker.addListener("click", () => {
              const now = Date.now();
              if (now - lastClickTime < 300) return; // Evita la doble ejecución en menos de 300ms
              lastClickTime = now;
              toggleHighlight(AdvancedMarker, property);
            });
          });
        });
      }
    };

    const toggleHighlight = (marker) => {
      if (marker.content.classList.contains("highlight")) {
        marker.content.classList.remove("highlight");
        marker.zIndex = null;
      } else {
        marker.content.classList.add("highlight");
        marker.zIndex = 1;
      }
    };

    const buildContent = (property) => {
      const content = document.createElement("div");
      content.classList.add("property");
      content.innerHTML = `
        <div class="icon">
            <i aria-hidden="true" class="fa fa-icon fa-home type-${property.types}" title="${property.types}"></i>
            <span class="fa-sr-only">${property.types}</span>
            <img src="${property.images.img_1}" alt="${property.type}"/>
        </div>
        <div class="details">
            <div class="price">${property.price}</div>
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
            <button type="button" class="btn-redirect" data-url="${urlSite}/properties/${property.id}">
                See property
            </button>
        </div>
      `;
      // Evitar la propagación del evento click en el enlace
      content
        .querySelector(".btn-redirect")
        .addEventListener("click", (event) => {
          event.stopPropagation();

          const url = event.target.getAttribute("data-url");
          if (url) {
            window.open(url, "_blank");
          }
        });

      return content;
    };

    loadGoogleMaps();
  }, [center, properties]);

  return (
    <>
      <style>
        {`          
          .property {
            align-items: center;
            background-color: #FFFFFF;
            border-radius: 50%;
            color: #263238;
            display: flex;
            font-size: 14px;
            gap: 15px;
            height: 30px;
            justify-content: center;
            padding: 4px;
            position: relative;
            transition: all 0.3s ease-out;
            width: 30px;
          }

          .property::after {
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
            z-index: 1;
          }

          .property .icon img {
            display: none;
          }

          .property .icon {
            align-items: center;
            display: flex;
            justify-content: center;
            color: #FFFFFF;
          }

          .property .icon svg {
            height: 18px;
            width: auto;
          }

          .property .details {
            display: none;
            flex-direction: column;
            flex: 1;
            max-width: 200px;
            height: auto;
            justify-content: space-between;
            z-index: 2;
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

          .property .btn-redirect {
            position: relative;
            color: #ea6020;
            background: #F5F5F5;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 10px;
            padding: 5px;
            text-align: center;
          }

          .property.highlight {
            background-color: #FFFFFF;
            border-radius: 8px;
            box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
            height: auto;
            padding: 8px 15px;
            width: auto;
          }

          .property.highlight::after {
            border-top: 9px solid #FFFFFF;
          }

          .property.highlight .details {
            display: flex;
          }

          .property.highlight .icon svg {
            display: none;
          }

          .property.highlight .icon {
            width: 100px;
            height: 100px;
          }

          .property.highlight .icon img {
            display: flex;
            width: 90%;
            height: 90%;
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

          .property.highlight:has(.type-houses-for-sales) .icon {
            color: var(--blue-color);
          }

          .property:not(.highlight):has(.type-houses-for-sales) {
            background-color: var(--blue-color);
          }

          .property:not(.highlight):has(.type-houses-for-sales)::after {
            border-top: 9px solid var(--blue-color);
          }

          .property.highlight:has(.type-pending-houses) .icon {
            color: var(--yellow-color);
          }

          .property:not(.highlight):has(.type-pending-houses) {
            background-color: var(--yellow-color);
          }

          .property:not(.highlight):has(.type-pending-houses)::after {
            border-top: 9px solid var(--yellow-color);
          }

          .property.highlight:has(.type-sold-houses) .icon {
            color: var(--red-color);
          }

          .property:not(.highlight):has(.type-sold-houses) {
            background-color: var(--red-color);
          }

          .property:not(.highlight):has(.type-sold-houses)::after {
            border-top: 9px solid var(--red-color);
          }

          .property.highlight:has(.type-open-houses) .icon {
            color: var(--green-color);
          }

          .property:not(.highlight):has(.type-open-houses) {
            background-color: var(--green-color);
          }

          .property:not(.highlight):has(.type-open-houses)::after {
            border-top: 9px solid var(--green-color);
          }
        `}
      </style>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "500px",
        }}
        className="rounded-lg"
      />
    </>
  );
};

export default GoogleMap;
