class Grid {
  #elements;

  constructor(size) {
    this.#elements = this.#makeGrid(size);
  }

  #createLine(x1, y1, x2, y2) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", 2);
    return line;
  }

  #createXMark() {
    const mark = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    mark.setAttribute("viewBox", "0 0 100 100");
    mark.setAttribute("width", "100");
    mark.setAttribute("height", "100");
    mark.appendChild(this.#createLine(10, 10, 90, 90));
    mark.appendChild(this.#createLine(90, 10, 10, 90));
    return mark
  }

  #createDiv(className) {
    const row = document.createElement("div");
    row.className = className;
    return row;
  }
  
  #makeGrid(size) {
    const wrapper = this.#createDiv("wrapper");
    wrapper.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size ** 2; i++) {
      const square = this.#createDiv("square");
      square.id = i;
      square.appendChild(this.#createXMark());
      wrapper.appendChild(square);
    }
    return wrapper;
  }

  getElements() {
    return this.#elements;
  }

  applyAction(action) {
    const squares = this.#elements.children;
    for (let square of squares) {
      square.addEventListener("click", () => {
	action(square.id);
      });
    }
  }
}

export class View {
  #grid;

  constructor(size) {
    this.#grid = new Grid(size);
  }

  initializeView(action) {
    const elements = this.#grid.getElements();
    document.body.appendChild(elements);
    this.#grid.applyAction(action);
  }
}
