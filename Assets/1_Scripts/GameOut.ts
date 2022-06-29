import { Collider, Quaternion, Vector3 } from 'UnityEngine';

import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class GameOut extends ZepetoScriptBehaviour {

    private zepetoCharacter: ZepetoCharacter;


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
        console.log("Game Out!");
    }
}

/*
- 점프 후 GameOut 닿았을때 -> 정상작동
- 걷기 후 GameOut 닿았을때 -> 바닥뚫고 지나감
github 문의를 보니 Animator 관련 문제라고 했고 이슈고쳤다고 했는데 여전히 안됨

아래로 통과 못하도록 벽만드는것으로 임시해결
*/