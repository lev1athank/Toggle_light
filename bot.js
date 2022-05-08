var x = new XMLHttpRequest();
const time = 2
var id;




function send_request(id = null) {
    var url = "https://api.telegram.org/bot5104688774:AAFZr02MVqTE3shadMVbxQ9c-t9JIWOo_BE/getUpdates"
    if(id) {
        url += '?offset=' +id
    }
    x.open("GET", url, false);
    x.send(null)
    return JSON.parse(x.responseText)
}

const light = document.querySelector("#light")
function toggle_light(state) {
    if(state) 
        light.classList.add("light")
    else
        light.classList.remove("light")
}


function send_user(text) {

    fetch("https://api.telegram.org/bot5104688774:AAFZr02MVqTE3shadMVbxQ9c-t9JIWOo_BE/sendMessage?chat_id=804206736&text="+text)
    fetch("https://api.telegram.org/bot5104688774:AAFZr02MVqTE3shadMVbxQ9c-t9JIWOo_BE/sendMessage?chat_id=804206736&text="+ "доступны команды: 'вкл', 'включить', 'выкл', 'выключить'")
    

    
}

function readMessage() {
    if(!id) {
        list_message = send_request()
        if(list_message['result'].length != 0) {
            id = list_message['result'][list_message['result'].length-1]['update_id']
        }
        else 
            return
    }
    var text = send_request(id)['result']

    if(text.length != 0) {
        id+=1;
        switch (text[0]['message']['text'].toLowerCase()) {
            case "вкл":
                toggle_light(true)
                break;
        
            case "включить":
                toggle_light(true)
                break;

            case "выкл":
                toggle_light(false)
                break;
        
            case "выключить":
                toggle_light(false)
                break;
                
            default:
                send_user("я тебя не понял")
                break;
        }
    }
}


setInterval(()=>readMessage(), 1000 * time)



console.log(123);

//console.log(['result'][2]['message']['text']);

//x.send(null);


