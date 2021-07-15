/*system that controls the Player's entity*/
import {System } from "/ecsy-two/node_modules/ecsy/build/ecsy.module.js";
import {Score, ScoreControl, Live } from "../Components/componet.js";
import { gameCounter} from '../game.js'

class ScoreSystem extends System {
  execute(delta, time)
  {
    this.queries.score.results.forEach(entity =>{
      let scoreCount = gameCounter.getMutableComponent(ScoreControl)
      let currentScore = gameCounter.getMutableComponent(Score)
      let currentLive = gameCounter.getMutableComponent(Live)
      scoreCount.value -= delta
      if(scoreCount.value <= 0)
      {
        scoreCount.value = 500.0
        if(currentLive.value >= 0)
        {
          currentScore.value ++;
        }
      }
    });
  }
}
/*defining a query containing all the entities that have components we want to manipulate or iterate*/
ScoreSystem.queries = {
  score: {components: [Score, ScoreControl]}
}
  
export {ScoreSystem}  