const content = document.querySelector<HTMLDivElement>(".grid");
const cell_Size = document.querySelector<HTMLInputElement>('.size_button');
const cell_Color = document.querySelector<HTMLInputElement>('.color_button');
const reset = document.querySelector<HTMLButtonElement>('.reset_button');
const grayscale=document.querySelector<HTMLButtonElement>('.grayscale');
const rand_color=document.querySelector<HTMLButtonElement>('.rand_color');

if (!content || !cell_Size || !cell_Color || !reset||!grayscale) {
    throw new Error("Missing required input");
    
}
//assigning types in mandatory
let gridSize: number = parseInt(cell_Size.value);
let isDrawing: boolean = false;
let isGray: boolean = false;

function paintCell(cell: HTMLDivElement): void {
    if (!isDrawing) return;
    cell.style.backgroundColor = cell_Color!.value;
    if (isGray) {
    cell.style.filter = "grayscale(100%)";
  } else {
    cell.style.filter = "none";
  }
}

function clickCell(cell: HTMLDivElement): void {
    cell.style.backgroundColor = cell_Color!.value;
    if (isGray) {
    cell.style.filter = "grayscale(100%)";
  } else {
    cell.style.filter = "none";
  }
}
function grayscaleOverlay(): void {
    console.log("Gray");
    isGray=!isGray;  
    document.querySelectorAll<HTMLDivElement>('.cell').forEach(cell => {
        //ternary operator
    cell.style.filter = isGray ? "grayscale(100%)" : "none";
  });
  if (isGray) {
    cell_Color!.style.filter = "grayscale(100%)";
    cell_Color!.style.opacity = "0.6";
  } else {
    cell_Color!.style.filter = "none";
    cell_Color!.style.opacity = "1";
  }
}

function createGrid(): void {
    content!.style.setProperty("--size", gridSize.toString());
    content!.innerHTML = "";
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener('mouseenter', () => paintCell(cell));
        cell.addEventListener('mousedown', () => clickCell(cell));
        content!.appendChild(cell);
        
    }
  
}
function generateHEX():string{
  var col=Math.floor(Math.random()*256);
  if(Math.log(col)<2)return col.toString(16)+col.toString(16);
  else return col.toString(16);

}
function randColor():void{
  const r=generateHEX();
  const g=generateHEX();
  const b=generateHEX();
//string interpolation
let color: string=`#${r}${g}${b}`;

 cell_Color!.value=color;
 console.log(color);
}
window.addEventListener('mousedown', () => {
    isDrawing = true;
});

window.addEventListener('mouseup', () => {
    isDrawing = false;
});

function resetGrid(): void {
    createGrid();
}

reset.addEventListener('click', resetGrid);

cell_Size.addEventListener('change', () => {
    gridSize = parseInt(cell_Size.value);
    resetGrid();
});

grayscale.addEventListener('click', grayscaleOverlay);
rand_color!.addEventListener('click', randColor);

createGrid();