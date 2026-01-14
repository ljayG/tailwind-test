// 데이터 파일 로드 (Vite import.meta.glob 사용)
const dataModules = import.meta.glob('../../ia/ia_js/data-*.js', { import: 'default', eager: true });

// ==========================================
// 상수 및 설정
// ==========================================
const MENU_CONFIG = [
  { id: 'tabAll', name: '전체', isAll: true },
  {
    id: 'tabPageA',
    name: '(A)계약관리',
    hideSubMenu: false, // 하위 메뉴 숨겨야 할 경우 사용 true
    subs: [
      { id: 'tabPageA', name: '섹션전체' },
      { id: 'tabPageA1', name: '보험계약' },
      { id: 'tabPageA2', name: '장기보험' },
      { id: 'tabPageA3', name: '자동차보험' },
      { id: 'tabPageA4', name: '여행보험' },
      { id: 'tabPageA5', name: '납입' },
      { id: 'tabPageA6', name: '환급/해지' },
      { id: 'tabPageA7', name: '펀드' },
    ],
  },
  {
    id: 'tabPageB',
    name: '(B)보험상품',
    hideSubMenu: false, // 하위 메뉴 숨겨야 할 경우 사용 true
    subs: [
      { id: 'tabPageB', name: '섹션전체' },
      { id: 'tabPageB1', name: '보험가이드' },
      { id: 'tabPageB2', name: '자동차보험' },
      { id: 'tabPageB3', name: '운전자/상해보험' },
      { id: 'tabPageB5', name: '실손의료비보험' },
      { id: 'tabPageB6', name: '자녀보험' },
      { id: 'tabPageB7', name: '건강보험' },
      { id: 'tabPageB8', name: '치아보험' },
      { id: 'tabPageB9', name: '주택화재/풍수해보험' },
      { id: 'tabPageB10', name: '사업장화재/재물보험' },
      { id: 'tabPageB11', name: '연금보험' },
      { id: 'tabPageB12', name: '펫보험' },
      { id: 'tabPageB4', name: '외국어가입상담' },
      { id: 'tabPageB13', name: '보험상품 공통' },
    ],
  },
  {
    id: 'tabPageC',
    name: '(C)보상',
    hideSubMenu: false, // 하위 메뉴 숨겨야 할 경우 사용 true
    subs: [
      { id: 'tabPageC', name: '섹션전체' },
      { id: 'tabPageC1', name: '질병/상해 보험금 청구' },
      { id: 'tabPageC2', name: '자동차' },
      { id: 'tabPageC3', name: '반려동물' },
      { id: 'tabPageC4', name: '재물/배상책임' },
      { id: 'tabPageC5', name: '보상가이드' },
    ],
  },
  {
    id: 'tabPageD',
    name: '(D)대출',
    subs: [
      { id: 'tabPageD', name: '섹션전체' },
      { id: 'tabPageD1', name: '보험계약대출' },
      { id: 'tabPageD4', name: '신용대출' },
      { id: 'tabPageD5', name: '담보대출' },
      { id: 'tabPageD2', name: '대출계약' },
      { id: 'tabPageD3', name: '금융소비자의권리' },
    ],
  },
  {
    id: 'tabPageE',
    name: '(E)퇴직연금',
    subs: [
      { id: 'tabPageE', name: '섹션전체' },
      { id: 'tabPageE1', name: '퇴직연금계약' },
      { id: 'tabPageE2', name: '상품운용' },
      { id: 'tabPageE3', name: '개인형퇴직연금(IRP)' },
      { id: 'tabPageE4', name: '확정연금' },
      { id: 'tabPageE5', name: '확정기여형퇴직연금(DC)' },
      { id: 'tabPageE6', name: '실물이전' },
      { id: 'tabPageE7', name: '퇴직연금제도' },
      { id: 'tabPageE8', name: '고객지원' },
      { id: 'tabPageE9', name: 'PLUS서비스' },
      { id: 'tabPageE10', name: '퇴직 종합메일' },
    ],
  },
  {
    id: 'tabPageF',
    name: '(F)혜택/서비스',
    subs: [
      { id: 'tabPageF', name: '섹션전체' },
      { id: 'tabPageF2', name: '피크닉 서비스' },
      { id: 'tabPageF3', name: '애니포인트' },
      { id: 'tabPageF4', name: '헬스케어서비스' },
      { id: 'tabPageF12', name: 'Car케어 서비스' },
      { id: 'tabPageF5', name: '착!한 생활서비스' },
      { id: 'tabPageF6', name: '상품부가서비스' },
      { id: 'tabPageF7', name: '라이프케어' },
      { id: 'tabPageF8', name: '소셜미디어' },
      { id: 'tabPageF9', name: '재테크/세무 정보' },
      { id: 'tabPageF10', name: '이벤트' },
      { id: 'tabPageF1', name: '기타' },
    ],
  },
  {
    id: 'tabPageG',
    name: '(G)고객센터',
    subs: [
      { id: 'tabPageG', name: '섹션전체' },
      { id: 'tabPageG1', name: '내 정보' },
      { id: 'tabPageG2', name: '증명서' },
      { id: 'tabPageG3', name: '고객지원' },
      { id: 'tabPageG4', name: '공지사항' },
      { id: 'tabPageG5', name: '고객의소리' },
      { id: 'tabPageG6', name: '인증센터' },
      { id: 'tabPageG7', name: '홈페이지이용약관' },
      { id: 'tabPageG8', name: '개인정보보호' },
    ],
  },
  {
    id: 'tabPageH',
    name: '(H)검색',
    subs: [{ id: 'tabPageH', name: '섹션전체' }],
  },
  {
    id: 'tabPageJ',
    name: '(J)공시실',
    subs: [
      { id: 'tabPageJ', name: '섹션전체' },
      { id: 'tabPageJ8', name: '메인' },
      { id: 'tabPageJ1', name: '공고' },
      { id: 'tabPageJ2', name: '경영공시' },
      { id: 'tabPageJ3', name: '상품공시' },
      { id: 'tabPageJ4', name: '보험가격공시' },
      { id: 'tabPageJ5', name: '보호금융상품등록부' },
      { id: 'tabPageJ6', name: '자동차보험공시' },
      { id: 'tabPageJ7', name: '기타공시' },
    ],
  },
  {
    id: 'tabPageK',
    name: '(K)소비자포털',
    subs: [
      { id: 'tabPageK', name: '섹션전체' },
      { id: 'tabPageK1', name: '소비자포털 소개' },
      { id: 'tabPageK2', name: '소비자보호 체계' },
      { id: 'tabPageK3', name: '금융소비자보호법' },
      { id: 'tabPageK4', name: '소비자보호 공시' },
      { id: 'tabPageK5', name: '소비자보호 활동' },
      { id: 'tabPageK6', name: '유용한 가이드' },
      { id: 'tabPageK7', name: '보험제도' },
      { id: 'tabPageK8', name: '신고센터' },
    ],
  },
  {
    id: 'tabPageL',
    name: '(L)RC(보험설계사)',
    subs: [
      { id: 'tabPageL', name: '섹션전체' },
      { id: 'tabPageL1', name: '삼성화재 RC 소개' },
      { id: 'tabPageL2', name: 'RC 지원하기' },
      { id: 'tabPageL3', name: '고객만족대상' },
    ],
  },
  {
    id: 'tabPageM',
    name: '(M)회사소개',
    subs: [
      { id: 'tabPageM', name: '섹션전체' },
      { id: 'tabPageM1', name: '기업정보' },
      { id: 'tabPageM2', name: 'IR' },
      { id: 'tabPageM3', name: '윤리경영' },
      { id: 'tabPageM4', name: '지속가능경영' },
      { id: 'tabPageM5', name: '사회공헌' },
      { id: 'tabPageM6', name: '홍보' },
      { id: 'tabPageM7', name: '브랜드' },
      { id: 'tabPageM8', name: '인재채용' },
      { id: 'tabPageM9', name: '인재채용(입사구비서류 작성)' },
      { id: 'tabPageM10', name: '메인' },
    ],
  },
  {
    id: 'tabPageN',
    name: '(N)English',
    subs: [
      { id: 'tabPageN', name: '섹션전체' },
      { id: 'tabPageN1', name: 'About Us' },
      { id: 'tabPageN2', name: 'IR' },
      { id: 'tabPageN3', name: 'Ethical Management' },
      { id: 'tabPageN4', name: 'Sustainability' },
      { id: 'tabPageN5', name: 'CSR' },
      { id: 'tabPageN6', name: 'Privacy & Data Security' },
      { id: 'tabPageN7', name: 'Careers' },
      { id: 'tabPageN8', name: 'Main' },
    ],
  },
  {
    id: 'tabPageZ',
    name: '(Z)공통/기타',
    subs: [
      { id: 'tabPageZ', name: '섹션전체' },
      { id: 'tabPageZ1', name: '메인화면/MY/공통/모니모/전자서명/FDS인증' },
      { id: 'tabPageZ2', name: '검색찾기/알림톡 발송' },
      { id: 'tabPageZ3', name: '이메일 수신거부' },
      { id: 'tabPageZ4', name: '서류등록/사진 확인' },
      { id: 'tabPageZ5', name: '서비스 순단 안내페이지' },
      { id: 'tabPageZ6', name: '파킹' },
      { id: 'tabPageZ7', name: '에러' },
      { id: 'tabPageZ8', name: '오즈뷰어/기타' },
      { id: 'tabPageZ9', name: '모니모 안내' },
      { id: 'tabPageZ10', name: '앱화면' },
      { id: 'tabPageZ11', name: '메인 오픈 콘텐츠' },
    ],
  },
  {
    id: 'tabPageX',
    name: '샘플',
    subs: [
      { id: 'tabPageX', name: '섹션전체' },
      { id: 'tabPageX1', name: '샘플' },
    ],
  },
];

