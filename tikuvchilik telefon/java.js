// RASM MODAL
function openModal(src) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modalImg").src = src;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// LIKE FUNKSIYASI
const likes = document.querySelectorAll(".like");

likes.forEach((like, index) => {
    const heart = like.querySelector(".heart");
    const counter = like.querySelector(".count");

    // localStorage dan olish
    let liked = localStorage.getItem("liked_" + index) === "true";
    let count = Number(localStorage.getItem("count_" + index)) || 0;

    // sahifa ochilganda tiklash
    if (liked) {
        heart.textContent = "❤️";
        heart.classList.add("liked");
    }

    counter.textContent = count;

    like.addEventListener("click", () => {
        liked = !liked;

        if (liked) {
            count++;
            heart.textContent = "❤️";
            heart.classList.add("liked");
        } else {
            count--;
            heart.textContent = "🤍";
            heart.classList.remove("liked");
        }

        counter.textContent = count;

        // SAQLASH
        localStorage.setItem("liked_" + index, liked);
        localStorage.setItem("count_" + index, count);
    });
});

// BUYURTMA FUNKSIYASI
function orderProduct(productName) {
    document.getElementById("productName").textContent = "Mahsulot: " + productName;
    document.getElementById("orderModal").style.display = "flex";
    document.getElementById("userName").value = "";
    document.getElementById("userPhone").value = "";
    document.getElementById("userNote").value = "";
}

function closeOrderModal() {
    document.getElementById("orderModal").style.display = "none";
}

function submitOrder() {
    const productName = document.getElementById("productName").textContent;
    const userName = document.getElementById("userName").value.trim();
    const userPhone = document.getElementById("userPhone").value.trim();
    const userNote = document.getElementById("userNote").value.trim();

    if (!userName || !userPhone) {
        alert("⚠️ Iltimos, ism va telefon raqamingizni kiriting!");
        return;
    }

    // Telegram bot orqali yuborish
    const telegramMessage = `
    🎉 YANGI BUYURTMA! 
    📦 Mahsulot: ${productName}
    👤 Ismı: ${userName}
    📱 Telefon: ${userPhone}
    💬 Izoh: ${userNote || "Yo'q"}
    `;

    const botToken = "YOUR_BOT_TOKEN_HERE"; // Telegram bot tokeningizni shu yerga qo'ying
    const chatId = "YOUR_CHAT_ID_HERE"; // Chat ID shu yerga qo'ying

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage
        })
    }).then(() => {
        alert("✅ Buyurtmangiz qabul qilindi! Tez orada biz siz bilan bog'lanamiz.");
        closeOrderModal();
    }).catch(() => {
        alert("✅ Buyurtmangiz saqlandi! Telegram bot sozlangach, avtomatik yuboriladi.");
        closeOrderModal();
    });
}

// Modal tashqarisini bosganda yopiladi
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    const orderModal = document.getElementById("orderModal");

    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == orderModal) {
        orderModal.style.display = "none";
    }
}

// ENTER tugmasi bilan yuborish
document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const orderModal = document.getElementById("orderModal");
        if (orderModal.style.display === "flex") {
            submitOrder();
        }
    }
});