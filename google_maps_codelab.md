# Getting Started with the Google Maps Platform for React

Welcome to this codelab on using the `vis.gl/react-google-map` library for Google Maps Platform.

## Prerequisites
- Basic knowledge of JavaScript, HTML, and CSS

## What you learn
- How to get started with the `vis.gl/react-google-map` library for Google Maps Platform.
- How to load the Maps JavaScript API declaratively.
- How to load a map in a React app.
- How to use markers, custom markers, and marker clustering.
- How to work with the Maps JavaScript API event system to provide user interaction.
- How to control the map dynamically.
- How to draw on the map.

## What you need
- A Google Cloud Account with billing enabled.
- A Google Maps Platform API key with the Maps JavaScript API enabled.
- Node.js installed on your computer.
- A text editor or IDE of your choice.
- The `vis.gl/react-google-map` library for the Google Maps JavaScript API.
- The `googlemaps/markerclusterer` library.

---

## 1. Set up Google Maps Platform
If you do not already have a Google Cloud Platform account and a project with billing enabled, please see the [Getting Started with Google Maps Platform guide](https://developers.google.com/maps/gmp-get-started) to create a billing account and a project.

1.  In the Cloud Console, click the project drop-down menu and select the project that you want to use for this codelab.
2.  Enable the **Google Maps Platform APIs and SDKs** required for this codelab in the Google Cloud Marketplace.
3.  Generate an **API key** in the Credentials page of Cloud Console. All requests to Google Maps Platform require an API key.

## 2. Get set up
### Download the starter project
To download the starter project template and solution code, follow these steps:

1.  Download or fork the [GitHub repository](https://github.com/googlemaps-samples/codelab-maps-platform-101-react-js.git).
2.  Clone the repository:
    ```bash
    git clone https://github.com/googlemaps-samples/codelab-maps-platform-101-react-js.git
    ```
3.  Navigate to the `/starter` directory and install dependencies:
    ```bash
    cd starter && npm install
    ```
4.  Run the development server:
    ```bash
    npm start
    ```
The starter project uses Vite. Once running, you should see "Hello, world!" in your browser.

## 3. Load the Maps JavaScript API
The foundation of using Google Maps Platform for the web is the Maps JavaScript API. To load it with React, use the `APIProvider` component from the `vis.gl/react-google-map` library.

1.  Open `/src/app.tsx`.
2.  Import the `APIProvider`:
    ```tsx
    import {APIProvider} from '@vis.gl/react-google-maps';
    ```
3.  In the `App` function, wrap your content with `APIProvider`:
    ```tsx
    const App = () => (
     <APIProvider apiKey={'Your API key here'} onLoad={() => console.log('Maps API has loaded.')}>
       <h1>Hello, world!</h1>
     </APIProvider>
    );
    ```

## 4. Display a map
The `Map` component wraps the `google.maps.Map` class.

1.  Import `Map` and `MapCameraChangedEvent`:
    ```tsx
    import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';
    ```
2.  Add the `Map` component inside `APIProvider`:
    ```tsx
    <Map
      defaultZoom={13}
      defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
      onCameraChanged={(ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }>
    </Map>
    ```

## 5. Add cloud-based map styling
A **Map ID** is required for Advanced Markers and Cloud-based styling.

1.  Create a Map ID in the Google Cloud Console.
2.  Associate it with a style.
3.  Set the `mapId` property on the `<Map>` component:
    ```tsx
    <Map
      defaultZoom={13}
      defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
      mapId='DEMO_MAP_ID'
      onCameraChanged={(ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }>
    </Map>
    ```

## 6. Add markers to the map
Use `AdvancedMarker` for modern markers.

1.  Define a list of POIs:
    ```tsx
    type Poi = { key: string, location: google.maps.LatLngLiteral }
    const locations: Poi[] = [
      {key: 'operaHouse', location: { lat: -33.8567844, lng: 151.213108  }},
      // ... add more locations
    ];
    ```
2.  Create a `PoiMarkers` component:
    ```tsx
    const PoiMarkers = (props: {pois: Poi[]}) => {
      return (
        <>
          {props.pois.map((poi: Poi) => (
            <AdvancedMarker key={poi.key} position={poi.location}>
              <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
            </AdvancedMarker>
          ))}
        </>
      );
    };
    ```
3.  Add `PoiMarkers` as a child of `Map`.

## 7. Enable marker clustering
Use the `MarkerClusterer` utility to group nearby markers.

1.  Import the library:
    ```tsx
    import {MarkerClusterer} from '@googlemaps/markerclusterer';
    import type {Marker} from '@googlemaps/markerclusterer';
    ```
2.  Implement clustering logic in `PoiMarkers` using `useEffect` and `useMap()`.
    ```tsx
    const PoiMarkers = (props: { pois: Poi[] }) => {
      const map = useMap();
      const [markers, setMarkers] = useState<{[key: string]: Marker}>({});
      const clusterer = useRef<MarkerClusterer | null>(null);

      useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
          clusterer.current = new MarkerClusterer({map});
        }
      }, [map]);

      useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers));
      }, [markers]);

      // ... setMarkerRef logic
    };
    ```

## 8. Add user interaction
Add click listeners to markers to pan the map.

1.  Use `useCallback` for the click handler:
    ```tsx
    const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
      if(!map) return;
      if(!ev.latLng) return;
      map.panTo(ev.latLng);
    });
    ```
2.  Pass `onClick={handleClick}` to `AdvancedMarker`.

## 9. Draw on the map
Use the `Circle` component to show a radius around clicked markers.

1.  Import `Circle` from your components.
2.  Manage the circle center state:
    ```tsx
    const [circleCenter, setCircleCenter] = useState(null);
    ```
3.  Render the `<Circle>` inside `PoiMarkers`.

## 10. Congratulations
You've built a React app with:
- `APIProvider` for loading the Maps API.
- `Map` for displaying the map.
- `AdvancedMarker` and `Pin` for custom markers.
- `MarkerClusterer` for grouping markers.
- Event handling and dynamic drawing.

### Learn more
- [vis.gl/react-google-map documentation](https://visgl.github.io/react-google-maps/)
- [Maps JavaScript API documentation](https://developers.google.com/maps/documentation/javascript/overview)
