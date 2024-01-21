export function calculatePercentage (total, available) {
    if (available === 0) {
        return 0;
    }
    const percentage = (total / available) * 100;
    return percentage.toFixed(0);
}

export function formatFileSize(size) {
    const KB = 1024;
    const MB = KB * 1024;
    const GB = MB * 1024;
    const TB = GB * 1024;

    switch (true) {
        case size < KB:
            return size + ' B';
        case size < MB:
            return (size / KB).toFixed(1) + ' KB';
        case size < GB:
            return (size / MB).toFixed(1) + ' MB';
        case size < TB:
            return (size / GB).toFixed(1) + ' GB';
        default:
            return (size / TB).toFixed(1) + ' TB';
    }
}
