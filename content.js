(()=>{
  // Platform detection
  const isGemini = window.location.hostname.includes('gemini.google.com');
  const isChatGPT = window.location.hostname.includes('chatgpt.com');
  const platform = isGemini ? 'gemini' : 'chatgpt';
  
  const e=e=>new Promise(t=>{setTimeout(()=>{t()},e)}),t=(e,t,l=1e3)=>{const n=setInterval(()=>{e.isConnected||(clearInterval(n),t())},l);return()=>{clearInterval(n)}},l=(e,t,l)=>{const n=new MutationObserver((e,l)=>{t(e,l)});return n.observe(e,{childList:!0,subtree:l}),n},n=(e="")=>/[：:\uFF1A\u003A\u0903]/.test(e),a=Alert2(()=>document.querySelector(o.floatbar)),s=({action:e,data:t})=>{chrome.runtime.sendMessage({type:"ga-event",action:e,data:t}).catch(e=>{})};let r=0;lang("syncFold");
  
  // Update selectors based on platform
  const o=Object.freeze({
    article: isGemini ? "message-content" : "article",
    main: isGemini ? "main" : "main#main",
    markdown: isGemini ? ".model-response-text" : ".markdown",
    threadId:"thread",
    floatbar:".catalogeu-navigation-plugin-floatbar",
    messagePlaceholderRequest: isGemini ? '[data-placeholder="true"]' : '[data-message-id^="placeholder-request-"]',
    messageAttr: isGemini ? "data-message-id" : "data-message-id",
    message: isGemini ? "[data-message-id]" : "[data-message-id]",
    authorAttr: isGemini ? "data-message-author" : "data-message-author-role",
    author: isGemini ? "div[data-message-author]" : "div[data-message-author-role]",
    assistant: isGemini ? 'div[data-message-author="model"]' : 'div[data-message-author-role="assistant"]',
    user: isGemini ? 'div[data-message-author="user"]' : 'div[data-message-author-role="user"]',
    sidebarHeader:"#sidebar-header",
    headerId:"page-header",
    header:'[role="presentation"] > #page-header',
    bottom:'[role="presentation"] > #thread-bottom-container',
    content: isGemini ? '.model-response-text' : 'article > div.text-base > div[tabindex="-1"]'
  });
  
  const i=Object.freeze({collapsed:"collapsed",processed:"collapse-processed",showPanel:"show-panel",hover:"hover",subcatalog:"subcatalog",wide:"wide",headbar:"headbar",speakbox:"speakbox"}),c=Object.freeze({tree:'<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" version="1.1">\n                <defs>\n                <filter id="svg_2_blur">\n                <feGaussianBlur in="SourceGraphic" stdDeviation="0"/>\n                </filter>\n                </defs>\n                <g>\n                <title>Layer 1</title>\n                <path fill="#878585" p-id="13609" id="svg_1" transform="rotate(90 512 311.157)" stroke="null" d="m797.12819,323.41716l0,-43.27157l0,-53.36827l0,-43.27157l0,-53.36827l1.50862,-41.82918l0,-272.61088l-45.25845,0l0,66.34974c-30.17231,-30.2901 -72.41352,-49.04112 -119.18059,-49.04112c-66.37906,0 -128.23228,40.3868 -152.37011,98.08222c-89.0083,11.53909 -155.38735,90.87029 -155.38735,186.06774l0,7.21194c-61.85321,34.61725 -101.07721,111.06369 -101.07721,196.16443c0,53.36827 15.08615,103.85176 43.74984,142.79618c-4.52585,20.19341 -4.52585,40.3868 -1.50862,60.5802c10.56031,96.63984 89.00828,168.75912 176.50796,168.75912c1.50862,2.88478 3.01723,5.76955 4.52585,7.21194c0,1.44238 1.50862,2.88477 1.50862,4.32716c31.68092,51.92588 93.53413,85.10075 161.4218,85.10075c55.81876,0 105.60306,-23.07817 140.3012,-57.69543l0,75.00406l45.25845,0l0,-288.47712l0,-43.27157l0,-53.36827l0,-43.27157l0,-54.81065zm-184.05103,422.61898c-58.83599,0 -111.63752,-33.17486 -131.24951,-83.65837c-4.52585,-12.98147 -7.54308,-27.40532 -7.54308,-40.38679c0,-67.79213 63.36183,-124.04517 140.3012,-124.04517l22.62923,0l0,-40.38679c0,-21.63578 39.224,-56.25304 58.83599,-56.25304l0,-43.27157c-42.24121,0 -102.58582,50.48349 -104.09444,98.08222c-46.76706,5.76955 -87.49966,25.96294 -117.67197,56.25304c-30.1723,-8.65431 -60.34459,-28.84771 -60.34459,-56.25304l-45.25845,0c0,44.71396 37.71537,77.88882 78.44797,92.31268c-12.06892,21.63578 -18.10338,46.15634 -18.10338,72.11928c0,8.65431 1.50862,17.30863 3.01724,25.96294c-60.34461,-7.21192 -110.1289,-59.13781 -119.18059,-128.37231c-1.50862,-18.75102 -1.50862,-37.50203 3.01723,-54.81066l3.01724,-10.09669l-6.03446,-8.65431c-25.64645,-33.17488 -40.73261,-77.88882 -40.73261,-125.48755c0,-75.00406 36.20676,-139.91141 89.00828,-164.43196l15.08615,-7.21194l-1.50862,-15.86624c-1.50861,-7.21192 -1.50861,-12.98147 -1.50861,-18.75102c0,-66.34973 42.24121,-122.60277 98.05997,-138.46902l0,12.98147c0,31.73249 10.56031,62.02259 27.15507,86.54314c-37.71538,17.30863 -67.88768,47.59873 -67.88768,87.98553l45.25845,0c0,-25.96294 27.15507,-44.71396 54.31014,-53.36827c28.66369,23.07817 64.87045,36.05964 105.60306,36.05964l0,-43.27157c-66.37907,0 -119.18059,-51.92588 -119.18059,-113.94847c0,-10.09669 1.50862,-21.63578 4.52585,-31.73247l0,-1.44239c15.08615,-47.59873 61.85321,-82.21598 114.65475,-82.21598c66.37906,0 119.18058,51.92588 119.18058,113.94847l0,43.27157c-43.74983,1.44238 -81.46521,-23.07817 -98.05997,-64.90735l-42.24123,14.42385c22.62923,57.69543 76.93937,93.75507 135.77535,93.75507l4.52585,0l0,151.45049a107.11166,102.40937 0 0 0 -66.37906,-21.63578c-42.24123,0 -87.49968,21.63578 -120.6892,59.13781c-27.15507,30.2901 -67.88768,54.81065 -104.09444,34.61725l0,1.44239c-7.54308,-41.82919 -45.25845,-75.00406 -92.02552,-75.00406l0,43.27157c27.15507,0 48.27568,20.19339 48.27568,46.15634s-21.12061,46.15635 -48.27568,46.15635l0,43.27157c40.73261,0 75.43075,-24.52056 89.00828,-59.13782c10.56031,2.88478 21.12062,5.76955 33.18954,5.76955c37.71538,0 76.93937,-20.19339 110.1289,-57.69543c24.13783,-27.40532 57.32737,-43.27157 85.99106,-43.27157c19.61199,0 37.71537,7.21194 51.2929,23.07817c6.03446,7.21192 10.56031,14.42386 15.08615,23.07817l0,222.12737c-61.85321,-1.44238 -117.67197,34.61725 -140.3012,93.75507l42.24123,14.42385c16.59476,-41.82918 55.81875,-67.79212 98.05997,-64.90735l0,64.90735c-4.52585,66.34974 -66.37906,122.60278 -143.31842,122.60278z"/>\n                <path fill="#5454ff" p-id="9428" id="svg_2" filter="url(#svg_2_blur)" stroke="null" d="m958.87299,845.99664l-67.70802,0l0,-105.08567a81.24963,54.24242 0 0 0 -81.24963,-54.24242l-267.47379,0l0,-88.19819l111.74532,0a40.62482,27.12121 0 0 0 40.62482,-27.12121l0,-108.48485a40.62482,27.12121 0 0 0 -40.62482,-27.12121l-284.37371,0a40.62482,27.12121 0 0 0 -40.62482,27.12121l0,108.48485c0,14.97091 18.19992,27.12121 40.62482,27.12121l111.74532,0l0,88.12586l-267.47379,0a81.24963,54.24242 0 0 0 -81.24963,54.31475l0,105.08567l-67.70802,0a40.62482,27.12121 0 0 0 -40.62482,27.12121l0,108.48485c0,14.97091 18.19992,27.12121 40.62482,27.12121l176.04087,0a40.62482,27.12121 0 0 0 40.62482,-27.12121l0,-108.48485a40.62482,27.12121 0 0 0 -40.62482,-27.12121l-47.39563,0l0,-77.96446c0,-29.94182 16.08743,-40.71798 60.93722,-40.71798l226.84897,0l0,118.68243l-57.5789,0a40.62482,27.12121 0 0 0 -40.62482,27.12121l0,108.48485c0,14.97091 18.19992,27.12121 40.62482,27.12121l176.04086,0a40.62482,27.12121 0 0 0 40.62482,-27.12121l0,-108.48485a40.62482,27.12121 0 0 0 -40.62482,-27.12121l-57.5789,0l0,-118.68243l226.84897,0c44.8498,0 60.93722,10.77616 60.93722,40.71798l0,77.96446l-47.39563,0a40.62482,27.12121 0 0 0 -40.62482,27.12121l0,108.48485c0,14.97091 18.19992,27.12121 40.62482,27.12121l176.04087,0a40.62482,27.12121 0 0 0 40.62482,-27.12121l0,-108.48485a40.62482,27.12121 0 0 0 -40.62482,-27.12121l-57.5789,0l0,-118.68243l226.84897,0c44.8498,0 60.93722,10.77616 60.93722,40.71798l0,77.96446l-47.39563,0a40.62482,27.12121 0 0 0 -40.62482,27.12121l0,108.48485c0,14.97091 18.19992,27.12121 40.62482,27.12121l176.04087,0a40.62482,27.12121 0 0 0 40.62482,-27.12121l0,-108.48485a40.62482,27.12121 0 0 0 -40.62482,-27.12121z" />\n                </g>\n                </svg>',bind:'<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" version="1.1">\n         <g>\n        <path stroke="null" fill="#000000" d="m378.51035,417.69249zm-376.9144,325.24581l0,-576.7279a165.19426,164.17325 0 0 1 165.19426,-164.17325l691.21043,0a165.19426,164.17325 0 0 1 165.19426,164.17325l0,569.11217a165.19426,164.17325 0 0 1 -165.19426,164.17325l-246.58719,0l-296.94461,113.69188a64.58887,64.18967 0 0 1 -98.36119,-54.72442l1.36841,-8.54049l16.58511,-49.7742l-18.88404,-0.16319l-0.6021,0l-38.8628,-0.32639l-12.53462,-0.1088l-4.32417,0a157.53117,156.55753 0 0 1 -157.20275,-156.66632l-0.05474,0.0544zm290.54046,220.58401l304.38875,-116.57498l9.85254,-1.84953l251.62293,0a110.45792,109.77522 0 0 0 110.45792,-109.77522l0,-569.11217a110.45792,109.77522 0 0 0 -110.45792,-109.77522l-691.21043,0a110.45792,109.77522 0 0 0 -110.45792,109.77522l0,576.7279a102.79484,102.1595 0 0 0 103.45167,102.1595l3.88628,0l12.53462,0.16319l38.8628,0.32639l0.65684,0l56.37842,0.54398a27.36817,27.19901 0 0 1 25.72608,35.68511l-26.49239,79.63871c1.25894,3.97106 4.92627,6.79975 9.30518,6.79975c2.18945,0 4.05049,-0.54398 1.97051,1.35995l9.52412,-6.09258zm-133.00929,-64.02648c0.16421,0 0.16421,0 1.31367,-54.39803l-0.71157,0c35.8523,0.70717 35.63335,54.39803 -0.6021,54.39803z"/>\n        <path stroke="null" fill="#353535" d="m897.72227,487.25138q0,12.88037 -12.24627,27.41147l-132.63107,164.39908q-16.97678,21.18053 -47.57034,35.92088t-56.65557,14.74035l-429.48151,0q-13.41784,0 -23.87359,-5.39395t-10.45575,-17.85582q0,-12.88037 12.24627,-27.41147l132.63107,-164.39908q16.97678,-21.18053 47.57034,-35.92088t56.65557,-14.74035l429.48151,0q13.41784,0 23.87359,5.39395t10.45575,17.85582zm-135.39422,-142.8233l0,66.42457l-328.41663,0q-37.11459,0 -77.76602,19.7158t-64.74607,49.61499l-134.99632,166.91005q0,-1.65073 -0.19895,-5.1847t-0.19895,-5.1847l0,-398.57069q0,-38.19936 26.06201,-65.58758t62.35871,-27.41147l126.30899,0q36.31881,0 62.35871,27.41147t26.06201,65.58758l0,13.27561l214.7297,0q36.31881,0 62.35871,27.41147t26.06201,65.58758l0.02211,0z"/>\n        </g>\n        </svg>',edit:'<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z" fill="#000000"></path></svg>',unfull:'<svg viewBox="0 0 1042 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M330.971429 950.857143h-73.142858V768h-182.857142v-73.142857h219.428571c20.114286 0 36.571429 16.457143 36.571429 36.571428v219.428572zM952.685714 329.142857h-219.428571c-20.114286 0-36.571429-16.457143-36.571429-36.571428V73.142857h73.142857v182.857143h182.857143v73.142857zM294.4 329.142857h-219.428571v-73.142857h182.857142V73.142857h73.142858v219.428572c0 20.114286-16.457143 36.571429-36.571429 36.571428zM769.828571 950.857143h-73.142857V731.428571c0-20.114286 16.457143-36.571429 36.571429-36.571428h219.428571v73.142857h-182.857143v182.857143z" fill="#000000"></path></svg>',refresh:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M772.010667 795.008c-58.026667 52.053333-123.861333 84.053333-197.546667 96-73.642667 11.989333-145.792 2.986667-216.490667-27.008-70.656-32-126.506667-79.36-167.466666-141.994667-40.96-62.72-61.824-132.693333-62.506667-210.048h64c0.682667 67.328 19.157333 127.658667 55.466667 180.992 36.352 53.333333 85.845333 92.330667 148.522666 116.992 62.72 24.021333 125.525333 28.672 188.501334 14.037334 63.018667-14.677333 117.504-46.677333 163.498666-96h-93.013333a31.146667 31.146667 0 0 1-22.997333-8.96 30.506667 30.506667 0 0 1-8.96-22.528c0-9.002667 2.986667-16.512 8.96-22.485334a34.986667 34.986667 0 0 1 23.04-10.026666h148.992a33.792 33.792 0 0 1 22.016 10.026666c5.973333 5.973333 9.344 13.354667 10.026666 22.016v148.992a34.730667 34.730667 0 0 1-10.026666 22.997334 30.592 30.592 0 0 1-22.485334 8.96 30.592 30.592 0 0 1-22.528-8.96 30.976 30.976 0 0 1-8.96-23.04v-50.005334l-0.042666 0.042667zM276.010667 296.021333h93.013333a31.146667 31.146667 0 0 1 22.997333 8.96c5.973333 5.973333 8.96 13.525333 8.96 22.528 0 8.96-2.986667 16.469333-8.96 22.485334a34.986667 34.986667 0 0 1-23.04 10.026666H219.989333a33.792 33.792 0 0 1-22.016-10.026666 33.792 33.792 0 0 1-9.984-22.016V178.986667a34.730667 34.730667 0 0 1 9.984-23.04 30.592 30.592 0 0 1 22.528-8.96c8.96 0 16.469333 2.986667 22.485334 8.96 5.973333 6.016 9.002667 13.653333 8.96 23.04v50.005333c58.026667-52.010667 123.861333-84.010667 197.546666-96 73.642667-11.946667 146.133333-2.986667 217.472 27.008 70.698667 32 126.336 79.36 167.04 142.037333C874.666667 364.714667 895.317333 434.730667 896 512h-64c-0.64-67.328-19.157333-127.658667-55.466667-180.992-36.352-53.333333-85.845333-92.330667-148.522666-116.992-62.72-24.021333-125.525333-28.672-188.501334-14.037333-63.018667 14.677333-117.504 46.677333-163.498666 96z" fill="#000000" fill-opacity=".96"></path></svg>',fullMagic:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M143.146667 911.146667l-30.293334-30.293334a21.333333 21.333333 0 0 1 0-30.08L554.666667 408.96 615.04 469.333333 173.226667 911.146667a21.333333 21.333333 0 0 1-30.08 0z" fill="#000000"></path><path d="M774.186667 219.52l30.293333 30.293333a21.333333 21.333333 0 0 1 0 30.08l-224 224-60.373333-60.373333 224-224a21.333333 21.333333 0 0 1 30.08 0z" fill="#000000"></path><path d="M768 64l40.746667 93.44 94.933333-37.12-37.12 94.933333L960 256l-93.44 40.746667 37.12 94.933333-94.933333-37.12L768 448l-40.746667-93.44-94.933333 37.12 37.12-94.933333L576 256l93.44-40.746667-37.12-94.933333 94.933333 37.12L768 64z" fill="#000000"></path><path d="M768 183.04l15.573333 35.413333 36.053334-14.08-14.08 36.053334 35.413333 15.573333-35.413333 15.573333 14.08 36.053334-36.053334-14.08-15.573333 35.413333-15.573333-35.413333-36.053334 14.08 14.08-36.053334-35.413333-15.573333 35.413333-15.573333-14.08-36.053334 36.053334 14.08 15.573333-35.413333z" fill="#000000"></path></svg>',full:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M0 0h256v51.2H0z" fill="#000000"></path><path d="M51.2 0v256H0V0zM1024 0v256h-51.2V0z" fill="#000000"></path><path d="M1024 51.2h-256V0h256zM1024 1024h-256v-51.2h256z" fill="#000000"></path><path d="M972.8 1024v-256h51.2v256zM0 1024v-256h51.2v256z" fill="#000000"></path><path d="M0 972.8h256v51.2H0z" fill="#000000"></path></svg>',pdf:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M493.638305 493.510904c0 0-8.708336 33.013905-27.351951 66.940598-18.642592 33.926694-35.184337 53.195549-35.184337 53.195549s49.792033-12.325723 69.113077-16.335037c22.199605-4.608971 51.880601-7.261381 63.139016-7.856945 0 0-23.911596-26.78197-33.695427-39.818891C519.825734 536.533766 493.638305 493.510904 493.638305 493.510904z" fill="#000000"></path><path d="M259.370771 760.667499c11.728112 6.701632 36.440957-6.284123 51.938929-24.293289 12.558014-14.594393 39.372729-54.870702 39.372729-54.870702s-49.845245 14.659885-72.463382 36.021401C255.601934 738.886427 252.384659 756.674559 259.370771 760.667499z" fill="#000000"></path><path d="M507.695462 340.689333c0.653893-17.591657 11.651364-69.809949-15.715937-77.070306 0 0-29.040407 1.116427-26.960025 46.935985 1.428535 31.480992 23.609721 92.684936 23.609721 92.684936S507.043616 358.280989 507.695462 340.689333z" fill="#000000"></path><path d="M696.941618 619.931175c-26.386974-2.512217-52.937676-3.699252-52.937676-3.699252s52.075029 49.65184 70.808696 64.017012c16.754592 12.845563 45.796022 8.93551 51.939953-8.93551C777.617032 639.70759 723.328591 622.443391 696.941618 619.931175z" fill="#000000"></path><path d="M855.733157 63.83998 168.26582 63.83998c-57.672514 0-104.425328 46.752814-104.425328 104.426351l0 687.46836c0 57.672514 46.752814 104.425328 104.425328 104.425328L855.733157 960.16002c57.672514 0 104.425328-46.752814 104.425328-104.425328L960.158485 168.266331C960.158485 110.592794 913.406694 63.83998 855.733157 63.83998zM724.307895 727.158315c-82.09781-18.429745-132.851751-106.275465-132.851751-106.275465s-30.92329 0.723477-82.024132 8.68173c-48.250934 7.513114-104.430444 30.461779-104.430444 30.461779S345.655949 774.070764 288.69054 792.501532c-56.965409 18.429745-101.265358-30.508851-50.262754-88.799442 43.979654-50.261731 139.222855-69.578682 139.222855-69.578682s38.373982-46.864354 58.478879-86.655615c20.10592-39.793308 38.535665-91.732238 38.535665-91.732238s-38.535665-88.798419-41.888016-139.062196c-3.349281-50.262754 26.807552-85.448114 56.965409-88.798419 38.301328-4.25593 82.815147 31.833009 17.951861 217.808678 0 0 18.909675 43.561122 45.716204 73.720002 26.807552 30.15888 58.08286 61.434188 58.08286 61.434188s95.427396-10.398838 158.821215 21.977547C839.912843 638.361943 806.404682 745.588059 724.307895 727.158315z" fill="#000000"></path></svg>',user:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M772.016477 696.022177c-39.228443-39.229466-85.763292-68.49807-136.530536-86.546122 26.774807-13.283538 51.500954-30.976502 73.254398-52.729945 52.55189-52.550867 81.494059-122.422214 81.494059-196.74085s-28.941146-144.189983-81.494059-196.741873c-52.550867-52.550867-122.422214-81.493036-196.74085-81.493036s-144.189983 28.942169-196.741873 81.493036c-52.55189 52.550867-81.494059 122.422214-81.494059 196.741873s28.941146 144.189983 81.494059 196.74085c21.753443 21.753443 46.480614 39.446407 73.256444 52.729945-50.76929 18.049075-97.303116 47.316655-136.532583 86.546122-66.188468 66.187445-104.009865 153.166425-107.422591 246.208495l48.730864 0c3.387144-80.028685 36.140105-154.783249 93.129051-211.770148 55.771211-55.771211 128.557958-88.326675 206.650547-92.867084 6.27389 0.418532 12.582573 0.645706 18.929118 0.645706 6.345522 0 12.656251-0.227174 18.929118-0.645706 78.091566 4.54041 150.880359 37.095873 206.650547 92.867084 56.987922 56.986899 89.741907 131.741463 93.129051 211.770148l48.730864 0C876.027365 849.188602 838.204945 762.209622 772.016477 696.022177zM282.466792 360.004237c0-126.564557 102.96814-229.53372 229.53372-229.53372 126.564557 0 229.53372 102.969163 229.53372 229.53372 0 120.304993-93.040023 219.280192-210.942293 228.77545-6.170536-0.304945-12.369725-0.460488-18.591427-0.460488-6.222725 0-12.420891 0.155543-18.59245 0.460488C375.505791 579.284429 282.466792 480.30923 282.466792 360.004237z" fill="#000000" p-id="9553"></path></svg>',unfold:'<svg viewBox="0 0 1088 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M1073.728 544q0 17.728-17.728 37.728l-192 226.272q-24.576 29.152-68.864 49.44t-82.016 20.288l-621.728 0q-19.424 0-34.56-7.424t-15.136-24.576q0-17.728 17.728-37.728l192-226.272q24.576-29.152 68.864-49.44t82.016-20.288l621.728 0q19.424 0 34.56 7.424t15.136 24.576zM877.728 347.424l0 91.424-475.424 0q-53.728 0-112.576 27.136t-93.728 68.288l-195.424 229.728q0-2.272-0.288-7.136t-0.288-7.136l0-548.576q0-52.576 37.728-90.272t90.272-37.728l182.848 0q52.576 0 90.272 37.728t37.728 90.272l0 18.272 310.848 0q52.576 0 90.272 37.728t37.728 90.272z"  fill="#000000"></path></svg>',fold:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M987.428571 347.428571v402.285715c0 70.290286-57.709714 128-128 128h-694.857142A128.512 128.512 0 0 1 36.571429 749.714286v-548.571429C36.571429 130.852571 94.281143 73.142857 164.571429 73.142857h182.857142C417.718857 73.142857 475.428571 130.852571 475.428571 201.142857V219.428571h384C929.718857 219.428571 987.428571 277.138286 987.428571 347.428571z" fill="#000000"></path></svg>',deep:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M971.0592 748.2368a25.6 25.6 0 0 1 21.9136 46.2848l-472.5248 223.8976a25.6 25.6 0 0 1-21.9136 0l-472.576-223.8976a25.6 25.6 0 0 1 21.9648-46.2848l461.568 218.7264 461.568-218.7264z m0-166.2464a25.6 25.6 0 1 1 21.9136 46.2848l-472.5248 223.8464a25.6 25.6 0 0 1-21.9136 0l-472.576-223.8464a25.6 25.6 0 1 1 21.9648-46.2848l461.568 218.624 461.568-218.624z m0-166.2976a25.6 25.6 0 0 1 21.9136 46.2848l-472.5248 223.8976a25.6 25.6 0 0 1-21.9136 0L25.9584 461.9776a25.6 25.6 0 0 1 21.9648-46.2848l461.568 218.7264 461.568-218.7264z m-48.8448-143.7696L509.4912 76.4416 96.768 271.872l412.672 195.584 412.7744-195.584z m70.7584 23.1424l-472.5248 223.8976a25.6 25.6 0 0 1-21.9136 0L25.9584 295.0656a25.6 25.6 0 0 1 0-46.2336L498.5856 24.9856a25.6 25.6 0 0 1 21.9136 0l472.5248 223.8464a25.6 25.6 0 0 1 0 46.2336z" fill="#000000"></path></svg>',mind:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M160 64C107.264 64 64 107.264 64 160S107.264 256 160 256c14.72 0 28.48-3.776 40.96-9.728l145.792 145.728a155.328 155.328 0 0 0-9.28 158.976l-127.744 103.296A96.256 96.256 0 0 0 160 640c-52.736 0-96 43.264-96 96S107.264 832 160 832 256 788.736 256 736a89.6 89.6 0 0 0-6.016-31.744l127.04-103.04c27.968 23.808 63.744 38.784 102.976 38.784 17.28 0 33.472-3.52 49.024-8.512l68.224 109.248A95.232 95.232 0 0 0 576 800c0 52.736 43.264 96 96 96s96-43.264 96-96a96.32 96.32 0 0 0-116.736-93.76L584.96 599.744c21.248-18.752 37.504-43.008 46.464-70.72l137.792 28.224c6.72 46.528 46.72 82.752 94.72 82.752 52.736 0 96-43.264 96-96S916.736 448 864 448a96.64 96.64 0 0 0-81.728 46.528l-143.744-29.504a158.4 158.4 0 0 0-54.016-105.024l66.496-106.496c6.72 1.472 13.76 2.496 20.992 2.496 52.736 0 96-43.264 96-96S724.736 64 672 64 576 107.264 576 160c0 22.272 8 42.752 20.992 59.008l-68.224 109.44A158.464 158.464 0 0 0 480 320c-32.512 0-62.72 9.984-88 26.752L246.272 201.024C252.16 188.48 256 174.72 256 160 256 107.264 212.736 64 160 64z m0 64c17.984 0 32 14.016 32 32s-14.016 32-32 32a31.616 31.616 0 0 1-32-32c0-17.984 14.016-32 32-32z m512 0c17.984 0 32 14.016 32 32s-14.016 32-32 32a31.616 31.616 0 0 1-32-32c0-17.984 14.016-32 32-32z m-192 256C533.504 384 576 426.496 576 480c0 34.56-17.984 64.256-44.992 81.28a31.872 31.872 0 0 0-8.96 4.992C509.184 572.16 494.912 576 480 576A95.36 95.36 0 0 1 384 480C384 426.496 426.496 384 480 384z m384 128c17.984 0 32 14.016 32 32s-14.016 32-32 32a31.616 31.616 0 0 1-32-32c0-17.984 14.016-32 32-32z m-704 192c17.984 0 32 14.016 32 32s-14.016 32-32 32a31.616 31.616 0 0 1-32-32c0-17.984 14.016-32 32-32z m512 64c17.984 0 32 14.016 32 32s-14.016 32-32 32a31.616 31.616 0 0 1-32-32c0-17.984 14.016-32 32-32z" p-id="9503" fill="#000000"></path></svg>'}),{dynamicData:d,dynamicDataKeys:u}=(()=>{const e=Object.freeze({replying:"replying",messageId:"messageId",action:"action"}),t=new WeakMap;return{dynamicData:new class{#e=[];#t={};constructor(){}get messageId(){return this.#t.messageId}get replying(){return this.#t.replying}get action(){return this.#t.action}onChange(e,l){return t.set(e,l),this.#e.push(e),()=>{this.#e=this.#e.filter(t=>t!==e),t.delete(e)}}},dynamicDataKeys:e}})();let p;const{getMain:m,setMain:h,onArticleChange:g}=(()=>{let e,n=!1;const a=(()=>{let a,s,r;const i=c=>{if(a&&a.disconnect(),s&&s.disconnect(),r&&r(),n=!1,!c||!e)return;const d=n=>{a=l(n,t=>{const l=Array.from(t).map(({removedNodes:e,addedNodes:t})=>Array.from(e).filter(e=>e.tagName.toUpperCase()===o.article.toUpperCase())).flat();e&&e({type:"new",articleParent:n,removeArticles:l})},!1),r=t(n,()=>{a&&a.disconnect(),e&&e({type:"clear2"}),i(c)})},u=()=>{s=l(c,()=>{const t=c.querySelector(o.article);if(t){s.disconnect();const l=t.parentElement;e&&e({type:"old",articleParent:l}),d(l)}},!0)},p=document.getElementById(o.headerId)?.nextElementSibling?.querySelector(o.user)?.closest(o.article)?.parentElement;p?(d(p),e&&e({type:"old",articleParent:p})):u(),n=!0};return i})();let s;const r=l=>{s=void 0===l?document.querySelector(o.main):l,a(s),s&&(s.addEventListener("click",e=>{const t=e.target.closest(o.article);t&&t.hasAttribute(i.collapsed)&&p&&p(t)},!0),t(s,()=>{e&&e({type:"clear1"}),r()},2e3))};return{getMain:()=>s,setMain:r,onArticleChange:t=>{t&&"function"!=typeof t||(e=t,n||a(s))}}})(),f=()=>{
    if (isGemini) {
      // For Gemini, look for the new chat button
      return document.querySelector('[aria-label*="New chat"]') || 
             document.querySelector('[data-test-id="new-chat-button"]') ||
             document.querySelector('button[title*="New chat"]');
    } else {
      // For ChatGPT
      return document.querySelector('[data-testid="create-new-chat-button"]');
    }
  };
  v=async(e,t)=>{const l=await fetch(chrome.runtime.getURL("resources/login.html")).then(e=>e.text());let n=document.createElement("div");n.innerHTML=l,n=n.firstElementChild,translate(n),e.appendChild(n),((e,{sendCode:t,login:l,before:n})=>{n(e),e.querySelector("#closeBtn").onclick=()=>{e.style.animation="fadeOutAqw 0.3s ease-out",setTimeout(()=>{e.remove()},200)};const s=e.querySelector("#loginForm"),r=e.querySelector("#email"),o=e.querySelector("#verificationCode"),i=e.querySelector("#sendCodeBtn"),c=e.querySelector("#emailError"),d=e.querySelector("#codeError"),u=e.querySelector("#successMessage"),p=e.querySelector(".login-btn");function m(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function h(e,t){e.textContent=t,e.style.display="block"}function g(e,t){e.textContent=t,e.style.display="block",setTimeout(()=>{e.style.display="none"},5e3)}function f(){c.style.display="none",d.style.display="none",u.style.display="none"}i.addEventListener("click",()=>{const e=r.value.trim();f(),e?m(e)?(i.disabled=!0,t(e,({result:e,message:t})=>{if(e)!function(){let e=60;i.disabled=!0,i.textContent=`${e}秒后重发`,p.disabled=!1;const t=setInterval(()=>{e--,i.textContent=`${e}秒后重发`,e<=0&&(clearInterval(t),i.disabled=!1,i.textContent="发送验证码",o.value="",p.disabled=!0)},1e3)}(),g(u,lang("codeSentPrompt"));else{i.disabled=!1;const e=lang(t)||lang("commanCodeSendFailurePrompt");h(c,e)}})):h(c,lang("invalidEmailPrompt")):h(c,lang("emptyEmailPrompt"))}),s.addEventListener("submit",t=>{t.preventDefault();const n=r.value.trim(),s=o.value.trim();f(),n?m(n)?s?5===s.length?(p.disabled=!0,l({email:n,code:s},({result:t,message:l})=>{t?(a(1,lang("loginSuccessfully")),e.remove()):(p.disabled=!1,l=lang(l)||lang("CommanLoginFailurePrompt"),g(u,l))})):h(d,lang("CodeLengthPrompt")):h(d,lang("emptyCodePrompt")):h(c,lang("invalidEmailPrompt")):h(c,lang("emptyEmailPrompt"))}),r.addEventListener("focus",()=>{c.style.display="none"}),o.addEventListener("focus",()=>{d.style.display="none"})})(n,{async sendCode(e,t){chrome.runtime.sendMessage({type:"send-code",data:{email:e}},e=>{t(e)})},async login({email:e,code:l},n){chrome.runtime.sendMessage({type:"login",data:{email:e,code:l}},e=>{n(e),e.result&&t&&t()})},before(e){e.querySelector(".logo").setAttribute("src",chrome.runtime.getURL("./images/icons/icon-128.png"))}})},{createFloatbar:y}=(()=>{const l="processed";let r;return{createFloatbar:async()=>{if(r)return r;let{isSync:h,isDeep:y,width:b,buttonbarPos:w,panelPos:C,shows:L}=chrome?.storage?.local?await chrome.storage.local.get(["isSync","isDeep","width","buttonbarPos","panelPos","shows"]):{};h=void 0===h||!!h,y=void 0===y||!!y,w={left:"272px",top:"max(10%, 50px)",...w},C={left:"0px",top:"0px",...C},L={[i.wide]:!1,[i.headbar]:!0,[i.speakbox]:!0,...L},r=document.createElement("div"),r.className=o.floatbar.slice(1),r.innerHTML=`\n                        <div class="buttons" title="${lang("moveTitle")}">                                \n                                <button class="catalog button" title="${lang("catalogTitle")}">\n                                        <img src="${chrome.runtime.getURL('images/icons/icon-128.png')}" alt="Logo" style="width: 28px; height: 28px; display: block;"/>\n                                </button>\n                                <button class="partial button" title="${lang("partialTitle")}">\n                                        ${c.fullMagic}\n                                        ${c.full}\n                                </button>\n                                <button class="fold button open" title="${lang("toggleTitle")}" style="display:none;">\n                                        ${c.unfold}\n                                        ${c.fold}\n                                </button>\n                        </div>\n                        <div class="panel" style="${b?`width:${b}px`:""}">\n                                <div class="title" title="${lang("moveTitle")}">\n                                    <img src="${chrome.runtime.getURL('images/icons/icon-128.png')}" alt="Logo" style="width: 28px; height: 28px; display: inline-block; vertical-align: middle; margin-right: 8px;"/>\n                                    <span>${lang("title")}</span>\n                                </div>\n                                <div class="header">\n                                        <button class="fold open" title="${lang("foldTitle")}">\n                                                ${c.unfold}\n                                                ${c.fold}\n                                        </button>\n                                        <button class="sync ${h?"":"inactive"}" title="${lang("syncTitle")}">\n                                                ${c.bind}\n                                        </button>\n                                        <button class="deep ${y?"":"inactive"}" title="${lang("deepTitle")}">\n                                                ${c.deep}\n                                        </button>\n                                         <button class="refresh" title="${lang("refreshTitle")}">\n                                                ${c.refresh}\n                                        </button>\n                                        <button class="new" title="${lang("newTitle")}">\n                                                ${c.edit}\n                                        </button>\n                                        <button class="close" title="${lang("closeTitle")}">✗</button>\n                                </div>\n                                <ul empty-notice="${lang("loadingNotice")}"></ul>\n                                <div class="tools">\n                                        <div class="more">\n                                                <span>……</span>\n                                                <ul>\n                                                        <li>\n                                                            <button class="user button" title="${lang("yourAccount")}">\n                                                                    ${c.user}\n                                                            </button>\n                                                        </li>\n                                                        <li>\n                                                            <button class="export button" title="${lang("exportTitle")}">\n                                                                    ${c.pdf}\n                                                            </button>    \n                                                        </li>\n                                                        <li>\n                                                            <button class="full button" title="${lang("fullTitle")}">\n                                                                    ${c.full}\n                                                            </button>\n                                                        </li>\n                                                </ul>\n                                        </div>\n                                        <div class="areas button">\n                                                <div>\n                                                        <div title="${lang("areasTitle_head")}"></div>\n                                                        <div title="${lang("areasTitle_inputbox")}"></div>\n                                                </div>\n                                        </div>\n                                        <button class="wide button" title="${lang("wideTitle")}">\n                                                ${L.wide?"] [":"[　]"}\n                                        </button>\n                                        <button class="mind button" title="${lang("mindTitle")}">\n                                                ${c.mind}\n                                        </button>\n                                        <button class="partial button" title="${lang("partialTitle")}">\n                                                ${c.fullMagic}\n                                                ${c.full}\n                                        </button>\n                                        <span class="resizebar" title="Resize panel width"></span>\n                                </div>\n                        </div>`,document.body.appendChild(r);const x=r.children[0],A=r.children[1],E=A.children[0],_=A.children[1],M=A.children[2],S=A.children[3],$=S.children[0].children[1],k=Object.fromEntries(Array.from(x.children).map(e=>[e.classList[0],e])),z=Object.fromEntries(Array.from(_.children).map(e=>[e.classList[0],e])),q=Object.fromEntries(Array.from(S.children).map(e=>[e.classList[0],e])),T=Object.fromEntries(Array.from($.children).map(e=>[e.firstElementChild.classList[0],e.firstElementChild])),P=()=>M.querySelectorAll("li").length;_.addEventListener("click",e=>{if(e.target===_)return;const t=e.target.closest("button");t&&s({action:"header.click",data:{buttonName:t.classList[0]}})},!0),S.addEventListener("click",e=>{if(e.target===S)return;const t=e.target.closest(".tools > *");t&&s({action:"tools.click",data:{buttonName:t.classList[0]}})},!0),$.addEventListener("click",e=>{if(e.target===$)return;const t=e.target.closest("button");t&&s({action:"more.click",data:{buttonName:t.classList[0]}})},!0);{const e={},t=()=>{if(r.classList.contains(i.showPanel)){const{left:t,top:l}=A.style;A.classList.add("hiding"),A.style.cssText=`left:${e.left}px;top:${e.top}px`,setTimeout(()=>{A.style.cssText=`left:${t};top:${l}`,r.classList.remove(i.showPanel),A.classList.remove(i.hover,"hiding")},300)}else{const{left:t,top:l}=k.catalog.getBoundingClientRect();e.left=t,e.top=l,r.classList.add(i.showPanel)}};k.catalog.addEventListener("click",t),z.close.addEventListener("click",t)}{let e,t;Array.from([k.catalog,A]).forEach(l=>{l.addEventListener("mouseenter",()=>{clearTimeout(e),t=setTimeout(()=>{A.classList.add(i.hover)},100)}),l.addEventListener("mouseleave",()=>{clearTimeout(t),e=setTimeout(()=>{A.classList.remove(i.hover)},150)})})}{let e,t,l;forPress({el:q.resizebar,down:({clientX:n})=>(l=!1,e=n,t=parseInt(getComputedStyle(A).width),!0),move:({clientX:n})=>{l=!0,A.style.width=t+n-e+"px"},up:()=>{l&&(b=parseInt(A.style.width),chrome.storage.local.set({width:b}))}})}T.user.addEventListener("click",e=>{chrome.runtime.sendMessage({type:"popup-page"})}),z.new.addEventListener("click",e=>{f()?.click()}),setTimeout(()=>{f()||(z.new.style.display="none")},2e3);const I=Object.freeze({openSign:"open",catalog:Object.freeze({get status(){return z.fold.classList.contains(I.openSign)},set status(e){(e=void 0!==e?!!e:!!Array.from(M.children).find(e=>!e.classList.contains(i.collapsed)))?z.fold.classList.add(I.openSign):z.fold.classList.remove(I.openSign),h&&I.answer.status!==e&&(I.answer.status=e)}}),answer:Object.freeze({get status(){return k.fold.classList.contains(I.openSign)},set status(e){(e=void 0!==e?!!e:!!Array.from(M.children).find(e=>!!e.__reply&&!e.__reply.hasAttribute(i.collapsed)))?k.fold.classList.add(I.openSign):k.fold.classList.remove(I.openSign),h&&I.catalog.status!==e&&(I.catalog.status=e)}})});let H;const O=(e,t)=>{const l=e.__reply||H(e),n=e.__ref.deref();t?(l&&l.removeAttribute(i.collapsed),n&&n.removeAttribute(i.collapsed)):(l&&l.setAttribute(i.collapsed,""),n&&n.setAttribute(i.collapsed,""))},N=e=>{Array.from(M.children).forEach(t=>{O(t,e)})},F=(e,t)=>{t?e.classList.remove(i.collapsed):e.classList.add(i.collapsed)},B=e=>{M.querySelectorAll(":scope > li,li:not(.leaf)").forEach(t=>F(t,e))};z.sync.addEventListener("click",e=>{e.stopPropagation(),h=!h,chrome?.storage?.local&&chrome.storage.local.set({isSync:h}),h?z.sync.classList.remove("inactive"):z.sync.classList.add("inactive"),h&&(Array.from(M.children).forEach(e=>{O(e,!e.classList.contains(i.collapsed))}),I.answer.status=void 0)}),M.addEventListener("click",e=>{e.stopPropagation();const t=e.target,l=t.tagName.toUpperCase();if(!["I","DIV"].includes(l))return;const n=t.parentElement;if("DIV"===l){{const e=n.closest("div.panel > ul > li");n!==e&&(O(e,!0),I.answer.status=!0)}const e=n.__ref?.deref();return e?.scrollIntoView({behavior:"smooth",block:"start"}),void s({action:"jump",data:{isRootLi:n.parentElement===M}})}if("I"===l){const e=n.parentElement===M,t=n.classList.contains("leaf");let l=n.classList.contains(i.collapsed);!e&&t||(F(n,l),I.catalog.status=void 0),e&&h&&(O(n,l),l&&(I.answer.status=!0)),s({action:"fold",data:{isRootLi:e,opened:l}})}}),M.addEventListener("dblclick",e=>{if("DIV"!==e.target.tagName.toUpperCase())return;const t=e.target.parentElement;if(t.classList.contains("leaf"))return;const l=t.classList.contains(i.collapsed),n=Array.from(t.querySelectorAll("li:not(.leaf)"));n.push(t),n.forEach(e=>{F(e,l)}),I.catalog.status=void 0;t.parentElement===M&&h&&(O(t,l),l&&(I.answer.status=!0)),e.stopPropagation()}),z.fold.addEventListener("click",e=>{e.stopPropagation();const t=!I.catalog.status;B(t),h&&N(t),I.catalog.status=t}),k.fold.addEventListener("click",e=>{e.stopPropagation();const t=!I.answer.status;N(t),h&&B(t),I.answer.status=t}),p=e=>{const t=Array.from(M.children).find(t=>t.__reply===e||t.__ref.deref()===e);t&&(O(t,!0),h&&F(t,!0),I.answer.status=!0)},q.wide.addEventListener("click",e=>{e.stopPropagation(),L.wide=!L.wide,chrome?.storage?.local&&chrome.storage.local.set({shows:L}),q.wide.textContent=L.wide?"] [":"[　]",L.wide?m().setAttribute(i.wide,""):m().removeAttribute(i.wide)});const j=e=>{e.stopPropagation(),r.style.display="none",fullScreenFn.capturing(()=>{r.style.display=""})};T.full.addEventListener("click",e=>{e.stopPropagation();const t=()=>{document.fullscreenElement?T.full.innerHTML=c.unfull:(T.full.innerHTML=c.full,document.removeEventListener("fullscreenchange",t,!0))};document.removeEventListener("fullscreenchange",t,!0),document.addEventListener("fullscreenchange",t,!0),fullScreenFn.toFullscreen()}),k.partial.addEventListener("click",j),q.partial.addEventListener("click",j);{const e=Object.freeze({top:q.areas.children[0].children[0],bottom:q.areas.children[0].children[1]});[[e.top,i.headbar],[e.bottom,i.speakbox]].forEach(([e,t])=>{e.addEventListener("click",()=>{L[t]=!L[t],chrome?.storage?.local&&chrome.storage.local.set({shows:L}),L[t]?m().removeAttribute(t):m().setAttribute(t,"")})})}{const e=m();L.wide?e.setAttribute(i.wide,""):e.removeAttribute(i.wide),L.headbar?e.removeAttribute(i.headbar):e.setAttribute(i.headbar,""),L.speakbox?e.removeAttribute(i.speakbox):e.setAttribute(i.speakbox,"")}{const e=()=>{const e=M.children[0]?.__ref.deref()?.parentElement;if(!e)return void a(0,lang("emptyTreeAlert"));const t=document.createElement("iframe");document.body.appendChild(t);const l=t.contentDocument;Array.from(document.head.children).filter(e=>"stylesheet"===e.getAttribute("rel")).forEach(e=>{l.head.appendChild(e.cloneNode(!0))});const n=l.createElement("style");n.innerHTML="\n                article > div > div{max-width: none;}\n                button {\n                    display: none !important;\n                }",l.head.appendChild(n),l.title=document.title,l.body.innerHTML="",l.body.appendChild(e.cloneNode(!0)),t.contentWindow.print(),t.remove()};T.export.addEventListener("click",t=>{t.stopPropagation(),e()})}{let e,t,l,n,a,s,r,o,i,c,d,u,p,m,h,g,f,v=!1,y=!1;const b=()=>{{let e=Math.max(0,Math.min(d+l,p));Math.max(0,Math.min(u+n,m));A.style.left=`${e}px`}},L=()=>{let e=Math.max(0,Math.min(a+l,r)),t=Math.max(0,Math.min(s+n,o));x.style.left=`${e}px`,x.style.top=`${t}px`},_=l=>{v=!0,e=l.clientX,t=l.clientY,f=l.currentTarget===E||l.currentTarget===S?b:L,document.addEventListener("mousemove",M,!0),document.addEventListener("mouseup",$,!0)},M=b=>{if(v){if(!y){y=!0;{const{left:e,top:t,width:l,height:n}=getComputedStyle(x);i=parseFloat(l),c=parseFloat(n),a=parseFloat(e),s=parseFloat(t),r=window.innerWidth-i,o=window.innerHeight-c,x.style.transition="none",x.style.right="auto"}{const{left:e,top:t,width:l,height:n}=getComputedStyle(A);h=parseFloat(l),g=parseFloat(n),d=parseFloat(e),u=parseFloat(t),p=window.innerWidth-h,m=window.innerHeight-g,A.style.transition="none",A.style.right="auto"}document.body.setAttribute("disselect","")}l=b.clientX-e,n=b.clientY-t,f()}},$=()=>{v&&(v=!1,y=!1,document.body.removeAttribute("disselect"),x.style.transition="",A.style.transition="",document.removeEventListener("mousemove",M,!0),document.removeEventListener("mouseup",$,!0),w={left:x.style.left,top:x.style.top},C={left:A.style.left},chrome?.storage?.local&&chrome.storage.local.set({buttonbarPos:w,panelPos:C}))};k.catalog.addEventListener("mousedown",_),E.addEventListener("mousedown",_),x.style.left=w.left||"1px",x.style.top=w.top||"40%",A.style.left=C.left||"0px"}(async()=>{{let e=!!await chrome.runtime.sendMessage({type:"getLoginInfo"});if(e&&(e=await chrome.runtime.sendMessage({type:"login-check"})),!e){const e=`msg/tree/use/${btoa(chrome.runtime.id.slice(0,10))}`,t=localStorage.getItem(e),{result:l,value:n}=await chrome.runtime.sendMessage({type:"test",data:t});if(n!==t&&localStorage.setItem(e,n),l){const e=(t,l,n)=>{"login-page"===t.type&&v(r,()=>{a(1,lang("loginSuccess")),chrome.runtime.onMessage.removeListener(e)})};chrome.runtime.onMessage.addListener(e)}else{const e=()=>new Promise(e=>{fetch(chrome.runtime.getURL("resources/imply.html")).then(e=>e.text()).then(t=>{let l=document.createElement("div");l.innerHTML=t,l=l.firstElementChild,translate(l),M.replaceWith(l);{const t=async()=>{l.replaceWith(M),e()},n=l.querySelector(".login");l.querySelector(".payment").onclick=()=>{chrome.runtime.sendMessage({type:"payment-page"})},n.onclick=()=>{v(r,t)},chrome.runtime.onMessage.addListener(async(e,l,s)=>{const{type:r,data:o}=e;"paid"===r?a(1,lang("paymentSuccess"),lang("automaticLogingPrompt")):"logined"===r?(a(1,lang("loginSuccessfully")),t()):"login-page"===r&&n.onclick()})}})});await e()}}}{M.setAttribute("empty-notice",lang("emptyNotice"));const t=e=>{let t,l=e.nextElementSibling;for(;l;)if(t=l.matches(o.article)&&l.querySelector(`${o.author}${o.message}`),t){const e=t.getAttribute(o.authorAttr);if("user"===e){l=void 0;break}if("assistant"===e)break;l=l.nextElementSibling}else l=l.nextElementSibling;return{answerArticle:l,isRequestPlaceholder:!!t&&t.matches(o.messagePlaceholderRequest)}},r=`${o.assistant}${o.message}`,c=Object.freeze({strong:"STRONG",hx:Object.freeze(["H1","H2","H3","H4","H5","STRONG"]),list:Object.freeze(["OL","UL"]),hx2:Object.freeze(["H1","H2","H3","H4","H5","STRONG","OL","UL"])}),p=e=>{const t=document.createElement("ul");return e.appendChild(t),e.classList.remove("leaf"),t},h=(e,t,l="")=>{if(!e)return;const a=e.textContent.slice(0,300);let s;e.firstChild?.tagName?.toUpperCase()===c.strong?(s=e.firstChild.textContent,e.textContent.length>s.length+1?s=`${s}<span>${e.textContent.slice(s.length)}</span>`:s&&n(s.at(-1))&&(s=s.slice(0,-1))):s=a&&n(a.at(-1))?a.slice(0,-1):a,s=`${l}${s}`;const r=document.createElement("li");r.__ref=new WeakRef(t),r.setAttribute("title",a),r.classList.add("leaf");const o=document.createElement("i"),i=document.createElement("div");return i.innerHTML=s,r.appendChild(o),r.appendChild(i),r},f=(e,t,l=10,n=!1)=>{Array.from(t.children).forEach((t,a)=>{const s=t.firstElementChild||t,r=h(s,t,n?`${a+1}. `:"");r.__level=l,e.appendChild(r)})},v=(e,t)=>{let l=e.children[2];{const n=y?c.hx2:c.hx,a=t.map(e=>{const t=e.tagName.toUpperCase();return n.includes(e.tagName)?{tagName:t,el:e}:1===e.children.length&&e.firstChild.tagName?.toUpperCase()===c.strong?{tagName:c.strong,el:e}:void 0}).filter(e=>e);a.length&&(l=l||p(e),a.forEach(({tagName:e,el:t})=>{t.setAttribute(i.subcatalog,e.toLowerCase());const n=c.list.includes(e),a=n?10:c.hx.indexOf(e)+1;let s=l;for(;;){const l=s.lastElementChild;if(!l||l.__level>=a){if(n)f(s,t,10,"OL"===e);else{const e=h(t,t);e.__level=a,s.appendChild(e)}break}s=l.children[2]||p(l,"OL"===e),l.classList.remove("leaf")}}))}},b=(e,n)=>{const{answerArticle:a,isRequestPlaceholder:s}=t(e);e.setAttribute(l,"user"),a?.setAttribute(l,"reply");const r=h(e.querySelector(o.user),e);if(a&&(r.__reply=a),void 0===n)M.appendChild(r);else{const e=M.children.item(n);e?e.before(r):M.appendChild(r)}return{li:r,answerArticle:a,isRequestPlaceholder:s}},w=({type:e,articleParent:t,removeArticles:n})=>{if(s({action:"updateCatalog.start",data:{type:e,articleParent:!!t,nodeCount:P()}}),!t)return Array.from(M.children).forEach(e=>{delete e.__reply}),I.answer.status=!0,I.catalog.status=!0,void(M.innerHTML="");if(n){const e=(e,t)=>{t.removeAttribute(l),e.remove(),delete e.__reply};Array.from(M.children).forEach(t=>{const l=t.__ref.deref(),n=t.__reply;l&&l.isConnected?l.__replying||n&&!n.isConnected&&e(t,l):e(t,l)})}const a=Array.from(t.children).filter(e=>{const t=e.getAttribute(l);if(t)return"user"===t;if(e.tagName.toUpperCase()===o.article.toUpperCase()){const t=e.querySelector(`${o.author}`),n=t?.getAttribute(o.authorAttr)||void 0,a="user"===n;return n?a||e.setAttribute(l,"reply"):e.setAttribute(l,"other"),a}e.setAttribute(l,"other")}).map((e,t)=>({userArticle:e,index:t})).filter(e=>!e.userArticle.hasAttribute(l));a.forEach(({userArticle:t,index:l})=>{const{answerArticle:n,li:s,isRequestPlaceholder:r}=b(t,l);if(n)if(r&&1===a.length&&"new"===e)C(s,t,n);else{const e=n.querySelector(o.markdown);if(!e)return;v(s,Array.from(e.children))}}),s({action:"updateCatalog.end",data:{type:e,articleParent:!!t,nodeCount:P()}})},C=async(l,n,a,i=void 0)=>{s({action:"replying.start",data:{nodeCount:P(),li:!!l,userArticle:!!n,answerArticle:!!a}}),n.__replying=!0;const c="loading";let d;const u=e=>{v(l,e=e||(d?[d]:[])),M.scrollTop=1e7};{l.children[1].classList.add(c);const s=10;let p=0,m=[],h=a.querySelector(r);for(i=i||(()=>p<s&&!a?.querySelector('button[data-testid="good-response-turn-action-button"]'));i();){if(a?.isConnected&&h?.isConnected){if(d=d||a.querySelector(o.markdown)?.firstElementChild,d)if(d.isConnected){p=0;const e=[];for(;d.nextElementSibling;)e.push(d),m.push(d),d=d.nextElementSibling;u(e)}else{for(;d&&!d.isConnected;)d=m.pop();d?p=0:(d=void 0,l.children[2]?.remove(),l.classList.add("leaf"))}}else delete l.__reply,(a=t(n).answerArticle)&&(l.__reply=a),h=a?.querySelector(r),d=void 0,l.children[2]?.remove(),l.classList.add("leaf");p++,await e(1e3)}delete n.__replying,l.children[1].classList.remove(c),u(void 0)}s({action:"replying.end",data:{nodeCount:P(),li:!!l,userArticle:!!n,answerArticle:!!a}})},L=({messageId:e},t)=>{const l=m().querySelector(`[${o.messageAttr}="${e}"]`)?.closest(o.article);if(!l)return;if(l.__replying)return;let n=Array.from(M.children).findIndex(e=>e.__ref.deref()===l);-1!==n?M.children[n].remove():n=void 0;let{li:a,answerArticle:s}=b(l,n);C(a,l,s,t)};g(w),window.addEventListener("message",e=>{e.origin===location.origin&&e.data&&"stream"===e.data.type&&e.data.messageId&&L({messageId:e.data.messageId})});{let e;d.onChange(({replying:t,messageId:l})=>{e=t,t&&l&&L({messageId:l},()=>e)},[u.replying,u.messageId])}z.refresh.addEventListener("click",()=>{const e=M.children[0]?.__ref.deref()?.parentElement;if(!e)return;const t=Array.from(e.children);if(t.find(e=>e.__replying))return void a(0,lang("refreshAlert"));t.forEach(e=>{e.removeAttribute(l)}),Array.from(M.children).forEach(e=>{delete e.__reply});const n=M.scrollTop/M.scrollHeight;M.innerHTML="";const s=()=>{w({articleParent:e}),M.scrollTop=parseInt(M.scrollHeight*n),I.catalog.status=!0,N(!0)};z.refresh.___deep?s():setTimeout(s,10)}),z.deep.addEventListener("click",()=>{const e=M.children[0]?.__ref.deref()?.parentElement;if(!e)return;Array.from(e.children).find(e=>e.__replying)?a(0,lang("refreshAlert")):(y=!y,chrome?.storage?.local&&chrome.storage.local.set({isDeep:y}),y?z.deep.classList.remove("inactive"):z.deep.classList.add("inactive"),z.refresh.___deep=!0,z.refresh.click(),delete z.refresh.___deep)}),q.mind.addEventListener("click",()=>{
  console.log('Mindmap button clicked');
  console.log('Current URL:', location.href);
  console.log('Pathname:', location.pathname);
  
  // Hide sidebar before showing mindmap
  const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
  const panel = floatbar ? floatbar.querySelector('.panel') : null;
  const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
  let wasVisible = false;
  
  // Check if sidebar is visible by checking both display style and show-panel class
  if (panel && (panel.style.display === 'flex' || floatbar.classList.contains('show-panel'))) {
    wasVisible = true;
    console.log('Sidebar was visible, hiding it before showing mindmap');
    // Hide panel and remove page adjustment
    panel.style.display = 'none';
    floatbar.classList.remove('show-panel');
    main.style.marginRight = '';
    main.style.width = '';
    document.body.style.marginRight = '';
  } else {
    console.log('Sidebar was not visible');
  }
  
  // Create mindmap data from the current chat tree
  const e=(t,l)=>t?Array.from(t.children).map((t,a)=>{
    const s=t.children[1]?.firstChild;
    let r=s?.data||s?.textContent;
    r&&n(r.at(-1))&&(r=r.slice(0,-1));
    const o=`${l}_${a+1}`;
    return{id:o,topic:r,children:e(t.children[2],o)}
  }):[];
  
  const t={
    meta:{name:"mind map",author:"ChatGPT Message Tree",version:"1.0"},
    format:"node_tree",
    data:{id:"root",topic:document.title,children:e(M,"root")}
  };
  
  console.log('Mindmap data structure:', t);
  console.log('Number of root children:', t.data.children.length);
  
  if (t.data.children.length === 0) {
    console.warn('No chat messages found to create mindmap');
    return;
  }
  
  // Create and show React Flow mindmap popup
  createReactFlowMindmapPopup(t, wasVisible);
});
  H=e=>{let n=e.__reply;if(!n&&(n=t(e.__ref.deref()).answerArticle,n)){const t=n.querySelector(o.markdown);if(t)return v(e,Array.from(t.children)),e.__reply=n,n.setAttribute(l,"reply"),n}}}})(),document.body.appendChild(r);const R=()=>{t(r,()=>{document.body.appendChild(r),R()},2e3)};return R(),r}}})();window.addEventListener("load",function e(){r=0,h(null),h(),m()?(y(),chrome.runtime.onMessage.addListener((e,t,l)=>{const{type:n,data:s}=e;"logout"===n?location.reload():"error"===n&&("automaticLoginFailure"===s?a(0,lang("automaticLoginFailureTitle"),lang("automaticLoginFailurePrompt")):a(0,lang("operationFailure"),lang(s?.message)||s?.message))})):r<10&&(r++,setTimeout(e,1e3))})})();

// React Flow Mindmap Popup Implementation
const createReactFlowMindmapPopup = (mindmapData, wasVisible = false) => {
  // Remove existing popup if any
  const existingPopup = document.getElementById('reactflow-mindmap-popup');
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create popup container
  const popup = document.createElement('div');
  popup.id = 'reactflow-mindmap-popup';
  popup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica, Arial, sans-serif;
  `;

  // Create popup content
  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    border-radius: 12px;
    width: 95vw;
    height: 95vh;
    max-width: 1400px;
    max-height: 900px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  `;

  // Create header
  const header = document.createElement('div');
  header.style.cssText = `
    background: linear-gradient(135deg, #10a37f 0%, #0e8a6f 100%);
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;
  header.innerHTML = `
            <span>🧠 ${mindmapData.data.topic || 'Super Mapper-Navigator Interactive Mind Map'}</span>
    <div style="display: flex; gap: 10px; align-items: center;">
      <!-- Text Size Controls -->
      <div style="display: flex; gap: 5px; align-items: center; margin-right: 10px;">
        <button id="text-decrease" title="Decrease Text Size" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">A-</button>
        <button id="text-increase" title="Increase Text Size" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">A+</button>
      </div>
      <button id="fullscreen-mindmap" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 14px;">⛶ Fullscreen</button>
      <button id="close-mindmap" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 0;">×</button>
    </div>
  `;

  // Create React Flow container
  const reactFlowContainer = document.createElement('div');
  reactFlowContainer.id = 'reactflow-container';
  reactFlowContainer.style.cssText = `
    flex: 1;
    background: #f8f9fa;
    position: relative;
    overflow: auto;
    scroll-behavior: smooth;
  `;

  // Add elements to popup
  content.appendChild(header);
  content.appendChild(reactFlowContainer);
  popup.appendChild(content);
  document.body.appendChild(popup);

  // Load React Flow and render mindmap
  loadReactFlowAndRender(mindmapData, reactFlowContainer);

  // Function to restore sidebar if it was visible before
  const restoreSidebar = () => {
    if (wasVisible) {
      const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
      const panel = floatbar ? floatbar.querySelector('.panel') : null;
      const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
      
      if (panel) {
        // Show panel and adjust page layout
        panel.style.display = 'flex';
        floatbar.classList.add('show-panel');
        main.style.marginRight = '600px';
        main.style.width = `calc(100vw - 600px)`;
        document.body.style.marginRight = '600px';
      }
    }
  };

  // Close button functionality
  const closeBtn = document.getElementById('close-mindmap');
  closeBtn.addEventListener('click', () => {
    popup.remove();
    restoreSidebar();
  });

  // Fullscreen button functionality
  const fullscreenBtn = document.getElementById('fullscreen-mindmap');
  fullscreenBtn.addEventListener('click', () => {
    if (content.style.width === '100vw') {
      content.style.cssText = content.style.cssText.replace('width: 100vw; height: 100vh;', 'width: 95vw; height: 95vh;');
      fullscreenBtn.textContent = '⛶ Fullscreen';
    } else {
      content.style.cssText = content.style.cssText.replace('width: 95vw; height: 95vh;', 'width: 100vw; height: 100vh;');
      fullscreenBtn.textContent = '⛶ Exit Fullscreen';
    }
  });

  // Close on background click
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.remove();
      restoreSidebar();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popup.remove();
      restoreSidebar();
    }
  });

  // Add navigation functionality
  addMindmapNavigation(reactFlowContainer);
};

// Load React Flow and render the mindmap
const loadReactFlowAndRender = (mindmapData, container) => {
  console.log('Loading React Flow dependencies...');
  
  // Show loading state
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #666;">
      <div style="font-size: 24px; margin-bottom: 20px;">🧠</div>
      <div style="font-size: 18px; margin-bottom: 10px;">Loading Interactive Mindmap...</div>
      <div style="font-size: 14px;">Please wait while we load the visualization library</div>
    </div>
  `;

  // Load React Flow from CDN
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      console.log('Loading script:', src);
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        console.log('Script loaded successfully:', src);
        resolve();
      };
      script.onerror = (error) => {
        console.error('Script failed to load:', src, error);
        reject(new Error(`Failed to load script: ${src}`));
      };
      document.head.appendChild(script);
    });
  };

  const loadCSS = (href) => {
    return new Promise((resolve) => {
      console.log('Loading CSS:', href);
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => {
        console.log('CSS loaded successfully:', href);
        resolve();
      };
      link.onerror = () => {
        console.warn('CSS failed to load:', href);
        resolve(); // CSS failure is not critical
      };
      document.head.appendChild(link);
    });
  };

  // Load React Flow dependencies with correct URLs
  Promise.all([
    loadCSS('https://unpkg.com/@reactflow/core@11.10.1/dist/style.css'),
    loadScript('https://unpkg.com/react@18.2.0/umd/react.production.min.js'),
    loadScript('https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js'),
    loadScript('https://unpkg.com/@reactflow/core@11.10.1/dist/umd/index.js')
  ]).then(() => {
    console.log('All React Flow dependencies loaded successfully');
    // Add a small delay to ensure everything is properly initialized
    setTimeout(() => {
      renderReactFlowMindmap(mindmapData, container);
    }, 100);
  }).catch(error => {
    console.error('Failed to load React Flow:', error);
    console.log('Falling back to vanilla JavaScript mindmap...');
    renderVanillaMindmap(mindmapData, container);
  });
};

