/*system that controls the Player's entity*/
import {System } from "/ecsy-two/node_modules/ecsy/build/ecsy.module.js";
import {Player,Wall, Live } from "../Components/componet.js";
import { gameCounter} from '../game.js'

class GameOverSystem extends System {
  execute(delta, time)
  {
    let currentLive = gameCounter.getMutableComponent(Live)
    if(currentLive.value < 0)
    {
        this.queries.player.results.forEach(entity =>{
            entity.remove()
        })
        this.queries.wall.results.forEach(entity_wall =>{
            entity_wall.remove()
        })
    }
  }
}
/*defining a query containing all the entities that have components we want to manipulate or iterate*/
GameOverSystem.queries = {
    player: {components: [Player]},
    wall: {components: [Wall]}
}
  
export {GameOverSystem}  