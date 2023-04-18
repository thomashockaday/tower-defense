export default class Collision {
  static rectRect(first, second) {
    return (
      first.position.x < second.position.x + second.width &&
      first.position.x + first.width > second.position.x &&
      first.position.y < second.position.y + second.height &&
      first.position.y + first.height > second.position.y
    );
  }

  static circleRect(circle, rect) {
    return (
      circle.position.x > rect.position.x &&
      circle.position.x + circle.radius <= rect.position.x + rect.width &&
      circle.position.y >= rect.position.y &&
      circle.position.y + circle.radius <= rect.position.y + rect.height
    );
  }
}
