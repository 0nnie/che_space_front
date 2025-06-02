import WebUtils from "../utils/web.utils";

const webUtils = new WebUtils()


let _BASE_PROTOCOL = location.protocol;
let _BASE_HOST = location.hostname;
let _FRONT_HOST = location.hostname;
let _BASE_PORT = (location.port !== "") ? ":" + location.port : "";
let _FRONT_PORT = (location.port !== "") ? ":" + location.port : "";


let _CSS_URL = _BASE_PROTOCOL + "//" + _BASE_HOST;
let _BASE_URL = _BASE_PROTOCOL + "//" + _BASE_HOST;
let _FRONT_URL = _BASE_PROTOCOL + "//" + _FRONT_HOST;
let _API_URL = _BASE_PROTOCOL + "//" + _BASE_HOST;

/**
 * 현재 주소가 개발주소일 경우 정의
 * @type {string}
 */
//alert( _BASE_HOST.split(".")[1] + "." + _BASE_HOST.split(".")[2] )
const INNER_HOST =  "hwlms.com";
if ( _BASE_HOST === "localhost" || _BASE_HOST === "logicot.com"|| _BASE_HOST === "127.0.0.1" || _BASE_HOST === "192.168.0.151" || _BASE_HOST.split(".")[1] + "." + _BASE_HOST.split(".")[2] === INNER_HOST ) {
// if ( _BASE_HOST === "localhost" || _BASE_HOST === "127.0.0.1" || _BASE_HOST === INNER_HOST ) {
    _BASE_PROTOCOL = "http:";
    _BASE_HOST = "localhost";
    _BASE_PORT = ":8080";

    // LOCAL API 환경
    _API_URL = _BASE_PROTOCOL + "//" + _BASE_HOST + _BASE_PORT;

} else {

    const subdomain = location.hostname.split(".")[0]
    _BASE_PORT = ":8080";
    _API_URL = _BASE_PROTOCOL + "//" + location.hostname + _BASE_PORT

    // DEV 환경 설정
    if ( subdomain === "devedu" ) {
        _API_URL = _BASE_PROTOCOL + "//" + "devedu.eland.co.kr:8801"
    }

    // QAS 환경 설정
    if ( subdomain === "qasedu" ) {
        _API_URL = _BASE_PROTOCOL + "//" + "qaseduapi.eland.co.kr" + _BASE_PORT
    }

    // PRD 체크
    if ( subdomain === "edu" ) {
        _API_URL = _BASE_PROTOCOL + "//" + "eduapi.eland.co.kr"
    }

    // borex 체크
    if ( subdomain === "borex" ) {
        _API_URL = _BASE_PROTOCOL + "//" + "borex.khane7.com" + ":8801"
    }

}
_API_URL = "http://www.hwlms.com:8080"
const API_TARGET = _API_URL + "/api"
let _RESOURCE_URL = _BASE_PROTOCOL + "//" + _BASE_HOST;
if ( _BASE_PORT.trim() !== "" ) {
    _RESOURCE_URL += _BASE_PORT;
}


/**
 * 프론트 주소 정의
 * @type {string}
 * @private
 */

if ( _BASE_PORT.trim() !== "" ) {
    _FRONT_URL += _FRONT_PORT;
}


/**
 * 기본 주소 정의
 * @type {string}
 * @private
 */
if ( location.port !== '' ) {
    _BASE_URL += ":" + location.port;
    _CSS_URL += _BASE_PORT;
}


if ( _BASE_PORT.trim() !== "" ) {
    console.log("_BASE_PROTOCOL ::::: " + _BASE_PROTOCOL)
    console.log("_BASE_HOST ::::: " + _BASE_HOST)
    console.log("_BASE_URL ::::: " + _BASE_URL)
// console.log("_BASE_PORT ::::: " + _BASE_PORT)
    console.log("_FRONT_URL ::::: " + _FRONT_URL)
// console.log("_FRONT_PORT ::::: " + _FRONT_PORT)
    console.log("_API_URL ::::: " + _API_URL)
}

const PDF_KEY_ELAND = 'eZDds6xiSWMs6M6PYUgW'

