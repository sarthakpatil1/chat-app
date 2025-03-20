const socket = io('http://localhost:3000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById(messageInp);
const messageContainer = document.querySelector(".container");

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message)
    messageInp.value = ''

})

const namee = prompt("Enter your Name to join: ");
socket.emit('new-user-joined', namee)

socket.on('user-joined', namee =>{
    append(`${namee} joined the chat`, 'right')
})

socket.on('receive', data =>{
    append(`${data.namee}: ${data.message}`, 'left')
})

socket.on('left', namee =>{
    append(`${namee} left the chat`, 'left')
})

