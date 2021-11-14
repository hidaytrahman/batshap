function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

function getCurrentTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
}