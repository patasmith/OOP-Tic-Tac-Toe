class Grid {
  #elements;

  constructor(size) {
    this.#elements = this.#makeGrid(size);
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
