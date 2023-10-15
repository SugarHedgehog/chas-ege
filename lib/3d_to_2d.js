class Point {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }
  let cube = [
    new Point(-50, -50, -50), new Point(50, -50, -50), new Point(50, 50, -50), new Point(-50, 50, -50),
    new Point(-50, -50, 50), new Point(50, -50, 50), new Point(50, 50, 50), new Point(-50, 50, 50)
  ];
  
  function project(vertices) {
    let scale = 200;
    let projectedX, projectedY, x, y, z, point;
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    for (let a = 0; a < vertices.length; a++) {
      point = vertices[a];
      ctx.beginPath();
      projectedX = centerX + point.x * scale / (point.z + scale);
      projectedY = centerY + point.y * scale / (point.z + scale);
      ctx.arc(projectedX, projectedY, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  
  }
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "blue";
  project(cube);
