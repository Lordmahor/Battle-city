class Party extends GameEngine.Scene {
    constructor (args = {}){
        super({
            name: 'party',
            autoStart: false,
            ...args
        })
        this.enemies = new Set
    }

    loading (loader) {
        loader.addImage('spriteSheet', '/static/battleCitySprite.png')
        loader.addJson('tankAtlas', '/static/atlas.json')
        loader.addJson('map', '/static/map1.json')
        loader.addJson('party', '/static/party.json')
    }

    init () {
        const {loader} = this.parent

        
        Tank.texture = Bullet.texture = Topology.texture = loader.getImage('spriteSheet')
        Tank.atlas = Bullet.atlas = Topology.atlas = loader.getJson('tankAtlas')
        
        this.partyData = loader.getJson('party')

        this.arcadePhysics = new GameEngine.ArcadePhysics
        this.arcadePhysics.add(new Body(null, {
            static: true,
            x: -11,
            y: -11,
            width: this.parent.renderer.canvas.width +20,
            height: 10
        }))
        this.arcadePhysics.add(new Body(null, {
            static: true,
            x: -11,
            y: -11,
            width: 10,
            height: this.parent.renderer.canvas.height+20
        }))
        this.arcadePhysics.add(new Body(null, {
            static: true,
            x: this.parent.renderer.canvas.width + 1,
            y: -11,
            width: 10,
            height: this.parent.renderer.canvas.height+20
        }))
        this.arcadePhysics.add(new Body(null, {
            static: true,
            x: -11,
            y: this.parent.renderer.canvas.height+1,
            width: this.parent.renderer.canvas.width +20,
            height: 10
        }))

        this.topology = new Topology(loader.getJson('map'))
        this.add(this.topology)
        this.arcadePhysics.add(...this.topology.displayObjects)
        const [x, y] = this.topology.getCoordinates('tank1', true)
        this.mainTank = new Tank({
            x: x * this.topology.size,
            y: y * this.topology.size
        })
        this.arcadePhysics.add(this.mainTank)
        this.add(this.mainTank)
        if(this.topology.eagle){
            this.topology.eagle.on('collision', a => {
                if(a instanceof Bullet){
                    this.game.startScene('resultScene')
                    this.game.finishScene(this)
                }
            })
        }
        
    }

    update (timestamp) {
        const {keyboard} = this.parent
        const enemyTankForRedirect = []
        this.mainTank.movementUpdate(keyboard)

        for(const enemyTank of this.enemies){
            if(!this.displayObjects.includes(enemyTank)){
                this.enemies.delete(enemyTank)
                continue
            }
            if(enemyTank.nextDirect){
                enemyTank.setDirect(enemyTank.nextDirect)
                enemyTank.nextDirect = null
            }

            if(Util.delay(enemyTank.uid + 'fired', Tank.BULLET_TIMEOUT)) {
                const bullet = enemyTank.fire()
                bullet.isEnemy = true
            }
        }
        this.arcadePhysics.processing()

        if(this.enemies.size < this.partyData.enemy.simultaneously
            && Util.delay(this.uid + 'enemyGeneration', this.partyData.enemy.spawnDelay)
            ){
                const [x, y] = Util.getRandomFrom(...this.topology.getCoordinates('enemy'))
                const enemyTank = new EnemyTank({
                    x: x * this.topology.size,
                    y: y * this.topology.size
                })
                enemyTank.isEnemy = true
                this.enemies.add(enemyTank)
                this.add(enemyTank)
                this.arcadePhysics.add(enemyTank)
                enemyTank.setDirect('down')
            }
            

        for(const object of this.arcadePhysics.objects){
            if(object instanceof Bullet && object.toDestroy){
                object.destroy()
            }
        }
    }
}