// ==========================================
// 유틸리티 및 UI 로직
// ==========================================

const MemoManager = {
  init: () => {
    MemoManager.bindEvents();
  },
  bindEvents: () => {
    // 메모 토글 및 전체 보기 버튼 이벤트 위임
    document.addEventListener('click', e => {
      // 개별 메모 토글
      const foldTarget = e.target.closest('.data-list tbody > tr > td .note-list.option-fold');
      if (foldTarget) foldTarget.classList.toggle('is-open');

      // 전체 보기 버튼 토글
      if (e.target.matches('.btn-memo-all')) {
        const btn = e.target;
        const tabItem = btn.closest('.tab-item');
        if (!tabItem) return;

        const isOpen = btn.classList.toggle('is-open');
        btn.textContent = isOpen ? '닫기' : '더보기';
        tabItem.querySelectorAll('.note-list.option-fold').forEach(note => {
          note.classList.toggle('is-open', isOpen);
        });
      }
    });
  },
};

const UiUtils = {
  setVH: () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  },
};

const TabManager = {
  init: () => {
    UiUtils.setVH();
    window.addEventListener('resize', UiUtils.setVH);
    TabManager.bindEvents();
  },
  bindEvents: () => {
    document.addEventListener('click', e => {
      const menu = e.target.closest('.tab-menu');
      if (!menu) return;

      const isDep1 = menu.parentElement.classList.contains('gnb-dep1');

      // 탭 활성화 처리
      if (isDep1) {
        document.querySelectorAll('.gnb-dep1 > .tab-menu').forEach(m => m.classList.remove('current', 'is-active'));
        menu.classList.add('current', 'is-active');

        // 모든 탭 컨텐츠 숨김
        document.querySelectorAll('.tab-list > .tab-item').forEach(item => {
          item.classList.remove('is-active');
          item.setAttribute('aria-hidden', 'true');
        });
      } else {
        const siblings = menu.parentElement.children;
        Array.from(siblings).forEach(sib => sib.classList.remove('is-active'));
        menu.classList.add('is-active');

        const parentDep1 = menu.closest('.gnb-dep1 > li');
        if (parentDep1) parentDep1.classList.add('current');
      }

      // 탭 컨텐츠 표시 로직
      const targetId = menu.getAttribute('aria-controls');
      if (targetId) {
        const target = document.getElementById(targetId);
        if (target) {
          // 다시 한번 모든 탭 숨김 (안전장치)
          document.querySelectorAll('.tab-list > .tab-item').forEach(item => {
            item.classList.remove('is-active');
            item.setAttribute('aria-hidden', 'true');
          });
          target.classList.add('is-active');
          target.setAttribute('aria-hidden', 'false');
        }
      }
    });
  },
};

