
var config = {
    type: Phaser.CANVAS,
    width: 700,
    height: 500,
    parent: 'element-id',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var player;
var cursors;
var coin;
var mensaje;


var game = new Phaser.Game(config);

function preload ()
{
    //Se cargan los recursos
    this.load.image('background', 'imagenes/background2.png');
    this.load.spritesheet('coin', 'imagenes/coin.png', {frameWidth:192, frameHeight: 171});
    this.load.spritesheet('boy', 'imagenes/guy.png', {frameWidth: 32, frameHeight: 48});
    this.load.image('mensaje1', 'imagenes/1.png');
    this.load.image('mensaje2', 'imagenes/2.png');
    this.load.image('mensaje3', 'imagenes/3.png');
    this.load.image('mensaje4', 'imagenes/4.png');
};

function create ()
{
    //Se añade el mapa de fondo
    this.add.image(350, 230, 'background');
    //Se añaden los objetos interactuables
    coin = this.physics.add.sprite(470, 50, 'coin', 0).setScale(0.2);

    player = this.physics.add.sprite(100, 100, 'boy', 0).setScale(1.5);
    //Se crean los cursores para manipular al jugador
    cursors = this.input.keyboard.createCursorKeys();

    mensaje = this.physics.add.staticGroup();
    mensaje.create(330, 50, 'mensaje1').setScale(0.8).setVisible(false);

    //Se animan los objetos interactuables
    this.anims.create({
        key: 'coin',
        frames : this.anims.generateFrameNumbers('coin', {
            start: 0,
            end: 5
        }),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: 'alFrente',
        frames : this.anims.generateFrameNumbers('boy', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'atras',
        frames : this.anims.generateFrameNumbers('boy', {
            start: 12,
            end: 15
        }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'derecha',
        frames : this.anims.generateFrameNumbers('boy', {
            start: 8,
            end: 11
        }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'izquierda',
        frames : this.anims.generateFrameNumbers('boy', {
            start: 4,
            end: 7
        }),
        frameRate: 10,
        repeat: -1
    });
    player.setCollideWorldBounds(true);
    
    //se añade la función que regula la interacción del personaje con la moneda
    this.physics.add.overlap(player, coin, desaparecer, null, this);

};

function update()
{
        //Comportamiento de la moneda y el personaje
    coin.play('coin', true);
    if (cursors.down.isDown)
        {
            player.setVelocityY(160);

            player.anims.play('alFrente', true);
        }

    else if (cursors.up.isDown) {

            player.setVelocityY(-160);

            player.anims.play('atras', true);
        }
    else if (cursors.left.isDown) {

            player.setVelocityX(-160);

            player.anims.play('izquierda', true);
        }
    else if (cursors.right.isDown) {

            player.setVelocityX(160);

            player.anims.play('derecha', true);
        }
    
    else {
        player.setVelocity(0);

        player.anims.play(false);
    }
    
};
var counter=0;
function desaparecer(player, coin){
    //Función que regula la interacción de la moneda y el personaje
    mensaje.setVisible(true);
    //Contador para saber que parte de la escena-moneda se encuentra
    counter++;
    //Cada condicional cambia de posición la monoda y crea el siguiente mensaje
    if (counter==1) {
        coin.setX(270);
        coin.setY(250);
        mensaje.create(400, 250, 'mensaje2').setScale(0.8).setVisible(false);

    } else if (counter==2) {
        coin.setX(100);
        coin.setY(350);
        mensaje.create(100, 200, 'mensaje3').setScale(0.8).setVisible(false);
    } else if (counter==3) {
        coin.setX(600);
        coin.setY(400);
        mensaje.create(550, 350, 'mensaje4').setVisible(false);
    } else if (counter==4) {
        coin.disableBody(true, true);
    }

}


