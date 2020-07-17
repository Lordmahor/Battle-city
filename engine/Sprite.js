;(function(){
    'use strict'
    //Отрисовка , , отвечает за то как что и где рисовать
    //Sprite - знает как себя отрисовать
    class Sprite extends GameEngine.DisplayObject{
        //В качестве аргументов принимает Текстуру(изображение) и аргументы
        constructor(texture, args = {}){
            super(args)
            //texture - Сама картинка, то что мы загрузили
            this.texture = texture
            const velocity = args.velocity || 0

            this.frames = []
            this.animations = {}
            this.animation = ''
            this.frameNumber = 0
            this.frameDelay = 0

            this.velocity = {
                x: velocity || 0,
                y: velocity || 0,
            }
            //frame - Область картинки с координатами и шириной, высотой - часть того что загрузили
            const frame = args.frame || {}
            this.frame = {
                x: frame.x || 0,
                y: frame.y || 0,
                width: frame.width || texture ? texture.width : 0,
                height: frame.height || texture ? texture.height : 0
            }
            if(args.width === undefined){
                this.width = this.frame.width
            }
            if(args.height === undefined){
                this.height = this.frame.height
            }
        }

        setFramesCollection(framesCollection){
            this.frames = framesCollection
        }

        setAnimationsCollection(animationsCollection){
            this.animations = animationsCollection
        }

        startAnimation(name){
            if(!this.animations.hasOwnProperty(name)){
                return false
            }
            const { durations = Infinity, keys } = this.animations[name]
            this.animation = name
            this.frameDelay = durations / keys.length
            this.setFrameByKeys(...keys[0])
        }

        setFrameByKeys(...keys){
            const frame = this.getFrameByKeys(...keys)
            if(!frame){
                return false
            }
            this.frame.x = frame.x
            this.frame.y = frame.y
            this.frame.width = frame.width
            this.frame.height = frame.height
            this.width = this.frame.width
            this.height = this.frame.height
        }

        getFrameByKeys(...keys){
            let flag = false
            for(const frame of this.frames){
                flag = true
                for(const key of keys){
                    if(!frame.keys.includes(key)){
                        flag = false
                        break
                    }
                }
                if (flag){
                    return frame
                }
            }
        }

        tick(timestamp){
            if (this.animation && GameEngine.Util.delay(this.animation + this.uid, this.frameDelay)){
                const { keys } = this.animations[this.animation]
                this.emit('frameUpdate', this)
                this.frameNumber = (this.frameNumber + 1) % keys.length
                this.setFrameByKeys(...keys[this.frameNumber])
            }
            this.x += this.velocity.x
            this.y += this.velocity.y
        }
        //функция отрисовки изображения, берет канвас и контекст и пытаеться отрисовать картинку
        draw (canvas, context){
            super.draw(()=>{
            //save() сохраняет текстуру
            context.save()
            //.translate() перемещает x, y
            context.translate(this.x, this.y)
            //поворот
            context.rotate(-this.rotation)
            //масштаб
            // context.scale(this.scaleX, this.scaleY)
            console.log(this.texture)

            if(this.texture){
                context.drawImage(
                    //Та текстура которую надо отрисовать
                    this.texture,
                    //Кординаты части картинки(фрейма)
                    this.frame.x,                
                    this.frame.y,
                    this.frame.width,                
                    this.frame.height,
                    //Координаты где надо отобразить
                    this.absoluteX - this.x,
                    this.absoluteY - this.y,
                    this.width * this.scaleX,
                    this.height * this.scaleY
                )
            }
            
            context.restore()
            })
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Sprite = Sprite
})();