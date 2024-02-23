class Grid {
  #elements;

  constructor(size) {
    this.#elements = this.#makeGrid(size);
    console.log(this.#elements);
  }

  #createDiv(className) {
    const row = document.createElement("div");
    row.className = className;
    return row;
  }
  
  #makeGrid(size) {
    const wrapper = this.#createDiv("wrapper");
    wrapper.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let row = 0; row < size; row++) {
      const rowDiv = this.#createDiv("row");
      for (let col = 0; col < size; col++) {
	rowDiv.appendChild(this.#createDiv("square"));
      }
      wrapper.appendChild(rowDiv);
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
  }
}
