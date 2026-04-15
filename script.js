// RASM MODAL
function openModal(src) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modalImg").src = src;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// PAGE LOAD QILINGANDAN KEYIN ISHLA
document.addEventListener("DOMContentLoaded", function() {
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

        // LIKE BOSILGANDA
        like.addEventListener("click", function(e) {
            e.stopPropagation();
            
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

    alert("✅ Buyurtmangiz qabul qilindi! Tez orada biz siz bilan bog'lanamiz.");
    closeOrderModal();
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
// ============ KONFIGURATSIYA ============
const TELEGRAM_BOT_TOKEN = "8691275054:AAE1XHlRc4GKlMGG6TgH3zL-w9w-BXLHb-8"; // BotFather dan
const TELEGRAM_CHAT_ID = "7331251431"; // @userinfobot dan
// ========================================

// RASM MODAL
function openModal(src) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modalImg").src = src;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// PAGE LOAD QILINGANDAN KEYIN ISHLA
document.addEventListener("DOMContentLoaded", function() {
    const likes = document.querySelectorAll(".like");

    likes.forEach((like, index) => {
        const heart = like.querySelector(".heart");
        const counter = like.querySelector(".count");

        let liked = localStorage.getItem("liked_" + index) === "true";
        let count = Number(localStorage.getItem("count_" + index)) || 0;

        if (liked) {
            heart.textContent = "❤️";
            heart.classList.add("liked");
        }

        counter.textContent = count;

        like.addEventListener("click", function(e) {
            e.stopPropagation();
            
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

            localStorage.setItem("liked_" + index, liked);
            localStorage.setItem("count_" + index, count);
        });
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
    const productName = document.getElementById("productName").textContent.replace("Mahsulot: ", "");
    const userName = document.getElementById("userName").value.trim();
    const userPhone = document.getElementById("userPhone").value.trim();
    const userNote = document.getElementById("userNote").value.trim();

    if (!userName || !userPhone) {
        alert("⚠️ Iltimos, ism va telefon raqamingizni kiriting!");
        return;
    }

    // LOADING
    const submitBtn = document.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Yuborilmoqda...";

    // TELEGRAM XABARI
    const message = `
🎉 <b>YANGI BUYURTMA!</b>

📦 <b>Mahsulot:</b> ${productName}
👤 <b>Ismı:</b> ${userName}
📱 <b>Telefon:</b> <a href="tel:${userPhone}">${userPhone}</a>
💬 <b>Izoh:</b> ${userNote || "Yo'q"}
⏰ <b>Vaqti:</b> ${new Date().toLocaleString('uz-UZ')}
    `;

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "HTML"
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            // BUYURTMANI SAQLASH
            saveBuyurtma(productName, userName, userPhone, userNote);
            
            alert("✅ Buyurtmangiz qabul qilindi!\n\nAdmin tez orada siz bilan bog'lanadi.");
            closeOrderModal();
        } else {
            alert("⚠️ Xatolik! Qayta urinib ko'ring.");
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    })
    .catch(error => {
        console.error("Xatolik:", error);
        alert("❌ Xatolik yuz berdi. Internet ulanishini tekshiring.");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });
}

// BUYURTMANI LOCAL STORAGE GA SAQLASH
function saveBuyurtma(product, name, phone, note) {
    const buyurtmalar = JSON.parse(localStorage.getItem("buyurtmalar")) || [];
    
    buyurtmalar.push({
        id: buyurtmalar.length + 1,
        mahsulot: product,
        ism: name,
        telefon: phone,
        izoh: note,
        vaqti: new Date().toLocaleString('uz-UZ'),
        status: "Yangi"
    });
    
    localStorage.setItem("buyurtmalar", JSON.stringify(buyurtmalar));
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