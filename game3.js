var config = {
  type: Phaser.AUTO,
  // parent: 'phaser-example',
  width: 720,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  } 
};

var game = new Phaser.Game(config);
var player
function preload() 
  {
    // load the PNG file
    this.load.image('tiles', '/assets/game3/rogue.png')
  
    // load the JSON file
    this.load.tilemapTiledJSON('tilemap', '/assets/game3/levelOne.json')
    player = this.load.spritesheet('boy', '/assets/game3/boy.png', {
      frameWidth: 80,
      frameHeight: 110
    })
    
    
  }
  
  function create()
  {
    
    const map = this.make.tilemap({key: 'tilemap',})
    const tileset = map.addTilesetImage('rogue', 'tiles')
    const background = map.createLayer('background', tileset, 0, 0).setScale(3)
    const blocked =  map.createLayer('blocked', tileset, 0, 0).setScale(3)
    const blockedaboveplayer =  map.createLayer('blockedaboveplayer', tileset, 0, 0).setScale(3)    
  
      blocked.setCollisionByProperty({ collides: true})
      blockedaboveplayer.setCollisionByProperty({ collides: true})

        player = this.physics.add.sprite(100, 450, 'boy').setScale(0.4);
        this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('boy', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
    
      this.anims.create({
        key: 'turn',
        frames: [ { key: 'boy', frame: 23 } ],
        frameRate: 20
      });
    
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('boy', { start: 9, end: 10 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('boy', { start: 23, end: 23 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('boy', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
      });
      cursors = this.input.keyboard.createCursorKeys();
      
      player.setCollideWorldBounds(true)
      this.physics.add.collider(player, blocked)
      this.physics.add.collider(player, blockedaboveplayer)
      // this.physics.world.bounds.width = 240
      // this.physics.world.bounds.height = 240
      // this.cameras.main.setBounds(0, 0, 400, 320)
      // this.cameras.main.startFollow(player, true, 0.8, 0.8)
      

    }

function update()
{
  if (cursors.left.isDown){
    player.setVelocityX(-160);
 
    player.anims.play('left', true);
  }
  else if (cursors.right.isDown){
    player.setVelocityX(160);

    player.anims.play('right', true);
  } 
  else if (cursors.down.isDown){
    player.setVelocityY(160);

    player.anims.play('down', true);
  }
  else if (cursors.up.isDown){
    player.setVelocityY(-160);

    player.anims.play('up', true);
  }
  else {
    player.setVelocity(0);

    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down){
    player.setVelocityY(-330);
  }

}