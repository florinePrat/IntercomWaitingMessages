async function sendAutoMessageTo(conversation,alreadyContacted,autoMessageContentFR,autoMessageContentEN){
    //   $('.conversation__card__header')[index].click();
    console.log("auto message function called")
    conversation.click();
    await  sleep(2000);
    console.log("auto message content get : ",autoMessageContent)
    console.log($(".composer-inbox"))
    await sleep(2000);
    if(isFrench()){
        $(".composer-inbox")[$(".composer-inbox").length-1].prepend(autoMessageContentFR[0]);
    } else {
        $(".composer-inbox")[$(".composer-inbox").length-1].prepend(autoMessageContentEN[0]);
    }
    await sleep(2000);
    console.log("send button is : ",$(".o__primary.btn"))
    $(".o__primary.btn")[0].click();
    alreadyContacted.push(conversation);
    console.log("already contacted after sending a message",alreadyContacted)
    return alreadyContacted;
}

function isFrench() {
    console.log("element : ",$($(".kv__pair")[1]).children().children().children())
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
        console.log(isFrench());
        //await sendAutoMessageTo(conversations[1]);
        if(!previousLastConversation){
            previousLastConversation = conversations[conversations.length-1];
            console.log("premiere conv recup", conversations)
        }
        else
        {
            console.log("verif premiere conv");
            i=conversations.length-1;
            while(previousLastConversation==conversations[i]){
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

