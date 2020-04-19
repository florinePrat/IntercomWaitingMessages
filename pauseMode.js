async function sendAutoMessageTo(conversation,alreadyContacted,autoMessageContentFR,autoMessageContentEN){
    //   $('.conversation__card__header')[index].click();
    console.log("auto message function called")
    conversation.click();
    const splittedURL = window.location.href.split("/");
    const conversationId = splittedURL[splittedURL.length-1];
    await  sleep(2000);
    const  new_token = Array.from(document.getElementsByTagName('meta')).find(m => m.name === 'csrf-token').content
    await fetch("https://app.intercom.com/ember/conversation_parts", {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9,fr;q=0.8",
            "content-type": "application/json; charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-client-height": "976",
            "x-client-width": "1920",
            "x-csrf-token": new_token,
            "x-embercom-revision-id": "27636",
            "x-embercom-route": "apps.app.inbox.inbox.conversations.conversation",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://app.intercom.com/a/apps/nt4il1tw/inbox/inbox/all/conversations/"+conversationId+"",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": "{\"app_id\":\"nt4il1tw\",\"conversation_id\":\""+conversationId+"\",\"blocks\":" +
            "[{\"type\":\"paragraph\",\"text\":\""+autoMessageContentFR[0].textContent+"\"}],\"admin_id\":\"3411736\",\"type\":\"comment\",\"sub_type\":\"comment\",\"lightweight_reply_type\":null,\"passive\":false,\"created_at\":\"2020-04-19T12:37:02.644Z\",\"text_direction\":\"ltr\",\"client_assigned_uuid\":\"fc949e80-eb3f-4e9e-a58a-8937f2352134\",\"admin_only\":false,\"taggings\":[],\"uploads\":[]" +
            "}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    });
    await sleep(2000);
    alreadyContacted.push(conversation);s
    console.log("already contacted after sending a message",alreadyContacted)
    return alreadyContacted;
}

function isFrench() {
    console.log("lang : ",$($($(".kv__pair")[1]).children().children().children()[1]).attr("data-content"))
   let userLocation =  $($($(".kv__pair")[1]).children().children().children()[1]).attr("data-content");
   return userLocation.includes("France");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function main(){
    console.log("starting pause mode")
    if(!conversations){
        var conversations;
        var previousLastConversation;
        var alreadyContacted=[];
        var i,j;
    }
    j = 0;
    previousLastConversation=0;
    let autoMessageContentFR=$('#autoMessageContentFR').children().children();
    let autoMessageContentEN=$('#autoMessageContentEN').children().children();
    while(paused && j<50){

        console.log("iteration n°",j);
        conversations = document.getElementsByClassName("conversation__card__header");
        //await sendAutoMessageTo(conversations[1]);
        if(!previousLastConversation){
            previousLastConversation = conversations[conversations.length-1];
            console.log("premiere conv recup", conversations)
        }
        else
        {
            console.log("verif premiere conv");
            i=conversations.length-1;
            while(previousLastConversation!==conversations[i]){
                console.log("new message detected ");
                if(alreadyContacted && !alreadyContacted.includes(conversations[i])) {
                    console.log("already contacted : ",alreadyContacted);
                     alreadyContacted = await sendAutoMessageTo(conversations[i],alreadyContacted,autoMessageContentFR,autoMessageContentEN);
                }
                i--
            }
            previousLastConversation = conversations[conversations.length-1];
        }
        await sleep(10000);
        j++
    }
}

main().then(()=>{
    console.log("finished")
});

