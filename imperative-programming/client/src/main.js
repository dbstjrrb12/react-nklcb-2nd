const textFormatting = (text) => text.toString().replace(/\n\s+/g, '').trim();
const throwError = (errorMessage) => { throw new Error(errorMessage) };

const translator = {
  en: {
    headline: 'Imperative Programming',
    description: textFormatting(`
      In computer science, imperative programming is a programming paradigm 
      that uses statements that change a program's state.
    `),
  },
  ko: {
    headline: '명령형 프로그래밍',
    description: textFormatting(`
      컴퓨터 과학에서 명령형 프로그래밍(命令型 프로그래밍, 영어: imperative programming)은 
      선언형 프로그래밍과 반대되는 개념으로, 프로그래밍의 상태와 상태를 변경시키는 구문의 관점에서 
      연산을 설명하는 프로그래밍 패러다임의 일종이다.
    `),
  },

  _languageMode: 'en',
  get currentMode() {
    return this._languageMode;
  },

  isKorean() {
    return this.currentMode === 'ko';
  },
  isEnglish() {
    return this.currentMode === 'en';
  },
  toggleLanguageMode() {
    this._languageMode = this.isKorean() ? 'en' : 'ko';
    return this;
  },
  getContents(item) {
    const contents = this[this.currentMode];
    const contentItem = contents[item];
    return !item
      ? contents
      : contentItem
      ? contentItem
      : throwError(`${item}은 translator 콘텐츠 아이템이 아닙니다.`);
  },
  getLabel() {
    return `${this.isKorean() ? '한 → 영' : '영 → 한'} 번역`;
  },
};

/* 명령형 프로그래밍 ---------------------------------------------------------------- */

/* 미션 1. Vanilla(JavaScript) 버전으로 작성 */

/* 미션 2. jQuery 버전으로 작성 */
if ('jQuery' in window) {
  const {jQuery} = window;
  const translatorApp = ($) => {
    // 버튼 요소 노드 찾기
    // jQuery 능력
    // jQuery 팩토리 함수 $(selector)
    const $translateButton = $('.button__translation');

    // 이벤트 리스너
    const handleTranslation = () => {
      // 모드를 토글
      translator.toggleLanguageMode();
      
      // UI 업데이트 렌더링
      updateRenderUI();
    }

    const updateRenderUI = () => {
      // translator의 현재 모드의 콘텐츠를 가져오기
      const { headline, description } = translator.getContents();
      
      // 업데이트 할 문서의 요소를 찾아서 jQuery 인스턴스화 참조
      const $contents = $('.contents');
      const $headline = $contents.find(':header');
      const $description = $contents.find('p');

      // 헤드라인, 디스크립션 요소의 텍스트 콘텐츠 업데이트
      $headline.text(headline);
      $description.text(description);

      // 번역 버튼의 레이블 업데이트
      let label = translator.getLabel();
      $translateButton.attr({
        title: label,
        'aria-label': label
      });
      
    }
    
    
    
    // 찾은 버튼에 이벤트 연결 (jQuery 능력 활용 .on())
    $translateButton.on('click', handleTranslation);
  }
  
  jQuery(document).ready(translatorApp);
}

/* 미션 3. translator 객체를 class 문법으로 작성 */

/* 미션 4. translator 모듈을 분리해 ES 모듈로 관리 */
