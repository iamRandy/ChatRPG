var currentContent = "";

document.addEventListener("DOMContentLoaded", () => {
    const textArea = document.getElementById("text_output_area");
    const input = document.getElementById("text_input");
    const sendButton = document.getElementById("send_button");

    sendButton.addEventListener("touchend", (event) => {
        if (input.value == "") return;
        input.value = "";
        input.blur();

        const newChat = document.createElement("div");
        newChat.className = "bg-secondary rounded-4 d-inline-block px-3 py-1 my-1";
        newChat.textContent = currentContent;
        textArea.appendChild(newChat);
        currentContent.textContent = "";
    })
    
    sendButton.addEventListener("mousedown", (event) => {
        if (input.value == "") return;
        input.value = "";
        input.blur();

        const newChat = document.createElement("div");
        newChat.className = "bg-secondary rounded-4 d-inline-block px-3 py-1 my-1";
        newChat.textContent = currentContent;
        textArea.appendChild(newChat);
        currentContent.textContent = "";
    })

    input.addEventListener("input", (event) => {
        currentContent = event.target.value;
    });

    input.addEventListener("keydown", (event) => {
        if(input.value == "") return;
        if(event.key == "Enter") {
            input.value = "";
            input.blur();
            
            const newChat = document.createElement("div");
            newChat.className = "bg-secondary rounded-4 d-inline-block px-3 py-1 my-1";
            newChat.textContent = currentContent;
            textArea.appendChild(newChat);
            currentContent.textContent = "";
        }
    })
});
