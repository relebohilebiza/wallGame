/*system that controls the Player's entity*/
import {System } from "/ecsy-two/node_modules/ecsy/build/ecsy.module.js";
import {HasCollidedWithPlayer, Live } from "../Components/componet.js";
import { gameCounter} from '../game.js'

class LiveCountSystem extends System {
  execute(delta, time)
  {
    this.queries.collision.results.forEach(entity_collision =>{
      let collisionCount = entity_collision.getComponent(HasCollidedWithPlayer) 
      this.queries.live.results.forEach(entity => {
        let currentLives = gameCounter.getMutableComponent(Live)
        if(collisionCount.value ===1)
        {
          currentLives.value --;
          entity_collision.removeComponent(HasCollidedWithPlayer, true)
        }
      })
    });
  }
}
/*defining a query containing all the entities that have components we want to manipulate or iterate*/
LiveCountSystem.queries = {
  collision: {components: [HasCollidedWithPlayer]},
  live: {components: [Live]}
}
  
export {LiveCountSystem}  