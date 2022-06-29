import { Time } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Mover extends ZepetoScriptBehaviour {

    public movingTime: number = 1;
    public movingRangeX: number = 0;
    public movingRangeY: number = 0;
    public movingRangeZ: number = 0;
    public delta: number = 0;
    public movingFlag: boolean = true;

    Update() {
        this.delta += Time.deltaTime;
        if(this.delta >= this.movingTime) {
            this.delta = 0;
            this.movingFlag = !this.movingFlag;
        }

        if(this.movingFlag) {
            this.transform.Translate(this.movingRangeX * Time.deltaTime, this.movingRangeY * Time.deltaTime, this.movingRangeZ * Time.deltaTime)
        } else {
            this.transform.Translate(-1 * this.movingRangeX * Time.deltaTime, -1 * this.movingRangeY * Time.deltaTime, -1 * this.movingRangeZ * Time.deltaTime)
        }
    }

}