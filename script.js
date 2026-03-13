document.addEventListener("DOMContentLoaded", function () {

    const pawBtn         = document.getElementById("pawBtn");
    const surpriseScreen = document.getElementById("surpriseScreen");
    const callScreen     = document.getElementById("callScreen");
    const acceptBtn      = document.getElementById("acceptBtn");
    const declineBtn     = document.getElementById("declineBtn");
    const declineWrap    = document.getElementById("declineWrap");
    const callStatus     = document.getElementById("callStatus");
    const mardyBum       = document.getElementById("mardyBum");
    const ringtone       = document.getElementById("ringtone");
    const letterMusic    = document.getElementById("letterMusic");
    const heartBg        = document.getElementById("heartBg");

    // ── Floating hearts ──
    const heartChars = ["💗","💓","💕","🌸","✨","💖","🐱","🐾"];
    for (let i = 0; i < 18; i++) {
        const h = document.createElement("span");
        h.className = "floating-heart";
        h.innerText = heartChars[Math.floor(Math.random() * heartChars.length)];
        h.style.left = Math.random() * 100 + "vw";
        h.style.fontSize = (14 + Math.random() * 18) + "px";
        h.style.animationDuration = (7 + Math.random() * 10) + "s";
        h.style.animationDelay    = (Math.random() * 8) + "s";
        heartBg.appendChild(h);
    }

    // ── Play Mardy Bum on first interaction ──
    document.addEventListener("click", function () {
        mardyBum.volume = 0.4;
        mardyBum.play().catch(() => {});
    }, { once: true });

    document.addEventListener("touchstart", function () {
        mardyBum.volume = 0.4;
        mardyBum.play().catch(() => {});
    }, { once: true });

    // ── Paw button → trigger call ──
    pawBtn.addEventListener("click", function () {
        mardyBum.pause();
        mardyBum.currentTime = 0;

        surpriseScreen.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        surpriseScreen.style.opacity = "0";
        surpriseScreen.style.transform = "scale(0.85)";

        setTimeout(function () {
            surpriseScreen.style.display = "none";
            callScreen.classList.add("show");
            ringtone.volume = 0.7;
            ringtone.play().catch(() => {});
        }, 400);
    });

    // ── Decline shrinks, Accept grows ──
    let clickCount   = 0;
    let declineScale = 1;
    let acceptScale  = 1;

    const declineMessages = [
        "Are you sure? 🥺",
        "It's your birthday today...",
        "I really mean this.",
        "Aisa karogiii Laado 🥺",
        "You deserve something real.",
        "Chal chup chaap haan kr 😤"
    ];

    declineBtn.addEventListener("click", function () {

        // Show message — only while within bounds
        if (clickCount < declineMessages.length) {
            callStatus.style.opacity = 0;
            setTimeout(() => {
                callStatus.innerText = declineMessages[clickCount];
                callStatus.style.transition = "opacity 0.3s";
                callStatus.style.opacity = 1;
            }, 200);
        }

        clickCount++;

        // Shrink decline
        declineScale -= 0.15;
        if (declineScale < 0.2) declineScale = 0.2;
        declineBtn.style.transform  = "scale(" + declineScale + ")";
        declineBtn.style.transition = "transform 0.3s ease";

        // Grow accept
        acceptScale += 0.15;
        if (acceptScale > 2) acceptScale = 2;
        acceptBtn.style.transform  = "scale(" + acceptScale + ")";
        acceptBtn.style.transition = "transform 0.3s ease";

        // Disable decline when too small
        if (declineScale <= 0.2) {
            declineBtn.disabled      = true;
            declineBtn.style.opacity = "0.2";
            callStatus.innerText     = "okay... fine 💕";
        }
    });

    // ── Accept ──
    acceptBtn.addEventListener("click", function () {
        ringtone.pause();
        ringtone.currentTime = 0;
        showFinalScreen();
    });

    // ── Final letter ──
    function showFinalScreen() {
        document.getElementById("finalScreen").classList.add("show");
        letterMusic.volume = 0.4;
        letterMusic.loop   = true;
        letterMusic.play().catch(() => {});
        typeWriter(
"Dear Ambar,\n\n" +
"\tI knew you would tap yes without a doubt… hehe.\n\n" +
"\tWe've been through a lot in these past months.\n" +
"\tWe faced hardships, tried to move away, yet somehow\n" +
"\twe always found ourselves coming back to each other.\n\n" +
"\tAnd now that we are here together, it feels different.\n" +
"\tIt feels calmer, deeper… closer than ever.\n" +
"\tI feel more connected to you now — like we share more,\n" +
"\tunderstand more, and value each other even more.\n\n" +
"\tNow that it's time, let's make this real.\n" +
"\tNot rushed. Not forced. Just us — choosing each other\n" +
"\tevery single day.\n\n" +
"\tLet's make it official — not just in words,\n" +
"\tbut in effort, patience, and love.\n\n" +
"\t— Adarsh"
        );
    }

    function typeWriter(text) {
        const el = document.getElementById("finalText");
        if (!el) return;
        let i = 0;
        function typing() {
            if (i < text.length) {
                el.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, 35);
            } else {
                setTimeout(function () {
                    const bday = document.getElementById("birthdayMsg");
                    if (bday) {
                        bday.style.display = "block";
                        bday.scrollIntoView({ behavior: "smooth", block: "center" });

                        setTimeout(function () {
                            const peace = document.getElementById("peaceMsg");
                            if (peace) {
                                peace.style.display = "block";
                                peace.scrollIntoView({ behavior: "smooth", block: "center" });
                            }
                        }, 2000);
                    }
                }, 800);
            }
        }
        typing();
    }

});
