document.getElementById('convertButton').addEventListener('click', function() {
    const imageInput = document.getElementById('imageInput');
    const formatSelect = document.getElementById('formatSelect');
    const qualityRange = document.getElementById('qualityRange');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    if (!imageInput.files.length) {
        alert('Please select at least one image file.');
        return;
    }

    Array.from(imageInput.files).forEach(file => {
        const reader = new FileReader();

        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);

                const selectedFormat = formatSelect.value;
                const quality = parseInt(qualityRange.value) / 100;

                let convertedImage;
                if (selectedFormat === 'jpeg' || selectedFormat === 'webp') {
                    convertedImage = canvas.toDataURL('image/' + selectedFormat, quality);
                } else {
                    convertedImage = canvas.toDataURL('image/' + selectedFormat);
                }

                downloadImage(convertedImage, file.name, selectedFormat);
            };
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    });
});

// Update quality value display
document.getElementById('qualityRange').addEventListener('input', function() {
    const qualityValue = document.getElementById('qualityValue');
    qualityValue.textContent = this.value;
});

function downloadImage(dataUrl, originalName, format) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = originalName.replace(/\.\w+$/, `.${format}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
