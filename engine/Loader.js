;(function (){
    'use strict'

//Обозначил класс загрузчика
    class Loader{
        //Конструктор сбирает переменные со свойствами
        constructor(){
            //Очередь загрузки
            this.loadOrder = {
                images: [],
                jsons: [],
                sounds: []
            }
            //Загруженные ресурсы
            this.resources = {
                images: {},
                jsons: {},
                sounds: {}
            }
        }
        //Функция добавления в очередь загрузки картинки
        addImage(name, src){
            this.loadOrder.images.push({ name,src })
        }
        //Функция добавления в очередь загрузки json файла
        addJson(name, address){
            this.loadOrder.jsons.push({ name,address })
        }
        addSound(name, src){
            this.loadOrder.sounds.push({ name,src })
        }
        //Возвращаем обьект по имени
        getImage (name) {
            return this.resources.images[name]
        }

        //Возвращаем обьект по имени
        getJson (name) {
            return this.resources.jsons[name]
        }
        getSound (name) {
            return this.resources.sounds[name]
        }

        //Загрузчик
        load (callback){
            //Массив обещаний(примисов)
            const promises = []
            //Перебор очереди загрузки по картинкам
            for(const imageData of this.loadOrder.images){
                const {name, src} = imageData
                const promise = Loader
                    .loadImage(src)
                    .then(image =>{
                        this.resources.images[name] = image
                        if (this.loadOrder.images.includes(imageData)){
                            const index = this.loadOrder.images.indexOf(imageData)
                            this.loadOrder.images.splice(index, 1)
                        }
                    })
                promises.push(promise)
            }
            //Перебор очереди загрузки по json
            for(const jsonsData of this.loadOrder.jsons){
                const {name, address} = jsonsData
                const promise = Loader
                    .loadJson(address)
                    .then(json =>{
                        this.resources.jsons[name] = json
                        if (this.loadOrder.jsons.includes(jsonsData)){
                            const index = this.loadOrder.jsons.indexOf(jsonsData)
                            this.loadOrder.jsons.splice(index, 1)
                        }
                    })
                promises.push(promise)
            }
            for(const soundData of this.loadOrder.sounds){
                const {name, src} = soundData
                const promise = Loader
                    .loadSound(src)
                    .then(audio =>{
                        this.resources.sounds[name] = audio
                        if (this.loadOrder.sounds.includes(soundData)){
                            const index = this.loadOrder.sounds.indexOf(soundData)
                            this.loadOrder.sounds.splice(index, 1)
                        }
                    })
                promises.push(promise)
            }
            //После того как все обещания выполнены вызываю колбек функцию
            Promise.all(promises).then(() => callback())

        }
        //Статический метод для json файлов
        static loadJson (address){
            return new Promise((resolve, reject) =>{
                //фетч запрос для json являеться промисом
                fetch(address)
                    .then(result => result.json())
                    .then(result => resolve(result))
                    .catch(err => reject(err))
            })
        }
        //Статический метод для картинок
        static loadImage (src){
            return new Promise((resolve, reject) => {
                try{
                    const image = new Image
                    image.onload = () => resolve(image)
                    image.src = src
                }
                catch(err){
                    reject(err)
                }
            })
        }
        static loadSound (src) {
            return new Promise((resolve, reject) => {
                try{
                    const audio = new Audio
                    audio.addEventListener('canplaythrough',()=> resolve(audio))
                    audio.src = src

                    
                }
                catch(err){
                    reject(err)
                }
            })
        }
    }
    
    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Loader = Loader
})();