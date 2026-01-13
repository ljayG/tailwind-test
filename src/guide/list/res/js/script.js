// 데이터 파일 로드 (Vite import.meta.glob 사용)
const dataModules = import.meta.glob('../../ia/ia_js/data-*.js', { query: '?url', import: 'default', eager: true });
const scripts = Object.values(dataModules);

// 모든 스크립트 로드를 위한 Promise 생성
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const iaData = {
  init: () => {
    iaData.change();
    iaData.filterReset();
    iaData.selectRow();
    iaData.sort();
    iaData.option();
  },
  set: (elementId, data) => {
    const container = document.querySelector(`#${elementId} .data-body`);
    if (!container) return; // 해당 탭 컨텐츠가 없으면 패스

    container.innerHTML = `
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

    const tbody = container.querySelector('.data-list tbody');
    const captions = document.querySelectorAll('.data .data-body .data-list caption');

    captions.forEach(caption => {
      caption.textContent = '';
      const table = caption.closest('table');
      const thead = table.querySelector('thead');
      if (thead) {
        const ths = thead.querySelectorAll('th');
        const texts = Array.from(ths)
          .map(th => th.textContent.trim())
          .filter(text => text !== '')
          .join(', ');
        caption.textContent = `${texts} 정보입니다.`;
      }
    });

    let html = '';
    // data가 존재하고 list가 있을 때만 처리
    if (data && data.list && data.list.length > 0) {
      data.list.forEach((item, index) => {
        let statusClass = '';
        if (item.status === '삭제') statusClass = 'is-delete';
        if (item.user === '묶음') statusClass = 'is-bundle';
        if (item.user === '스탭') statusClass = 'is-individual';
        if (item.user === '탭묶음') statusClass = 'is-tab-bundle';
        if (item.user === '탭') statusClass = 'is-tab-page';
        if (item.user === '가이드묶음') statusClass = 'is-guide';
        if (item.user === '가이드스탭') statusClass = 'is-guide-step';
        if (item.user === '목록') statusClass = 'is-pagelist';
        if (item.user === '상세') statusClass = 'is-pageview';
        if (item.user === '공통') statusClass = 'is-page-comm';
        if (item.status === '삭제' && item.user === '공통') statusClass = 'is-delete is-page-comm';
        if (item.status === '삭제' && item.user === '스탭') statusClass = 'is-delete is-individual';

        let memoHtml = '';
        if (item.memo && item.memo.length > 0) {
          const listClass = item.memo.length > 1 ? 'note-list option-fold' : 'note-list';
          memoHtml += `<ul class="${listClass}">`;
          item.memo.forEach(memo => {
            memoHtml += `<li>${memo.detail}</li>`;
          });
          memoHtml += '</ul>';
        }

        html += `
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
      });
      tbody.innerHTML = html;
    }

    iaData.count(elementId);
    iaData.countAll(elementId);
  },
  option: () => {
    const orderOptions = [
      { value: '1차', text: '1차' }, { value: '2차', text: '2차' }, { value: '3차', text: '3차' }, { value: '-', text: '-' },
    ];
    const statusOptions = [
      { value: '대기', text: '대기' }, { value: '진행', text: '진행' }, { value: '확인', text: '확인' }, { value: '완료', text: '완료' }, { value: '삭제', text: '삭제' },
    ];

    document.querySelectorAll('.data-list thead > tr > th select[data-sort-name="order"]').forEach(select => {
      // 중복 추가 방지를 위해 기존 옵션 확인
      if (select.options.length > 1) return; 
      orderOptions.forEach(opt => {
        select.insertAdjacentHTML('beforeend', `<option value="${opt.value}">${opt.text}</option>`);
      });
    });

    document.querySelectorAll('.data-list thead > tr > th select[data-sort-name="status"]').forEach(select => {
      if (select.options.length > 1) return;
      statusOptions.forEach(opt => {
        select.insertAdjacentHTML('beforeend', `<option value="${opt.value}">${opt.text}</option>`);
      });
    });
  },
  change: () => {
    // 이벤트 중복 바인딩 방지 (필요시)
    document.querySelectorAll('.data-list thead > tr > th select').forEach(select => {
      select.onchange = function () { // addEventListener 대신 덮어쓰기로 중복 방지
        const tabId = this.closest('.tab-item').id;
        if (this.value === '') {
          this.closest('th').classList.remove('is-active');
        } else {
          this.closest('th').classList.add('is-active');
        }
        iaData.filter(tabId);
      };
    });
  },
  filter: (tabId) => {
    const selects = document.querySelectorAll(`#${tabId} .data-list thead > tr > th select`);
    let orderVal = '', statusVal = '';

    selects.forEach(select => {
      const sortName = select.getAttribute('data-sort-name');
      const val = select.value;
      if (sortName === 'order') orderVal = val;
      if (sortName === 'status') statusVal = val;
    });

    const rows = document.querySelectorAll(`#${tabId} .data-list tbody > tr`);
    rows.forEach(row => {
      const orderText = row.querySelector('.sort-order')?.textContent || '';
      const statusText = row.querySelector('.sort-status')?.textContent || '';
      const matchOrder = orderVal === '' || orderVal === orderText;
      const matchStatus = statusVal === '' || statusVal === statusText;

      if (matchOrder && matchStatus) {
        row.classList.remove('is-hide');
        row.style.display = '';
      } else {
        row.classList.add('is-hide');
        row.style.display = 'none';
      }
    });
    iaData.count(tabId);
  },
  filterReset: () => {
    document.querySelectorAll('.filter-reset').forEach(btn => {
      btn.onclick = function () {
        const tabId = this.closest('.tab-item').id;
        const selects = document.querySelectorAll(`#${tabId} .data-list thead > tr > th select`);
        selects.forEach(select => {
          select.value = '';
          // trigger change 수동 호출
          if (select.onchange) select.onchange(); 
        });
        document.querySelectorAll(`#${tabId} .data-list thead > tr > th`).forEach(th => th.classList.remove('is-sort'));
        document.querySelectorAll(`#${tabId} .data-list thead > tr > th .data-sort`).forEach(btn => {
          btn.textContent = '▼';
          btn.classList.remove('desc', 'asc');
        });

        const tbody = document.querySelector(`#${tabId} .data-list tbody`);
        const rows = Array.from(tbody.querySelectorAll('tr'));
        rows.sort((a, b) => {
          const numA = parseInt(a.children[0].textContent, 10);
          const numB = parseInt(b.children[0].textContent, 10);
          return numA - numB;
        });
        rows.forEach(row => tbody.appendChild(row));
      };
    });
  },
  count: (tabId) => {
    let wait = 0, progress = 0, confirm = 0, complete = 0, deleted = 0;
    const rows = Array.from(document.querySelectorAll(`#${tabId} .data-list tbody > tr:not(.nodata):not(.is-hide)`));
    rows.forEach(row => {
      const status = row.querySelector('.sort-status')?.textContent;
      switch (status) {
        case '대기': wait++; break;
        case '진행': progress++; break;
        case '확인': confirm++; break;
        case '완료': complete++; break;
        case '삭제': deleted++; break;
      }
    });
    const total = rows.length;
    const calcPercent = (val) => total ? ((val / total) * 100).toFixed(2) : 0;
    const html = `전체 : <strong class="fc-primary">${total}</strong>건, 대기 : <strong class="fc-warning">${wait}</strong>건<span class="fc-base">(${calcPercent(wait)}%)</span>, 진행 : <strong class="fc-highlight">${progress}</strong>건<span class="fc-base">(${calcPercent(progress)}%)</span>, 확인 : <strong class="fc-highlight">${confirm}</strong>건<span class="fc-base">(${calcPercent(confirm)}%)</span>, 완료 : <strong class="fc-secondary">${complete}</strong>건<span class="fc-base">(${calcPercent(complete)}%)</span>, 삭제 : <strong class="fc-disabled">${deleted}</strong>건<span class="fc-base">(${calcPercent(deleted)}%)</span>`;
    const countContainer = document.querySelector(`#${tabId} .title-h3 .count`);
    if(countContainer) countContainer.innerHTML = html;
    const tbody = document.querySelector(`#${tabId} .data-list tbody`);
    if (total === 0) {
      if (!tbody.querySelector('.nodata')) {
        tbody.insertAdjacentHTML('beforeend', `<tr class="nodata"><td colspan="16" class="align-center">데이터가 없습니다.</td></tr>`);
      }
    } else {
      const nodata = tbody.querySelector('.nodata');
      if (nodata) nodata.remove();
    }
  },
  countAll: (tabId) => {
    const rows = document.querySelectorAll(`#${tabId} .data-list tbody > tr:not(.nodata):not(.is-hide)`);
    const countEl = document.querySelector(`#${tabId}Menu .tab-count`);
    if (countEl) countEl.textContent = rows.length;
  },
  selectRow: () => {
    // 중복 등록 방지를 위해 body 레벨에서 한 번만 등록하는 것이 좋으나
    // 여기서는 간단히 처리. 기존 리스너 제거가 어려우므로 flag 사용 고려 가능.
    // 하지만 init이 여러번 호출되지 않는다면 문제 없음.
  },
  sort: () => {
    document.querySelectorAll('.tab-item .data').forEach(tableDiv => {
      tableDiv.querySelectorAll('.data-list thead > tr > th').forEach((th, index) => {
        const btn = th.querySelector('.data-sort');
        if (!btn) return;
        // 기존 리스너 제거 후 등록
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', function () {
          const tabId = this.closest('.tab-item').id;
          let direction = this.classList.contains('asc') ? -1 : 1;
          this.classList.toggle('asc', direction === 1);
          this.classList.toggle('desc', direction === -1);
          this.textContent = direction === 1 ? '▲' : '▼';

          const tbody = document.querySelector(`#${tabId} .data-list tbody`);
          const rows = Array.from(tbody.querySelectorAll('tr'));
          rows.sort((a, b) => {
            const textA = a.children[index]?.textContent.toUpperCase() || '';
            const textB = b.children[index]?.textContent.toUpperCase() || '';
            return textA < textB ? -direction : textB < textA ? direction : 0;
          });
          rows.forEach(row => tbody.appendChild(row));
        });
      });
    });
  },
};

