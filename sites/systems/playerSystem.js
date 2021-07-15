/*system that controls the Player's entity*/
import {System } from "/ecsy-two/node_modules/ecsy/build/ecsy.module.js";
import {Player, Velocity } from "../Components/componet.js";
import {Sprite, InputState, KeyboardState}  from '/ecsy-two/src/index.js'
import {singletonEntity} from '../game.js'



class PlayerSystem extends System {
    execute(delta)
    {
        this.queries.input.results.forEach(entity => {
            let input = singletonEntity.getComponent(InputState)
            this.queries.player.results.forEach(entity =>{
                let sprite = entity.getComponent(Sprite)
                if(input.states.left)
                {
                    sprite.x -= 0.5 * delta
                    if (sprite.x < 0) {
                        sprite.x = 0
                    }
                }   
                if(input.states.right) 
                 {
                    sprite.x +=0.5 * delta
                    if (sprite.x > 210) {
                        sprite.x =210 
                    }
                }   
            })

        });
    }
}
/*defining a query containing all the entities that have components we want to manipulate or iterate*/
PlayerSystem.queries = {
    input: {components: [InputState, KeyboardState]},
    player: {components: [Player, Sprite]}
}

export {PlayerSystem}