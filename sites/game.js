/*The game */
import { System, World} from "/ecsy-two/node_modules/ecsy/build/ecsy.module.js";
import {SpawnTimer, SpawnRandom, Player, Velocity, Live, ScoreControl, Score} from './Components/componet.js';   
import {SpawnObstacle} from'./systems/spawnerSystem.js';
import {RendererSystem} from'./systems/rendererSystem.js';
import {WallMoveSystem} from'./systems/wallMoveSystem.js';
import {PlayerSystem} from'./systems/playerSystem.js';
import {ColliosionSystem} from'./systems/collisionSystem.js';
import {LiveCountSystem} from'./systems/liveCountSystem.js';
import {ScoreSystem} from'./systems/scoreSystem.js';
import {GameOverSystem} from'./systems/gameOverSystem.js';
import ECSYTWO, {
  BackgroundFill, Canvas, Layer,FilledSprite
  ,Sprite,InputState,KeyboardState,
  GamepadSystem, SimpleGamepadState,
} from '/ecsy-two/src/index.js'


/*create a new world*/
let world = new World()
ECSYTWO.initialize(world) 

/*crate enity for our display*/
let singletonEntity = world.createEntity()
  .addComponent(Canvas, {width: 290 , height: 500, pixelMode:true, scale: 3})
  .addComponent(BackgroundFill, {color: 'black'})
  .addComponent(InputState)
  .addComponent(KeyboardState)
  .addComponent(SimpleGamepadState)

/*create entity to control our user imporntact data*/
let gameCounter = world.createEntity()
  .addComponent(SpawnTimer, {value:3000.00})
  .addComponent(SpawnRandom, {value:1})
  .addComponent(Live, {value:3})
  .addComponent(ScoreControl,{value: 5000.00})
  .addComponent(Score, {value:0})

/*create a front layer for the palyer*/
world.createEntity().addComponent(Layer, {name: "front", depth:100})

world.createEntity()
  .addComponent(Player) 
  .addComponent(Sprite, {x:95, y: 350, width: 35, height: 13, layer:"front"})
  .addComponent(FilledSprite, {color:'green'})
  
//================
  
//================

/*Register compontes and systems to add them to the wworld*/
world
  .registerSystem(GamepadSystem)
  .registerSystem(PlayerSystem)
  .registerSystem(SpawnObstacle)
  .registerSystem(RendererSystem)
  .registerSystem(LiveCountSystem)
  .registerSystem(WallMoveSystem)
  .registerSystem(ColliosionSystem)
  .registerSystem(ScoreSystem)
  .registerSystem(GameOverSystem);

 
/*start the main game loop*/
ECSYTWO.start(world)

/*expose the world variable out so that the systems can reference it*/
export {world,singletonEntity, gameCounter}