// 메인 실행 로직
(async () => {
  try {
    // 모든 스크립트 로드 대기
    await Promise.all(scripts.map(src => loadScript(src)));
    
    // 데이터 집계 및 매핑
    const allData = { list: [] };
    const groupData = {}; // 그룹별 데이터 (예: A, B, C...)

    // window 객체에서 'iaPage'로 시작하는 모든 변수 탐색
    Object.keys(window).forEach(key => {
      if (key.startsWith('iaPage') && window[key] && window[key].list) {
        // 전체 데이터 병합
        allData.list.push(...window[key].list);

        // 개별 탭 매핑 (예: iaPageAData1 -> tabPageA1)
        // 정규식: iaPage + (그룹: A~Z) + Data + (숫자: 0~99)
        const match = key.match(/^iaPage([A-Z])Data(\d*)$/);
        
        if (match) {
          const group = match[1]; // A
          const num = match[2];   // 1 (숫자가 없으면 빈 문자열)
          
          if (num) {
            // 개별 페이지 데이터 (A1, B13 등)
            iaData.set(`tabPage${group}${num}`, window[key]);
            
            // 그룹 데이터 집계용 배열에 추가
            if (!groupData[group]) groupData[group] = { list: [] };
            groupData[group].list.push(...window[key].list);
          } else {
            // 이미 그룹핑된 데이터 변수일 경우 (예: iaPageAData)
            // 개별 데이터에서 자동으로 합칠 것이므로 무시하거나,
            // 만약 개별 데이터가 없고 그룹 변수만 있다면 이걸 써야 함.
            // 여기서는 안전하게 그룹 데이터 변수도 탭에 매핑.
            // 단, 중복 방지가 필요할 수 있음.
             iaData.set(`tabPage${group}`, window[key]);
          }
        }
      }
    });

    // 전체 탭 렌더링
    iaData.set('tabAll', allData);
    
    // 그룹별 탭 렌더링 (예: tabPageA)
    Object.keys(groupData).forEach(group => {
      // 기존 변수(iaPageAData)가 없었을 경우를 대비해 수집된 데이터로 렌더링
      // 만약 iaData.set이 이미 호출되었다면(위 루프의 else 블록), 덮어쓰거나 패스해야 함.
      // 여기서는 덮어쓰기 (수집된게 최신일 테니)
      iaData.set(`tabPage${group}`, groupData[group]);
    });
    
    // 필터/정렬 등 이벤트 바인딩
    iaData.init();
    
    // 메모 기능 및 탭 UI 초기화
    iaMemo.init();
    commUiFnTab.init();
    
  } catch (err) {
    console.error('Data loading failed:', err);
  }
})();

