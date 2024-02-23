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
}

export class View {
  #grid;

  constructor(size) {
    this.#grid = new Grid(size);
  }

  initializeView() {
    document.body.appendChild(this.#grid.getElements());
    const squares = document.getElementsByClassName("square");
    for (let square of squares) {
      square.addEventListener("click", () => {
	console.log(square.id);
      });
    }
  }
}
