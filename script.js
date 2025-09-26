document.addEventListener('DOMContentLoaded', () => {
    // 스크롤 최상단 이동
    window.scrollTo(0, 0);
  
    // 디데이 카운트다운
    const targetDate = new Date('2025-11-30T16:50:00');
    const ddayDisplay = document.getElementById('dday-countdown');
  
    const updateDday = () => {
      const now = new Date();
      const timeDiff = targetDate - now;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
      if (days > 0) {
        ddayDisplay.textContent = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남았습니다.`;
      } else if (days === 0) {
        ddayDisplay.textContent = `${hours}시간 ${minutes}분 ${seconds}초 뒤 진행됩니다.`;
      } else {
        const daysPassed = Math.abs(days) - 1;
        const displayDays = daysPassed > 0 ? `${daysPassed}일 ` : '';
        ddayDisplay.textContent = `${displayDays}${Math.abs(hours)}시간 ${Math.abs(minutes)}분 ${Math.abs(seconds)}초 지났습니다.`;
      }
    };

  
    setInterval(updateDday, 1000);
    updateDday();
  
    // 갤러리 & 라이트박스
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
  
    galleryItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        currentIndex = idx;
        const img = item.querySelector('img');
        if (img) {
          openLightbox(img.src);
        }
      });
    });
  
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1;
      updateLightboxImage();
    });
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
      updateLightboxImage();
    });
  
    function openLightbox(src) {
      lightboxImg.src = src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    function updateLightboxImage() {
      const img = galleryItems[currentIndex].querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
      }
    }

    document.querySelectorAll('.scroll-track').forEach(track => {
      const images = track.querySelectorAll('img').length;
      const secondsPerImage = 4; // 사진 1장당 5초
      const duration = images * secondsPerImage;
      track.style.animationDuration = `${duration}s`;
    });
  
// 드롭다운 토글 (신랑/신부)
window.toggleDropdown = function(type, btn) {
  const dropdowns = document.querySelectorAll('.dropdown');

  // 다른 드롭다운 닫기 + 버튼 active 해제
  dropdowns.forEach(dd => {
    if (!dd.classList.contains(`${type}-dropdown`)) {
      dd.style.display = 'none';
      const prevBtn = dd.previousElementSibling;
      if (prevBtn && prevBtn.classList) {
        prevBtn.classList.remove('active');
        prevBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // 현재 대상
  const selectedDropdown = document.querySelector(`.${type}-dropdown`);
  if (!selectedDropdown) return;

  const willOpen = selectedDropdown.style.display !== 'block';
  selectedDropdown.style.display = willOpen ? 'block' : 'none';

  // 버튼(화살표) 상태 토글
  const headerBtn = btn || selectedDropdown.previousElementSibling;
  if (headerBtn && headerBtn.classList) {
    headerBtn.classList.toggle('active', willOpen);
    headerBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  }
};
  
//주차안내
    document.querySelectorAll('.accordion-header').forEach(button => {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling;
    
        content.classList.toggle('open');
        button.classList.toggle('active');
      });
    });
  
  
// 계좌번호 복사 기능
window.copyAccount = function(btn) {
  let accountInfo = btn.getAttribute('data-account');

  if (navigator.clipboard) {
    navigator.clipboard.writeText(accountInfo)
      .then(() => {
        showToast('복사되었습니다');
      })
      .catch(err => {
        console.error('복사 실패:', err);
        showToast('복사에 실패했습니다. 직접 입력해 주세요.');
      });
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = accountInfo;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('복사되었습니다');
    } catch (err) {
      showToast('복사에 실패했습니다. 직접 입력해 주세요.');
    }
    document.body.removeChild(textArea);
  }
};

// ✅ 토스트 함수(클래스만 토글)
let __toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;

  // 중복 호출 시 타이머 정리
  if (__toastTimer) clearTimeout(__toastTimer);

  toast.classList.add('show');   // 보이기

  __toastTimer = setTimeout(() => {
    toast.classList.remove('show'); // 숨기기
  }, 2000);
}
    // 캘린더 추가하기 기능: .ics 파일 다운로드
    document.getElementById('add-calendar').addEventListener('click', () => {
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//재우 & 내경 결혼식//KR",
        "BEGIN:VEVENT",
        "UID:20251130T165000@wedding.com",
        "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
        "DTSTART:20251130T165000",
        "DTEND:20251130T185000",
        "SUMMARY:재우 & 내경 결혼식",
        "LOCATION:광명무역센터컨벤션 웨딩홀",
        "DESCRIPTION:재우 & 내경의 결혼식에 초대합니다.",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");
  
      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "wedding_event.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  
    // 추가적인 RSVP 등 기능은 필요에 따라 여기서 구현
  });