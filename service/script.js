
// if ('serviceWorker' in navigator) {
//     console.log('service worker supp')
//     window.addEventListener('load',()=>{
//       navigator.serviceWorker
//           .register('../service-worker.js')
//           .then(reg => {
//             console.log('registered')
//           })
//           .catch(err=>{console.log('err',err)})
//     })
// }

// if (!navigator.serviceWorker || !navigator.serviceWorker.register) {
//           console.log("This browser doesn't support service workers");
    
//       }
  
//       // Listen to messages from service workers.
//       navigator.serviceWorker.addEventListener('message', function(event) {
//           console.log("Got reply from service worker: " + event.data);
//       });
  
//       // Are we being controlled?
//       if (navigator.serviceWorker.controller) {
//           // Yes, send our controller a message.
//           console.log("Sending 'hi' to controller");
//           navigator.serviceWorker.controller.postMessage("hi");
//       } else {
//           // No, register a service worker to control pages like us.
//           // Note that it won't control this instance of this page, it only takes effect
//           // for pages in its scope loaded *after* it's installed.
//           navigator.serviceWorker.register("../service-worker.js")
//               .then(function(registration) {
//                   console.log("Service worker registered, scope: " + registration.scope);
//                   console.log("Refresh the page to talk to it.");
//                   // If we want to, we might do `location.reload();` so that we'd be controlled by it
//               })
//               .catch(function(error) {
//                   console.log("Service worker registration failed: " + error.message);
//               });
//       }







console.log('jeeokm');
let element = document.getElementById('connectionStatus');
for (i=0;i<20;i++){
let new_ele = document.createElement('div');
new_ele.style.height = '400px'
new_ele.style.border = '2px solid black'
var node = document.createTextNode(i);

new_ele.appendChild(node)
new_ele.style.fontSize= '200px';
new_ele.id=`idd${i}`
element.appendChild(new_ele)
}
const debounce = (func, delay) => {
    let inDebounce
    return function() {
      const context = this;
      const args = arguments
      
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => func.apply(context, args), delay)
      

    }
  }

window.addEventListener('scroll', debounce(function() {
    console.info('Hey! It is', new Date().toUTCString());
    data = {
        AUTHCHECKSUM: "4161ea6df23eb90",
        profileid_pg: "pro", 
        deviceid: "dev",
        profiles:[{"profile":'jalhsjkn',"time":new Date().toUTCString()}]
    }
    console.log('id',document.getElementById('idd5').getBoundingClientRect())
    worker.postMessage(data);
    console.log('Message posted to worker');
  }, 3000));


   var worker = new Worker('../worker.js');
   if(window.Worker){
    console.log('supported')
}else {
    console.log('not supported')
}



