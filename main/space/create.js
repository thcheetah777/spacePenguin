// Create for Space
SpaceScene.prototype.create = function() {
  // Input
  game.space.cursors = this.input.keyboard.createCursorKeys();

  // Sound effects
  game.space.sfx.normalLaser = this.sound.add("normalLaser");
  game.space.sfx.cannonLaser = this.sound.add("cannonLaser");
  game.space.sfx.doubleLaser = this.sound.add("doubleLaser");
  game.space.sfx.explosion = this.sound.add("explosion");
  game.space.sfx.hurt = this.sound.add("hurt");
  game.space.sfx.teleport = this.sound.add("teleport");
  game.space.sfx.bigExplosion = this.sound.add("bigExplosion");
  game.space.sfx.music = this.sound.add("music");
  game.space.sfx.pencoin = this.sound.add("pencoin");

  // Play music
  game.space.sfx.music.setLoop(true);
  game.space.sfx.music.play({
    volume: 1.5
  });

  // Background space tiles
  // WARNING: Always be put first
  for (var i = 0; i < 1000; i++) {
    this.add.image(Math.random() * game.width, Math.random() * game.height, "spaceTile").setScale(8);
  }

  // Pencoin
  game.space.pencoin = this.physics.add.staticGroup();

  // Spaceship
  game.space.spaceship = this.physics.add.sprite(game.width / 2, game.height / 2, "spaceshipNormal").setGravityY(-config.physics.arcade.gravity.y).setScale(8).setDrag(30);
  game.space.spaceship.body.setMaxSpeed(500);
  game.space.spaceship.bullets = this.physics.add.group();

  // Camera
  this.cameras.main.setBounds(0, 0, game.width, game.height);
  this.physics.world.setBounds(0, 0, game.width, game.height);
  this.cameras.main.startFollow(game.space.spaceship, true, 0.1, 0.1);

  // Create asteroids
  game.space.asteroids = this.physics.add.group();
  for (var i = 0; i < 100; i++) {
    let asteroid = game.space.asteroids.create(Math.random() * game.width, Math.random() * game.height, "asteroid");
    asteroid.body.angularVelocity = Math.random() * 500;
    asteroid.setCircle(12);
    asteroid.setScale(8);
    asteroid.setGravityY(-config.physics.arcade.gravity.y);
    asteroid.setVelocityX(Math.random() * (800 - -800) + -800);
    asteroid.setVelocityY(Math.random() * (800 - -800) + -800);
    asteroid.health = 5;
  }

  // Colliders
  this.physics.add.collider(game.space.spaceship.bullets, game.space.asteroids, function(bullet, asteroid) {
    game.space.sfx.explosion.play();
    bullet.destroy();
    asteroid.health -= bullet.damage;
    if (asteroid.health < 1) {
      game.space.sfx.bigExplosion.play();
      asteroid.destroy();
      if (Math.floor(Math.random() * 2) === 1) {
        game.space.addPencoin(this, asteroid);
      }
    }
  });
  this.physics.add.collider(game.space.spaceship, game.space.asteroids);
  this.physics.add.collider(game.space.asteroids, game.space.asteroids);
  this.physics.add.overlap(game.space.spaceship, game.space.pencoin, function(ship, coin) {
    game.space.sfx.pencoin.play();
    coin.destroy();
    game.pencoin++;
  });

  // Animation
  this.anims.create({
    key: "coinSpin",
    frames: [{
      key: "coin0"
    },
    {
      key: "coin1"
    }],
    frameRate: 5,
    repeat: -1
  });
};
