class EnemyTank extends Tank{
    constructor(originalArgs= {}){
        super({
            keysDefault: ['gray', 'type1'],
            ...originalArgs
        })
    }

    collisionHandler(a, b){
        if(a instanceof Bullet){
            if(this.bullets.includes(a)){
                return
            }
            else if(a.isEnemy){
                return
            }
            else{
                this.scene.arcadePhysics.remove(this)
                this.scene.remove(this)
            }
        }
        this.velocity.x = 0
        this.velocity.y = 0
        this.nextDirect = Util.getRandomFrom('up','down','left','right')
    }
}