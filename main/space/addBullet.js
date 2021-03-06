// Function to add a bullet
game.space.addBullet = (phaser, x, y, type) => {
  let bullet = game.space.spaceship.bullets.create(x, y, type).setScale(8);
  bullet.type = type;
  bullet.setGravityY(-config.physics.arcade.gravity.y);
  phaser.physics.velocityFromAngle(game.space.spaceship.angle - 90, 1000, bullet.body.velocity);
  if (bullet.type === "cannonBullet") {
    bullet.damage = 2;
  } else {
    bullet.damage = 1;
  }
  bullet.timeLimit = phaser.time.addEvent({
    // Time
    delay: 1000,

    // Callback
    callback: () => {
      bullet.destroy();
    },
    callbackScope: this,
  });
}