// Convert mindmap data to React Flow format
const convertToReactFlowData = (mindmapData) => {
  const nodes = [];
  const edges = [];
  let nodeId = 0;

  const processNode = (node, parentId = null, x = 0, y = 0, level = 0) => {
    const currentNodeId = `node-${nodeId++}`;
    
    // Create node
    nodes.push({
      id: currentNodeId,
      type: 'default',
      position: { x, y },
      data: { 
        label: node.topic || node.title || 'Untitled',
        level: level,
        content: node.topic || node.title || 'Untitled'
      },
      style: {
        background: level === 0 ? '#10a37f' : getNodeColor(level),
        color: level === 0 ? 'white' : '#000000',
        border: `2px solid ${level === 0 ? '#0e8a6f' : getNodeBorderColor(level)}`,
        borderRadius: '12px',
        padding: level === 0 ? '20px' : '15px',
        fontSize: level === 0 ? '18px' : '14px',
        fontWeight: level === 0 ? 'bold' : 'normal',
        minWidth: level === 0 ? '200px' : '150px',
        maxWidth: '300px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }
    });

    // Create edge from parent
    if (parentId) {
      edges.push({
        id: `edge-${parentId}-${currentNodeId}`,
        source: parentId,
        target: currentNodeId,
        type: 'smoothstep',
        style: { 
          stroke: '#666', 
          strokeWidth: 2,
          strokeDasharray: level > 2 ? '5,5' : 'none'
        },
        animated: level > 2
      });
    }

    // Process children
    if (node.children && node.children.length > 0) {
      const childCount = node.children.length;
      const spacing = 250;
      const startX = x - (spacing * (childCount - 1)) / 2;
      
      node.children.forEach((child, index) => {
        const childX = startX + (spacing * index);
        const childY = y + 150;
        processNode(child, currentNodeId, childX, childY, level + 1);
      });
    }
  };

  // Start processing from root
  const rootNode = mindmapData.data || mindmapData;
  processNode(rootNode, null, 0, 0, 0);

  return { nodes, edges };
};

// Helper functions for node styling
const getNodeColor = (level) => {
  const colors = ['#e6f7ff', '#f6ffed', '#fff0f6', '#f9f0ff', '#fffbe6', '#f0f9ff'];
  return colors[level % colors.length];
};

const getNodeBorderColor = (level) => {
  const colors = ['#91d5ff', '#b7eb8f', '#ffadd2', '#d3adf7', '#ffe58f', '#7dd3fc'];
  return colors[level % colors.length];
};

// Render React Flow mindmap
const renderReactFlowMindmap = (mindmapData, container) => {
  console.log('Starting React Flow mindmap rendering...');
  
  // Check if React Flow is available
  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined' || typeof ReactFlow === 'undefined') {
    console.error('React Flow dependencies not loaded properly');
    container.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #666;">
        <div style="font-size: 24px; margin-bottom: 20px;">⚠️</div>
        <div style="font-size: 18px; margin-bottom: 10px;">React Flow library not loaded</div>
        <div style="font-size: 14px; margin-bottom: 20px;">Please refresh the page and try again</div>
        <button onclick="location.reload()" style="background: #10a37f; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Retry</button>
      </div>
    `;
    return;
  }

  const { nodes, edges } = convertToReactFlowData(mindmapData);
  console.log('Converted data:', { nodes: nodes.length, edges: edges.length });
  
  // Create React Flow container
  container.innerHTML = '';
  
  // Add React Flow styles
  const style = document.createElement('style');
  style.textContent = `
    .react-flow__node {
      transition: all 0.3s ease !important;
    }
    .react-flow__node:hover {
      transform: scale(1.05) !important;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
    }
    .react-flow__node .react-flow__handle {
      background: #10a37f !important;
    }
    .react-flow__node-text {
      color: #000000 !important;
      font-weight: 500 !important;
    }
    .react-flow__controls {
      background: white !important;
      border-radius: 8px !important;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
    }
    .react-flow__controls button {
      border-radius: 6px !important;
      margin: 2px !important;
    }
    .react-flow__minimap {
      border-radius: 8px !important;
      overflow: hidden !important;
    }
    .react-flow__background {
      background: #f8f9fa !important;
    }
  `;
  document.head.appendChild(style);

  try {
    // Create React Flow instance using ReactDOM
    const reactFlowInstance = ReactDOM.createRoot(container);
    
    // Create React Flow component
    const ReactFlowComponent = React.createElement(ReactFlow.ReactFlow, {
      nodes: nodes,
      edges: edges,
      fitView: true,
      fitViewOptions: { padding: 0.2 },
      defaultEdgeOptions: {
        type: 'smoothstep',
        style: { stroke: '#666', strokeWidth: 2 }
      },
      onNodeClick: (event, node) => {
        console.log('Node clicked:', node);
        // Add node click interactions here
      },
      onEdgeClick: (event, edge) => {
        console.log('Edge clicked:', edge);
        // Add edge click interactions here
      },
      onConnect: (params) => {
        console.log('Connection created:', params);
        // Add connection logic here
      },
      style: {
        background: '#f8f9fa'
      }
    }, [
      React.createElement(ReactFlow.Controls, { key: 'controls' }),
      React.createElement(ReactFlow.MiniMap, { 
        key: 'minimap',
        nodeColor: (node) => node.data.level === 0 ? '#10a37f' : getNodeColor(node.data.level),
        nodeStrokeWidth: 3,
        zoomable: true,
        pannable: true
      }),
      React.createElement(ReactFlow.Background, { 
        key: 'background',
        variant: 'dots',
        gap: 20,
        size: 1,
        color: '#ddd'
      })
    ]);

    reactFlowInstance.render(ReactFlowComponent);

    console.log('React Flow mindmap rendered successfully');
    console.log('Nodes:', nodes.length, 'Edges:', edges.length);
  } catch (error) {
    console.error('Error rendering React Flow mindmap:', error);
    container.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #666;">
        <div style="font-size: 24px; margin-bottom: 20px;">⚠️</div>
        <div style="font-size: 18px; margin-bottom: 10px;">Error rendering mindmap</div>
        <div style="font-size: 14px; margin-bottom: 20px;">${error.message}</div>
        <button onclick="location.reload()" style="background: #10a37f; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Retry</button>
      </div>
    `;
  }
};

