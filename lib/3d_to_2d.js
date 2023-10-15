function project(ctx,vertices, width,height) {
  let scale = 20;
  let projectedX, projectedY, point;
  let centerX = width / 2;
  let centerY = height / 2;
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