// ==========================================
// 렌더링 로직 (레이아웃, 테이블)
// ==========================================

const LayoutRenderer = {
  render: () => {
    const gnbContainer = document.querySelector('.gnb-dep1');
    const tabListContainer = document.querySelector('.tab-list');

    if (!gnbContainer || !tabListContainer) return;

    gnbContainer.innerHTML = LayoutRenderer.createGnbHTML();
    tabListContainer.innerHTML = LayoutRenderer.createTabListHTML();
  },

  createGnbHTML: () => {
    return MENU_CONFIG.map(item => {
      if (item.isAll) {
        return `
          <li class="tab-menu current" id="${item.id}Menu" aria-controls="${item.id}">
            <a href="javascript:;"><strong>${item.name} <em class="tab-count">0</em></strong></a>
          </li>
        `;
      }

      // 서브 메뉴 렌더링 조건: subs가 있고 hideSubMenu가 false일 때만
      const shouldRenderSubMenu = item.subs && !item.hideSubMenu;
      const subMenuHtml = shouldRenderSubMenu
        ? `<ul class="gnb-dep2">
            ${item.subs
              .map(
                sub => `
              <li class="tab-menu" id="${sub.id}Menu" aria-controls="${sub.id}">
                <a href="javascript:;"><span>${sub.name} <em class="tab-count">0</em></span></a>
              </li>
            `,
              )
              .join('')}
          </ul>`
        : '';

      return `
        <li class="tab-menu" id="${item.id}GroupMenu" aria-controls="${item.id}">
          <a href="javascript:;"><strong>${item.name} <em class="tab-count">0</em></strong></a>
          ${subMenuHtml}
        </li>
      `;
    }).join('');
  },

  createTabListHTML: () => {
    let tabHtml = '';
    const allItem = MENU_CONFIG.find(item => item.isAll);
    if (allItem) {
      tabHtml += LayoutRenderer.createTabItemHTML(allItem.id, allItem.name, true);
    }

    MENU_CONFIG.forEach(item => {
      // 서브 메뉴가 숨겨진 경우(hideSubMenu)에도 데이터 테이블(탭 컨텐츠)은 존재해야 할 수 있음.
      // 현재 로직은 subs가 있으면 그 하위 탭들을 생성함.
      if (!item.isAll && item.subs) {
        item.subs.forEach(sub => {
          tabHtml += LayoutRenderer.createTabItemHTML(sub.id, sub.name, false);
        });
      }
    });
    return tabHtml;
  },

  createTabItemHTML: (id, name, isActive) => {
    const activeClass = isActive ? 'is-active' : '';
    const ariaHidden = isActive ? 'false' : 'true';
    const tabIndex = isActive ? '0' : '-1';

    return `
      <div class="tab-item ${activeClass}" id="${id}" role="tabpanel" aria-hidden="${ariaHidden}" aria-labelledby="${id}Menu" tabindex="${tabIndex}">
        <h3 class="title-h3 option-item-right space-mb-xxs">
          <span class="txt">${name}</span>
          <div class="item">
            <span class="count align-middle"></span>
            <span class="align-middle">
              <button class="btn outlined option-sm filter-reset" type="button"><span>필터정렬초기화</span></button>
            </span>
          </div>
        </h3>
        <div class="data">
          <div class="data-body"></div>
        </div>
      </div>
    `;
  },
};