// 메모 및 UI 객체 (기존 동일)
const iaMemo = {
  init: () => { iaMemo.toggle(); iaMemo.all(); },
  toggle: () => {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.data-list tbody > tr > td .note-list.option-fold');
      if (target) target.classList.toggle('is-open');
    });
  },
  all: () => {
    document.querySelectorAll('.btn-memo-all').forEach(btn => {
      btn.addEventListener('click', function() {
        const tabId = this.closest('.tab-item').id;
        const isOpen = this.classList.toggle('is-open');
        this.textContent = isOpen ? '닫기' : '더보기';
        document.querySelectorAll(`#${tabId} .note-list.option-fold`).forEach(note => note.classList.toggle('is-open', isOpen));
      });
    });
  }
};

const commUiFnSetVH = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
};

const commUiFnTab = {
  init: () => {
    commUiFnSetVH();
    window.addEventListener('resize', commUiFnSetVH);
    commUiFnTab.select();
  },
  select: () => {
    document.querySelectorAll('.tab-menu').forEach(menu => {
      menu.addEventListener('click', function () {
        const targetId = this.getAttribute('aria-controls');
        const target = document.getElementById(targetId);
        if (!target) return;

        // 같은 페이지 내에서의 탭 전환 (헤더와 본문 모두 처리)
        const page = this.closest('.ia-page');
        
        // 헤더 탭 활성화
        const siblingMenus = this.parentElement.children; // 형제 탭 메뉴들
        // 형제가 아니라 전체 탭 메뉴를 찾아야 할 수도 있음 (구조에 따라 다름)
        // 여기서는 안전하게 모든 탭 메뉴의 활성 상태 제거는 위험할 수 있으니 (중첩 탭 구조)
        // 클릭된 탭의 레벨에 맞는 처리가 필요함.
        
        // 간단히: 현재 클릭된 탭에 active 추가
        // 기존 로직:
        // page.querySelectorAll('.tab-menu').forEach(...) -> 이건 너무 광범위함.
        
        // 가장 가까운 리스트(ul) 내의 탭들만 제어
        const parentUl = this.closest('ul');
        if (parentUl) {
           parentUl.querySelectorAll(':scope > li.tab-menu').forEach(m => {
              m.classList.remove('is-active');
              m.setAttribute('aria-selected', 'false');
           });
        }
        this.classList.add('is-active');
        this.setAttribute('aria-selected', 'true');
        
        // 본문 탭 아이템 활성화
        // target(본문)이 속한 컨테이너(tab-list) 내의 형제들만 숨겨야 함
        const tabList = target.parentElement;
        if (tabList) {
           tabList.querySelectorAll(':scope > .tab-item').forEach(item => {
              item.classList.remove('is-active');
              item.setAttribute('aria-hidden', 'true');
           });
        }
        target.classList.add('is-active');
        target.setAttribute('aria-hidden', 'false');

        // 하위 탭 자동 선택 (첫 번째 자식 탭)
        // 뎁스 구조가 있으므로 재귀적 또는 명시적 트리거 필요
        const subMenu = target.querySelector('.gnb-dep2 > .tab-menu');
        if (subMenu) {
            // 이벤트 버블링 방지 등을 고려해야 하지만, 여기서는 click 트리거
            // 단, 무한 루프 방지
            // subMenu.click(); 
            // click() 대신 로직 직접 실행 권장되나 복잡하므로 패스
        }
      });
    });
  }
};

// 모바일 메뉴 버튼 등 추가 이벤트 바인딩
document.querySelectorAll('.btn-mobilemenu').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.top-head').classList.toggle('active');
  });
});

document.addEventListener('click', (e) => {
    if (e.target.matches('.gnb-dep1 li > a, .gnb-dep1 li > a *')) {
        const a = e.target.closest('a');
        const li = a.parentElement;
        
        // 형제들 class 제거
        const siblings = li.parentElement.children;
        Array.from(siblings).forEach(sib => sib.classList.remove('current'));
        
        // 본인 class 추가
        li.classList.add('current');
    }
});
