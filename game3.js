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
var coins
var coinLayer
function preload() 
  {
    // load the PNG file
    this.load.image('tiles', '/assets/game3/rogue.png')
  
    // load the JSON file
    this.load.tilemapTiledJSON('tilemap', '../assets/game3/levelOne.json' )
    this.load.spritesheet('coin', '/assets/game3/coin.png', {
      frameWidth: 32,
      frameHeight: 32
    }) 
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
    coinLayer = map.getObjectLayer('coins')['objects']
    blocked.setCollisionByProperty({ collides: true})
    blockedaboveplayer.setCollisionByProperty({ collides: true})

    coins = this.physics.add.staticGroup()

    coinLayer.forEach(object => {
      let obj = coins.create(object.x * 2.75, object.y * 3, 'coin'); 
         obj.setOrigin(0); 
         obj.body.width = object.width; 
         obj.body.height = object.height;
         obj.setSize(25,25).setOffset(18, 15)
    
      //    coins.forEach(function(coins){
      //     diamond.body.immovable = true;
      //     diamond.animations.add('spin', [4, 5, 6, 7, 6, 5], 6, true);
      //     diamond.animations.play('spin');
      // });
    });
       this.anims.create({
          key: 'spin',
          frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 7 }),
          frameRate: 10,
          repeat: -1
        });
            

        player = this.physics.add.sprite(100, 680, 'boy').setScale(0.4);
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
      //this.physics.add.collider(player, coinLayer)
      this.physics.add.overlap(player, coins, collectCoin, null, this)

      //add a score
      // text = this.add.text(570, 70, `Coins: ${coinScore}x`, {
      //   fontSize: '20px',
      //   fill: '#ffffff'
      // });
      // text.setScrollFactor(0);
      

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

  coins.getChildren().forEach((coin) => coin.anims.play( 'spin', true)
  )

}

function collectCoin(player, coin) {
  coin.destroy(coin.x, coin.y); // remove the tile/coin
  // coinScore ++; // increment the score
  // text.setText(`Coins: ${coinScore}x`); // set the text to show the current score
  return false;
}