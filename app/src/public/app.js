var currentContent = "";
var testing = false;

async function communicateWithBackend(chatMessage) {
    if (testing) {
        console.log("Testing is on. Message not sent to API.");
        return "Testing is on. Turn off test and try again.";
    }

    try {
        const response = await axios.post('http://localhost:8000/chat', {
            userMessage: chatMessage
        });
        return response.data.response; // Correctly return the response
    } catch (error) {
        console.error('Error: ', error);
        throw error; // Optionally rethrow the error if you want the caller to handle it
    }
}

function createBotChat(msg) {
    const responseChatArea = document.createElement("div");
    responseChatArea.className = "d-inline-block px-3 py-1 my-1 ms-auto rounded bg-black";
    const responseChat = document.createElement("div");
    responseChat.innerText = msg;
    responseChat.className = "text-light";
    responseChatArea.appendChild(responseChat);
    return responseChatArea;
}

async function createChat(textArea) {
    const header = document.getElementById("logo");
    const title = document.getElementById("title");
    const newChat = document.createElement("div");
    newChat.className = "bg-secondary rounded-4 d-inline-block px-3 py-1 my-1";
    newChat.textContent = currentContent;
    newChat.style = "white-space: pre-wrap";
    textArea.appendChild(newChat);
    title.classList.remove("bg-secondary");
    header.classList.add("no_move");
    header.classList.add("hide");
    header.classList.remove("floating");

    const loading = createBotChat("Coming up with response...");
    textArea.appendChild(loading);

    try{
        const botMsg = await communicateWithBackend(currentContent);
        textArea.removeChild(loading);
        textArea.appendChild(createBotChat(botMsg));
    } catch (error) {
        console.log("Error occurred while generating response: " + error);
        textArea.appendChild(createBotChat("Something went wrong. Please try again."));
    }
    // textArea.appendChild(createBotChat("hi there i am bot", textArea));
    currentContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const textArea = document.getElementById("text_output_area");
    const input = document.getElementById("text_input");
    const sendButton = document.getElementById("send_button");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    });

    const hiddenElements = document.querySelectorAll("hide");
    hiddenElements.forEach((el) => observer.observe(el));

    sendButton.addEventListener("touchend", (event) => {
        if (input.value == "") return;
        input.value = "";
        input.blur();
        createChat(textArea);
    });
    
    sendButton.addEventListener("mousedown", (event) => {
        if (input.value == "") return;
        input.value = "";
        input.blur();
        createChat(textArea);
    });

    input.addEventListener("input", (event) => {
        currentContent = event.target.value;
    });

    input.addEventListener("keydown", (event) => {
        if(input.value == "") return;
        if(event.key == "Enter" && (event.ctrlKey || event.metaKey)) {
            input.value = "";
            input.blur();
            createChat(textArea);
        }
    });
});
