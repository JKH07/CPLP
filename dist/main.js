"use strict";
const content = document.querySelector(".grid");
const cell_Size = document.querySelector('.size_button');
const cell_Color = document.querySelector('.color_button');
const reset = document.querySelector('.reset_button');
if (!content || !cell_Size || !cell_Color || !reset) {
    throw new Error("Missing required input");
}
let gridSize = parseInt(cell_Size.value);
let isDrawing = false;
function paintCell(cell) {
    if (!isDrawing)
        return;
    cell.style.backgroundColor = cell_Color.value;
}
function clickCell(cell) {
    cell.style.backgroundColor = cell_Color.value;
}
function createGrid() {
    content.style.setProperty("--size", gridSize.toString());
    content.innerHTML = "";
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener('mouseenter', () => paintCell(cell));
        cell.addEventListener('mousedown', () => clickCell(cell));
        content.appendChild(cell);
    }
}
window.addEventListener('mousedown', () => {
    isDrawing = true;
});
window.addEventListener('mouseup', () => {
    isDrawing = false;
});
function resetGrid() {
    createGrid();
}
reset.addEventListener('click', resetGrid);
cell_Size.addEventListener('change', () => {
    gridSize = parseInt(cell_Size.value);
    resetGrid();
});
createGrid();
