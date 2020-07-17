;(function(){
    'use strict'
    //Множество изображение из Renderera которые надо отрисовать
    //По сути просто класс которые хранит список всех изображений которые надо отрисовать
    //Имеет коллекцию. обьуктов
    //Унаследуем из DisplayObject(коллекции)
    class Container extends GameEngine.DisplayObject{
        constructor (args = {}){
            //Обозначаем коллекцию обьектов
            super(args)
            this.displayObjects = []
            // delete this.width
            // delete this.height
        }
        //Добовление в коллекцию
        add (...displayObjects){
            for(const displayObject of displayObjects){
                if (!this.displayObjects.includes(displayObject)){
                    this.displayObjects.push(displayObject)
                    displayObject.setParent(this)
                }
            }
        }

        tick(timestamp){
            for(const displayObject of this.displayObjects){
                if(displayObject.tick){
                    displayObject.tick(timestamp)
                }
            }
        }
        remove (...displayObjects){
            for (const displayObject of displayObjects){
                if(this.displayObjects.includes(displayObject)){
                    const index = this.displayObjects.indexOf(displayObject)
                    this.displayObjects.splice(index, 1)
                    displayObject.setParent(null)
                }
            }
        }
        //Здесь Метод draw пройдеться по всем своим дочерним элементам и вызовет у них функцию draw(Спрайта)
        draw (canvas, context){
            super.draw(()=>{
            // save() сохраняет текстуру
            context.save()
            //.translate() перемещает x, y
            context.translate(this.x, this.y)
            //поворот
            context.rotate(-this.rotation)
            //масштаб
            context.scale(this.scaleX, this.scaleY)
            for (const displayObject of this.displayObjects){
                displayObject.draw(canvas, context)
            }
            //restore Восстанавливает текстуру
            context.restore()
            })
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Container = Container
})();