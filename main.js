console.log("coucou");
if(!autoMessageContent){
    var autoMessageContent;
}
autoMessageContent = document.getElementsByClassName("composer-inbox");
$('.submenu__sections')[0].insertAdjacentHTML('beforeend','<div id="autoMessageContent" hidden="true"></div>');
$('#autoMessageContent')[0].insertAdjacentHTML('beforeend',autoMessageContent[0].outerHTML);
console.log("coucou",$('#autoMessageContent'));





