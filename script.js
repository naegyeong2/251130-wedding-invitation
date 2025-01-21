document.addEventListener('DOMContentLoaded', () => {
    // 페이지 로드 시 스크롤을 최상단으로 이동
    window.scrollTo(0, 0);
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('rsvp1');
    const attendancePopup = document.getElementById('attendance-popup');
    const rsvpButton = document.getElementById('rsvp-button-1');
    const privacyConsentCheckbox1 = document.getElementById('privacy-consent-1');
    const submitAttendanceButton = document.getElementById('submit-attendance');
    
    

    // 디데이 카운트다운 설정
    const targetDate = new Date('2025-11-30T16:50:00');

    const updateDday = () => {
        const now = new Date();
        const timeDifference = targetDate - now;

        const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

        const ddayDisplay = document.getElementById('dday-countdown');

        if (daysRemaining > 0) {
            ddayDisplay.textContent = `${daysRemaining}일 ${hoursRemaining}시간 ${minutesRemaining}분 ${secondsRemaining}초 남았습니다.`;
        } else if (daysRemaining === 0) {
            ddayDisplay.textContent = `${hoursRemaining}시간 ${minutesRemaining}분 ${secondsRemaining}초 뒤 진행됩니다.`;
        } else {
            const daysPassed = Math.abs(daysRemaining) - 1;
            const hoursPassed = Math.abs(hoursRemaining);
            const minutesPassed = Math.abs(minutesRemaining);
            const secondsPassed = Math.abs(secondsRemaining);
            
            const displayDays = daysPassed > 0 ? `${daysPassed}일 ` : '';
            ddayDisplay.textContent = `${displayDays}${hoursPassed}시간 ${minutesPassed}분 ${secondsPassed}초 지났습니다.`;
        }
    };

    setInterval(updateDday, 1000);
    updateDday();

    // 갤러리 및 라이트박스 코드
    const galleryItems = document.querySelectorAll('.gallery-item'); // 갤러리 이미지 선택
    const lightbox = document.getElementById('lightbox'); // 확대된 사진 영역
    const lightboxImg = document.getElementById('lightbox-img'); // 확대된 이미지
    const closeBtn = document.getElementById('close'); // 닫기 버튼
    const prevBtn = document.getElementById('prev'); // 이전 버튼
    const nextBtn = document.getElementById('next'); // 다음 버튼
    let currentIndex = 0; // 현재 이미지 인덱스

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index; // 현재 인덱스 업데이트
            const img = item.querySelector('img'); // 클릭한 아이템의 이미지 요소 선택
            if (img) {
                openLightbox(img.src); // 이미지 소스 가져와서 확대
            } else {
                console.error('이미지를 찾을 수 없습니다:', item);
            }
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1; // 이전 인덱스 업데이트
        updateLightboxImage(); // 이미지 업데이트
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0; // 다음 인덱스 업데이트
        updateLightboxImage(); // 이미지 업데이트
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
        if (currentIndex < 0 || currentIndex >= galleryItems.length) {
            console.error('현재 인덱스가 유효하지 않습니다:', currentIndex);
            return; // 유효하지 않은 인덱스일 경우 함수 종료
        }
        
        const img = galleryItems[currentIndex].querySelector('img'); // 이미지 요소 선택
        if (img) {
            lightboxImg.src = img.src; // 현재 이미지 소스 업데이트
        } else {
            console.error('이미지 요소를 찾을 수 없습니다:', galleryItems[currentIndex]);
        }
    }

    function toggleDropdown(type) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none'; // 모든 드롭다운 숨김
        });
    
        const selectedDropdown = document.querySelector(`.${type}-dropdown`);
        if (selectedDropdown.style.display === 'block') {
            selectedDropdown.style.display = 'none'; // 이미 열려있으면 닫기
        } else {
            selectedDropdown.style.display = 'block'; // 클릭한 드롭다운 열기
        }
    }
    
    

    // 페이지 진입 시 RSVP1 표시
    setTimeout(() => {
        overlay.style.display = 'block'; // 오버레이 보이기
        popup.classList.add('visible');
    }, 2000); // 2초 후에 팝업 표시

    // RSVP 버튼 클릭 시 참석 여부 팝업 표시
    rsvpButton.addEventListener('click', () => {
        popup.classList.remove('visible');
        attendancePopup.classList.add('visible');
    });

    // 오늘 하루 보지 않기 버튼 클릭 시 팝업 숨기기
    privacyConsentCheckbox1.addEventListener('click', () => {
        if (privacyConsentCheckbox1.checked) {
            overlay.style.display = 'none'; // 오버레이 숨기기
            popup.classList.remove('visible');
        }
    });
// 참석 여부 버튼 클릭 이벤트
const attendanceButtons = document.querySelectorAll('.attendance-button');
attendanceButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 모든 버튼 초기화
        attendanceButtons.forEach(btn => {
            btn.classList.remove('active'); // 버튼 비활성화
            // 체크박스 상태 초기화
            const radio = document.querySelector(`input[name="attendance"][value="${btn.dataset.value}"]`);
            if (radio) {
                radio.checked = false; // 체크 해제
            }
        });

        // 클릭한 버튼 활성화
        button.classList.add('active'); // 버튼 활성화
        // 체크박스 상태 업데이트
        const radio = document.querySelector(`input[name="attendance"][value="${button.dataset.value}"]`);
        if (radio) {
            radio.checked = true; // 체크
        }
    });
});

// 소중한 인연 버튼 클릭 이벤트
const sideButtons = document.querySelectorAll('.side-button');
sideButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active'); // 클릭한 버튼의 활성화 상태 토글
    });
});

// 참석 여부 전달하기 버튼 클릭 시
submitAttendanceButton.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const guestCount = document.getElementById('guest-count').value;
    const attendance = document.querySelector('input[name="attendance"]:checked');
    const sides = Array.from(document.querySelectorAll('input[name="side"]:checked')).map(el => el.value);
    const privacyConsent = document.getElementById('privacy-consent-2').checked; // ID 변경
// 디버깅용 로그
console.log('이름:', name);
console.log('동행인 수:', guestCount);
console.log('참석 여부:', attendance ? attendance.value : '체크되지 않음');
console.log('사이드:', sides);
console.log('개인정보 수집 동의:', privacyConsent);

    if (attendance && privacyConsent) {
        alert(`신청 완료!\n이름: ${name}\n동행인 수: ${guestCount}\n참석 여부: ${attendance.value}\n신랑 측: ${sides.includes('groom')}\n신부 측: ${sides.includes('bride')}`);
        // 팝업과 오버레이 숨기기
        overlay.style.display = 'none'; // 오버레이 숨기기
        attendancePopup.classList.remove('visible');
        popup.classList.remove('visible');
    } else {
        alert('모든 필드를 입력해 주세요.');
    }
});

// 오버레이 클릭 시 팝업과 오버레이 숨기기
overlay.addEventListener('click', () => {
    overlay.style.display = 'none'; // 오버레이 숨기기
    popup.classList.remove('visible'); // RSVP 팝업 숨기기
    attendancePopup.classList.remove('visible'); // 참석 여부 팝업 숨기기
});

});