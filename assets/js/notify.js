document.addEventListener('DOMContentLoaded', function() {
    if (!Notification) {
     alert('Desktop notifications not available in your browser. Try Chromium.');
     return;
    }
   
    if (Notification.permission !== 'granted')
     Notification.requestPermission();
   });

   function notifyMe(title, body) {
    if (Notification.permission !== 'granted')
     Notification.requestPermission();
    else {
     var notification = new Notification(title, {
      icon: 'https://upload.wikimedia.org/wikipedia/vi/thumb/9/96/UEFA_Euro_2020_Logo.svg/1801px-UEFA_Euro_2020_Logo.svg.png',
      body: body,
     });
     notification.onclick = function() {
      window.open('https://tchiphuong.github.io/euro2020/');
     };
    }
   }