class Bullet extends GameEngine.Body {
    constructor(originalArgs = {}){
        const args = Object.assign({
            scale: 2,
            anchorY: 0.5,
            anchorX: 0.5,
        }, originalArgs)
        super(Bullet.texture,args)

        this.tank = null
        this.toDestroy = false
        
        this.setFramesCollection(Bullet.atlas.frames)
        this.setAnimationsCollection(Bullet.atlas.actions)
        // this.startAnimation('moveUp')

        this.on('collision',(a,b) =>{
            if(a === this.tank){
                return
            }
            if(a.isEnemy&&b.isEnemy){
                return
            }
            this.toDestroy = true
        })
    }
    destroy(){
        Util.removeElements(this.tank.bullets, this)

        delete this.tank
        
        this.scene.arcadePhysics.remove(this)
        this.scene.remove(this)
    }
}
Bullet.NORMAL_SPEED = 5
Bullet.texture = null
Bullet.atlas = null