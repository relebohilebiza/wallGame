/*system to create new rectagle shape entities our world (game) */
import {System } from "/ecsy-two/node_modules/ecsy/build/ecsy.module.js";
import {FilledSprite, Sprite} from '/ecsy-two/src/index.js'
import {Velocity, Renderable, SpawnTimer, SpawnRandom, Wall, HasCollidedWithPlayer, Live} from '../Components/componet.js';  
import {world,gameCounter} from '../game.js';
import {SPACE_TO_JUMP} from '../Constants/constant.js';

class SpawnObstacle extends System {
    /* This method will get called on every frame by default*/
    execute (delta){
        this.queries.spawner.results.forEach(entity => {
            let spawnTimer = entity.getMutableComponent(SpawnTimer)
            let spawnRandom = entity.getMutableComponent(SpawnRandom)
            let currentLive = gameCounter.getMutableComponent(Live)
            spawnTimer.value -= delta
            if(spawnTimer.value <=2.0)
            {
                if(currentLive.value >= 0)
                {
                    spawnTimer.value = 850.0; /*you will decrease this by 200 when speed goes up*/
                    let numberOfSpawned = Math.floor(Math.random() * SPACE_TO_JUMP.length)
                    while(spawnRandom.value == numberOfSpawned){
                       numberOfSpawned =  Math.floor(Math.random() * SPACE_TO_JUMP.length)
                    }
                    const result = SPACE_TO_JUMP.filter((num, i) => i!== numberOfSpawned)
                    result.forEach(x => 
                        world
                        .createEntity()
                        .addComponent(Velocity, {value: 0.08}) /*you will increase this my 0.02 when speed goes up*/
                        .addComponent(Sprite, { x: x, y: 100, width: 95, height: 13}) 
                        .addComponent(FilledSprite, { color: '#0099CC'})
                        .addComponent(Renderable) 
                        .addComponent(Wall) 
                        .addComponent(HasCollidedWithPlayer, {value: 0})
                        );
                    spawnRandom.value = numberOfSpawned
                }
            } 
        });      
    }
}
/*defining a query containing all the entities that have components we want to manipulate or iterate*/
SpawnObstacle.queries = {
    spawner: { components: [SpawnTimer,SpawnRandom] }
}

export {SpawnObstacle}
