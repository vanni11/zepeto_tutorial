import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Rotator extends ZepetoScriptBehaviour {

    public rotatorX: number = 0;
    public rotatorY: number = 0;
    public rotatorZ: number = 0;

    Start() {    

    }

    Update() {
        this.transform.Rotate(this.rotatorX, this.rotatorY, this.rotatorZ);
    }

}