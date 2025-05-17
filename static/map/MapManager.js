class MapManager {
    constructor(mapId = 'map') {
        this.map = null;
        this.placemarks = [];
        this.selectedPlacemark = null;
        
        ymaps.ready(() => {
            this.initMap(mapId);
            this.addInitialPoints();
            this.setupHoverEvents();
            this.setupClickEvents();
        });
    }

    initMap(mapId) {
        this.map = new ymaps.Map(mapId, {
            center: [56.838011, 60.597465],
            zoom: 13,
            controls: ['zoomControl']
        });
    }

    addInitialPoints() {
        const landmarks = [
            {
                id: 1,
                coords: [56.8380, 60.5973],
                title: "Площадь 1905 года",
                description: "Центральная площадь города",
                imageUrl: "/static/frontend/images/landmark2.jpg"
            },
            {
                id: 2,
                coords: [56.8377, 60.6037],
                title: "Плотина Городского пруда",
                description: "Историческая плотина на реке Исеть",
                imageUrl: "/static/frontend/images/widget.png"
            },
            {
                id: 3,
                coords: [56.8444, 60.6088],
                title: "Храм на крови",
                description: "Место, где был убит последний российский император Николай II и его семья",
                imageUrl: "/static/frontend/images/landmark1.jpeg"
            },
        ];

        landmarks.forEach(landmark => {
            const placemark = new ymaps.Placemark(landmark.coords, {}, {
                preset: 'islands#circleIcon',
                iconColor: '#ff0000',
                iconCaptionMaxWidth: '200'
            });
            
            placemark.properties.set({
                id: landmark.id,
                title: landmark.title,
                description: landmark.description,
                imageUrl: landmark.imageUrl
            });
            
            this.map.geoObjects.add(placemark);
            this.placemarks.push(placemark);
        });
    }

    setupHoverEvents() {
    this.placemarks.forEach(placemark => {
        placemark.events.add('mouseenter', () => {
            if (this.selectedPlacemark !== placemark) {
                placemark.options.set('preset', 'islands#circleDotIcon');
                placemark.options.set('iconColor', '#00ff00');
            }
            
            this.sendMarkerData('markerHover', placemark);
        });

        placemark.events.add('mouseleave', () => {
            if (this.selectedPlacemark !== placemark) {
                placemark.options.set('preset', 'islands#circleIcon');
                placemark.options.set('iconColor', '#ff0000');
            }
            
            window.parent.postMessage({
                type: 'markerLeave'
            }, '*');
        });
    });}

    setupClickEvents() {
        this.placemarks.forEach(placemark => {
            placemark.events.add('click', () => {
                if (this.selectedPlacemark) {
                    this.selectedPlacemark.options.set('preset', 'islands#circleIcon');
                    this.selectedPlacemark.options.set('iconColor', '#ff0000');
                }
                
                this.selectedPlacemark = placemark;
                placemark.options.set('preset', 'islands#circleDotIcon');
                placemark.options.set('iconColor', '#0000ff');
                
                window.parent.postMessage({
                    type: 'markerSelect',
                    data: placemark.properties.getAll()
                }, '*');
            });
        });
    }
}