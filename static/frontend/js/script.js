let selectedMarker = null;
let hoveredMarker = null;

window.addEventListener('message', (event) => {
    const widget = document.querySelector('.widget-rectangle');
    const descriptionElement = document.getElementById('map-description');
    const actionButton = document.querySelector('.map-action-button');
    
    if (!event.data || !event.data.type) return;
    
    switch(event.data.type) {
        case 'markerHover':
            if (event.data.data) {
                hoveredMarker = event.data.data;
                updateWidgetContent(descriptionElement, widget, hoveredMarker);
                widget.classList.add('hover');
            }
            break;
            
        case 'markerSelect':
            if (event.data.data) {
                selectedMarker = event.data.data;
                updateWidgetContent(descriptionElement, widget, selectedMarker);
                widget.classList.add('selected');
                actionButton.disabled = false;
            }
            break;
            
        case 'markerLeave':
            hoveredMarker = null;
            if (selectedMarker) {
                updateWidgetContent(descriptionElement, widget, selectedMarker);
                widget.classList.remove('hover');
                widget.classList.add('selected');
            } else {
                resetWidget(descriptionElement, widget);
            }
            break;
    }
});

function updateWidgetContent(element, widget, data) {
    element.innerHTML = `
        <h3>${data.title || 'Название'}</h3>
        <p>${data.description || 'Описание'}</p>
    `;
    if (data.imageUrl) {
        widget.style.backgroundImage = `url(${data.imageUrl})`;
    }
}

function resetWidget(element, widget) {
    element.textContent = 'Выберите точку на карте';
    widget.style.backgroundImage = 'url(/static/frontend/images/widget.png)';
    widget.classList.remove('hover', 'selected');
}

document.querySelector('.map-action-button').addEventListener('click', () => {
    if (selectedMarker) {
        alert(`Начинаем маршрут к: ${selectedMarker.title}\nКоординаты: ${selectedMarker.coords}`);
        
    }
});

document.getElementById('scrollButton').addEventListener('click', (e) => {
    e.preventDefault(); 
    const mapSection = document.querySelector('.map-title-rectangle');
    if (mapSection) {
        mapSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start' 
        });
    }
});