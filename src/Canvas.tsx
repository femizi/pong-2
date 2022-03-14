import React, { useRef, useEffect, useState } from 'react'
import Score from './Score'


const Canvas = ({ gameStart }) => {
    let testScore2 = useRef<HTMLDivElement>()
    let testScore1 = useRef<HTMLDivElement>()
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef(null)
    const VELOCITY_INCREASE = 0.00001
    class Vec {
        y: number;
        x: number;
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y
        }
        get len() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }
        set len(value) {
            const fact = value / this.len
            this.x *= fact
            this.y *= fact
        }
    }
    class Rect {
        pos: Vec;
        size: Vec;
        constructor(w, h) {
            this.pos = new Vec
            this.size = new Vec(w, h)
        }
        get left() {
            return this.pos.x - this.size.x / 2
        }
        get right() {
            return this.pos.x + this.size.x / 2
        }
        get top() {
            return this.pos.y - this.size.y / 2
        }
        get bottom() {
            return this.pos.y + this.size.y / 2
        }
    }
    class Player extends Rect {
        score: number;
        constructor() {
            super(20, 100)
            this.score = 0

        }
    }
    class Ball extends Rect {
        vel: Vec;

        constructor() {
            super(10, 10)
            this.vel = new Vec
        }
    }




    const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, hue: string, saturation: string) => {
        // ctx.globalAlpha = 0.5;
        const VELOCITY_INCREASE = 0.00001
        const INITIAL_VELOCITY = 0.0045


        class Pong {
            _canvas: any;
            context: any;
            ball: Ball;
            players: Player[];
            velocity: number;
            constructor(canvas) {
                this._canvas = canvas;
                this.context = ctx
                this.ball = new Ball
                this.velocity = INITIAL_VELOCITY



                this.players = [
                    new Player,
                    new Player,

                ]
                this.players[0].pos.x = 40
                this.players[1].pos.x = this._canvas.width - 40
                this.players.forEach(players => {
                    players.pos.y = this._canvas.height / 2

                });
                let lastTime
                const callback = (mills?: number) => {
                    if (lastTime) {
                        this.update((mills / lastTime * 1000))
                    }
                    lastTime = mills

                    requestAnimationFrame(callback)
                }
                callback()
                this.reset()


            }

            randomNumberBetween(min: number, max: number) {
                return Math.random() * (max - min) + min
            }
            collide(player: Player, ball: Ball) {
                if (player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top) {
                    ball.vel.x = - ball.vel.x
                }
            }
            draw() {
                // drawbackground
                this.context.fillStyle = `hsl(${hue}, ${saturation}, 20%)`;
                this.context.fillRect(0, 0, this._canvas.width, this._canvas.height)
                // draw ball
                this.drawRect(this.ball)
                // draw paddles for each player in array
                this.players.forEach(player => this.drawRect(player));
            }
            drawRect(rect: Rect) {
                this.context.fillStyle = `hsl(${hue}, ${saturation}, 70%)`
                this.context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y)

            }

            reset() {
                this.velocity = INITIAL_VELOCITY
                this.ball.pos.x = this._canvas.width / 2
                this.ball.pos.y = this._canvas.height / 2
                this.ball.vel.x = 0
                this.ball.vel.y = 0

             

            }
            start(delta) {
                if (this.ball.vel.x === 0 && this.ball.vel.y === 0 && gameStart === true) {
                    this.velocity = INITIAL_VELOCITY


                    this.ball.vel.x = this.velocity * (Math.random() > .5 ? 1 : -1)
                    this.ball.vel.y = this.velocity * (Math.random() * 2)

                    let floatHue = parseFloat(hue)
                    let rotatedHue = floatHue + delta * 0.01
                    hue = rotatedHue.toString()
                }


            }
            update(delta: number) {


                this.ball.pos.x += this.ball.vel.x * delta
                this.ball.pos.y += this.ball.vel.y * delta
                this.velocity += VELOCITY_INCREASE




                if (this.ball.left < 0 || this.ball.right > this._canvas.width) {
                    let playerId: number;
                    if (this.ball.vel.x < 0) {
                        playerId = 1
                    } else {
                        playerId = 0
                    }
                    if (playerId === 0) {
                        testScore1.current.textContent=( parseInt(testScore1?.current?.textContent) + 1).toString()
                    } else if (playerId === 1) {
                       testScore2.current.textContent= (parseInt(testScore2?.current?.textContent) + 1).toString()
                    }
                    this.players[playerId].score++

                    this.reset()


                }
                if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
                    this.ball.vel.y = -this.ball.vel.y
                }
                

                this.players.forEach(player => this.collide(player, this.ball));
                this.draw()
                this.start(delta)
            }
        }


        const pong = new Pong(canvas)

        console.log(pong)
       
        canvas.addEventListener('keydown', event =>
        {
            // if up arrow hit & top of paddle is below top header
            if (
               event.keyCode === 38 
               && pong.players[1].top > 0
               
            ) {
                // player 2 paddle up
                pong.players[1].pos.y -= 20; 
                
            } else if (
               event.keyCode === 40 && pong.players[1].bottom < window.innerHeight
           
            ) {
               // if down arrow is hit and at the bottom of the window
            //    player 2 paddle down
               pong.players[1].pos.y += 20; 
               

            } else if ( event.keyCode === 87 
                && pong.players[0].top > 0){
                    pong.players[0].pos.y -= 20; 

            }else if(  event.keyCode === 83 && pong.players[1].bottom < window.innerHeight){
                pong.players[0].pos.y += 20; 
            }
         });
        

    }



    useEffect(() => {

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        let hue = "200"
        let saturation = "50%"
        draw(context, canvas, hue, saturation)
    }, [draw])

    return (
        <div className='container' ref={containerRef} >
            <div className="score">
                <div id="player-score" ref={testScore1} >0</div>
                <div ref={testScore2} id="computer-score">0</div>
            </div>
            <canvas tabIndex={0} ref={canvasRef} />
        </div>
    )
}


export default Canvas