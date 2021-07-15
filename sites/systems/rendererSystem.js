/* system to render sprites in our canvas*/
import {System  } from "/ecsy-two/node_modules/ecsy/build/ecsy.module.js";
import {Canvas} from '/ecsy-two/src/index.js';
import {Score, Live} from '../Components/componet.js'; 
import {singletonEntity, gameCounter} from '../game.js'  

class RendererSystem extends System {
  /* This method will get called on every frame by default*/
  execute(delta, time) {
    this.queries.canvas.results.forEach(entity => {
     let canvas = singletonEntity.getMutableComponent(Canvas)
    /* Iterate through all the entities on the query*/
     this.queries.score.results.forEach(entity => {
       let score = gameCounter.getComponent(Score)
       let live = gameCounter.getComponent(Live)
       let liveDisplay = live.value
       if(live.value < 0)
       {
        liveDisplay = 0
        this.draw_gameover(canvas,score)
       }
       this.draw_score(canvas,score, liveDisplay)
      });
    });
  }
  draw_score(canvas, score, liveDisplay) {
    let ctx = canvas.dom.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.font = "50px Arial"
    ctx.fillText("Score: "+score.value, 30, 70)
    ctx.fillText("Lives: "+liveDisplay, 660, 70)
  }
  draw_gameover(canvas, score) {
    let ctx = canvas.dom.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.font = "90px Arial"
    ctx.fillText("GameOver !", 160, 600)
    ctx.fillText("Score: "+score.value, 210, 800)
    
  }
}
/*defining a query containing all the entities that have components we want to manipulate or iterate*/
RendererSystem.queries = {
  canvas: { components: [Canvas]},
  score: {components: [Score, Live]}
}

export {RendererSystem}
