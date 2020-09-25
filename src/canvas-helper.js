export default function resize(canvas) {
    // lookup the size the browser is displaying the canvas
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // check if the canvas is not the same size
    if (canvas.width !== displayWidth ||
        canvas.height !== displayHeight) {
        
        // make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

}
