console.log("coucou");
if(!autoMessageContent){
    var autoMessageContent;
}
autoMessageContent = document.getElementsByClassName("composer-inbox");
if(lang==="FR"){
    $('.submenu__sections')[0].insertAdjacentHTML('beforeend','<div id="autoMessageContentFR" hidden="true"></div>');
    $('#autoMessageContentFR')[0].insertAdjacentHTML('beforeend',autoMessageContent[0].outerHTML);
    console.log("FR content message",$('#autoMessageContentFR'));
}
if(lang==="EN"){
    $('.submenu__sections')[0].insertAdjacentHTML('beforeend','<div id="autoMessageContentEN" hidden="true"></div>');
    $('#autoMessageContentEN')[0].insertAdjacentHTML('beforeend',autoMessageContent[0].outerHTML);
    console.log("EN content message",$('#autoMessageContentEN'));
}






