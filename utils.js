function rectRectCollision(first, second) {
  return (
    first.position.x >= second.position.x &&
    first.position.x + first.width <= second.position.x + second.width &&
    first.position.y >= second.position.y &&
    first.position.y + first.height <= second.position.y + second.width
  );
}
