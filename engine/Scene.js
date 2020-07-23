;(function(){
    'use strict'

    class Scene extends GameEngine.Container{
        constructor(args){
            super()
            this.name = args.name || ''
            this.autoStart = args.autoStart || false
            this.status = 'waiting'
            this.stage = this.displayObjects

            if(args.loading){
                this.loading = args.loading.bind(this)
            }
            if(args.init){
                this.init = args.init.bind(this)
            }
            if(args.update){
                this.update = args.update.bind(this)
            }
            if(args.beforeDestroy){
                this.beforeDestroy = args.beforeDestroy.bind(this)
            }
        }

        loading () {}
        init () {}
        update () {}
        beforeDestroy(){
            // for(const key of Object.keys(this)){
            //     delete this[key]
            // }
        }
    }
    
    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Scene = Scene
})();