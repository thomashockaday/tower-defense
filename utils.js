function rectRectCollision(first, second) {
  return (
    first.position.x >= second.position.x &&
    first.position.x + first.width <= second.position.x + second.width &&
    first.position.y >= second.position.y &&
    first.position.y + first.height <= second.position.y + second.width
  );
}

function circleRectCollision(circle, rect) {
  return (
    circle.position.x > rect.position.x &&
    circle.position.x + circle.radius <= rect.position.x + rect.width &&
    circle.position.y >= rect.position.y &&
    circle.position.y + circle.radius <= rect.position.y + rect.height
  );
}
