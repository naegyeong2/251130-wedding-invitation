document.addEventListener('DOMContentLoaded', () => {
    /* 스크롤 최상단 이동 */
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
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
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
  
    // 드롭다운 토글 (신랑/신부)
    window.toggleDropdown = function(type) {
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dd => {
        if (!dd.classList.contains(`${type}-dropdown`)) {
          dd.style.display = 'none';
        }
      });
      const selectedDropdown = document.querySelector(`.${type}-dropdown`);
      if (selectedDropdown) {
        selectedDropdown.style.display = (selectedDropdown.style.display === 'block') ? 'none' : 'block';
      }
    };
  
    // (1) 커스텀 알림 모달 표시 함수
    function showCustomAlert(message) {
      const modal = document.getElementById('custom-alert');
      const msgEl = document.getElementById('custom-alert-message');
      msgEl.textContent = message;
      modal.style.display = 'flex'; // 모달 표시
    }
  
    // (2) 모달 닫기
    const closeModalBtn = document.getElementById('close-custom-alert');
    closeModalBtn.addEventListener('click', () => {
      const modal = document.getElementById('custom-alert');
      modal.style.display = 'none';
    });
  
    // 계좌번호 복사 기능
    window.copyAccount = function(btn) {
      let accountInfo = btn.getAttribute('data-account');
  
      if (navigator.clipboard) {
        navigator.clipboard.writeText(accountInfo)
          .then(() => {
            showCustomAlert('계좌번호가 복사되었습니다. 송금 앱에서 붙여넣기 하세요!');
          })
          .catch(err => {
            console.error('복사 실패:', err);
            showCustomAlert('복사에 실패했습니다. 직접 입력해 주세요.');
          });
      } else {
        // 클립보드 API 미지원 시 fallback
        const textArea = document.createElement('textarea');
        textArea.value = accountInfo;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          showCustomAlert('계좌번호가 복사되었습니다. 송금 앱에서 붙여넣기 하세요!');
        } catch (err) {
          showCustomAlert('복사에 실패했습니다. 직접 입력해 주세요.');
        }
        document.body.removeChild(textArea);
      }
    };
  
    // RSVP, 팝업 등 추가 기능(필요 시) 여기에 작성
  });