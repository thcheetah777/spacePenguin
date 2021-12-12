// Update for Space
SpaceScene.prototype.update = function() {
  // Controls
  if (game.cursors.up.isDown) {
    this.physics.velocityFromAngle(game.spaceship.angle - 90, 200, game.spaceship.body.acceleration);
  } else {
    game.spaceship.setAcceleration(0);
  }
  if (game.cursors.right.isDown) {
    game.spaceship.body.setAngularVelocity(200);
  } else if (game.cursors.left.isDown) {
    game.spaceship.body.setAngularVelocity(-200);
  } else {
    game.spaceship.body.setAngularVelocity(0);
  }

  // Shooting
  if (game.cursors.space.isDown) {
    let bullet = game.spaceship.bullets.create(game.spaceship.x, game.spaceship.y, "bullet").setScale(8);
    bullet.setGravityY(-config.physics.arcade.gravity.y);
  }

  // World wrap
  this.physics.world.wrap(game.spaceship);

  // Add ship upgrades
  if (game.mode === "normal") {
    game.spaceship.setTexture("spaceshipNormal");
  } else if (game.mode === "cannon") {
    game.spaceship.setTexture("spaceshipCannon");
  } else if (game.mode === "double") {
    game.spaceship.setTexture("spaceshipDouble");
  } else {
    game.spaceship.setTexture("spaceshipBoth");
  }
};
