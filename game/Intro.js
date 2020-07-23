class Intro extends GameEngine.Scene {
    constructor (args = {}){
        super({
            name: 'introScene',
            ...args
        })
    }
    
    loading(loader){
        loader.addImage('intro', '/static/intro.png')
        loader.addSound('intro', '/static/sound/stage_start.ogg')

    }
    init(){
        const {loader} = this.parent

        

        this.image = new Sprite(loader.getImage('intro'),{
            x: 0,
            y: this.parent.renderer.canvas.height,
            width: this.parent.renderer.canvas.width,
            height: this.parent.renderer.canvas.height
        })
        this.add(this.image)

        this.imageTweenStopper = Util.tween({
            target: this.image,
            duration: 1000,
            processer (target, percent, context) {
                if(percent === 0){
                    loader.getSound('intro').play()
                    context.y = target.y
                }
                target.y = context.y * (1 - percent)
            }
        })
    }
    update(timestamp){
        const { keyboard } = this.parent
        if(keyboard.space && Util.delay('introSpace', 300)){
            if(keyboard.space && this.imageTweenStopper && this.image.y !== 0){
                this.imageTweenStopper()
                this.image.y = 0
                delete this.imageTweenStopper()
            }
            else if(keyboard.space){
                this.parent.startScene('party')
                this.parent.finishScene(this)
            }
        }
    } 
}