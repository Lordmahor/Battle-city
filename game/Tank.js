class Tank extends GameEngine.Body {
    constructor(originalArgs = {}){
        const args = Object.assign({
            scale: 4,
            anchorY: 0.5,
            anchorX: 0.5,
        }, originalArgs)
        super(Tank.texture,args)

        this.bullets = []
        this.setFramesCollection(Tank.atlas.frames)
        this.setAnimationsCollection(Tank.atlas.actions)
        this.startAnimation('moveUp')

        this.on('collision',(a, b) =>{
            if(b instanceof Bullet){
                if(this.bullets.includes(b)){
                    return
                }
                else{
                    this.visible = false
                    Util.getScene(this).arcadePhysics.remove(this)
                }
            }
            a.velocity.x = 0
            a.velocity.y = 0
        })
    }
    movementUpdate (keyboard) {
        this.velocity.x = 0
        this.velocity.y = 0
        if (keyboard.arrowUp){
            this.velocity.y = -Tank.NORMAL_SPEED
            if(this.animation !== 'moveUp'){
                this.startAnimation('moveUp')
            }
            
        }
        else if (keyboard.arrowDown){
            this.velocity.y = Tank.NORMAL_SPEED
            if(this.animation !== 'moveDown'){
                this.startAnimation('moveDown')
            }
        }
        else if (keyboard.arrowLeft){
            this.velocity.x = -Tank.NORMAL_SPEED
            if(this.animation !== 'moveLeft'){
                this.startAnimation('moveLeft')
            }
        }
        else if (keyboard.arrowRight){
            this.velocity.x = Tank.NORMAL_SPEED
            if(this.animation !== 'moveRight'){
                this.startAnimation('moveRight')
            }
        }
    }
}
Tank.BULLET_TIMEOUT = 1000
Tank.NORMAL_SPEED = 2
Tank.texture = null
Tank.atlas = null