export default {

    FRONT_URL : _FRONT_URL,
    BASE_URL : _BASE_URL,
    CSS_URL : _CSS_URL,
    API_URL : _API_URL,
    RESOURCRE_URL: _RESOURCE_URL,

    KAKAO_LOGIN_KEY: "f4fe96d6fed7d48b3b9ec63f1cbe24c5",
    KAKAO_REST_API_LOGIN_KEY: '4b9c1580e7cbf4bed66eaf372109ed1f',
    KAKAO_LOGIN_RETURN: location.origin + "/member/sns/kakaoReturn",
    KAKAO_IOS_LOGIN_RETURN: location.origin + "/member/sns/kakaoIOSReturn",

    NAVER_LOGIN_KEY: "qFDEQxXzXziHz8pT4Y69",
    NAVER_LOGIN_SECRET: "BBUSJCVbCO",
    NAVER_LOGIN_RETURN: location.origin.replace(webUtils.getSubdomainWithURLString(location.href), "www") + "/member/sns/naverReturn" + "/" + webUtils.getSubdomainWithURLString(location.href),
    NAVER_IOS_LOGIN_RETURN: location.origin.replace(webUtils.getSubdomainWithURLString(location.href), "www") + "/member/sns/naverIOSReturn" + "/" + webUtils.getSubdomainWithURLString(location.href),

    // 지식컨텐츠 게시판 코드 (use_story는 후기라 제외함)
    KNOWLEDGE_BOARDKEY: "ebg_story,pro_knowledge,job_data,ebg_common,brand_story,leadership,es",

    APPLE_LOGIN_RETURN: (":" + location.port === ":" ? location.origin : location.origin.replace(":" + location.port, "")).replace(webUtils.getSubdomainWithURLString(location.href), "www"),

    // pdf express viewer key
    PDF_KEY: PDF_KEY_ELAND,

    // 공통 및 코드
    COMMON_CODE: API_TARGET + "/commons/code",
    DP_KEYWORD: API_TARGET + "/keywords",
    CODE_COUNT: API_TARGET + "/code/count",

    // DISPLAY + CACHE
    DISPLAY: API_TARGET + "/display",
    DISPLAY_POPUP: API_TARGET + "/display/popup",


    // 로그인 및 세션
    SESSION: API_TARGET + "/session",


    // SNS 관련
    SNS_APPLE: API_TARGET + "/sns/apple",


    // 회사
    CO_INFO: API_TARGET + "/coinfos",
    CO_INFO_LIST: API_TARGET + "/coinfos/code",

    // 회원가입
    CO_ACCOUNT: API_TARGET + "/coaccounts",

    // 파일 공통
    FILES: API_TARGET + "/file",
    FILES_SHOW: API_TARGET + "/file/show/",
    FILES_DOWN: API_TARGET + "/file/download/",
    FILES_PLAY: API_TARGET + "/file/play/",
    FILES_EDU_CARD_SHOW: API_TARGET + "/file/edu_card/show/",

    // 게시판
    BOARDS: API_TARGET + "/boards",
    BOARD_COMMENTS: API_TARGET + "/boards/comments",
    BOARD_COMMENTS_FILES_DOWN: API_TARGET + "/boards/comments/file/download/",
    BOARD_LIKE: API_TARGET + "/boards/like",
    BOARD_WISH: API_TARGET + "/boards/wish",
    BOARD_CAUTION: API_TARGET + "/boards/caution",
    BOARD_FILES: API_TARGET + "/boards/file",
    BOARD_FILES_SHOW: API_TARGET + "/boards/file/show/",
    BOARD_FILES_DOWN: API_TARGET + "/boards/file/download/",
    BOARD_FILES_PLAY: API_TARGET + "/boards/file/play/",
    BOARD_FIND_POPULAR: API_TARGET + "/boards/findTopBidxs",
    BOARD_ERROR_IMG : API_TARGET + "/boards/file/show/0",


    // 포인트
    POINT: API_TARGET + "/point",


    // SHOP
    SHOP_GOODS: API_TARGET + "/goods",
    SHOP_ORDER: API_TARGET + "/order",
    SHOP_PG: API_TARGET + "/pg",
    SHOP_FILE_SHOW: API_TARGET + "/shop/file/show/",
    SHOP_FILES_DOWN: API_TARGET + "/shop/file/download/",
    SHOP_MY_ORDER : API_TARGET + "/mypage/orderGoods",


    // 교육메인
    EDU_MAIN: API_TARGET + "/edu/main",
    EDU_STUDENT: API_TARGET + "/edu/student",
    EDU_CONTENT: API_TARGET + "/edu/content",
    EDU_QUESTION: API_TARGET + "/edu/question",
    EDU_ANSWER: API_TARGET + "/edu/answer",
    EDU_MINE: API_TARGET + "/edu/mine",
    EDU_FILE: API_TARGET + "/edu/file",
    EDU_FILE_SHOW: API_TARGET + "/edu/file/show/",
    EDU_FILE_DOWN: API_TARGET + "/edu/file/download/",
    EDU_FILE_PLAY: API_TARGET + "/edu/file/play/",


    // 교육과정
    EDU_COURSE: API_TARGET + "/edu/course",

    // 사내고수
    PRO_RECOMMEND: API_TARGET + "/pro/recommend",
    PRO_SEARCH: API_TARGET + "/pro/search",
    PRO_INFO: API_TARGET + "/pro/",
    PRO_FOLLOW: API_TARGET + "/pro/follow",
    PRO_INQUIRY: API_TARGET + "/pro/inquiry",
    PRO_INQUIRY_CANCEL: API_TARGET + "/pro/inquiry/cancel",
    PRO_INQUIRY_COMMENT: API_TARGET + "/pro/inquiry/comment",
    PRO_INQUIRY_JOURNAL: API_TARGET + "/pro/inquiry/journal",
    PRO_INQUIRY_REVIEW: API_TARGET + "/pro/inquiry/review",
    PRO_INQUIRY_RECEIVER: API_TARGET + "/pro/inquiry/receiver",
    PRO_HELP_SEARCH: API_TARGET + "/pro/help/list",
    PRO_HELP_BEST: API_TARGET + "/pro/help/best",
    PRO_HELP_BOARD: API_TARGET + "/pro/help",
    PRO_HELP_BOARD_COMMENT: API_TARGET + "/pro/help/comment",
    PRO_REQUEST: API_TARGET + "/pro/request",
    PRO_QUESTION: API_TARGET + "/pro/question",
    PRO_NEW_CONTENTS: API_TARGET + "/pro/content/new",

    // 직무역량진단
    JOB_SKILL: API_TARGET + "/jobskill",
    JOB_SKILL_SUBMIT: API_TARGET + "/jobskill/response",
    JOB_SKILL_RESULT: API_TARGET + "/jobskill/result",
    JOB_SKILL_RECOMMEND: API_TARGET + "/jobskill/recommend",

    // 계정 + 사내고수 정보 변경
    ACCOUNT_PRO: API_TARGET + "/account",

    // 정적 페이지
    STATIC_PAGE: API_TARGET + "/pages/",

    // 리뷰 관련
    REVIEW_LIST: API_TARGET + "/review/getReviewList",
    REVIEW_SET: API_TARGET + "/review/setReview",
    REVIEW_SET_PICK: API_TARGET + "/review/setReviewPick",
    REVIEW_DELETE: API_TARGET + "/review/delete",

    // 내정보
    MYPAGE_BOARD: API_TARGET + "/mypage/board",
    MYPAGE_BOARD_RECOMMEND : API_TARGET + "/mypage/board/recommend",
    MINE: API_TARGET + '/mypage/info',
    CART: API_TARGET + '/mypage/cart',

    OAUTH: API_TARGET + '/oauth',

    // 알림
    ALARM_COUNT: API_TARGET + "/notif/count",
    ALARM_LIST: API_TARGET + "/notif/getNotifList",
    ALARM_SET_IS_READ: API_TARGET + "/notif/setIsRead",

    /**
     * 메인 관련
     */
    // 메인 배너 리스트
    MAIN_LIST: API_TARGET + "/display/main",
    // 메인 신규 콘텐츠 리스트
    MAIN_NEW_CONTENS: API_TARGET + "/boards/getMainNewContents"
}
//export default APIs;