const IaDataManager = {
  init: () => {
    IaDataManager.bindEvents();
    IaDataManager.option();
  },

  bindEvents: () => {
    // 필터링 변경 이벤트
    document.addEventListener('change', e => {
      if (e.target.matches('.data-list thead > tr > th select')) {
        const select = e.target;
        const tabId = select.closest('.tab-item').id;
        const th = select.closest('th');

        if (select.value === '') th.classList.remove('is-active');
        else th.classList.add('is-active');

        IaDataManager.filter(tabId);
      }
    });

    // 클릭 이벤트 통합 (정렬, 필터 초기화, 행 선택)
    document.addEventListener('click', e => {
      const target = e.target;

      // 필터 초기화
      if (target.matches('.filter-reset, .filter-reset *')) {
        const btn = target.closest('.filter-reset');
        const tabId = btn.closest('.tab-item').id;
        IaDataManager.resetFilter(tabId);
      }

      // 정렬
      if (target.matches('.data-sort')) {
        IaDataManager.sort(target);
      }

      // 행 선택 (active)
      const tr = target.closest('.data-list tbody > tr');
      if (tr && !tr.classList.contains('nodata')) {
        // 버튼이나 링크 클릭이 아닐 때만 active 토글
        if (!target.closest('a') && !target.closest('button') && !target.closest('select')) {
          tr.classList.toggle('is-active');
        }
      }
    });
  },

  set: (elementId, data) => {
    const container = document.querySelector(`#${elementId} .data-body`);
    if (!container) return;

    container.innerHTML = IaDataManager.createTableHTML();
    const tbody = container.querySelector('.data-list tbody');

    if (data && data.list && data.list.length > 0) {
      tbody.innerHTML = data.list.map((item, index) => IaDataManager.createRowHTML(item, index)).join('');
    } else {
      tbody.innerHTML = `<tr class="nodata"><td colspan="16" class="align-center py-4 text-center text-gray-500">데이터가 없습니다.</td></tr>`;
    }

    IaDataManager.updateCount(elementId);
    IaDataManager.updateMenuCount(elementId);
  },

  createTableHTML: () => {
    return `
      <div class="w-full max-w-[100vw] overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 relative" style="width: 100%;">
        <table class="data-list w-full border-collapse text-sm text-left text-gray-700 dark:text-gray-300" style="min-width: 1000px;">
          <caption class="sr-only">산출물 목록</caption>
          <colgroup>
            <col style="width: 50px;" />
            <col style="width: 100px;" />
            <col style="width: 100px;" />
            <col />
            <col />
            <col />
            <col />
            <col style="width: 80px;" />
            <col style="width: 80px;" />
            <col style="width: 80px;" />
            <col style="width: 200px;" />
            <col style="width: 150px;" />
            <col style="width: 300px;" />
            <col style="width: 80px;" />
            <col style="width: 80px;" />
            <col />
          </colgroup>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">NO</th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">생성일 <button type="button" class="data-sort ml-1">▼</button></th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">최종수정일 <button type="button" class="data-sort ml-1">▼</button></th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">Depth1 <button type="button" class="data-sort ml-1">▼</button></th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">Depth2 <button type="button" class="data-sort ml-1">▼</button></th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">Depth3 <button type="button" class="data-sort ml-1">▼</button></th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">Depth4 <button type="button" class="data-sort ml-1">▼</button></th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">디바이스 <button type="button" class="data-sort ml-1">▼</button></th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">화면구분 <button type="button" class="data-sort ml-1">▼</button></th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">페이지종류 <button type="button" class="data-sort ml-1">▼</button></th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">화면명 <button type="button" class="data-sort ml-1">▼</button></th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">화면ID <button type="button" class="data-sort ml-1">▼</button></th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">경로</th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">작업차수 <select class="select-filter ml-1 border rounded p-1 text-xs" data-sort-name="order"><option value="">전체</option></select></th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">상태 <select class="select-filter ml-1 border rounded p-1 text-xs" data-sort-name="status"><option value="">전체</option></select></th>
              <th scope="col" class="px-4 py-3 font-bold border-b whitespace-nowrap">Memo</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700"></tbody>
        </table>
      </div>
    `;
  },

  createRowHTML: (item, index) => {
    const statusClass = item.status === '삭제' ? 'is-delete' : '';
    let memoHtml = '';

    if (item.memo && item.memo.length > 0) {
      const listClass = item.memo.length > 1 ? 'note-list option-fold' : 'note-list';
      memoHtml = `<ul class="${listClass}">${item.memo.map(memo => `<li>${memo.detail}</li>`).join('')}</ul>`;
    }

    return `
      <tr class="${statusClass} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
        <td class="px-4 py-2 border-b whitespace-nowrap font-medium text-center">${index + 1}</td>
        <td class="px-4 py-2 border-b whitespace-nowrap text-center">${item.createDate}</td>
        <td class="px-4 py-2 border-b whitespace-nowrap text-center">${item.modifyDate}</td>
        <td class="px-4 py-2 border-b whitespace-nowrap">${item.depth1}</td>
        <td class="px-4 py-2 border-b whitespace-nowrap">${item.depth2}</td>
        <td class="px-4 py-2 border-b whitespace-nowrap">${item.depth3}</td>
        <td class="px-4 py-2 border-b whitespace-nowrap">${item.depth4}</td>
        <td class="px-4 py-2 border-b whitespace-nowrap text-center">${item.device}</td>
        <td class="px-4 py-2 border-b whitespace-nowrap text-center">${item.user}</td>
        <td class="px-4 py-2 border-b whitespace-nowrap text-center">${item.pageType}</td>
        <td class="px-4 py-2 border-b whitespace-nowrap font-semibold text-gray-900 dark:text-white">${item.pageName}</td>
        <td class="px-4 py-2 border-b whitespace-nowrap text-gray-500 font-mono text-xs">${item.pageID}</td>
        <td class="px-4 py-2 border-b whitespace-nowrap"><a href="${item.link}" target="_blank" title="새창열림" class="text-blue-600 hover:underline dark:text-blue-400">${item.link}</a></td>
        <td class="sort-order px-4 py-2 border-b whitespace-nowrap text-center">${item.order}</td>
        <td class="sort-status px-4 py-2 border-b whitespace-nowrap text-center font-bold">${item.status}</td>
        <td class="align-left px-4 py-2 border-b min-w-[200px]">${memoHtml}</td>
      </tr>
    `;
  },

  option: () => {
    const addOptions = (selector, options) => {
      document.querySelectorAll(selector).forEach(select => {
        if (select.options.length > 1) return;
        options.forEach(opt => select.insertAdjacentHTML('beforeend', `<option value="${opt.value}">${opt.text}</option>`));
      });
    };
    addOptions('.data-list thead > tr > th select[data-sort-name="order"]', [
      { value: '1차', text: '1차' },
      { value: '2차', text: '2차' },
      { value: '3차', text: '3차' },
      { value: '-', text: '-' },
    ]);
    addOptions('.data-list thead > tr > th select[data-sort-name="status"]', [
      { value: '대기', text: '대기' },
      { value: '진행', text: '진행' },
      { value: '확인', text: '확인' },
      { value: '완료', text: '완료' },
      { value: '삭제', text: '삭제' },
    ]);
  },

  filter: tabId => {
    const selects = document.querySelectorAll(`#${tabId} .data-list thead > tr > th select`);
    let orderVal = '',
      statusVal = '';

    selects.forEach(select => {
      const sortName = select.getAttribute('data-sort-name');
      if (sortName === 'order') orderVal = select.value;
      if (sortName === 'status') statusVal = select.value;
    });

    const rows = document.querySelectorAll(`#${tabId} .data-list tbody > tr:not(.nodata)`);
    rows.forEach(row => {
      const orderText = row.querySelector('.sort-order')?.textContent || '';
      const statusText = row.querySelector('.sort-status')?.textContent || '';
      const matchOrder = orderVal === '' || orderVal === orderText;
      const matchStatus = statusVal === '' || statusVal === statusText;

      const shouldHide = !(matchOrder && matchStatus);
      row.classList.toggle('is-hide', shouldHide);
      row.style.display = shouldHide ? 'none' : '';
    });
    IaDataManager.updateCount(tabId);
  },

  resetFilter: tabId => {
    document.querySelectorAll(`#${tabId} .data-list thead > tr > th select`).forEach(select => {
      select.value = '';
      select.closest('th').classList.remove('is-active');
    });

    document.querySelectorAll(`#${tabId} .data-list thead > tr > th`).forEach(th => {
      th.classList.remove('is-sort');
      const sortBtn = th.querySelector('.data-sort');
      if (sortBtn) {
        sortBtn.textContent = '▼';
        sortBtn.classList.remove('desc', 'asc');
      }
    });

    document.querySelectorAll(`#${tabId} .data-list tbody > tr`).forEach(row => {
      row.classList.remove('is-hide');
      row.style.display = '';
    });

    IaDataManager.updateCount(tabId);
  },

  sort: btn => {
    const th = btn.closest('th');
    const table = th.closest('table');
    const tbody = table.querySelector('tbody');
    const index = Array.from(th.parentNode.children).indexOf(th);

    // 다른 헤더의 정렬 초기화
    Array.from(th.parentNode.children).forEach(sibling => {
      if (sibling !== th) {
        sibling.classList.remove('is-sort');
        const sBtn = sibling.querySelector('.data-sort');
        if (sBtn) {
          sBtn.textContent = '▼';
          sBtn.classList.remove('desc', 'asc');
        }
      }
    });

    // 정렬 방향 토글
    const isAsc = btn.classList.contains('asc');
    const direction = isAsc ? -1 : 1; // asc였으면 내림차순(-1)으로 변경

    btn.classList.toggle('asc', !isAsc);
    btn.classList.toggle('desc', isAsc);
    btn.textContent = !isAsc ? '▲' : '▼';
    th.classList.add('is-sort');

    // 행 정렬 및 재배치
    const rows = Array.from(tbody.querySelectorAll('tr:not(.nodata)'));
    rows.sort((a, b) => {
      const textA = a.children[index]?.textContent.toUpperCase() || '';
      const textB = b.children[index]?.textContent.toUpperCase() || '';
      if (textA < textB) return -direction;
      if (textA > textB) return direction;
      return 0;
    });

    rows.forEach(row => tbody.appendChild(row));
  },

  updateCount: tabId => {
    const counts = { wait: 0, progress: 0, confirm: 0, complete: 0, deleted: 0 };
    const rows = Array.from(document.querySelectorAll(`#${tabId} .data-list tbody > tr:not(.nodata):not(.is-hide)`));

    rows.forEach(row => {
      const status = row.querySelector('.sort-status')?.textContent;
      switch (status) {
        case '대기':
          counts.wait++;
          break;
        case '진행':
          counts.progress++;
          break;
        case '확인':
          counts.confirm++;
          break;
        case '완료':
          counts.complete++;
          break;
        case '삭제':
          counts.deleted++;
          break;
      }
    });

    const total = rows.length;
    const calcPercent = val => (total ? ((val / total) * 100).toFixed(2) : 0);

    const html = `
      전체 : <strong class="fc-primary">${total}</strong>건, 
      대기 : <strong class="fc-warning">${counts.wait}</strong>건<span class="fc-base">(${calcPercent(counts.wait)}%)</span>, 
      진행 : <strong class="fc-highlight">${counts.progress}</strong>건<span class="fc-base">(${calcPercent(counts.progress)}%)</span>, 
      확인 : <strong class="fc-highlight">${counts.confirm}</strong>건<span class="fc-base">(${calcPercent(counts.confirm)}%)</span>, 
      완료 : <strong class="fc-secondary">${counts.complete}</strong>건<span class="fc-base">(${calcPercent(counts.complete)}%)</span>, 
      삭제 : <strong class="fc-disabled">${counts.deleted}</strong>건<span class="fc-base">(${calcPercent(counts.deleted)}%)</span>
    `;

    const countContainer = document.querySelector(`#${tabId} .title-h3 .count`);
    if (countContainer) countContainer.innerHTML = html;
  },

  updateMenuCount: tabId => {
    const rows = document.querySelectorAll(`#${tabId} .data-list tbody > tr:not(.nodata):not(.is-hide)`);
    const count = rows.length;

    const subMenuCount = document.querySelector(`#${tabId}Menu .tab-count`);
    if (subMenuCount) subMenuCount.textContent = count;

    const groupMenuCount = document.querySelector(`#${tabId}GroupMenu .tab-count`);
    if (groupMenuCount) groupMenuCount.textContent = count;
  },
};