// Vanilla JavaScript fallback mindmap (when React Flow fails to load)
const renderVanillaMindmap = (mindmapData, container) => {
  console.log('Rendering vanilla JavaScript mindmap...');
  
  // Clear container
  container.innerHTML = '';

  if (!mindmapData) {
    container.textContent = 'No mindmap data provided.';
    return;
  }

  // Handle different data structures
  let rootNode;
  if (mindmapData.data) {
    rootNode = mindmapData.data;
  } else if (mindmapData.topic) {
    rootNode = mindmapData;
  } else {
    console.error('Invalid mindmap data structure:', mindmapData);
    container.textContent = 'Invalid mindmap data structure.';
    return;
  }

  console.log('Root node:', rootNode);

  // Add vanilla mindmap styles
  const style = document.createElement('style');
  style.textContent = `
    .vanilla-mindmap-container {
      padding: 20px;
      background: #f8f9fa;
      height: 100%;
      overflow: auto;
      scroll-behavior: smooth;
      font-family: ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica, Arial, sans-serif;
      position: relative;
    }
    .vanilla-node-container {
      position: relative;
      margin: 10px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .vanilla-node {
      background-color: #ffffff;
      color: #000000;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      padding: 15px 20px;
      margin-bottom: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;
      font-size: 14px;
      line-height: 1.4;
      word-wrap: break-word;
      white-space: normal;
      max-width: 300px;
      text-align: center;
      position: relative;
    }
    .vanilla-node:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    .vanilla-root-node {
      background-color: #10a37f;
      color: white;
      font-size: 18px;
      font-weight: bold;
      border-color: #0e8a6f;
      margin: 20px auto;
      max-width: 400px;
    }
    .vanilla-children-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 30px;
      padding-top: 20px;
      position: relative;
    }
    .vanilla-children-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 2px;
      height: 20px;
      background-color: #ccc;
      transform: translateX(-50%);
    }
    .vanilla-node-container[data-depth="1"] .vanilla-node { background-color: #e6f7ff; border-color: #91d5ff; color: #000000; }
    .vanilla-node-container[data-depth="2"] .vanilla-node { background-color: #f6ffed; border-color: #b7eb8f; color: #000000; }
    .vanilla-node-container[data-depth="3"] .vanilla-node { background-color: #fff0f6; border-color: #ffadd2; color: #000000; }
    .vanilla-node-container[data-depth="4"] .vanilla-node { background-color: #f9f0ff; border-color: #d3adf7; color: #000000; }
    .vanilla-node-container[data-depth="5"] .vanilla-node { background-color: #fffbe6; border-color: #ffe58f; color: #000000; }
  `;
  document.head.appendChild(style);

  // Function to create a node element
  function createVanillaNodeElement(node, depth = 0) {
    console.log('Creating vanilla node at depth', depth, ':', node);

    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'vanilla-node-container';
    nodeDiv.setAttribute('data-depth', depth);

    const nodeContent = document.createElement('div');
    nodeContent.className = 'vanilla-node';
    nodeContent.textContent = node.topic || node.title || node.name || 'Untitled';

    if (depth === 0) {
      nodeContent.classList.add('vanilla-root-node');
    }

    nodeDiv.appendChild(nodeContent);

    if (node.children && node.children.length > 0) {
      const childrenContainer = document.createElement('div');
      childrenContainer.className = 'vanilla-children-container';
      node.children.forEach(child => {
        childrenContainer.appendChild(createVanillaNodeElement(child, depth + 1));
      });
      nodeDiv.appendChild(childrenContainer);
    }
    return nodeDiv;
  }

  // Create the mindmap container
  const mindmapContainer = document.createElement('div');
  mindmapContainer.className = 'vanilla-mindmap-container';

  // Create the root node
  const rootElement = createVanillaNodeElement(rootNode, 0);
  mindmapContainer.appendChild(rootElement);
  container.appendChild(mindmapContainer);

  console.log('Vanilla JavaScript mindmap rendered successfully');
  
  // Add navigation controls to vanilla mindmap
  addVanillaMindmapNavigation(mindmapContainer);
};

