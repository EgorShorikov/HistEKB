export class MapManager {
    constructor(mapId = 'map') {
        this.map = null;
        this.placemarks = [];
        this.mapReady = new Promise((resolve) => {
            this.resolveMapReady = resolve;
        });
        
        ymaps.ready(() => {
            this.initMap(mapId);
            this.addTestPoint();
            this.resolveMapReady(); 
        });
    }

    initMap(mapId) {
        this.map = new ymaps.Map(mapId, {
            center: [55.751574, 37.573856],
            zoom: 10
        });
    }

    addTestPoint() {
        const placemark = new ymaps.Placemark(
            [55.751574, 37.573856],
            {
                balloonContentHeader: "Тестовая метка",
                balloonContentBody: "Если вы это видите, всё работает!Если вы это видите, всё работает!Если вы это видите, всё работает!Если вы это видите, всё работает!Если вы это видите, всё работает!Если вы это видите, всё работает!Если вы это видите, всё работает!Если вы это видите, всё работает!Если вы это видите, всё работает!Если вы это видите, всё работает!Если вы это видите, всё работает!",
                hintContent: "Тестовая метка"
            },
            { preset: 'islands#redIcon' }
        );
    
        this.map.geoObjects.add(placemark);
        this.placemarks.push({ coords: [55.751574, 37.573856], placemark });
    
        // Открытие балуна
        placemark.balloon.open();
    }

    async addPoint(coords, title, description, options = {}) {
        await this.mapReady; 

        const defaultOptions = {
            preset: 'islands#blueDotIcon',
            balloonCloseButton: true,
            hideIconOnBalloonOpen: false
        };
        
        const finalOptions = {...defaultOptions, ...options};
        const placemark = new ymaps.Placemark(coords, {
            balloonContentHeader: title,
            balloonContentBody: description,
            hintContent: title
        }, finalOptions);

        this.map.geoObjects.add(placemark);
        this.placemarks.push({ coords, title, description, placemark });
        return placemark;
    }

    clearAllPoints() {
        this.map.geoObjects.removeAll();
        this.placemarks = [];
    }

    removePoint(index) {
        if (index >= 0 && index < this.placemarks.length) {
            this.map.geoObjects.remove(this.placemarks[index].placemark);
            this.placemarks.splice(index, 1);
        }
    }
}