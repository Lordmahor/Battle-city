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
            //frame - Область картинки с координатами и шириной, высотой - часть того что загрузили
            const frame = args.frame || {}
            this.frame = {
                x: frame.x || 0,
                y: frame.y || 0,
                width: frame.width || texture.width,
                height: frame.height || texture.height
            }
            if(args.width === undefined){
                this.width = this.frame.width
            }
            if(args.height === undefined){
                this.height = this.frame.height
            }
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
            context.scale(this.scaleX, this.scaleY)
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
                this.width,
                this.height
            )
            context.restore()
            })
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Sprite = Sprite
})();