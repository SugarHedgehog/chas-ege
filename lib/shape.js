class Shape3D {
    constructor(name) {
      this.name = name;
    }
  
    getVolume() {
      console.log("Реализация этого метода должна быть в подклассах Shape3D.");
    }
  
    getSurfaceArea() {
      console.log("Реализация этого метода должна быть в подклассах Shape3D.");
    }
  }
  
  class Sphere extends Shape3D {
    constructor(radius) {
      super("Сфера");
      this.radius = radius;
    }
  
    getVolume() {
      return (4 / 3) * Math.PI * Math.pow(this.radius, 3);
    }
  
    getSurfaceArea() {
      return 4 * Math.PI * Math.pow(this.radius, 2);
    }
  }
  
  class Cube extends Shape3D {
    constructor(sideLength) {
      super("Куб");
      this.sideLength = sideLength;
    }
  
    getVolume() {
      return Math.pow(this.sideLength, 3);
    }
  
    getSurfaceArea() {
      return 6 * Math.pow(this.sideLength, 2);
    }

    getMainDiagonal() {
        return this.sideLength*(3).sqr();
    }

    getDiagonal() {
        return this.sideLength*(2).sqr();
    }
    
  }
  
  class Cylinder extends Shape3D {
    constructor(radius, height) {
      super("Цилиндр");
      this.radius = radius;
      this.height = height;
    }
  
    getVolume() {
      return Math.PI * Math.pow(this.radius, 2) * this.height;
    }
  
    getSurfaceArea() {
      const baseArea = Math.PI * Math.pow(this.radius, 2);
      const lateralArea = 2 * Math.PI * this.radius * this.height;
      return 2 * baseArea + lateralArea;
    }
  }
  
  // Пример использования
//   const sphere = new Sphere(5);
//   console.log("Объем сферы:", sphere.getVolume());
//   console.log("Площадь поверхности сферы:", sphere.getSurfaceArea());
  
//   const cube = new Cube(10);
//   console.log("Объем куба:", cube.getVolume());
//   console.log("Площадь поверхности куба:", cube.getSurfaceArea());
  
//   const cylinder = new Cylinder(3, 8);
//   console.log("Объем цилиндра:", cylinder.getVolume());
//   console.log("Площадь поверхности цилиндра:", cylinder.getSurfaceArea());
