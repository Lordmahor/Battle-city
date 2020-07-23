class Tank extends GameEngine.Body {
    constructor(originalArgs = {}){
        const args = Object.assign({
            scale: 3.5,
            keysDefault: ['yellow', 'type1'],
            debug: DEBUG_MODE,
        }, originalArgs)
        super(Tank.texture,args)

        this.bullets = []
        this.setFramesCollection(Tank.atlas.frames)
        this.setAnimationsCollection(Tank.atlas.actions)
        this.startAnimation('moveUp')

        this.on('collision',(a,b)=> this.collisionHandler(a,b))
    }

    collisionHandler(a, b){
        if(a instanceof Bullet){
            if(this.bullets.includes(a)){
                return
            }
            else{
                this.scene.arcadePhysics.remove(this)
                this.scene.remove(this)
            }
        }
        this.velocity.x = 0
        this.velocity.y = 0
    }

    fire(){
        const bullet = new Bullet ({
            debug: DEBUG_MODE,
            x: this.centerX,
            y: this.centerY
        })

        this.bullets.push(bullet)
        bullet.tank = this
        if(this.animation === 'moveUp'){
            
            bullet.velocity.y -= Bullet.NORMAL_SPEED
            bullet.setFrameByKeys('bullet','up')
        }
        if(this.animation === 'moveDown'){
            bullet.velocity.y += Bullet.NORMAL_SPEED
            bullet.setFrameByKeys('bullet','down')
        }
        if(this.animation === 'moveLeft'){
            bullet.velocity.x -= Bullet.NORMAL_SPEED
            bullet.setFrameByKeys('bullet','left')
        }
        if(this.animation === 'moveRight'){
            bullet.velocity.x += Bullet.NORMAL_SPEED
            bullet.setFrameByKeys('bullet','right')
        }
        const scene = Util.getScene(this)
        scene.add(bullet)
        scene.arcadePhysics.add(bullet)

        return bullet
    }

    movementUpdate (keyboard){
        const sd = x => this.setDirect(x, keyboard.space)
        if(keyboard.arrowUp){
            sd('up')
        }
        else if(keyboard.arrowDown){
            sd('down')
        }
        else if(keyboard.arrowLeft){
            sd('left')
        }
        else if(keyboard.arrowRight){
            sd('right')
        }
        else{
            sd(null)
        }
    }

    setDirect (direct, fireCommand) {
        this.velocity.x = 0
        this.velocity.y = 0
        if(this.pauseAnimation) {
            this.resumeAnimation()
        }
        if (direct === 'up'){
            this.velocity.y = -Tank.NORMAL_SPEED
            if(this.animation !== 'moveUp'){
                this.startAnimation('moveUp')
            }
            
        }
        else if (direct === 'down'){
            this.velocity.y = Tank.NORMAL_SPEED
            if(this.animation !== 'moveDown'){
                this.startAnimation('moveDown')
            }
        }
        else if (direct === 'left'){
            this.velocity.x = -Tank.NORMAL_SPEED
            if(this.animation !== 'moveLeft'){
                this.startAnimation('moveLeft')
            }
        }
        else if (direct === 'right'){
            this.velocity.x = Tank.NORMAL_SPEED
            if(this.animation !== 'moveRight'){
                this.startAnimation('moveRight')
            }
        }
        else{
            this.pauseAnimation()
        }
        if(fireCommand && Util.delay('tank'+this.uid, Tank.BULLET_TIMEOUT)){
            this.fire()
            // this.parent.add(bullet)
            // this.parent.arcadePhysics.add(bullet)
        }
    }
}
Tank.BULLET_TIMEOUT = 1000
Tank.NORMAL_SPEED = 2
Tank.texture = null
Tank.atlas = null