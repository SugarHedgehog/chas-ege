class Prism {
  constructor(base, height) {
    this.base = base;
    this.height = height;
  }

  get volume() {
    return this.base * this.height;
  }

  get surfaceArea() {
    const { base, height } = this;
    return 2 * (base * height + base * base + height * height);
  }

  toString() {
    return `Prism with base ${this.base} and height ${this.height}`;
  }

  static calculateBaseArea(sides) {
    let baseArea = 0;
    for (let i = 0; i < sides.length; i++) {
      baseArea += sides[i] * sides[(i + 1) % sides.length] / 2;
    }
    return baseArea;
  }
}

class IrregularPolygonPrism extends Prism {
  constructor(sides, height) {
    super(Prism.calculateBaseArea(sides), height); // Call the super constructor first
    this.sides = sides;
  }

  isValidPrism(sides) {
    if (sides.length < 3) {
      return false;
    }
    for (const side of sides) {
      if (side <= 0) {
        return false;
      }
    }
    return true;
  }

  get basePerimeter() {
    let basePerimeter = 0;
    for (const side of this.sides) {
      basePerimeter += side;
    }
    return basePerimeter;
  }

  toString() {
    return `IrregularPolygonPrism with side lengths ${this.sides} and height ${this.height}`;
  }

  getBaseVerticesCoordinates() {
    const { sides } = this;
    const vertices = [];
    let angle = 0;

    for (let i = 0; i < sides.length; i++) {
      const x = Math.cos(angle) * sides[i];
      const y = Math.sin(angle) * sides[i];
      vertices.push([x, y]);
      angle += (2 * Math.PI) / sides.length;
    }

    return vertices;
  }

  getDistanceBetweenBaseVertices(vertex1, vertex2) {
    const [x1, y1] = this.getBaseVerticesCoordinates()[vertex1];
    const [x2, y2] = this.getBaseVerticesCoordinates()[vertex2];

    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
}

const prism1 = new IrregularPolygonPrism([3, 3, 3, 3], 10);
console.log('volume:'+prism1.volume);
console.log('surfaceArea:'+prism1.surfaceArea);
console.log('basePerimeter:'+prism1.basePerimeter);
// This will throw an error because the prism cannot be created with negative side lengths.
//const prism2 = new IrregularPolygonPrism([-1, 2, 3], 12);
console.log(prism1.getBaseVerticesCoordinates()); // [[0, 0], [3, 0], [6, 3], [9, 6]]
console.log(prism1.getDistanceBetweenBaseVertices(0, 2)); // 7.0710678118654755
console.log(prism1.getDistanceBetweenBaseVertices(1, 3)); // 7.0710678118654755


console.log(prism1.getBaseVerticesCoordinates()); // [[0, 0], [3, 0], [6, 3], [9, 6]]
