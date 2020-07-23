const DEBUG_MODE = false

const {Sprite, Game, Scene, Point, Line, Container, Body, Util, ArcadePhysics} = GameEngine

const game = new Game({
    el: document.body,
    width: 650,
    height: 650,
    background: 'black',
    scenes: [
        new Intro({autoStart: false}),
        new Party({autoStart: true}),
    ],
})

const mouse = new GameEngine.Mouse()
    