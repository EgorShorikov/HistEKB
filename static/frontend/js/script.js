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

document.addEventListener('DOMContentLoaded', () => {
    const profileInfo = document.getElementById('profileInfo');

    if (!profileInfo) {
        console.warn("❌ #profileInfo не найден");
        return;
    }

    const token = localStorage.getItem('auth_token');
    const username = localStorage.getItem('username');

    if (token && username) {
        profileInfo.innerHTML = `
            <span>${username}</span>
            <a href="/logout" style="margin-left: 15px;">Выйти</a>
        `;
    } else {
        profileInfo.innerHTML = `
            <a href="/login">Войти</a>
            <a href="/register" style="margin-left: 15px;">Регистрация</a>
        `;
    }
});

const modal = document.getElementById('modal');
const openModalBtn = document.querySelector('.map-action-button');
const closeModalBtn = document.getElementById('closeModal');

openModalBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!modal) return;

    modal.style.display = 'block';
});

closeModalBtn?.addEventListener('click', () => {
    if (!modal) return;

    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const modalTitle = modal?.querySelector('.modal-content h2') || null;
const modalFullText = modal?.querySelector('.modal-full-text') || null;
const modalImage = modal?.querySelector('.modal-image-frame') || null;
const modalSwitch = modal?.querySelector('#modalSwitch') || null;

let isFamilyView = false;

if (modalSwitch && modalTitle && modalFullText && modalImage) {
    modalSwitch.addEventListener('click', () => {
        if (!isFamilyView) {
            modalTitle.textContent = "Императорская семья";
            modalFullText.innerHTML = `
                <h3>Алексей</h3>
                <p>
Родился 12 августа 1904 года в Петергофе. Был центром тесно сплоченной Царской семьи. «Это был луч солнца, освещавший и вещи и окружающих». Жизнерадостный, вдумчивый, с мягким и добрым сердцем. Любил простых людей. Говорил: «Я хочу, чтобы все были счастливы». 
                </p>
                
            `;
            modalImage.style.backgroundImage = "url(/static/frontend/images/family.png)";
            modalSwitch.textContent = "<< Назад >>";

        } else {
            modalTitle.textContent = "Храм на Крови";
            modalFullText.innerHTML = `
                <h3>Николай II</h3>
                <p>
                    Николай II — последний император России из династии Романовых, правил с 1894 по 1917 год.
                    Родился в 1868 году. Его правление ознаменовалось значительными внутренними и внешними кризисами:
                    революцией 1905 года, участием России в Первой мировой войне, экономическими трудностями и ростом недовольства в обществе.
                </p>
                <p>
                    В 1917 году он был вынужден отречься от престола в результате Февральской революции.
                    После этого вместе с семьёй был арестован и в 1918 году расстрелян большевиками.
                    Николай II считается символом конца Российской империи и трагической эпохи в истории страны.
                </p>
            `;
            modalImage.style.backgroundImage = "url(/static/frontend/images/place-hram.png)";
            modalSwitch.textContent = "<< Посмотреть о семье >>";
        }

        isFamilyView = !isFamilyView;
    });
} else {
    console.warn("⚠️ Элементы модального окна не загружены");
}