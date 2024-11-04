var currentContent = "";

function createChat(textArea) {
    const header = document.getElementById("logo");
    const title = document.getElementById("title");
    const newChat = document.createElement("div");
    newChat.className = "bg-secondary rounded-4 d-inline-block px-3 py-1 my-1";
    newChat.textContent = currentContent;
    newChat.style = "white-space: pre-wrap";
    textArea.appendChild(newChat);
    currentContent = "";
    title.classList.remove("bg-secondary");
    header.classList.add("no_move");
    header.classList.add("hide");
    header.classList.remove("floating");
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
