        const {Sprite, Game, Scene, Point, Line, Container, Body, Util, ArcadePhysics} = GameEngine
        const DEBUG_MODE = true
        
        let n = 1
        const mainScene = new Scene({
            name: 'mainScene',
            autoStart: true,
            loading (loader) {
                // loader.addImage('man', '/static/man.png')
                // loader.addJson('manAtlas', '/static/manAtlas.json')
                loader.addImage('tank', '/static/battleCitySprite.png')
                loader.addJson('tankAtlas', '/static/atlas.json')
            },
            init() {
                this.arcadePhysics = new ArcadePhysics
                Tank.texture = this.parent.loader.getImage('tank')
                Tank.atlas = this.parent.loader.getJson('tankAtlas')
                Bullet.texture = this.parent.loader.getImage('tank')
                Bullet.atlas = this.parent.loader.getJson('tankAtlas')
                this.tank = new Tank({
                    debug: DEBUG_MODE,
                    x : this.parent.renderer.canvas.width/2 - 100,
                    y : this.parent.renderer.canvas.height/2,
                })
                this.tank2 = new Tank({
                    debug: DEBUG_MODE,
                    x : this.parent.renderer.canvas.width/2 - 100,
                    y : this.parent.renderer.canvas.height/2 - 100
                })
                this.add(this.tank,this.tank2)
                this.arcadePhysics.add(this.tank,this.tank2)

                this.arcadePhysics.add(new Body(null, {
                    static: true,
                    x: -10,
                    y: -10,
                    width: this.parent.renderer.canvas.width +20,
                    height: 10
                }))
                this.arcadePhysics.add(new Body(null, {
                    static: true,
                    x: -10,
                    y: -10,
                    width: 10,
                    height: this.parent.renderer.canvas.height+20
                }))
                this.arcadePhysics.add(new Body(null, {
                    static: true,
                    x: this.parent.renderer.canvas.width,
                    y: -10,
                    width: 10,
                    height: this.parent.renderer.canvas.height+20
                }))
                this.arcadePhysics.add(new Body(null, {
                    static: true,
                    x: -10,
                    y: this.parent.renderer.canvas.height,
                    width: this.parent.renderer.canvas.width +20,
                    height: 10
                }))
            },

            update(timestamp) {
                this.tank.movementUpdate(this.parent.keyboard)

                
        if(this.parent.keyboard.space && Util.delay('tank'+this.tank.uid, Tank.BULLET_TIMEOUT)){
            const bullet = new Bullet ({
                debug: DEBUG_MODE,
                x: this.tank.x,
                y: this.tank.y
            })

            this.tank.bullets.push(bullet)
            bullet.tank = this.tank
            if(this.tank.animation === 'moveUp'){
                bullet.velocity.y -= Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet','up')
            }
            if(this.tank.animation === 'moveDown'){
                bullet.velocity.y += Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet','down')
            }
            if(this.tank.animation === 'moveLeft'){
                bullet.velocity.x -= Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet','left')
            }
            if(this.tank.animation === 'moveRight'){
                bullet.velocity.x += Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet','right')
            }
            this.add(bullet)
            this.arcadePhysics.add(bullet)
        }

                this.arcadePhysics.processing()

                for(const tank of [this.tank, this.tank2]){
                    for(const bullet of tank.bullets){
                        if(bullet.toDestroy){
                            bullet.destroy()
                        }
                    }
                }
            },
            // init () {
                
            //     // const graphicContainer = new Container()
            //     Man.texture = this.parent.loader.getImage('man')
            //     Man.atlas = this.parent.loader.getJson('manAtlas')
                
            //     this.arcadePhysics = new ArcadePhysics
            //     this.man1 = new Man({
            //         x : this.parent.renderer.canvas.width/2 - 100,
            //         y : this.parent.renderer.canvas.height/2,
            //     })
            //     this.man2 = new Man({
            //         x : this.parent.renderer.canvas.width/2 + 100,
            //         y : this.parent.renderer.canvas.height/2,
            //     })
            //     // this.man1.on('frameUpdate', man => {
            //     //     console.log('123213')
            //     // })

            //     // this.man.setFrameByKeys('man','down','frame2')

            //     this.arcadePhysics.add(this.man1, this.man2)
            //     this.add(this.man1, this.man2)
            // },
            // update (timestamp) {
            //     const { keyboard } = this.parent
            //     // if(Util.delay('manFrameUpdate', 100)){
            //     //     n = n % 4 + 1
            //     //     this.man.setFrameByKeys('man','down','frame'+n)
            //     // }
            //     this.man1.velocity.x = 0
            //     this.man1.velocity.y = 0
                
            //     this.man2.velocity.x = 0
            //     this.man2.velocity.y = 0
                
            //     if (keyboard.arrowUp){
            //         this.man1.velocity.y = -2
            //         if(this.man1.animation !== 'moveUp'){
            //             this.man1.startAnimation('moveUp')
            //         }
                    
            //     }
            //     else if (keyboard.arrowDown){
            //         this.man1.velocity.y = 2
            //         if(this.man1.animation !== 'moveDown'){
            //             this.man1.startAnimation('moveDown')
            //         }
            //     }
            //     else if (keyboard.arrowLeft){
            //         this.man1.velocity.x = -2
            //         if(this.man1.animation !== 'moveLeft'){
            //             this.man1.startAnimation('moveLeft')
            //         }
            //     }
            //     else if (keyboard.arrowRight){
            //         this.man1.velocity.x = 2
            //         if(this.man1.animation !== 'moveRight'){
            //             this.man1.startAnimation('moveRight')
            //         }
            //     }
            //     else{
            //         this.man1.startAnimation('stay'+this.man1.animation.slice(4))
            //     }
            //     this.arcadePhysics.processing()
                
            // },
        })
        const game = new Game({
            el: document.body,
            width: 600,
            height: 600,
            background: 'gray',
            scenes: [mainScene],
        })
        
        const mouse = new GameEngine.Mouse()
    