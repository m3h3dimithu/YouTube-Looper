// লুপ আইকনের পরিচ্ছন্ন SVG কোড (সেন্টারিংয়ের জন্য viewBox ঠিক করা হয়েছে)
const LOOP_ICON_SVG = `
<svg height="24" width="24" viewBox="0 0 24 24">
  <path class="my-loop-path" d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z" fill="#FF0000"></path>
</svg>`;

function injectLoopButton() {
    if (document.querySelector('.my-custom-loop-btn')) return;

    const rightControls = document.querySelector('.ytp-right-controls');
    if (!rightControls) return;

    const loopBtn = document.createElement('button');
    loopBtn.className = 'ytp-button my-custom-loop-btn'; 
    loopBtn.setAttribute('title', 'Toggle Loop');
    loopBtn.innerHTML = LOOP_ICON_SVG;

    // **ম্যাজিক ফিক্স:** বাটনটিকে পারফেক্ট সেন্টারে রাখার জন্য Flexbox ব্যবহার
    loopBtn.style.display = 'inline-flex';
    loopBtn.style.alignItems = 'center';
    loopBtn.style.justifyContent = 'center';

    // ক্লিক ইভেন্ট: লুপ অন/অফ এবং কালার চেঞ্জ
    loopBtn.addEventListener('click', () => {
        const video = document.querySelector('video');
        if (!video) return;

        video.loop = !video.loop;
        
        // কালার আপডেট (অন থাকলে সবুজ, অফ থাকলে লাল)
        const path = loopBtn.querySelector('.my-loop-path');
        if (video.loop) {
            path.setAttribute('fill', '#00FF00'); // Green
        } else {
            path.setAttribute('fill', '#FF0000'); // YouTube Red
        }
    });

    // বাটনটিকে CC বাটনের ঠিক আগে বসিয়ে দেওয়া
    rightControls.insertBefore(loopBtn, rightControls.firstChild);
}

// ভিডিও রিফ্রেশ বা পরিবর্তন হলে বাটন এবং লুপ স্ট্যাটাস ঠিক রাখা
setInterval(() => {
    injectLoopButton();
    const video = document.querySelector('video');
    const path = document.querySelector('.my-loop-path');
    
    if (video && path) {
         if (video.loop) {
             path.setAttribute('fill', '#00FF00');
         } else {
             path.setAttribute('fill', '#FF0000');
         }
    }
}, 1000);