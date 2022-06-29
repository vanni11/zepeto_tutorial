import { Collider, Color, Quaternion, Time, Vector3, WaitForSeconds } from 'UnityEngine';
import { Text } from 'UnityEngine.UI';
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class GameComplete extends ZepetoScriptBehaviour {

    private zepetoCharacter: ZepetoCharacter;
    public complete_text: Text;

    Start() {    
        //제페토 캐릭터가 정상적으로 생성되는지 리스너가 듣고있다가, 그 로컬플레이어를 this.zepetoCharacter 변수에 넣음
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(()=>{
            this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        });
    }

    OnTriggerEnter(collider: Collider) {
        if(this.zepetoCharacter == null || collider.gameObject != this.zepetoCharacter.gameObject){
            return;
        }

        // Teleport
        this.zepetoCharacter.Teleport(new Vector3(0,0,0), Quaternion.identity);
        console.log("Teleport Complete!");

        // Show complete_text
        this.complete_text.color = new Color(this.complete_text.color.r, this.complete_text.color.g, this.complete_text.color.b, 1);
        this.StartCoroutine(this.DoRoutine());

    }

    *DoRoutine () {
        while(this.complete_text.color.a >= 0) {
            yield null;
            this.complete_text.color = new Color(this.complete_text.color.r, this.complete_text.color.g, this.complete_text.color.b, this.complete_text.color.a - 0.05);
            yield new WaitForSeconds(0.05);
        }
    }

    // // 업데이트에 넣는거보다 따로 만드는게 나을거같아서 삭제
    // // Fixed로 바꾸니까 되긴하는데 바로 이동안됨 (로그가 두세번 찍힘)
    // FixedUpdate() {
    //     if(this.zepetoCharacter == null) {
    //         return;
    //     }

    //     if(this.zepetoCharacter.transform.position.y < -10) {
    //         this.zepetoCharacter.Teleport(new Vector3(0,0,0), Quaternion.identity);
    //         console.log("Boundary Out!");
    //     }
    // }
}