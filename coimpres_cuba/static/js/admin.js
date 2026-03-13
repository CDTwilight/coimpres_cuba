// Admin Panel JavaScript - Gestión de Productos

// Variables globales para contadores
let galleryImageCounter = 1;
let galleryVideoCounter = 1;

// Funciones principales
function showTab(tabName) {
    // Ocultar todas las pestañas
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Desactivar todos los botones
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    
    // Mostrar la pestaña seleccionada
    document.getElementById(tabName).classList.add('active');
    
    // Activar el botón correspondiente
    event.target.classList.add('active');
}

// Función para agregar nueva imagen a la galería
function addGalleryImage() {
    galleryImageCounter++;
    const container = document.getElementById('gallery-images-container');
    const newItem = document.createElement('div');
    const uniqueId = `gallery_image_${galleryImageCounter}_${Date.now()}`;
    newItem.className = 'gallery-item';
    newItem.innerHTML = `
        <button type="button" class="remove-item-btn" onclick="removeGalleryItem(this)" title="Eliminar imagen">
            ×
        </button>
        <div class="form-grid gallery-grid">
            <div class="form-group">
                <label>Imagen</label>
                <div class="file-input-wrapper">
                    <input type="file" id="${uniqueId}" name="gallery_images[]" class="file-input gallery-image-input" accept="image/*">
                    <label for="${uniqueId}" class="file-input-label">
                        🖼️ Seleccionar Imagen
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label>Texto Alternativo</label>
                <input type="text" name="gallery_alt_texts[]" class="form-control" placeholder="Descripción de la imagen">
            </div>
            <div class="form-group">
                <label>Orden</label>
                <input type="number" name="gallery_orders[]" class="form-control" value="${galleryImageCounter}" min="1">
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" name="gallery_is_main[]" value="1"> 
                    Imagen Principal
                </label>
            </div>
        </div>
    `;
    container.appendChild(newItem);
    
    // Agregar event listener al nuevo input de archivo
    const newFileInput = newItem.querySelector('.file-input');
    newFileInput.addEventListener('change', handleFileInputChange);
    
    // Guardar el texto original del label
    const newLabel = newItem.querySelector('.file-input-label');
    newLabel.setAttribute('data-original-text', newLabel.textContent);
}

// Función para agregar nuevo video a la galería
function addGalleryVideo() {
    galleryVideoCounter++;
    const container = document.getElementById('gallery-videos-container');
    const newItem = document.createElement('div');
    const uniqueId = `gallery_video_${galleryVideoCounter}_${Date.now()}`;
    newItem.className = 'video-item';
    newItem.innerHTML = `
        <button type="button" class="remove-item-btn" onclick="removeGalleryItem(this)" title="Eliminar video">
            ×
        </button>
        <div class="form-grid video-grid">
            <div class="form-group">
                <label>Video</label>
                <div class="file-input-wrapper">
                    <input type="file" id="${uniqueId}" name="gallery_videos[]" class="file-input gallery-video-input" accept="video/*">
                    <label for="${uniqueId}" class="file-input-label">
                        🎥 Seleccionar Video
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label>Título del Video</label>
                <input type="text" name="video_titles[]" class="form-control" placeholder="Título del video">
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea name="video_descriptions[]" class="form-control" rows="2" placeholder="Descripción del video"></textarea>
            </div>
            <div class="form-group">
                <label>Orden</label>
                <input type="number" name="video_orders[]" class="form-control" value="${galleryVideoCounter}" min="1">
            </div>
        </div>
    `;
    container.appendChild(newItem);
    
    // Agregar event listener al nuevo input de archivo
    const newFileInput = newItem.querySelector('.file-input');
    newFileInput.addEventListener('change', handleFileInputChange);
    
    // Guardar el texto original del label
    const newLabel = newItem.querySelector('.file-input-label');
    newLabel.setAttribute('data-original-text', newLabel.textContent);
}

// Función para eliminar item de galería
function removeGalleryItem(button) {
    const item = button.parentElement;
    item.remove();
}

// Función para manejar cambios en inputs de archivo
function handleFileInputChange(event) {
    const input = event.target;
    const label = input.nextElementSibling;
    const fileName = input.files[0]?.name || label.getAttribute('data-original-text') || label.textContent;
    
    if (input.files[0]) {
        label.textContent = `📁 ${fileName}`;
    }
}

// Función para filtrar subcategorías por categoría
function filterSubcategories() {
    const categoryId = document.getElementById('product_category').value;
    const subcategorySelect = document.getElementById('product_subcategory');
    const allOptions = subcategorySelect.querySelectorAll('option');
    
    // Mostrar todas las opciones primero
    allOptions.forEach(option => {
        if (option.value === '') {
            option.style.display = 'block';
        } else {
            const optionCategoryId = option.getAttribute('data-category');
            if (!categoryId || optionCategoryId === categoryId) {
                option.style.display = 'block';
            } else {
                option.style.display = 'none';
            }
        }
    });
    
    // Resetear selección
    subcategorySelect.value = '';
}

// Función para manejar checkboxes de elementos principales
function handleMainCheckboxes(event) {
    if (event.target.name === 'gallery_is_main[]') {
        if (event.target.checked) {
            // Desmarcar otros checkboxes de imagen principal
            document.querySelectorAll('input[name="gallery_is_main[]"]').forEach(checkbox => {
                if (checkbox !== event.target) {
                    checkbox.checked = false;
                }
            });
        }
    }
}

// Función de inicialización cuando el DOM esté listo
function initializeAdmin() {
    // Actualizar el nombre del archivo seleccionado para todos los inputs existentes
    document.querySelectorAll('.file-input').forEach(input => {
        input.addEventListener('change', handleFileInputChange);
    });

    // Guardar el texto original de las etiquetas
    document.querySelectorAll('.file-input-label').forEach(label => {
        label.setAttribute('data-original-text', label.textContent);
    });

    // Agregar event listener para filtrar subcategorías
    const categorySelect = document.getElementById('product_category');
    if (categorySelect) {
        categorySelect.addEventListener('change', filterSubcategories);
    }

    // Agregar event listener para checkboxes de elementos principales
    document.addEventListener('change', handleMainCheckboxes);
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initializeAdmin);