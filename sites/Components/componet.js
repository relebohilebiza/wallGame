/*Components shape the data you need to use in your application. Data is only stored in components*/
import {Component, TagComponent, Types } from "/ecsy-two/node_modules/ecsy/build/ecsy.module.js";

class Velocity extends Component {}
Velocity.schema = {
  value: { type: Types.Number, default:0.1 }
}

class SpawnTimer extends Component {}
SpawnTimer.schema = {
  value: { type: Types.Number, default: 5.0 }
};

class SpawnRandom extends Component {}
SpawnRandom.schema = {
  value: { type: Types.Number, default: 5 }
}

class Live extends Component {}
Live.schema = {
  value: {type: Types.Number, default: 3}
}

class HasCollidedWithPlayer extends Component {}
Live.schema = {
  value: {type: Types.Number, default: 0}
}

class Score extends Component {}
Score.schema = {
  value: {type: Types.Number, default: 0}
}

class ScoreControl extends Component {}
ScoreControl.schema = {
  value: {type: Types.Number, default:3000.00}
}

class Renderable extends TagComponent {}

class Wall extends TagComponent {}

class Player extends TagComponent {}



export {Velocity, Renderable, SpawnTimer, SpawnRandom, Wall, Player, HasCollidedWithPlayer, Live, Score, ScoreControl}