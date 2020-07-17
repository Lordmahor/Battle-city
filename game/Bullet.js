class Bullet extends GameEngine.Body {
    constructor(originalArgs = {}){
        const args = Object.assign({
            anchorY: 0.5,
            anchorX: 0.5,
        }, originalArgs)
        super(Bullet.texture,args)

        this.tank = null
        this.toDestroy = false
        
        this.setFramesCollection(Bullet.atlas.frames)
        this.setAnimationsCollection(Bullet.atlas.actions)
        // this.startAnimation('moveUp')

        this.on('collision',(a, b) =>{
            if(b === this.tank){
                return
            }
            this.toDestroy = true
        })
    }
    destroy(){
        Util.removeElements(this.tank.bullets, this)

        delete this.tank
        
        const scene = Util.getScene(this)
        scene.remove(this)
        scene.arcadePhysics.remove(this)
    }
}
Bullet.NORMAL_SPEED = 5
Bullet.texture = null
Bullet.atlas = null