// Navigation functionality for React Flow mindmap
const addMindmapNavigation = (container) => {
  let currentTextSize = 1;

  // Text size controls
  document.getElementById('text-increase').addEventListener('click', () => {
    currentTextSize = Math.min(currentTextSize * 1.1, 2);
    updateTextSize(container, currentTextSize);
  });

  document.getElementById('text-decrease').addEventListener('click', () => {
    currentTextSize = Math.max(currentTextSize / 1.1, 0.7);
    updateTextSize(container, currentTextSize);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('#reactflow-mindmap-popup')) {
      switch(e.key) {
        case 'ArrowUp':
          e.preventDefault();
          container.scrollBy({ top: -50, behavior: 'smooth' });
          break;
        case 'ArrowDown':
          e.preventDefault();
          container.scrollBy({ top: 50, behavior: 'smooth' });
          break;
        case 'ArrowLeft':
          e.preventDefault();
          container.scrollBy({ left: -50, behavior: 'smooth' });
          break;
        case 'ArrowRight':
          e.preventDefault();
          container.scrollBy({ left: 50, behavior: 'smooth' });
          break;

      }
    }
  });
};

// Function to update text size
const updateTextSize = (container, size) => {
  const style = document.createElement('style');
  style.id = 'text-size-styles';
  style.textContent = `
    .react-flow__node, .vanilla-node {
      font-size: ${14 * size}px !important;
    }
    .react-flow__node[data-level="0"], .vanilla-root-node {
      font-size: ${18 * size}px !important;
    }
  `;
  
  // Remove existing text size styles
  const existingStyle = document.getElementById('text-size-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  document.head.appendChild(style);
};

// Navigation functionality for vanilla mindmap
const addVanillaMindmapNavigation = (mindmapContainer) => {
  let currentTextSize = 1;

  // Text size controls (using the same header buttons)
  document.getElementById('text-increase').addEventListener('click', () => {
    currentTextSize = Math.min(currentTextSize * 1.1, 2);
    updateTextSize(mindmapContainer, currentTextSize);
  });

  document.getElementById('text-decrease').addEventListener('click', () => {
    currentTextSize = Math.max(currentTextSize / 1.1, 0.7);
    updateTextSize(mindmapContainer, currentTextSize);
  });
};

// Sidebar functionality enhancements
(function() {

  
  // Function to get conversation tree data
  function getConversationTreeData(deep = false) {
    try {
      // Try to get data from the existing floatbar if available
      const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
      if (floatbar) {
        const panel = floatbar.querySelector('.panel ul');
        if (panel && panel.children.length > 0) {
          console.log('Extracting tree data from floating box panel');
          return extractTreeDataFromDOM(panel);
        } else {
          console.log('Floating box panel found but empty, falling back to ChatGPT extraction');
        }
      }
      
      // If no floatbar or empty panel, try to extract from ChatGPT page structure
      console.log('Extracting from ChatGPT page structure');
      return extractTreeDataFromChatGPT(deep);
    } catch (error) {
      console.error('Error extracting tree data:', error);
      return null;
    }
  }
  
  function extractTreeDataFromDOM(ulElement) {
    const treeData = [];
    const items = ulElement.children;
    
    console.log('Extracting from DOM with', items.length, 'items');
    
    for (let item of items) {
      if (item.tagName === 'LI') {
        const contentDiv = item.querySelector('div');
        const childrenUl = item.querySelector('ul');
        const messageId = item.getAttribute('data-message-id');
        
        console.log('Processing item with messageId:', messageId);
        
        const nodeData = {
          id: messageId || generateId(),
          content: contentDiv ? contentDiv.textContent.trim() : 'Untitled',
          children: childrenUl ? extractTreeDataFromDOM(childrenUl) : []
        };
        
        console.log('Created node:', { id: nodeData.id, content: nodeData.content.substring(0, 50) + '...' });
        treeData.push(nodeData);
      }
    }
    
    console.log('Extracted tree data:', treeData.length, 'items');
    return treeData;
  }
  
  function extractTreeDataFromChatGPT(deep = false) {
    // Extract conversation structure from ChatGPT page
    const messages = document.querySelectorAll('[data-message-id]');
    const treeData = [];
    
    console.log('Found', messages.length, 'messages on ChatGPT page');
    
    messages.forEach((message, index) => {
      const messageId = message.getAttribute('data-message-id');
      const author = message.getAttribute('data-message-author-role') || 'unknown';
      const content = message.textContent.trim().substring(0, 100) + '...';
      
      console.log('Processing message', index, 'with ID:', messageId, 'author:', author);
      
      treeData.push({
        id: messageId,
        content: `${author}: ${content}`,
        children: []
      });
    });
    
    console.log('Extracted', treeData.length, 'messages from ChatGPT page');
    return treeData;
  }
  
  function generateId() {
    return 'node_' + Math.random().toString(36).substr(2, 9);
  }
  
  // Function to navigate to a specific message
  function navigateToMessage(messageId) {
    try {
      console.log('Attempting to navigate to message:', messageId);
      
      // First try to find the message by data-message-id
      let messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
      console.log('Direct search result:', messageElement);
      
      // If not found, try to find it in the floating window's tree structure
      if (!messageElement) {
        const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
        if (floatbar) {
          const panel = floatbar.querySelector('.panel ul');
          if (panel) {
            const treeItem = panel.querySelector(`[data-message-id="${messageId}"]`);
            console.log('Tree item found:', treeItem);
            if (treeItem && treeItem.__ref) {
              const refElement = treeItem.__ref.deref();
              if (refElement) {
                messageElement = refElement;
                console.log('Found via __ref:', messageElement);
              }
            }
          }
        }
      }
      
      // If still not found, try to find by partial match
      if (!messageElement) {
        const allMessages = document.querySelectorAll('[data-message-id]');
        console.log('Total messages on page:', allMessages.length);
        for (let msg of allMessages) {
          const msgId = msg.getAttribute('data-message-id');
          if (msgId && (msgId.includes(messageId) || messageId.includes(msgId))) {
            messageElement = msg;
            console.log('Found via partial match:', messageElement);
            break;
          }
        }
      }
      
      if (messageElement) {
        console.log('Successfully found message element, scrolling to it');
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Highlight the message briefly
        messageElement.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
        setTimeout(() => {
          messageElement.style.backgroundColor = '';
        }, 2000);
        
        return true;
      } else {
        console.log('Message element not found');
      }
    } catch (error) {
      console.error('Error navigating to message:', error);
    }
    return false;
  }
  

  
  // Enhanced message listener for sidebar communication
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.type) {
      case 'toggle-sidebar':
        // Toggle the floating box and adjust page layout
        try {
          const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
          const panel = floatbar ? floatbar.querySelector('.panel') : null;
          
          // Find main ChatGPT container
          const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
          if (panel) {
            const isVisible = panel.style.display === 'flex';
            if (isVisible) {
              // Hide panel and remove page adjustment
              panel.style.display = 'none';
              floatbar.classList.remove('show-panel');
              main.style.marginRight = '';
              main.style.width = '';
              document.body.style.marginRight = '';
            } else {
              // Show panel and adjust page layout
              panel.style.display = 'flex';
              floatbar.classList.add('show-panel');
              main.style.marginRight = '600px';
              main.style.width = `calc(100vw - 600px)`;
              document.body.style.marginRight = '600px';
            }
          }
          sendResponse({ success: true });
        } catch (error) {
          sendResponse({ success: false, error: error.message });
        }
        break;

      case 'close-sidebar':
        // Close the floating box and reset page layout
        try {
          const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
          const panel = floatbar ? floatbar.querySelector('.panel') : null;
          const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
          if (panel) {
            panel.style.display = 'none';
            floatbar.classList.remove('show-panel');
            main.style.marginRight = '';
            main.style.width = '';
            document.body.style.marginRight = '';
          }
          sendResponse({ success: true });
        } catch (error) {
          sendResponse({ success: false, error: error.message });
        }
        break;
        
      case 'get-conversation-tree':
        try {
          const treeData = getConversationTreeData(message.deep);
          sendResponse({ 
            success: true, 
            data: treeData 
          });
        } catch (error) {
          sendResponse({ 
            success: false, 
            error: error.message 
          });
        }
        break;
        
      case 'navigate-to-message':
        console.log('Content script received navigate-to-message request:', message.messageId);
        const success = navigateToMessage(message.messageId);
        console.log('Navigation result:', success);
        sendResponse({ success });
        break;
        
      case 'refresh-conversation':
        // Trigger page refresh or conversation reload
        try {
          const refreshBtn = document.querySelector('button[aria-label*="refresh"], button[title*="refresh"]');
          if (refreshBtn) {
            refreshBtn.click();
            sendResponse({ success: true });
          } else {
            // Fallback: reload page
            window.location.reload();
            sendResponse({ success: true });
          }
        } catch (error) {
          sendResponse({ success: false, error: error.message });
        }
        break;
        
      case 'toggle-partial-mode':
        // Handle partial mode toggle
        try {
          const partialBtn = document.querySelector('.catalogeu-navigation-plugin-floatbar .partial');
          if (partialBtn) {
            partialBtn.click();
          }
          sendResponse({ success: true });
        } catch (error) {
          sendResponse({ success: false, error: error.message });
        }
        break;
        
      case 'toggle-wide-mode':
        // Handle wide mode toggle
        try {
          const wideBtn = document.querySelector('.catalogeu-navigation-plugin-floatbar .wide');
          if (wideBtn) {
            wideBtn.click();
          }
          sendResponse({ success: true });
        } catch (error) {
          sendResponse({ success: false, error: error.message });
        }
        break;
        
      case 'toggle-fullscreen':
        // Handle fullscreen toggle
        try {
          const fullBtn = document.querySelector('.catalogeu-navigation-plugin-floatbar .full');
          if (fullBtn) {
            fullBtn.click();
          }
          sendResponse({ success: true });
        } catch (error) {
          sendResponse({ success: false, error: error.message });
        }
        break;
        
      case 'export-conversation':
        // Handle export
        try {
          const exportBtn = document.querySelector('.catalogeu-navigation-plugin-floatbar .export');
          if (exportBtn) {
            exportBtn.click();
          }
          sendResponse({ success: true });
        } catch (error) {
          sendResponse({ success: false, error: error.message });
        }
        break;
        
      case 'generate-mindmap':
        // Handle mindmap generation
        try {
          // Trigger mindmap generation function if available
          if (typeof createReactFlowMindmapPopup === 'function') {
            const treeData = getConversationTreeData();
            if (treeData) {
              createReactFlowMindmapPopup(treeData);
            }
          }
          sendResponse({ success: true });
        } catch (error) {
          sendResponse({ success: false, error: error.message });
        }
        break;
        
      case 'export-pdf':
        // Handle PDF export
        try {
          window.print();
          sendResponse({ success: true });
        } catch (error) {
          sendResponse({ success: false, error: error.message });
        }
        break;
        
      case 'open-settings':
        // Handle settings
        try {
          chrome.runtime.sendMessage({ type: 'open-options' });
          sendResponse({ success: true });
        } catch (error) {
          sendResponse({ success: false, error: error.message });
        }
        break;
        
      case 'open-help':
        // Handle help
        try {
          chrome.runtime.sendMessage({ type: 'open-help' });
          sendResponse({ success: true });
        } catch (error) {
          sendResponse({ success: false, error: error.message });
        }
        break;
        
      case 'resize-sidebar':
        // This is now handled by the floating box
        sendResponse({ success: true });
        break;
        
      case 'check-compatibility':
        // Check if current page is compatible
        const isCompatible = window.location.hostname.includes('chatgpt.com') || window.location.hostname.includes('gemini.google.com');
        sendResponse({ compatible: isCompatible });
        break;
        
      case 'get-current-url':
        sendResponse({ url: window.location.href });
        break;
        
      case 'sidebar-closing':
        // This is now handled by the floating box
        sendResponse({ success: true });
        break;
        
      default:
        // Handle unknown message types
        return false;
    }
    
    return true; // Keep message channel open for async responses
  });
  
  // Also ensure floating button still works
  document.addEventListener('click', (e) => {
    const catalogButton = e.target.closest('.catalogeu-navigation-plugin-floatbar .catalog.button');
    if (catalogButton) {
      // If catalog button is clicked, toggle the floating box directly
      e.preventDefault();
      e.stopPropagation();
      
      // Directly toggle the floating box without sending message to background
      const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
      const panel = floatbar ? floatbar.querySelector('.panel') : null;
      
      // Find main ChatGPT container
      const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
      if (panel) {
        const isVisible = panel.style.display === 'flex';
        if (isVisible) {
          // Hide panel and remove page adjustment
          panel.style.display = 'none';
          floatbar.classList.remove('show-panel');
          main.style.marginRight = '';
          main.style.width = '';
          document.body.style.marginRight = '';
        } else {
          // Show panel and adjust page layout
          panel.style.display = 'flex';
          floatbar.classList.add('show-panel');
          main.style.marginRight = '600px';
          main.style.width = `calc(100vw - 600px)`;
          document.body.style.marginRight = '600px';
        }
      }
    }
    
    // Handle close button click to reset page width
    const closeButton = e.target.closest('.catalogeu-navigation-plugin-floatbar .close');
    if (closeButton) {
      e.preventDefault();
      e.stopPropagation();
      
      // Hide panel and reset page layout immediately
      const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
      const panel = floatbar ? floatbar.querySelector('.panel') : null;
      const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
      
      if (panel) {
        panel.style.display = 'none';
        floatbar.classList.remove('show-panel');
        main.style.marginRight = '';
        main.style.width = '';
        document.body.style.marginRight = '';
      }
    }
  });
  

  
})();