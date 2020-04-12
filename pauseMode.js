function sendAutoMessageTo(conversation,alreadyContacted){
 //   $('.conversation__card__header')[index].click();
    console.log(conversation)
    conversation.click();
    sleep(2000);
    autoMessageContent=$('#autoMessageContent').children();
  console.log(autoMessageContent)
    console.log($(".composer-inbox"))
    $(".composer-inbox")[$(".composer-inbox").length-1].prepend(autoMessageContent[0]);
    if(!alreadyContacted){
        var alreadyContacted = [];
    }
    alreadyContacted.push(conversation);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function main(){
    if(!conversations){
        var conversations;
        var lastConversation;
        var previousLastConversation;
        var i,j;
        var autoMessageContent;
    }
    autoMessageContent= localStorage.getItem("autoMessageContent");
    j = 0;
    previousLastConversation=0;
    while(paused && j<50){
        conversations = document.getElementsByClassName("conversation__card__header");
        await sendAutoMessageTo(conversations[1]);
        if(!previousLastConversation){
            previousLastConversation = conversations[conversations.length-1];
            console.log("premiere conv recup", conversations)
        }
        else
        {
            console.log("verif premiere conv");
            i=conversations.length-1;
            console.log(previousLastConversation.innerText!==conversations[i].innerText,"conv : " ,conversations[0]);
            console.log(conversations);
            while(previousLastConversation.innerText!==conversations[i].innerText){
                if(!alreadyContacted.includes(conversations[i])) {
                    console.log(alreadyContacted);
                    sendAutoMessageTo(conversations[i]);
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

