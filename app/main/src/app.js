var currentContent = "";

function createChat(textArea) {
    const newChat = document.createElement("div");
    newChat.className = "bg-secondary rounded-4 d-inline-block px-3 py-1 my-1";
    newChat.textContent = currentContent;
    newChat.style = "white-space: pre-wrap";
    textArea.appendChild(newChat);
    currentContent.textContent = "";
    document.getElementById("logo").classList.add("d.none");
}

document.addEventListener("DOMContentLoaded", () => {
    const textArea = document.getElementById("text_output_area");
    const input = document.getElementById("text_input");
    const sendButton = document.getElementById("send_button");

    sendButton.addEventListener("touchend", (event) => {
        if (input.value == "") return;
        input.value = "";
        input.blur();
        createChat(textArea);
    })
    
    sendButton.addEventListener("mousedown", (event) => {
        if (input.value == "") return;
        input.value = "";
        input.blur();
        createChat(textArea);
    })

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
    })
});
