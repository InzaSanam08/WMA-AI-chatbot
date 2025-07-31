var inPutBox = document.getElementById("prompt");
var chatContainer = document.querySelector(".chat-container");
var deleteBtn = document.getElementById("delete");
var submitBtn = document.getElementById("submit");

// Prompts list (jo aap chahen yahan add kar sakte hain)
var prompts = [
    "hi",
    "hello",
    "how are you",
    "are you a bot?",
    "bye",
    "i'm bored",
    "are you human?",
    "are you real?",
    "where are you located?",
    "what's your name?"
];

// Modal me prompts show karna
document.addEventListener("DOMContentLoaded", function () {
    var promptsList = document.getElementById("prompts-list");
    var inPutBox = document.getElementById("prompt");
    if (promptsList) {
        prompts.forEach(function (prompt) {
            var li = document.createElement("li");
            li.className = "list-group-item list-group-item-action bg-dark text-white";
            li.style.cursor = "pointer";
            li.textContent = prompt;
            li.onclick = function () {
                inPutBox.value = prompt;
                // Modal band karne ke liye (Bootstrap 5)
                var modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('promptModal'));
                modal.hide();
                inPutBox.focus();
            };
            promptsList.appendChild(li);
        });
    }
});

function sendMassage(event) {
    if (event.key === "Enter" && inPutBox.value.trim() !== "") {
        var userMsg = inPutBox.value.trim();
        var userDiv = document.createElement("div");
        userDiv.className = "user-chat-box";

        userDiv.innerHTML = `<div class="user-chat-area">
                <p>${userMsg}</p>
            </div>`;
        chatContainer.appendChild(userDiv);

        var greetings = ['hi', 'hello', 'hey', 'asslam u alaikun', 'hay'];
        var aiDiv = document.createElement("div");
        aiDiv.className = "ai-chat-box";
        if (greetings.indexOf(userMsg.toLowerCase()) !== -1) {

            setTimeout(() => {
                aiDiv.innerHTML = `<img src="img/ai-robot.jpg" alt="AI Image" id="ai-image">
                <div class="ai-chat-area">
                    Hello!! How Can I Help you?  🤖💡
                </div>`;
                chatContainer.appendChild(aiDiv);
            }, 600);


        } 
        else if (userMsg.toLowerCase() === "are you a bot?") {
            setTimeout(() => {
                aiDiv.innerHTML = `<img src="img/ai-robot.jpg" alt="AI Image" id="ai-image">
                <div class="ai-chat-area">
                    I’m a smart digital assistant here to help! 🤖🤖
                </div>`;
                chatContainer.appendChild(aiDiv);
            }, 600);

        }

        else if (userMsg.toLowerCase() === "bye") {
            setTimeout(() => {
                aiDiv.innerHTML = `<img src="img/ai-robot.jpg" alt="AI Image" id="ai-image">
                <div class="ai-chat-area">
                     Goodbye! Have a nice day. 👋😊
                </div>`;
                chatContainer.appendChild(aiDiv);
            }, 600);

        }

        else if (userMsg.toLowerCase() === "how are you") {
            setTimeout(() => {
                aiDiv.innerHTML = `<img src="img/ai-robot.jpg" alt="AI Image" id="ai-image">
                <div class="ai-chat-area">
                   I'm doing great!  😄✨
                </div>`;
                chatContainer.appendChild(aiDiv);
            }, 600);

        }
        else if (userMsg.toLowerCase() === "i'm bored") {
            setTimeout(() => {
                aiDiv.innerHTML = `<img src="img/ai-robot.jpg" alt="AI Image" id="ai-image">
                <div class="ai-chat-area">
                   I'm here to help! What do you want to talk about?💬
                </div>`;
                chatContainer.appendChild(aiDiv);
            }, 600);

        }

        else if (userMsg.toLowerCase() === "are you human?") {
            setTimeout(() => {
                aiDiv.innerHTML = `<img src="img/ai-robot.jpg" alt="AI Image" id="ai-image">
                <div class="ai-chat-area">
                 Not really — but I try my best to sound like one! 🤖😉
                </div>`;
                chatContainer.appendChild(aiDiv);
            }, 600);

        }
        else if (userMsg.toLowerCase() === "are you real?") {
            setTimeout(() => {
                aiDiv.innerHTML = `<img src="img/ai-robot.jpg" alt="AI Image" id="ai-image">
                <div class="ai-chat-area">
                 I’m not real like you, but I’m always here to help. 🤖✨😉
                </div>`;
                chatContainer.appendChild(aiDiv);
            }, 600);

        }

        else if (userMsg.toLowerCase() === "where are you located?") {
            setTimeout(() => {
                aiDiv.innerHTML = `<img src="img/ai-robot.jpg" alt="AI Image" id="ai-image">
                <div class="ai-chat-area">
                 "Main internet ka musafir hoon, jahan tum wahan main! 🌐😉" 📍🏙️
                </div>`;
                chatContainer.appendChild(aiDiv);
            }, 600);

        }
        else if (userMsg.toLowerCase() === "what's your name?") {
            setTimeout(() => {
                aiDiv.innerHTML = `<img src="img/ai-robot.jpg" alt="AI Image" id="ai-image">
                <div class="ai-chat-area">
                You can call me ChefBot! 👨👨‍🍳🤖
                </div>`;
                chatContainer.appendChild(aiDiv);
            }, 600);

        }



        else {
            setTimeout(() => {
                aiDiv.innerHTML = `<img src="img/ai-robot.jpg" alt="AI Image" id="ai-image">
                <div class="ai-chat-area">
                    Sorry, I didn't understand that. 😕 Can you try again?
                </div>`;
                chatContainer.appendChild(aiDiv);
            }, 600);
        }

        inPutBox.value = "";
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

inPutBox.addEventListener("keydown", sendMassage);


// For Enter key
inPutBox.addEventListener("keydown", sendMassage);

// For Submit button click
submitBtn.addEventListener("click", function () {
    const fakeEvent = { key: "Enter" };
    sendMassage(fakeEvent);
});


// Delete all messages
deleteBtn.addEventListener("click", function () {
    chatContainer.innerHTML = "";
    inPutBox.value = "";
});