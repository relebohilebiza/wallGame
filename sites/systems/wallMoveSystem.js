/*system to move rectagle wall shape entities */
import {System } from "/ecsy-two/node_modules/ecsy/build/ecsy.module.js";
import {Sprite} from '/ecsy-two/src/index.js'
import {Velocity, Wall } from '../Components/componet.js';
import {CANVASHEIGHT,SHAPE_HALF_SIZE} from '../Constants/constant.js';

class WallMoveSystem extends System {
  /*This method will get called on every frame by default*/
  execute(delta, time) {
    /*Iterate through all the entities on the query*/
    this.queries.moving.results.forEach(entity => {
      let velocity = entity.getComponent(Velocity);
      let sprite = entity.getMutableComponent(Sprite);
      sprite.y += velocity.value* delta;
      if (sprite.y > CANVASHEIGHT + SHAPE_HALF_SIZE + 10) entity.remove();
    });
  }
}
/*defining a query containing all the entities that have components we want to manipulate or iterate*/
WallMoveSystem.queries = {
  moving: {
    components: [Velocity, Sprite, Wall]
  }
}

export {WallMoveSystem}