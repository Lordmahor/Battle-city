        const {Sprite, Game, Scene, Point, Line, Container, Body} = GameEngine
        const mainScene = new Scene({
            name: 'mainScene',
            autoStart: true,
            loading (loader) {
                loader.addImage('Vavada', '/static/Vavada.jpg')
                loader.addJson('persons', '/static/persons.json')
            },
            init () {
                console.log()
                const graphicContainer = new Container()
                const VavavaTexture = this.parent.loader.getImage('Vavada')
                this.vavada = new Body(VavavaTexture,{
                x : this.parent.renderer.canvas.width/2,
                y : this.parent.renderer.canvas.height/2,
                scale: 0.25,
                anchorY: 0.5,
                anchorX: 0.5,
                debug: true,
                body: {
                    x:0,
                    y:0.5,
                    width:1,
                    height: 0.5
                }
                })
                this.add(this.vavada)
            },
            update (timestamp) {
                const { keyboard } = this.parent
                let speedRotation = keyboard.space ? Math.PI / 100 : Math.PI / 200

                // this.vavada.rotation = timestamp/1000
                if (keyboard.arrowUp){
                    this.vavada.rotation += speedRotation
                }
                if (keyboard.arrowDown){
                    this.vavada.rotation -= speedRotation
                }
            },
        })
        const game = new Game({
            el: document.body,
            width: 600,
            height: 600,
            background: 'orange',
            scenes: [mainScene],
        })
    