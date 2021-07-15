/*system that controls the Player's entity*/
import {System } from "/ecsy-two/node_modules/ecsy/build/ecsy.module.js";
import {Player, Wall, HasCollidedWithPlayer } from "../Components/componet.js";
import {Sprite,FilledSprite}  from '/ecsy-two/src/index.js'

class ColliosionSystem extends System {
    execute(delta, time)
    {
        this.queries.player.results.forEach(entity => {
            let playerSprite = entity.getComponent(Sprite)  
            this.queries.wall.results.forEach(entity_wall =>{
                let wallSprite = entity_wall.getComponent(Sprite)
                let wallColour = entity_wall.getMutableComponent(FilledSprite)
                let hascollision = entity_wall.getMutableComponent(HasCollidedWithPlayer)
                if(
                    wallSprite.x < playerSprite.x + playerSprite.width &&
                    wallSprite.x + wallSprite.width >= playerSprite.x &&
                    wallSprite.y <= playerSprite.y + playerSprite.height &&
                    wallSprite.y + wallSprite.height >= playerSprite.y 
                )
                {
                    if(hascollision.value !== 1)
                    {
                        wallColour.color="red"
                        hascollision.value = 1
                    }
                }
            })
        });
    }
}
/*defining a query containing all the entities that have components we want to manipulate or iterate*/
ColliosionSystem.queries = {
    player: {components: [Player, Sprite]},
    wall: {components: [Wall, Sprite, FilledSprite, HasCollidedWithPlayer]}
}

export {ColliosionSystem}