// access io to make connection to server
const socket = io();

let name = "User";
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
const userNameField = document.querySelector('.user__name');
const lastOnline = document.querySelector('#last-online');

// Landing action
const landingWrapper = document.querySelector('.landing__wrapper');
const landingForm = document.querySelector('#start-chat-form');
const username = document.querySelector('#username');

landingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(username.value !== '') {
        landingWrapper.remove();

        name = username.value;
        userNameField.innerHTML = name;
        lastOnline.innerHTML = getCurrentTime();
    } else {
        alert('Please enter a name');
    }
});

// focus on textarea
textarea.focus();

// Message for all clients
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

// send message to server
function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    // Append msg to the chat area
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    // send to server
    socket.emit('message', msg);
}

// append message to message area
function appendMessage(msg, type) {
    let messageDiv = document.createElement('div');
    let className = type;
    messageDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    messageDiv.innerHTML = markup;

    messageArea.appendChild(messageDiv);
}


// Receive message from server
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
});


// Currently not working
socket.on('disconnect', (rahman) => {
    console.log(name ,' user connected ', rahman);
});