// ==========================================
// 메인 실행 로직
// ==========================================

const aggregateData = modules => {
  const allData = { list: [] };
  const groupData = {};

  Object.keys(modules).forEach(path => {
    const module = modules[path];
    if (module && module.list) {
      allData.list.push(...module.list);

      const fileName = path.split('/').pop().replace('.js', '');
      const key = fileName.replace('data-page', '');
      const tabId = `tabPage${key}`;

      IaDataManager.set(tabId, module);

      const match = key.match(/^([A-Z])(\d*)$/);
      if (match) {
        const group = match[1];
        if (!groupData[group]) groupData[group] = { list: [] };
        groupData[group].list.push(...module.list);
      }
    }
  });

  return { allData, groupData };
};

(async () => {
  try {
    LayoutRenderer.render();

    const { allData, groupData } = aggregateData(dataModules);

    IaDataManager.set('tabAll', allData);
    Object.keys(groupData).forEach(group => {
      IaDataManager.set(`tabPage${group}`, groupData[group]);
    });

    IaDataManager.init();
    MemoManager.init();
    TabManager.init();
  } catch (err) {
    console.error('Initialization failed:', err);
  }
})();

// 모바일 메뉴 처리
document.querySelectorAll('.btn-mobilemenu').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.top-head').classList.toggle('active');
  });
});
