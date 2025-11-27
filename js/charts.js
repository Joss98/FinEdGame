// Simple chart rendering using HTML5 Canvas
// Scope:
//  - Render a line chart of Net Worth over time

function renderNetWorthChart(canvasId, gameLog) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas element with id '${canvasId}' not found.`);
        return;
    }

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Extract data
    const dataPoints = gameLog.map(entry => entry.netWorth);
    const labels = gameLog.map(entry => entry.year);

    if (dataPoints.length === 0) return;

    const minValue = Math.min(...dataPoints, 0); // Ensure 0 is included
    const maxValue = Math.max(...dataPoints);
    const range = maxValue - minValue;

    // Helper to map value to Y coordinate
    // Invert Y because canvas 0,0 is top-left
    const mapY = (value) => {
        return height - padding - ((value - minValue) / range) * (height - 2 * padding);
    };

    // Helper to map index to X coordinate
    const mapX = (index) => {
        return padding + (index / (dataPoints.length - 1)) * (width - 2 * padding);
    };

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    // Y Axis
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    // X Axis
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw data line
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    dataPoints.forEach((value, index) => {
        const x = mapX(index);
        const y = mapY(value);
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // Draw points
    ctx.fillStyle = 'red';
    dataPoints.forEach((value, index) => {
        const x = mapX(index);
        const y = mapY(value);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    });

    // Add simple labels (start and end)
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.fillText(labels[0], mapX(0), height - padding + 15);
    ctx.fillText(labels[labels.length - 1], mapX(labels.length - 1) - 10, height - padding + 15);

    ctx.fillText(minValue.toFixed(0), 5, mapY(minValue));
    ctx.fillText(maxValue.toFixed(0), 5, mapY(maxValue));
}
