(()=>{
  // Platform detection
  const isGemini = window.location.hostname.includes('gemini.google.com');
  const isChatGPT = window.location.hostname.includes('chatgpt.com');
  const platform = isGemini ? 'gemini' : 'chatgpt';
  
  // Debug platform detection
  console.log('Platform detection:');
  console.log('Hostname:', window.location.hostname);
  console.log('isGemini:', isGemini);
  console.log('isChatGPT:', isChatGPT);
  console.log('Platform:', platform);
  
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
  
  const i=Object.freeze({collapsed:"collapsed",processed:"collapse-processed",showPanel:"show-panel",hover:"hover",subcatalog:"subcatalog",wide:"wide",headbar:"headbar",speakbox:"speakbox"}),c=Object.freeze({tree:'<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" version="1.1">\n                <defs>\n                <filter id="svg_2_blur">\n                <feGaussianBlur in="SourceGraphic" stdDeviation="0"/>\n                </filter>\n                </defs>\n                <g>\n                <title>Layer 1</title>\n                <path fill="#878585" p-id="13609" id="svg_1" transform="rotate(90 512 311.157)" stroke="null" d="m797.12819,323.41716l0,-43.27157l0,-53.36827l0,-43.27157l0,-53.36827l1.50862,-41.82918l0,-272.61088l-45.25845,0l0,66.34974c-30.17231,-30.2901 -72.41352,-49.04112 -119.18059,-49.04112c-66.37906,0 -128.23228,40.3868 -152.37011,98.08222c-89.0083,11.53909 -155.38735,90.87029 -155.38735,186.06774l0,7.21194c-61.85321,34.61725 -101.07721,111.06369 -101.07721,196.16443c0,53.36827 15.08615,103.85176 43.74984,142.79618c-4.52585,20.19341 -4.52585,40.3868 -1.50862,60.5802c10.56031,96.63984 89.00828,168.75912 176.50796,168.75912c1.50862,2.88478 3.01723,5.76955 4.52585,7.21194c0,1.44238 1.50862,2.88477 1.50862,4.32716c31.68092,51.92588 93.53413,85.10075 161.4218,85.10075c55.81876,0 105.60306,-23.07817 140.3012,-57.69543l0,75.00406l45.25845,0l0,-288.47712l0,-43.27157l0,-53.36827l0,-43.27157l0,-54.81065zm-184.05103,422.61898c-58.83599,0 -111.63752,-33.17486 -131.24951,-83.65837c-4.52585,-12.98147 -7.54308,-27.40532 -7.54308,-40.38679c0,-67.79213 63.36183,-124.04517 140.3012,-124.04517l22.62923,0l0,-40.38679c0,-21.63578 39.224,-56.25304 58.83599,-56.25304l0,-43.27157c-42.24121,0 -102.58582,50.48349 -104.09444,98.08222c-46.76706,5.76955 -87.49966,25.96294 -117.67197,56.25304c-30.1723,-8.65431 -60.34459,-28.84771 -60.34459,-56.25304l-45.25845,0c0,44.71396 37.71537,77.88882 78.44797,92.31268c-12.06892,21.63578 -18.10338,46.15634 -18.10338,72.11928c0,8.65431 1.50862,17.30863 3.01724,25.96294c-60.34461,-7.21192 -110.1289,-59.13781 -119.18059,-128.37231c-1.50862,-18.75102 -1.50862,-37.50203 3.01723,-54.81066l3.01724,-10.09669l-6.03446,-8.65431c-25.64645,-33.17488 -40.73261,-77.88882 -40.73261,-125.48755c0,-75.00406 36.20676,-139.91141 89.00828,-164.43196l15.08615,-7.21194l-1.50862,-15.86624c-1.50861,-7.21192 -1.50861,-12.98147 -1.50861,-18.75102c0,-66.34973 42.24121,-122.60277 98.05997,-138.46902l0,12.98147c0,31.73249 10.56031,62.02259 27.15507,86.54314c-37.71538,17.30863 -67.88768,47.59873 -67.88768,87.98553l45.25845,0c0,-25.96294 27.15507,-44.71396 54.31014,-53.36827c28.66369,23.07817 64.87045,36.05964 105.60306,36.05964l0,-43.27157c-66.37907,0 -119.18059,-51.92588 -119.18059,-113.94847c0,-10.09669 1.50862,-21.63578 4.52585,-31.73247l0,-1.44239c15.08615,-47.59873 61.85321,-82.21598 114.65475,-82.21598c66.37906,0 119.18058,51.92588 119.18058,113.94847l0,43.27157c-43.74983,1.44238 -81.46521,-23.07817 -98.05997,-64.90735l-42.24123,14.42385c22.62923,57.69543 76.93937,93.75507 135.77535,93.75507l4.52585,0l0,151.45049a107.11166,102.40937 0 0 0 -66.37906,-21.63578c-42.24123,0 -87.49968,21.63578 -120.6892,59.13781c-27.15507,30.2901 -67.88768,54.81065 -104.09444,34.61725l0,1.44239c-7.54308,-41.82919 -45.25845,-75.00406 -92.02552,-75.00406l0,43.27157c27.15507,0 48.27568,20.19339 48.27568,46.15634s-21.12061,46.15635 -48.27568,46.15635l0,43.27157c40.73261,0 75.43075,-24.52056 89.00828,-59.13782c10.56031,2.88478 21.12062,5.76955 33.18954,5.76955c37.71538,0 76.93937,-20.19339 110.1289,-57.69543c24.13783,-27.40532 57.32737,-43.27157 85.99106,-43.27157c19.61199,0 37.71537,7.21194 51.2929,23.07817c6.03446,7.21192 10.56031,14.42386 15.08615,23.07817l0,222.12737c-61.85321,-1.44238 -117.67197,34.61725 -140.3012,93.75507l42.24123,14.42385c16.59476,-41.82918 55.81875,-67.79212 98.05997,-64.90735l0,64.90735c-4.52585,66.34974 -66.37906,122.60278 -143.31842,122.60278z"/>\n                <path fill="#5454ff" p-id="9428" id="svg_2" filter="url(#svg_2_blur)" stroke="null" d="m958.87299,845.99664l-67.70802,0l0,-105.08567a81.24963,54.24242 0 0 0 -81.24963,-54.24242l-267.47379,0l0,-88.19819l111.74532,0a40.62482,27.12121 0 0 0 40.62482,-27.12121l0,-108.48485a40.62482,27.12121 0 0 0 -40.62482,-27.12121l-284.37371,0a40.62482,27.12121 0 0 0 -40.62482,27.12121l0,108.48485c0,14.97091 18.19992,27.12121 40.62482,27.12121l111.74532,0l0,88.12586l-267.47379,0a81.24963,54.24242 0 0 0 -81.24963,54.31475l0,105.08567l-67.70802,0a40.62482,27.12121 0 0 0 -40.62482,27.12121l0,108.48485c0,14.97091 18.19992,27.12121 40.62482,27.12121l176.04087,0a40.62482,27.12121 0 0 0 40.62482,-27.12121l0,-108.48485a40.62482,27.12121 0 0 0 -40.62482,-27.12121l-47.39563,0l0,-77.96446c0,-29.94182 16.08743,-40.71798 60.93722,-40.71798l226.84897,0l0,118.68243l-57.5789,0a40.62482,27.12121 0 0 0 -40.62482,27.12121l0,108.48485c0,14.97091 18.19992,27.12121 40.62482,27.12121l176.04086,0a40.62482,27.12121 0 0 0 40.62482,-27.12121l0,-108.48485a40.62482,27.12121 0 0 0 -40.62482,-27.12121l-57.5789,0l0,-118.68243l226.84897,0c44.8498,0 60.93722,10.77616 60.93722,40.71798l0,77.96446l-47.39563,0a40.62482,27.12121 0 0 0 -40.62482,27.12121l0,108.48485c0,14.97091 18.19992,27.12121 40.62482,27.12121l176.04087,0a40.62482,27.12121 0 0 0 40.62482,-27.12121l0,-108.48485a40.62482,27.12121 0 0 0 -40.62482,-27.12121l-57.5789,0l0,-118.68243l226.84897,0c44.8498,0 60.93722,10.77616 60.93722,40.71798l0,77.96446l-47.39563,0a40.62482,27.12121 0 0 0 -40.62482,27.12121l0,108.48485c0,14.97091 18.19992,27.12121 40.62482,27.12121l176.04087,0a40.62482,27.12121 0 0 0 40.62482,-27.12121l0,-108.48485a40.62482,27.12121 0 0 0 -40.62482,-27.12121l-57.5789,0l0,-118.68243l226.84897,0c44.8498,0 60.93722,10.77616 60.93722,40.71798l0,77.96446l-47.39563,0a40.62482,27.12121 0 0 0 -40.62482,27.12121l0,108.48485c0,14.97091 18.19992,27.12121 40.62482,27.12121l176.04087,0a40.62482,27.12121 0 0 0 40.62482,-27.12121l0,-108.48485a40.62482,27.12121 0 0 0 -40.62482,-27.12121z" />\n                </g>\n                </svg>',bind:'<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" version="1.1">\n         <g>\n        <path stroke="null" fill="#000000" d="m378.51035,417.69249zm-376.9144,325.24581l0,-576.7279a165.19426,164.17325 0 0 1 165.19426,-164.17325l691.21043,0a165.19426,164.17325 0 0 1 165.19426,164.17325l0,569.11217a165.19426,164.17325 0 0 1 -165.19426,164.17325l-246.58719,0l-296.94461,113.69188a64.58887,64.18967 0 0 1 -98.36119,-54.72442l1.36841,-8.54049l16.58511,-49.7742l-18.88404,-0.16319l-0.6021,0l-38.8628,-0.32639l-12.53462,-0.1088l-4.32417,0a157.53117,156.55753 0 0 1 -157.20275,-156.66632l-0.05474,0.0544zm290.54046,220.58401l304.38875,-116.57498l9.85254,-1.84953l251.62293,0a110.45792,109.77522 0 0 0 110.45792,-109.77522l0,-569.11217a110.45792,109.77522 0 0 0 -110.45792,-109.77522l-691.21043,0a110.45792,109.77522 0 0 0 -110.45792,109.77522l0,576.7279a102.79484,102.1595 0 0 0 103.45167,102.1595l3.88628,0l12.53462,0.16319l38.8628,0.32639l0.65684,0l56.37842,0.54398a27.36817,27.19901 0 0 1 25.72608,35.68511l-26.49239,79.63871c1.25894,3.97106 4.92627,6.79975 9.30518,6.79975c2.18945,0 4.05049,-0.54398 1.97051,1.35995l9.52412,-6.09258zm-133.00929,-64.02648c0.16421,0 0.16421,0 1.31367,-54.39803l-0.71157,0c35.8523,0.70717 35.63335,54.39803 -0.6021,54.39803z"/>\n        <path stroke="null" fill="#353535" d="m897.72227,487.25138q0,12.88037 -12.24627,27.41147l-132.63107,164.39908q-16.97678,21.18053 -47.57034,35.92088t-56.65557,14.74035l-429.48151,0q-13.41784,0 -23.87359,-5.39395t-10.45575,-17.85582q0,-12.88037 12.24627,-27.41147l132.63107,-164.39908q16.97678,-21.18053 47.57034,-35.92088t56.65557,-14.74035l429.48151,0q13.41784,0 23.87359,5.39395t10.45575,17.85582zm-135.39422,-142.8233l0,66.42457l-328.41663,0q-37.11459,0 -77.76602,19.7158t-64.74607,49.61499l-134.99632,166.91005q0,-1.65073 -0.19895,-5.1847t-0.19895,-5.1847l0,-398.57069q0,-38.19936 26.06201,-65.58758t62.35871,-27.41147l126.30899,0q36.31881,0 62.35871,27.41147t26.06201,65.58758l0,13.27561l214.7297,0q36.31881,0 62.35871,27.41147t26.06201,65.58758l0.02211,0z"/>\n        </g>\n        </svg>',edit:'<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z" fill="#000000"></path></svg>',unfull:'<svg viewBox="0 0 1042 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M330.971429 950.857143h-73.142858V768h-182.857142v-73.142857h219.428571c20.114286 0 36.571429 16.457143 36.571429 36.571428v219.428572zM952.685714 329.142857h-219.428571c-20.114286 0-36.571429-16.457143-36.571429-36.571428V73.142857h73.142857v182.857143h182.857143v73.142857zM294.4 329.142857h-219.428571v-73.142857h182.857142V73.142857h73.142858v219.428572c0 20.114286-16.457143 36.571429-36.571429 36.571428zM769.828571 950.857143h-73.142857V731.428571c0-20.114286 16.457143-36.571429 36.571429-36.571428h219.428571v73.142857h-182.857143v182.857143z" fill="#000000"></path></svg>',refresh:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M772.010667 795.008c-58.026667 52.053333-123.861333 84.053333-197.546667 96-73.642667 11.989333-145.792 2.986667-216.490667-27.008-70.656-32-126.506667-79.36-167.466666-141.994667-40.96-62.72-61.824-132.693333-62.506667-210.048h64c0.682667 67.328 19.157333 127.658667 55.466667 180.992 36.352 53.333333 85.845333 92.330667 148.522666 116.992 62.72 24.021333 125.525333 28.672 188.501334 14.037334 63.018667-14.677333 117.504-46.677333 163.498666-96h-93.013333a31.146667 31.146667 0 0 1-22.997333-8.96 30.506667 30.506667 0 0 1-8.96-22.528c0-9.002667 2.986667-16.512 8.96-22.485334a34.986667 34.986667 0 0 1 23.04-10.026666h148.992a33.792 33.792 0 0 1 22.016 10.026666c5.973333 5.973333 9.344 13.354667 10.026666 22.016v148.992a34.730667 34.730667 0 0 1-10.026666 22.997334 30.592 30.592 0 0 1-22.485334 8.96 30.592 30.592 0 0 1-22.528-8.96 30.976 30.976 0 0 1-8.96-23.04v-50.005334l-0.042666 0.042667zM276.010667 296.021333h93.013333a31.146667 31.146667 0 0 1 22.997333 8.96c5.973333 5.973333 8.96 13.525333 8.96 22.528 0 8.96-2.986667 16.469333-8.96 22.485334a34.986667 34.986667 0 0 1-23.04 10.026666H219.989333a33.792 33.792 0 0 1-22.016-10.026666 33.792 33.792 0 0 1-9.984-22.016V178.986667a34.730667 34.730667 0 0 1 9.984-23.04 30.592 30.592 0 0 1 22.528-8.96c8.96 0 16.469333 2.986667 22.485334 8.96 5.973333 6.016 9.002667 13.653333 8.96 23.04v50.005333c58.026667-52.010667 123.861333-84.010667 197.546666-96 73.642667-11.946667 146.133333-2.986667 217.472 27.008 70.698667 32 126.336 79.36 167.04 142.037333C874.666667 364.714667 895.317333 434.730667 896 512h-64c-0.64-67.328-19.157333-127.658667-55.466667-180.992-36.352-53.333333-85.845333-92.330667-148.522666-116.992-62.72-24.021333-125.525333-28.672-188.501334-14.037333-63.018667 14.677333-117.504 46.677333-163.498666 96z" fill="#000000" fill-opacity=".96"></path></svg>',fullMagic:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M143.146667 911.146667l-30.293334-30.293334a21.333333 21.333333 0 0 1 0-30.08L554.666667 408.96 615.04 469.333333 173.226667 911.146667a21.333333 21.333333 0 0 1-30.08 0z" fill="#000000"></path><path d="M774.186667 219.52l30.293333 30.293333a21.333333 21.333333 0 0 1 0 30.08l-224 224-60.373333-60.373333 224-224a21.333333 21.333333 0 0 1 30.08 0z" fill="#000000"></path><path d="M768 64l40.746667 93.44 94.933333-37.12-37.12 94.933333L960 256l-93.44 40.746667 37.12 94.933333-94.933333-37.12L768 448l-40.746667-93.44-94.933333 37.12 37.12-94.933333L576 256l93.44-40.746667-37.12-94.933333 94.933333 37.12L768 64z" fill="#000000"></path><path d="M768 183.04l15.573333 35.413333 36.053334-14.08-14.08 36.053334 35.413333 15.573333-35.413333 15.573333 14.08 36.053334-36.053334-14.08-15.573333 35.413333-15.573333-35.413333-36.053334 14.08 14.08-36.053334-35.413333-15.573333 35.413333-15.573333-14.08-36.053334 36.053334 14.08 15.573333-35.413333z" fill="#000000"></path></svg>',full:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M0 0h256v51.2H0z" fill="#000000"></path><path d="M51.2 0v256H0V0zM1024 0v256h-51.2V0z" fill="#000000"></path><path d="M1024 51.2h-256V0h256zM1024 1024h-256v-51.2h256z" fill="#000000"></path><path d="M972.8 1024v-256h51.2v256zM0 1024v-256h51.2v256z" fill="#000000"></path><path d="M0 972.8h256v51.2H0z" fill="#000000"></path></svg>',pdf:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M493.638305 493.510904c0 0-8.708336 33.013905-27.351951 66.940598-18.642592 33.926694-35.184337 53.195549-35.184337 53.195549s49.792033-12.325723 69.113077-16.335037c22.199605-4.608971 51.880601-7.261381 63.139016-7.856945 0 0-23.911596-26.78197-33.695427-39.818891C519.825734 536.533766 493.638305 493.510904 493.638305 493.510904z" fill="#000000"></path><path d="M259.370771 760.667499c11.728112 6.701632 36.440957-6.284123 51.938929-24.293289 12.558014-14.594393 39.372729-54.870702 39.372729-54.870702s-49.845245 14.659885-72.463382 36.021401C255.601934 738.886427 252.384659 756.674559 259.370771 760.667499z" fill="#000000"></path><path d="M507.695462 340.689333c0.653893-17.591657 11.651364-69.809949-15.715937-77.070306 0 0-29.040407 1.116427-26.960025 46.935985 1.428535 31.480992 23.609721 92.684936 23.609721 92.684936S507.043616 358.280989 507.695462 340.689333z" fill="#000000"></path><path d="M696.941618 619.931175c-26.386974-2.512217-52.937676-3.699252-52.937676-3.699252s52.075029 49.65184 70.808696 64.017012c16.754592 12.845563 45.796022 8.93551 51.939953-8.93551C777.617032 639.70759 723.328591 622.443391 696.941618 619.931175z" fill="#000000"></path><path d="M855.733157 63.83998 168.26582 63.83998c-57.672514 0-104.425328 46.752814-104.425328 104.426351l0 687.46836c0 57.672514 46.752814 104.425328 104.425328 104.425328L855.733157 960.16002c57.672514 0 104.425328-46.752814 104.425328-104.425328L960.158485 168.266331C960.158485 110.592794 913.406694 63.83998 855.733157 63.83998zM724.307895 727.158315c-82.09781-18.429745-132.851751-106.275465-132.851751-106.275465s-30.92329 0.723477-82.024132 8.68173c-48.250934 7.513114-104.430444 30.461779-104.430444 30.461779S345.655949 774.070764 288.69054 792.501532c-56.965409 18.429745-101.265358-30.508851-50.262754-88.799442 43.979654-50.261731 139.222855-69.578682 139.222855-69.578682s38.373982-46.864354 58.478879-86.655615c20.10592-39.793308 38.535665-91.732238 38.535665-91.732238s-38.535665-88.798419-41.888016-139.062196c-3.349281-50.262754 26.807552-85.448114 56.965409-88.798419 38.301328-4.25593 82.815147 31.833009 17.951861 217.808678 0 0 18.909675 43.561122 45.716204 73.720002 26.807552 30.15888 58.08286 61.434188 58.08286 61.434188s95.427396-10.398838 158.821215 21.977547C839.912843 638.361943 806.404682 745.588059 724.307895 727.158315z" fill="#000000"></path></svg>',user:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M772.016477 696.022177c-39.228443-39.229466-85.763292-68.49807-136.530536-86.546122 26.774807-13.283538 51.500954-30.976502 73.254398-52.729945 52.55189-52.550867 81.494059-122.422214 81.494059-196.74085s-28.941146-144.189983-81.494059-196.741873c-52.550867-52.550867-122.422214-81.493036-196.74085-81.493036s-144.189983 28.942169-196.741873 81.493036c-52.55189 52.550867-81.494059 122.422214-81.494059 196.741873s28.941146 144.189983 81.494059 196.74085c21.753443 21.753443 46.480614 39.446407 73.256444 52.729945-50.76929 18.049075-97.303116 47.316655-136.532583 86.546122-66.188468 66.187445-104.009865 153.166425-107.422591 246.208495l48.730864 0c3.387144-80.028685 36.140105-154.783249 93.129051-211.770148 55.771211-55.771211 128.557958-88.326675 206.650547-92.867084 6.27389 0.418532 12.582573 0.645706 18.929118 0.645706 6.345522 0 12.656251-0.227174 18.929118-0.645706 78.091566 4.54041 150.880359 37.095873 206.650547 92.867084 56.987922 56.986899 89.741907 131.741463 93.129051 211.770148l48.730864 0C876.027365 849.188602 838.204945 762.209622 772.016477 696.022177zM282.466792 360.004237c0-126.564557 102.96814-229.53372 229.53372-229.53372 126.564557 0 229.53372 102.969163 229.53372 229.53372 0 120.304993-93.040023 219.280192-210.942293 228.77545-6.170536-0.304945-12.369725-0.460488-18.591427-0.460488-6.222725 0-12.420891 0.155543-18.59245 0.460488C375.505791 579.284429 282.466792 480.30923 282.466792 360.004237z" fill="#000000" p-id="9553"></path></svg>',unfold:'<svg viewBox="0 0 1088 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M1073.728 544q0 17.728-17.728 37.728l-192 226.272q-24.576 29.152-68.864 49.44t-82.016 20.288l-621.728 0q-19.424 0-34.56-7.424t-15.136-24.576q0-17.728 17.728-37.728l192-226.272q24.576-29.152 68.864-49.44t82.016-20.288l621.728 0q19.424 0 34.56 7.424t15.136 24.576zM877.728 347.424l0 91.424-475.424 0q-53.728 0-112.576 27.136t-93.728 68.288l-195.424 229.728q0-2.272-0.288-7.136t-0.288-7.136l0-548.576q0-52.576 37.728-90.272t90.272-37.728l182.848 0q52.576 0 90.272 37.728t37.728 90.272l0 18.272 310.848 0q52.576 0 90.272 37.728t37.728 90.272z"  fill="#000000"></path></svg>',fold:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M987.428571 347.428571v402.285715c0 70.290286-57.709714 128-128 128h-694.857142A128.512 128.512 0 0 1 36.571429 749.714286v-548.571429C36.571429 130.852571 94.281143 73.142857 164.571429 73.142857h182.857142C417.718857 73.142857 475.428571 130.852571 475.428571 201.142857V219.428571h384C929.718857 219.428571 987.428571 277.138286 987.428571 347.428571z" fill="#000000"></path></svg>',deep:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M971.0592 748.2368a25.6 25.6 0 0 1 21.9136 46.2848l-472.5248 223.8976a25.6 25.6 0 0 1-21.9136 0l-472.576-223.8976a25.6 25.6 0 0 1 21.9648-46.2848l461.568 218.7264 461.568-218.7264z m0-166.2464a25.6 25.6 0 1 1 21.9136 46.2848l-472.5248 223.8464a25.6 25.6 0 0 1-21.9136 0l-472.576-223.8464a25.6 25.6 0 1 1 21.9648-46.2848l461.568 218.624 461.568-218.624z m0-166.2976a25.6 25.6 0 0 1 21.9136 46.2848l-472.5248 223.8976a25.6 25.6 0 0 1-21.9136 0L25.9584 461.9776a25.6 25.6 0 0 1 21.9648-46.2848l461.568 218.7264 461.568-218.7264z m-48.8448-143.7696L509.4912 76.4416 96.768 271.872l412.672 195.584 412.7744-195.584z m70.7584 23.1424l-472.5248 223.8976a25.6 25.6 0 0 1-21.9136 0L25.9584 295.0656a25.6 25.6 0 0 1 0-46.2336L498.5856 24.9856a25.6 25.6 0 0 1 21.9136 0l472.5248 223.8464a25.6 25.6 0 0 1 0 46.2336z" fill="#000000"></path></svg>',mind:'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M160 64C107.264 64 64 107.264 64 160S107.264 256 160 256c14.72 0 28.48-3.776 40.96-9.728l145.792 145.728a155.328 155.328 0 0 0-9.28 158.976l-127.744 103.296A96.256 96.256 0 0 0 160 640c-52.736 0-96 43.264-96 96S107.264 832 160 832 256 788.736 256 736a89.6 89.6 0 0 0-6.016-31.744l127.04-103.04c27.968 23.808 63.744 38.784 102.976 38.784 17.28 0 33.472-3.52 49.024-8.512l68.224 109.248A95.232 95.232 0 0 0 576 800c0 52.736 43.264 96 96 96s96-43.264 96-96a96.32 96.32 0 0 0-116.736-93.76L584.96 599.744c21.248-18.752 37.504-43.008 46.464-70.72l137.792 28.224c6.72 46.528 46.72 82.752 94.72 82.752 52.736 0 96-43.264 96-96S916.736 448 864 448a96.64 96.64 0 0 0-81.728 46.528l-143.744-29.504a158.4 158.4 0 0 0-54.016-105.024l66.496-106.496c6.72 1.472 13.76 2.496 20.992 2.496 52.736 0 96-43.264 96-96S724.736 64 672 64 576 107.264 576 160c0 22.272 8 42.752 20.992 59.008l-68.224 109.44A158.464 158.464 0 0 0 480 320c-32.512 0-62.72 9.984-88 26.752L246.272 201.024C252.16 188.48 256 174.72 256 160 256 107.264 212.736 64 160 64z m0 64c17.984 0 32 14.016 32 32s-14.016 32-32 32a31.616 31.616 0 0 1-32-32c0-17.984 14.016-32 32-32z m512 0c17.984 0 32 14.016 32 32s-14.016 32-32 32a31.616 31.616 0 0 1-32-32c0-17.984 14.016-32 32-32z m-192 256C533.504 384 576 426.496 576 480c0 34.56-17.984 64.256-44.992 81.28a31.872 31.872 0 0 0-8.96 4.992C509.184 572.16 494.912 576 480 576A95.36 95.36 0 0 1 384 480C384 426.496 426.496 384 480 384z m384 128c17.984 0 32 14.016 32 32s-14.016 32-32 32a31.616 31.616 0 0 1-32-32c0-17.984 14.016-32 32-32z m-704 192c17.984 0 32 14.016 32 32s-14.016 32-32 32a31.616 31.616 0 0 1-32-32c0-17.984 14.016-32 32-32z m512 64c17.984 0 32 14.016 32 32s-14.016 32-32 32a31.616 31.616 0 0 1-32-32c0-17.984 14.016-32 32-32z" p-id="9503" fill="#000000"></path></svg>'}),{dynamicData:d,dynamicDataKeys:u}=(()=>{const e=Object.freeze({replying:"replying",messageId:"messageId",action:"action"}),t=new WeakMap;return{dynamicData:new class{#e=[];#t={};constructor(){}get messageId(){return this.#t.messageId}get replying(){return this.#t.replying}get action(){return this.#t.action}onChange(e,l){return t.set(e,l),this.#e.push(e),()=>{this.#e=this.#e.filter(t=>t!==e),t.delete(e)}}},dynamicDataKeys:e}})();let p;const{getMain:m,setMain:h,onArticleChange:g}=(()=>{let e,n=!1;const a=(()=>{let a,s,r;const i=c=>{if(a&&a.disconnect(),s&&s.disconnect(),r&&r(),n=!1,!c||!e)return;const d=n=>{a=l(n,t=>{const l=Array.from(t).map(({removedNodes:e,addedNodes:t})=>Array.from(e).filter(e=>e.tagName.toUpperCase()===o.article.toUpperCase())).flat();e&&e({type:"new",articleParent:n,removeArticles:l})},!1),r=t(n,()=>{a&&a.disconnect(),e&&e({type:"clear2"}),i(c)})},u=()=>{s=l(c,()=>{const t=c.querySelector(o.article);if(t){s.disconnect();const l=t.parentElement;e&&e({type:"old",articleParent:l}),d(l)}},!0)},p=document.getElementById(o.headerId)?.nextElementSibling?.querySelector(o.user)?.closest(o.article)?.parentElement;p?(d(p),e&&e({type:"old",articleParent:p})):u(),n=!0};return i})();let s;const r=l=>{s=void 0===l?document.querySelector(o.main):l,a(s),s&&(s.addEventListener("click",e=>{const t=e.target.closest(o.article);t&&t.hasAttribute(i.collapsed)&&p&&p(t)},!0),t(s,()=>{e&&e({type:"clear1"}),r()},2e3))};return{getMain:()=>s,setMain:r,onArticleChange:t=>{t&&"function"!=typeof t||(e=t,n||a(s))}}})(),f=()=>{
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
  
  // Create mindmap data from the current chat tree (respecting visibility)
  const e=(t,l)=>{
    if (!t) return [];
    return Array.from(t.children).filter(li => {
      if (li.tagName !== 'LI') return false;
      // Check if this LI is actually visible (not collapsed/hidden)
      try {
        if (li.closest('li.collapsed')) return false;
        const cs = getComputedStyle(li);
        if (cs && (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0')) return false;
      } catch(_) {}
      return true;
    }).map((t,a)=>{
    const s=t.children[1]?.firstChild;
    let r=s?.data||s?.textContent;
    r&&n(r.at(-1))&&(r=r.slice(0,-1));
    const o=`${l}_${a+1}`;
    return{id:o,topic:r,children:e(t.children[2],o)}
    });
  };
  
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
  
  // Open jsMind in a new window/tab only (no overlay popup on main page)
  console.log('Mind map button clicked, data:', t);
  try {
    openJsMindWindow(t);
  } catch (error) {
    console.error('Error opening jsMind window:', error);
  }
});
  H=e=>{let n=e.__reply;if(!n&&(n=t(e.__ref.deref()).answerArticle,n)){const t=n.querySelector(o.markdown);if(t)return v(e,Array.from(t.children)),e.__reply=n,n.setAttribute(l,"reply"),n}}}})(),document.body.appendChild(r);const R=()=>{t(r,()=>{document.body.appendChild(r),R()},2e3)};return R(),r}}})();window.addEventListener("load",function e(){r=0,h(null),h(),m()?(y(),createZeroEkaIconButton(),(()=>{const floatbar=document.querySelector('.catalogeu-navigation-plugin-floatbar');if(floatbar){const buttons=floatbar.querySelector('.buttons');if(buttons){buttons.style.display='none'}}})(),chrome.runtime.onMessage.addListener((e,t,l)=>{const{type:n,data:s}=e;"logout"===n?location.reload():"error"===n&&("automaticLoginFailure"===s?a(0,lang("automaticLoginFailureTitle"),lang("automaticLoginFailurePrompt")):a(0,lang("operationFailure"),lang(s?.message)||s?.message))})):r<10&&(r++,setTimeout(e,1e3))})})();

// Create ZeroEka icon button for sidebar toggle
const createZeroEkaIconButton = () => {
  // Check if contracted sidebar already exists to prevent duplicates
  const existingSidebar = document.getElementById('zeroeka-contracted-sidebar');
  if (existingSidebar) {
    console.log('Contracted sidebar already exists, skipping creation');
    return;
  }

  // Remove existing ZeroEka button if any
  const existingButton = document.getElementById('zeroeka-sidebar-toggle');
  if (existingButton) {
    existingButton.remove();
  }

  // Create the contracted sidebar with ZeroEka icon
  const contractedSidebar = document.createElement('div');
  contractedSidebar.id = 'zeroeka-contracted-sidebar';
  contractedSidebar.style.cssText = `
    position: fixed;
    right: 0;
    top: 0;
    width: 64px;
    height: 100vh;
    background: #1a1a1a;
    border-left: 1px solid #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    z-index: 999999;
    transition: all 0.3s ease;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
    padding: 16px 8px;
  `;

  // Create container for top buttons
  const topButtonsContainer = document.createElement('div');
  topButtonsContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  `;

  // Create the ZeroEka icon button at the top
  const zeroekaButton = document.createElement('div');
  zeroekaButton.id = 'zeroeka-sidebar-toggle';
  zeroekaButton.style.cssText = `
    width: 48px;
    height: 48px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  `;

  // Create ZeroEka icon with actual logo
  const zeroekaIcon = document.createElement('img');
  zeroekaIcon.style.cssText = `
    width: 100%;
    height: 100%;
    border-radius: 8px;
    display: block;
    object-fit: cover;
  `;
  zeroekaIcon.src = chrome.runtime.getURL('images/icons/icon-128.png');
  zeroekaIcon.alt = 'ZeroEka';

  zeroekaButton.appendChild(zeroekaIcon);
  topButtonsContainer.appendChild(zeroekaButton);

  // Add 3-dots menu (kebab) just below ZeroEka button
  const menuButton = document.createElement('div');
  menuButton.id = 'contracted-menu-button';
  menuButton.style.cssText = `
    width: 48px;
    height: 48px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 12px;
    transition: all 0.3s ease;
    color: #e5e7eb;
    font-size: 20px;
    font-weight: 700;
  `;
  menuButton.textContent = '⋮';
  menuButton.addEventListener('mouseenter', () => { menuButton.style.background = '#2a2a2a'; menuButton.style.transform = 'scale(1.02)'; });
  menuButton.addEventListener('mouseleave', () => { menuButton.style.background = '#1a1a1a'; menuButton.style.transform = 'scale(1)'; });
  // append later below the ZeroEka extension button

  // Popup menu panel
  const menuPanel = document.createElement('div');
  menuPanel.id = 'contracted-menu-panel';
  menuPanel.style.cssText = `
    position: fixed;
    display: none;
    min-width: 220px;
    background: #111315;
    border: 1px solid #22292e;
    border-radius: 10px;
    box-shadow: 0 14px 40px rgba(0,0,0,.5);
    padding: 8px;
    z-index: 2147483646;
    flex-wrap: wrap;
    gap: 8px;
  `;
  const mkItem = (label) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.style.cssText = `
      display: inline-flex; align-items: center; justify-content: center; min-width: 110px; width: auto;
      text-align: center; color: #e8e8e8; background: #171b1f; border: 1px solid #2b3238;
      border-radius: 6px; padding: 6px 8px; margin: 4px; cursor: pointer; font: 600 12px/1 sans-serif;
    `;
    b.addEventListener('mouseenter', () => { b.style.background = '#1e2428'; });
    b.addEventListener('mouseleave', () => { b.style.background = '#171b1f'; });
    return b;
  };
  const itemToggleHeader = mkItem('Hide/Show header');
  const itemToggleFooter = mkItem('Hide/Show footer');
  
  // Add test logging to verify buttons are created
  console.log('Created header toggle button:', itemToggleHeader);
  console.log('Created footer toggle button:', itemToggleFooter);
  
  menuPanel.appendChild(itemToggleHeader);
  menuPanel.appendChild(itemToggleFooter);
  // Removed fullscreen option per request
  document.body.appendChild(menuPanel);

  function placeMenuPanel() {
    const r = menuButton.getBoundingClientRect();
    const top = Math.max(8, Math.min(window.innerHeight - 8 - menuPanel.offsetHeight, r.top + window.scrollY));
    menuPanel.style.top = `${top}px`;
    menuPanel.style.left = 'auto';
    menuPanel.style.right = '80px'; // position beside contracted sidebar
  }
  function showMenu() {
    placeMenuPanel();
    menuPanel.style.display = 'flex';
    menuOpen = true;
    scheduleAutoHide();
  }
  function hideMenu() { menuPanel.style.display = 'none'; menuOpen = false; clearAutoHide(); }
  let menuOpen = false;
  let hoverPanel = false;
  let hoverButton = false;
  let hideTimer = null;
  function clearAutoHide(){ if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; } }
  function scheduleAutoHide(){
    clearAutoHide();
    hideTimer = setTimeout(() => {
      if (!hoverPanel && !hoverButton && menuOpen) hideMenu();
    }, 2000);
  }
  menuButton.addEventListener('click', (ev) => {
    ev.stopPropagation();
    if (menuOpen) { hideMenu(); } else { showMenu(); }
  });
  menuButton.addEventListener('mouseenter', () => { hoverButton = true; clearAutoHide(); });
  menuButton.addEventListener('mouseleave', () => { hoverButton = false; if (menuOpen) scheduleAutoHide(); });
  menuPanel.addEventListener('mouseenter', () => { hoverPanel = true; clearAutoHide(); });
  menuPanel.addEventListener('mouseleave', () => { hoverPanel = false; if (menuOpen) scheduleAutoHide(); });
  document.addEventListener('click', (ev) => {
    if (!menuOpen) return;
    if (!menuPanel.contains(ev.target) && ev.target !== menuButton) { hideMenu(); menuOpen = false; }
  }, true);

  // Helpers for actions
  function getMainEl() {
    return document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
  }
  function getHeaderEl() {
    if (isGemini) {
      // Gemini-specific header selectors - try multiple approaches
      let header = document.querySelector('[data-testid="header"]') || 
                   document.querySelector('header') ||
                   document.querySelector('[role="banner"]') ||
                   document.querySelector('.header') ||
                   document.querySelector('[class*="header"]') ||
                   document.querySelector('div[class*="Header"]') ||
                   document.querySelector('div[class*="header"]');
      
      // If still not found, try to find by scanning for common patterns
      if (!header) {
        const headerCandidates = document.querySelectorAll('div[class*="header"], div[class*="Header"]');
        for (const candidate of headerCandidates) {
          // Look for elements that contain navigation or logo-like content
          if (candidate.querySelector('a[href*="gemini"], a[href*="google"], img[alt*="Gemini"], img[alt*="Google"]') ||
              candidate.textContent.includes('Gemini') ||
              candidate.textContent.includes('Google')) {
            header = candidate;
            break;
          }
        }
      }
      
      // Try to find the top navigation area
      if (!header) {
        const navElements = document.querySelectorAll('nav, [role="navigation"]');
        for (const nav of navElements) {
          if (nav.closest('div[class*="header"]') || nav.textContent.includes('Gemini')) {
            header = nav.closest('div[class*="header"]') || nav;
            break;
          }
        }
      }
      
      return header;
    } else {
      // ChatGPT-specific header selectors
      return document.getElementById('page-header') || 
             document.querySelector('[role="presentation"] > #page-header') || 
             document.querySelector('header');
    }
  }
  function getFooterEl() {
    if (isGemini) {
      // Gemini-specific footer/input selectors - try multiple approaches
      let footer = document.querySelector('[data-testid="input-box"]') ||
                   document.querySelector('[data-testid="input-container"]') ||
                   document.querySelector('[role="textbox"]') ||
                   document.querySelector('textarea[placeholder*="Message"]') ||
                   document.querySelector('textarea[placeholder*="message"]') ||
                   document.querySelector('div[class*="input"]') ||
                   document.querySelector('div[class*="Input"]') ||
                   document.querySelector('div[class*="footer"]') ||
                   document.querySelector('div[class*="Footer"]') ||
                   document.querySelector('footer');
      
      // If still not found, try to find by scanning for common patterns
      if (!footer) {
        const textareas = document.querySelectorAll('textarea');
        for (const ta of textareas) {
          if (ta.placeholder && ta.placeholder.toLowerCase().includes('message')) {
            footer = ta.closest('div') || ta;
            break;
          }
        }
      }
      
      // Try to find the main input area container
      if (!footer) {
        const inputContainers = document.querySelectorAll('div[class*="input"], div[class*="Input"]');
        for (const container of inputContainers) {
          if (container.querySelector('textarea') || container.textContent.includes('Send')) {
            footer = container;
            break;
          }
        }
      }
      
      return footer;
    } else {
      // ChatGPT-specific footer selectors
      return document.getElementById('thread-bottom-container') || 
             document.querySelector('[role="presentation"] > #thread-bottom-container') || 
             document.querySelector('footer');
    }
  }

  // Removed Toggle chat width action

  // Action: Hide/Show header
  itemToggleHeader.addEventListener('click', () => {
    console.log('Header toggle button clicked');
    console.log('isGemini:', isGemini);
    console.log('Current URL:', window.location.href);
    
    const header = getHeaderEl();
    console.log('Found header element:', header);
    
    if (!header) {
      console.warn('Header element not found for hide/show');
      // Log available elements for debugging
      if (isGemini) {
        console.log('Available Gemini elements for header:');
        console.log('Headers:', document.querySelectorAll('header'));
        console.log('Banners:', document.querySelectorAll('[role="banner"]'));
        console.log('Header classes:', document.querySelectorAll('div[class*="header"], div[class*="Header"]'));
        console.log('Navigation:', document.querySelectorAll('nav, [role="navigation"]'));
      }
      return;
    }
    
    const hidden = header.style.display === 'none';
    console.log('Header current display:', header.style.display, 'hidden:', hidden);
    
    header.style.display = hidden ? '' : 'none';
    
    // Also try to hide parent containers if they exist
    if (isGemini) {
      const headerParent = header.closest('div[class*="header"], div[class*="Header"]');
      if (headerParent && headerParent !== header) {
        console.log('Hiding header parent:', headerParent);
        headerParent.style.display = hidden ? '' : 'none';
      }
    }
    
    console.log(`Header ${hidden ? 'shown' : 'hidden'}`);
    hideMenu(); menuOpen = false;
  });

  // Action: Hide/Show footer
  itemToggleFooter.addEventListener('click', () => {
    console.log('Footer toggle button clicked');
    console.log('isGemini:', isGemini);
    console.log('Current URL:', window.location.href);
    
    const footer = getFooterEl();
    console.log('Found footer element:', footer);
    
    if (!footer) {
      console.warn('Footer element not found for hide/show');
      // On Gemini, try to find and log available elements for debugging
      if (isGemini) {
        console.log('Available Gemini elements for footer:');
        console.log('Input boxes:', document.querySelectorAll('[data-testid*="input"]'));
        console.log('Textareas:', document.querySelectorAll('textarea'));
        console.log('Input containers:', document.querySelectorAll('div[class*="input"]'));
        console.log('Footer containers:', document.querySelectorAll('div[class*="footer"]'));
        console.log('All textareas:', document.querySelectorAll('textarea'));
        console.log('All divs with input in class:', document.querySelectorAll('div[class*="input"]'));
      }
      return;
    }
    
    const hidden = footer.style.display === 'none';
    console.log('Footer current display:', footer.style.display, 'hidden:', hidden);
    
    footer.style.display = hidden ? '' : 'none';
    
    // Also try to hide parent containers if they exist
    if (isGemini) {
      const footerParent = footer.closest('div[class*="input"], div[class*="Input"], div[class*="footer"], div[class*="Footer"]');
      if (footerParent && footerParent !== footer) {
        console.log('Hiding footer parent:', footerParent);
        footerParent.style.display = hidden ? '' : 'none';
      }
      
      // Try to hide the entire input area container
      const inputArea = document.querySelector('div[class*="input-area"], div[class*="InputArea"]');
      if (inputArea) {
        console.log('Hiding input area:', inputArea);
        inputArea.style.display = hidden ? '' : 'none';
      }
    }
    
    console.log(`Footer ${hidden ? 'shown' : 'hidden'}`);
    hideMenu(); menuOpen = false;
  });

  // Fullscreen option removed

  // Add hover effects
  zeroekaButton.addEventListener('mouseenter', () => {
    zeroekaButton.style.background = '#2a2a2a';
    zeroekaIcon.style.transform = 'scale(1.1)';
  });

  zeroekaButton.addEventListener('mouseleave', () => {
    zeroekaButton.style.background = '#1a1a1a';
    zeroekaIcon.style.transform = 'scale(1)';
  });

  // Create Tree-Mindmap button below ZeroEka icon
  const treeMindmapButton = document.createElement('div');
  treeMindmapButton.id = 'tree-mindmap-button';
  treeMindmapButton.style.cssText = `
    width: 48px;
    height: 48px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 12px;
    transition: all 0.3s ease;
  `;

  // Create tree icon for the button
  const treeIcon = document.createElement('div');
  treeIcon.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; color: #fff;">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  `;
  treeIcon.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `;

  treeMindmapButton.appendChild(treeIcon);
  topButtonsContainer.appendChild(treeMindmapButton);

  // Create Search button below Tree-Mindmap button
  const searchButton = document.createElement('div');
  searchButton.id = 'search-button';
  searchButton.style.cssText = `
    width: 48px;
    height: 48px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 12px;
    transition: all 0.3s ease;
  `;
  
  console.log('Search button created:', searchButton);

  // Create search icon for the button
  const searchIcon = document.createElement('div');
  searchIcon.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; color: #fff;">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  `;
  searchIcon.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `;

  searchButton.appendChild(searchIcon);
  topButtonsContainer.appendChild(searchButton);
  console.log('Search button added to topButtonsContainer');

  // Add hover effects for search button
  searchButton.addEventListener('mouseenter', () => {
    console.log('Search button hover enter');
    searchButton.style.background = '#2a2a2a';
    searchIcon.style.transform = 'scale(1.1)';
  });

  searchButton.addEventListener('mouseleave', () => {
    console.log('Search button hover leave');
    searchButton.style.background = '#1a1a1a';
    searchIcon.style.transform = 'scale(1)';
  });

  // Add click functionality for search button
  searchButton.addEventListener('click', (e) => {
    console.log('Search button clicked', e);
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window.createSearchPopup === 'function') {
      console.log('Calling createSearchPopup');
      window.createSearchPopup();
    } else {
      console.error('createSearchPopup function not available');
      alert('Search functionality not available');
    }
  });

  // Add hover effects for tree button
  treeMindmapButton.addEventListener('mouseenter', () => {
    treeMindmapButton.style.background = '#2a2a2a';
    treeIcon.style.transform = 'scale(1.1)';
  });

  treeMindmapButton.addEventListener('mouseleave', () => {
    treeMindmapButton.style.background = '#1a1a1a';
    treeIcon.style.transform = 'scale(1)';
  });

  // Add click functionality for tree mindmap button
  treeMindmapButton.addEventListener('click', () => {
    console.log('Tree-Mindmap button clicked - opening main sidebar');
    
    // Toggle the main extension sidebar (same functionality as ZeroEka button)
    const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
    const panel = floatbar ? floatbar.querySelector('.panel') : null;
    const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
    
    if (floatbar && panel) {
      const isPanelVisible = panel.style.display === 'flex' || floatbar.classList.contains('show-panel');
      
      if (isPanelVisible) {
        // Hide panel
        panel.style.display = 'none';
        floatbar.classList.remove('show-panel');
        main.style.marginRight = '';
        main.style.width = '';
        document.body.style.marginRight = '';
        contractedSidebar.style.display = 'flex';
        contractedSidebar.style.right = '0';
      } else {
        // Show panel
        panel.style.display = 'flex';
        floatbar.classList.add('show-panel');
        main.style.marginRight = '600px';
        main.style.width = `calc(100vw - 600px)`;
        document.body.style.marginRight = '600px';
        contractedSidebar.style.display = 'none';
        
        // Immediately replace existing close button when panel opens
        setTimeout(replaceExistingCloseButton, 100);
        // Force Gemini tree rebuild on open
        try { if (isGemini && typeof window.__rebuildGeminiTree === 'function') setTimeout(window.__rebuildGeminiTree, 150); } catch(_) {}
      }
    }
  });

  // Embedded Mindmap button (above PDF)
  const embeddedMindmapButton = document.createElement('div');
  embeddedMindmapButton.id = 'embedded-mindmap-button';
  embeddedMindmapButton.style.cssText = `
    width: 48px;
    height: 48px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 12px;
    transition: all 0.3s ease;
  `;
  const embeddedMindmapIcon = document.createElement('div');
  embeddedMindmapIcon.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; color: #fff;">
      <circle cx="12" cy="6" r="3"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="18" r="3"/>
      <path d="M12 9v3M9 12l-2 4M15 12l2 4"/>
    </svg>
  `;
  embeddedMindmapIcon.style.cssText = `
    display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;
  `;
  embeddedMindmapButton.appendChild(embeddedMindmapIcon);
  topButtonsContainer.appendChild(embeddedMindmapButton);

  embeddedMindmapButton.addEventListener('mouseenter', () => {
    embeddedMindmapButton.style.background = '#2a2a2a';
    embeddedMindmapIcon.style.transform = 'scale(1.1)';
  });
  embeddedMindmapButton.addEventListener('mouseleave', () => {
    embeddedMindmapButton.style.background = '#1a1a1a';
    embeddedMindmapIcon.style.transform = 'scale(1)';
  });

  function buildEmbeddedMindmapData() {
    try {
      const treeUl = document.querySelector('.catalogeu-navigation-plugin-floatbar .panel ul');
      const walk = (ul, prefix) => {
        if (!ul) return [];
        return Array.from(ul.children).filter(li => {
          if (li.tagName !== 'LI') return false;
          // Check if this LI is actually visible (not collapsed/hidden)
          try {
            if (li.closest('li.collapsed')) return false;
            const cs = getComputedStyle(li);
            if (cs && (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0')) return false;
          } catch(_) {}
          return true;
        }).map((li, idx) => {
          const labelDiv = li.children?.[1];
          let topic = (labelDiv?.textContent || '').trim();
          const id = `${prefix}_${idx+1}`;
          const childrenUl = li.children?.[2];
          return { id, topic, children: walk(childrenUl, id) };
        });
      };
      const data = {
        meta: { name: 'mind map', author: 'Chat Tree', version: '1.0' },
        format: 'node_tree',
        data: { id: 'root', topic: document.title, children: walk(treeUl, 'root') }
      };
      return data;
    } catch (err) {
      console.warn('Failed to build embedded mindmap data:', err);
      return null;
    }
  }

  function openEmbeddedMindmapNewTab() {
    const payload = buildEmbeddedMindmapData();
    if (!payload || !payload.data || !payload.data.children || payload.data.children.length === 0) {
      console.warn('No data for mindmap');
      return;
    }
    try {
      openJsMindWindow(payload);
    } catch (e) {
      try {
        const url = chrome.runtime.getURL('resources/mindmap.html');
        const child = window.open(url, 'jsmind_popup', 'width=1280,height=860');
        if (child) {
          const post = () => { try { child.postMessage({ type: 'mindmap-data', payload }, '*'); } catch(_){} };
          setTimeout(post, 300);
          const iv = setInterval(post, 700);
          setTimeout(() => clearInterval(iv), 4000);
        }
      } catch(_){}
    }
  }

  embeddedMindmapButton.addEventListener('click', openEmbeddedMindmapNewTab);

  // Create PDF Export button below Tree-Mindmap button
  const pdfExportButton = document.createElement('div');
  pdfExportButton.id = 'pdf-export-button';
  pdfExportButton.style.cssText = `
    width: 48px;
    height: 48px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 12px;
    transition: all 0.3s ease;
  `;

  // Create PDF icon for the button
  const pdfIcon = document.createElement('div');
  pdfIcon.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; color: #fff;">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  `;
  pdfIcon.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `;

  pdfExportButton.appendChild(pdfIcon);
  topButtonsContainer.appendChild(pdfExportButton);

  // Add hover effects for PDF button
  pdfExportButton.addEventListener('mouseenter', () => {
    pdfExportButton.style.background = '#2a2a2a';
    pdfIcon.style.transform = 'scale(1.1)';
  });

  pdfExportButton.addEventListener('mouseleave', () => {
    pdfExportButton.style.background = '#1a1a1a';
    pdfIcon.style.transform = 'scale(1)';
  });

  // Add click functionality for PDF export button
  pdfExportButton.addEventListener('click', () => {
    console.log('PDF Export button clicked');
    
    // Create PDF export function
    const exportToPDF = () => {
      try {
        // Get the main conversation container
        const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
        if (!main) {
          console.error('No main container found for PDF export');
          return;
        }

        // Create an iframe for printing
        const iframe = document.createElement('iframe');
        iframe.style.cssText = `
          position: fixed;
          top: -9999px;
          left: -9999px;
          width: 210mm;
          height: 297mm;
          border: none;
        `;
        document.body.appendChild(iframe);

        // Clone the main content and add to iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>ChatGPT Conversation Export</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 20px;
                color: #333;
              }
              .conversation-item {
                margin-bottom: 20px;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background: #f9f9f9;
              }
              .user-message {
                background: #e3f2fd;
                border-left: 4px solid #2196f3;
              }
              .assistant-message {
                background: #f3e5f5;
                border-left: 4px solid #9c27b0;
              }
              .message-header {
                font-weight: bold;
                margin-bottom: 10px;
                color: #666;
              }
              .message-content {
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              @media print {
                body { margin: 0; }
                .conversation-item { page-break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            <h1>ChatGPT Conversation Export</h1>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <hr>
        `);

        // Extract conversation messages
        const messages = document.querySelectorAll('[data-message-id]');
        messages.forEach((message, index) => {
          const messageId = message.getAttribute('data-message-id');
          const author = message.getAttribute('data-message-author-role') || 'unknown';
          const content = message.textContent.trim();
          
          iframeDoc.write(`
            <div class="conversation-item ${author === 'user' ? 'user-message' : 'assistant-message'}">
              <div class="message-header">${author === 'user' ? 'User' : 'Assistant'} (Message ${index + 1})</div>
              <div class="message-content">${content}</div>
            </div>
          `);
        });

        iframeDoc.write('</body></html>');
        iframeDoc.close();

        // Print the iframe content
        setTimeout(() => {
          iframe.contentWindow.print();
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        }, 500);

        console.log('PDF export initiated successfully');
      } catch (error) {
        console.error('Error during PDF export:', error);
        alert('Error creating PDF export. Please try again.');
      }
    };

    // Execute PDF export
    exportToPDF();
  });

  // Create Fullscreen button below PDF Export button
  const fullscreenButton = document.createElement('div');
  fullscreenButton.id = 'fullscreen-button';
  fullscreenButton.style.cssText = `
    width: 48px;
    height: 48px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 12px;
    transition: all 0.3s ease;
  `;

  // Create fullscreen icon for the button
  const fullscreenIcon = document.createElement('div');
  fullscreenIcon.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; color: #fff;">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
    </svg>
  `;
  fullscreenIcon.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `;

  fullscreenButton.appendChild(fullscreenIcon);
  topButtonsContainer.appendChild(fullscreenButton);

  // Add hover effects for fullscreen button
  fullscreenButton.addEventListener('mouseenter', () => {
    fullscreenButton.style.background = '#2a2a2a';
    fullscreenIcon.style.transform = 'scale(1.1)';
  });

  fullscreenButton.addEventListener('mouseleave', () => {
    fullscreenButton.style.background = '#1a1a1a';
    fullscreenIcon.style.transform = 'scale(1)';
  });

  // Add click functionality for fullscreen button
  fullscreenButton.addEventListener('click', () => {
    console.log('Fullscreen button clicked');
    
    // Check if fullScreenFn is available
    if (typeof window.fullScreenFn !== 'undefined' && window.fullScreenFn.toFullscreen) {
      try {
        // Use the existing fullscreen functionality
        window.fullScreenFn.toFullscreen();
        console.log('Fullscreen mode activated');
      } catch (error) {
        console.error('Error activating fullscreen:', error);
        // Fallback to browser's native fullscreen
        try {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement.requestFullscreen();
          }
        } catch (fallbackError) {
          console.error('Fallback fullscreen also failed:', fallbackError);
          alert('Fullscreen mode not supported in this browser.');
        }
      }
    } else {
      console.warn('fullScreenFn not available, using native fullscreen');
      // Fallback to browser's native fullscreen
      try {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      } catch (error) {
        console.error('Native fullscreen failed:', error);
        alert('Fullscreen mode not supported in this browser.');
      }
    }
  });

  // Create Pin/Unpin button below Fullscreen button
  const pinUnpinButton = document.createElement('div');
  pinUnpinButton.id = 'pin-unpin-button';
  pinUnpinButton.style.cssText = `
    width: 48px;
    height: 48px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 12px;
    transition: all 0.3s ease;
  `;

  // Create star icon for the button
  const pinIcon = document.createElement('div');
  pinIcon.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; color: #fff;">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  `;
  pinIcon.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `;

  pinUnpinButton.appendChild(pinIcon);
  topButtonsContainer.appendChild(pinUnpinButton);

  // Create ZeroEka extension button below Pin/Unpin button
  const zeroekaExtensionButton = document.createElement('div');
  zeroekaExtensionButton.id = 'zeroeka-extension-button';
  zeroekaExtensionButton.style.cssText = `
    width: 48px;
    height: 48px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 12px;
    transition: all 0.3s ease;
  `;

  // Create ZeroEka image for the button
  const zeroekaExtensionImage = document.createElement('img');
  zeroekaExtensionImage.src = chrome.runtime.getURL('images/ZeroEka.png');
  zeroekaExtensionImage.style.cssText = `
    width: 32px;
    height: 32px;
    object-fit: contain;
  `;

  zeroekaExtensionButton.appendChild(zeroekaExtensionImage);
  topButtonsContainer.appendChild(zeroekaExtensionButton);
  // Place the 3-dots menu just below the ZeroEka extension button
  topButtonsContainer.appendChild(menuButton);

  // Add hover effects for ZeroEka extension button
  zeroekaExtensionButton.addEventListener('mouseenter', () => {
    zeroekaExtensionButton.style.background = '#2a2a2a';
    zeroekaExtensionImage.style.transform = 'scale(1.1)';
  });

  zeroekaExtensionButton.addEventListener('mouseleave', () => {
    zeroekaExtensionButton.style.background = '#1a1a1a';
    zeroekaExtensionImage.style.transform = 'scale(1)';
  });

  // Add click functionality for ZeroEka extension button
  zeroekaExtensionButton.addEventListener('click', () => {
    console.log('ZeroEka extension button clicked');
    // Fire a page-level event to create a user gesture boundary the target extension can hook
    try {
      const evtDoc = new CustomEvent('pe-zeroeka-open', { bubbles: true, composed: true });
      document.dispatchEvent(evtDoc);
    } catch (_) {}
    try {
      const evtWin = new CustomEvent('pe-zeroeka-open', { bubbles: true, composed: true });
      window.dispatchEvent(evtWin);
    } catch (_) {}
    // Also delegate the open request to background to message the target extension by ID
    try {
      chrome.runtime.sendMessage({ type: 'open-prompt-engine' }, (resp) => {
        console.log('Open Prompt Engine response:', resp);
        if (!resp || resp.status !== 'installed_opened') {
          // If not opened, try a direct ping using the last seen extension ID
          chrome.storage.local.get(['peExtId'], (d) => {
            const id = d && d.peExtId;
            if (!id) return;
            try { chrome.runtime.sendMessage(id, { action: 'openSidePanel' }); } catch (_) {}
          });
        }
      });
    } catch (_) {}
  });

  // Add hover effects for pin/unpin button
  pinUnpinButton.addEventListener('mouseenter', () => {
    pinUnpinButton.style.background = '#2a2a2a';
    pinIcon.style.transform = 'scale(1.1)';
  });

  pinUnpinButton.addEventListener('mouseleave', () => {
    pinUnpinButton.style.background = '#1a1a1a';
    pinIcon.style.transform = 'scale(1)';
  });

  // Add click functionality for pin/unpin button
  pinUnpinButton.addEventListener('click', () => {
    console.log('Pin/Unpin button clicked');
    
    // Toggle bookmark mode
    const isPinModeActive = pinUnpinButton.classList.contains('pin-mode-active');
    
    if (!isPinModeActive) {
      // Activate bookmark mode
      pinUnpinButton.classList.add('pin-mode-active');
      pinIcon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; color: #3bb910;">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#3bb910"/>
        </svg>
      `;
      pinUnpinButton.style.borderColor = '#3bb910';
      
      // Set global bookmark mode state
      window.bookmarkModeActive = true;
      
      // Add bookmark mode to ChatGPT sidebar chats
      addPinButtonsToChats();
      
      console.log('Bookmark mode activated');
    } else {
      // Deactivate bookmark mode
      pinUnpinButton.classList.remove('pin-mode-active');
      pinIcon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; color: #fff;">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      `;
      pinUnpinButton.style.borderColor = '#333';
      
      // Clear global bookmark mode state
      window.bookmarkModeActive = false;
      
      // Remove bookmark mode from ChatGPT sidebar chats
      removePinButtonsFromChats();
      
      // Remove green borders from all chats (including bookmarked ones)
      const allChats = document.querySelectorAll('nav[data-testid="chat-history"] a, nav[data-testid="chat-history"] [role="button"], nav[data-testid="chat-history"] .conversation-item, nav[data-testid="chat-history"] [data-testid="conversation-turn-2"], nav[data-testid="chat-history"] [data-testid="conversation-item"], nav[data-testid="chat-history"] .conversation-turn-2, nav[data-testid="chat-history"] a[href*="/c/"], nav a[href*="/c/"], aside a[href*="/c/"], [data-testid="chat-history"] a, [data-testid="chat-history"] [role="button"]');
      allChats.forEach(chatItem => {
        chatItem.style.border = '';
        chatItem.style.borderRadius = '';
        chatItem.style.cursor = '';
        chatItem.style.transition = '';
      });
      
      console.log('Bookmark mode deactivated');
    }
  });

  // Helper to get the container element representing a chat row in the sidebar
  const getChatItemContainer = (el) => {
    if (!el) return el;
    return el.closest('li, .conversation-item, [data-testid="conversation-item"], [data-testid="conversation-turn-2"]') || el;
  };

  // Helper to extract a stable chat id from an item/container
  const getChatIdFromEl = (el) => {
    if (!el) return '';
    const directId = el.getAttribute && (el.getAttribute('href') || el.getAttribute('data-testid'));
    if (directId) return directId;
    const a = el.querySelector && el.querySelector('a[href*="/c/"]');
    if (a) return a.getAttribute('href');
    return (el.textContent || '').trim();
  };

  // Function to add bookmark mode to ChatGPT sidebar chats
  const addPinButtonsToChats = () => {
    try {
      // Find ChatGPT sidebar chat items with more specific selectors (only left sidebar)
      const chatItems = document.querySelectorAll('nav[data-testid="chat-history"] a, nav[data-testid="chat-history"] [role="button"], nav[data-testid="chat-history"] .conversation-item, nav[data-testid="chat-history"] [data-testid="conversation-turn-2"], nav[data-testid="chat-history"] [data-testid="conversation-item"], nav[data-testid="chat-history"] .conversation-turn-2, nav[data-testid="chat-history"] a[href*="/c/"], nav a[href*="/c/"], aside a[href*="/c/"], [data-testid="chat-history"] a, [data-testid="chat-history"] [role="button"]');
      
      chatItems.forEach((chatItem, index) => {
        // Skip if bookmark mode already added
        if (chatItem.classList.contains('bookmark-mode-enabled')) {
          return;
        }
        
        // Additional check to ensure we're only targeting sidebar elements
        const isInSidebar = chatItem.closest('nav[data-testid="chat-history"]') || 
                           chatItem.closest('aside') || 
                           chatItem.closest('[data-testid="chat-history"]');
        
        // Skip if not in sidebar or if it's in the main conversation area
        if (!isInSidebar || chatItem.closest('main') || chatItem.closest('[role="main"]')) {
          return; // Skip if not in sidebar or if in main content
        }
        
        // Mark as bookmark mode enabled
        chatItem.classList.add('bookmark-mode-enabled');
        
        // Get container and chat ID for persistence
        const itemEl = getChatItemContainer(chatItem);
        const chatId = getChatIdFromEl(chatItem) || getChatIdFromEl(itemEl);
        
        // Check if this chat is already bookmarked
        const bookmarkedChats = JSON.parse(localStorage.getItem('bookmarkedChats') || '[]');
        const isBookmarked = bookmarkedChats.includes(chatId);
        
        if (isBookmarked) {
          itemEl.classList.add('bookmarked');
        }
        
        // Add hover effect for bookmark mode
        chatItem.addEventListener('mouseenter', () => {
          if (window.bookmarkModeActive) {
            const isBookmarked = itemEl.classList.contains('bookmarked');
            
            if (isBookmarked) {
              // Show green border for bookmarked chats (for unbookmarking)
              chatItem.style.border = '2px solid #3bb910';
              chatItem.style.borderRadius = '8px';
              chatItem.style.cursor = 'pointer';
              chatItem.style.transition = 'all 0.3s ease';
            } else {
              // Show green border for unbookmarked chats (for bookmarking)
              chatItem.style.border = '2px solid #3bb910';
              chatItem.style.borderRadius = '8px';
              chatItem.style.cursor = 'pointer';
              chatItem.style.transition = 'all 0.3s ease';
            }
          }
        });
        
        chatItem.addEventListener('mouseleave', () => {
          if (window.bookmarkModeActive) {
            const isBookmarked = itemEl.classList.contains('bookmarked');
            
            if (isBookmarked) {
              // Remove border for bookmarked chats when mouse leaves
              chatItem.style.border = '';
              chatItem.style.borderRadius = '';
              chatItem.style.cursor = '';
              chatItem.style.transition = '';
            } else {
              // Remove border for unbookmarked chats
              chatItem.style.border = '';
              chatItem.style.borderRadius = '';
              chatItem.style.cursor = '';
              chatItem.style.transition = '';
            }
          }
        });
        
        // Add click functionality for bookmarking
        chatItem.addEventListener('click', (e) => {
          if (!window.bookmarkModeActive) return;
          
          e.preventDefault();
          e.stopPropagation();
          
          const isBookmarked = itemEl.classList.contains('bookmarked');
          
          if (!isBookmarked) {
            // Bookmark the chat
            itemEl.classList.add('bookmarked');
            chatItem.style.border = '2px solid #3bb910';
            chatItem.style.borderRadius = '8px';
            
            // Save to localStorage
            const bookmarkedChats = JSON.parse(localStorage.getItem('bookmarkedChats') || '[]');
            if (!bookmarkedChats.includes(chatId)) {
              bookmarkedChats.push(chatId);
              localStorage.setItem('bookmarkedChats', JSON.stringify(bookmarkedChats));
            }
            
            // Do not reorder entire list on toggle; only ensure the group stays together
            try { reorderBookmarkedChatsGroup(); } catch (err) { console.warn('Reorder failed:', err); }

            // Refresh the page to reflect changes consistently
            try { setTimeout(() => window.location.reload(), 300); } catch (_) {}
          } else {
            // Unbookmark the chat
            const parent = itemEl.parentElement;
            let insertBeforeNode = null;
            if (parent) {
              const siblings = Array.from(parent.children);
              // Find the first non-bookmarked item other than this one
              insertBeforeNode = siblings.find(el => el !== itemEl && !el.classList.contains('bookmarked')) || null;
            }

            // Remove from localStorage first so monitors don't bring it back
            const bookmarkedChats = JSON.parse(localStorage.getItem('bookmarkedChats') || '[]');
            const updatedBookmarks = bookmarkedChats.filter(id => id !== chatId);
            localStorage.setItem('bookmarkedChats', JSON.stringify(updatedBookmarks));

            // Remove bookmarked visuals
            itemEl.classList.remove('bookmarked');
            [itemEl, chatItem].forEach(el => {
              try {
                el.style.border = '';
                el.style.borderRadius = '';
                el.style.cursor = '';
                el.style.transition = '';
              } catch (_) {}
            });

            // Move this item to just after the bookmarked group (start of non-bookmarked region)
            if (parent) {
              if (insertBeforeNode) {
                parent.insertBefore(itemEl, insertBeforeNode);
              } else {
                // No non-bookmarked items yet; append to end
                parent.appendChild(itemEl);
              }
            }

            // Keep remaining bookmarks grouped without reshuffling
            try { reorderBookmarkedChatsGroup(); } catch (err) { console.warn('Reorder failed:', err); }

            // Refresh the page to reflect changes consistently
            try { setTimeout(() => window.location.reload(), 300); } catch (_) {}
          }
        });
      });
      
      console.log(`Added bookmark mode to ${chatItems.length} chat items`);
    } catch (error) {
      console.error('Error adding bookmark mode to chats:', error);
    }
  };

  // Reorder all bookmarked chats to the top while preserving their current on-screen order
  const reorderBookmarkedChatsGroup = () => {
    const bookmarkedIds = JSON.parse(localStorage.getItem('bookmarkedChats') || '[]');
    if (!Array.isArray(bookmarkedIds) || bookmarkedIds.length === 0) return;

    const idSet = new Set(bookmarkedIds);

    // Collect all sidebar chat items in current DOM order
    const chatItems = Array.from(document.querySelectorAll('nav[data-testid="chat-history"] a, nav[data-testid="chat-history"] [role="button"], nav[data-testid="chat-history"] .conversation-item, nav[data-testid="chat-history"] [data-testid="conversation-turn-2"], nav[data-testid="chat-history"] [data-testid="conversation-item"], nav[data-testid="chat-history"] .conversation-turn-2, nav[data-testid="chat-history"] a[href*="/c/"], nav a[href*="/c/"], aside a[href*="/c/"], [data-testid="chat-history"] a, [data-testid="chat-history"] [role="button"]'));

    // Determine current DOM-ordered list of bookmarked elements
    const getId = (el) => {
      const id = el.getAttribute && (el.getAttribute('href') || el.getAttribute('data-testid'));
      if (id) return id;
      const a = el.querySelector && el.querySelector('a[href*="/c/"]');
      if (a) return a.getAttribute('href');
      return (el.textContent || '').trim();
    };
    const bookmarkedEls = chatItems.map(el => el.closest('li, .conversation-item, [data-testid="conversation-item"], [data-testid="conversation-turn-2"]') || el)
                                   .filter((el) => idSet.has(getId(el)));
    if (bookmarkedEls.length === 0) return;

    // For each parent container, check if its leading children already match bookmarkedEls (in order)
    // If yes, do nothing; else, move elements to top WHILE PRESERVING their current relative order
    const parents = new Set(bookmarkedEls.map(el => el.parentElement).filter(Boolean));
    parents.forEach((parent) => {
      const group = bookmarkedEls.filter(el => el.parentElement === parent);
      if (group.length === 0) return;

      // Early exit if already at top in same order
      let alreadyAtTop = true;
      for (let i = 0; i < group.length; i += 1) {
        if (parent.children[i] !== group[i]) { alreadyAtTop = false; break; }
      }
      if (alreadyAtTop) return;

      // Insert in reverse so the final order at the top matches current DOM order
      for (let i = group.length - 1; i >= 0; i -= 1) {
        const el = group[i];
        el.classList.add('bookmarked');
        if (parent.firstChild !== el) parent.insertBefore(el, parent.firstChild);
      }
    });
  };

  // Function to remove bookmark mode from ChatGPT sidebar chats
  const removePinButtonsFromChats = () => {
    try {
      // Remove bookmark mode from all chats
      const chatItems = document.querySelectorAll('.bookmark-mode-enabled');
      chatItems.forEach(chatItem => {
        chatItem.classList.remove('bookmark-mode-enabled');
        chatItem.style.border = '';
        chatItem.style.borderRadius = '';
        chatItem.style.cursor = '';
      });
      console.log(`Removed bookmark mode from ${chatItems.length} chat items`);
    } catch (error) {
      console.error('Error removing bookmark mode from chats:', error);
    }
  };

  // Create Profile button at the bottom of contracted sidebar
  const profileButton = document.createElement('div');
  profileButton.id = 'profile-button';
  profileButton.style.cssText = `
    width: 48px;
    height: 48px;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  `;

  // Create profile icon for the button
  const profileIcon = document.createElement('div');
  profileIcon.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; color: #fff;">
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  `;
  profileIcon.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `;

  profileButton.appendChild(profileIcon);
  
  // Add top buttons container and profile button to contracted sidebar
  contractedSidebar.appendChild(topButtonsContainer);
  contractedSidebar.appendChild(profileButton);

  // Add hover effects for profile button
  profileButton.addEventListener('mouseenter', () => {
    profileButton.style.background = '#2a2a2a';
    profileIcon.style.transform = 'scale(1.1)';
  });

  profileButton.addEventListener('mouseleave', () => {
    profileButton.style.background = '#1a1a1a';
    profileIcon.style.transform = 'scale(1)';
  });

  // Create profile popover (dark, compact)
  function createProfilePopup() {
    // Remove existing
    document.getElementById('zeroeka-profile-backdrop')?.remove();
    document.getElementById('zeroeka-profile-popover')?.remove();

    // Backdrop (click outside to close)
    const backdrop = document.createElement('div');
    backdrop.id = 'zeroeka-profile-backdrop';
    backdrop.style.cssText = `
      position: fixed; inset: 0; background: transparent; z-index: 2147483646;
    `;
    document.body.appendChild(backdrop);

    // Popover container
    const pop = document.createElement('div');
    pop.id = 'zeroeka-profile-popover';
    pop.style.cssText = `
      position: fixed;
      right: 80px; /* next to contracted sidebar */
      bottom: 90px; /* near bottom */
      width: 280px;
      max-width: 90vw;
      background: #1a1a1a;
      color: #ffffff;
      border: 1px solid #333;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      padding: 12px;
      z-index: 2147483647;
      font-family: ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica, Arial, sans-serif;
    `;

    // Header (email only)
    const header = document.createElement('div');
    header.style.cssText = `margin-bottom: 10px;`;
    const emailEl = document.createElement('div');
    emailEl.style.cssText = 'font-weight: 600; font-size: 14px; color: #ffffff;';
    header.appendChild(emailEl);

    // Divider
    const hr = document.createElement('div');
    hr.style.cssText = 'height: 1px; background: #2f2f2f; margin: 8px 0;';

    // Row factory
    const makeRow = (label, iconSvg) => {
      const row = document.createElement('div');
      row.style.cssText = `
        display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 8px; cursor: pointer;
        color: #e5e5e5;
      `;
      row.innerHTML = `${iconSvg}<span style="font-size: 14px;">${label}</span>`;
      row.addEventListener('mouseenter', ()=>{ row.style.background = '#2a2a2a'; });
      row.addEventListener('mouseleave', ()=>{ row.style.background = 'transparent'; });
      return row;
    };

    const settingsIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bbb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.6 15a1.65 1.65 0 0 0-1.51-1H2a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 3.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 3.6a1.65 1.65 0 0 0 1-1.51V2a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15 3.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 20.4 8c.36.47.57 1.05.57 1.65S20.76 12 20.4 12.35 19.4 13.53 19.4 15z"/></svg>';
    const helpIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bbb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 2-3 4"/><line x1="12" y1="17" x2="12" y2="17"/></svg>';

    const settingsRow = makeRow('Settings', settingsIcon);
    const helpRow = makeRow('Help', helpIcon);

    // Simple actions (non-destructive placeholders)
    settingsRow.addEventListener('click', ()=>{ pop.remove(); backdrop.remove(); });
    helpRow.addEventListener('click', ()=>{ pop.remove(); backdrop.remove(); });

    pop.appendChild(header);
    pop.appendChild(hr);
    pop.appendChild(settingsRow);
    pop.appendChild(helpRow);

    document.body.appendChild(pop);

    // Auto-hide after 2s if not hovered
    let hover = false;
    let timer = null;
    function clearAuto(){ if (timer) { clearTimeout(timer); timer = null; } }
    function schedule(){ clearAuto(); timer = setTimeout(()=>{ if (!hover) closeAll(); }, 2000); }
    pop.addEventListener('mouseenter', ()=>{ hover = true; clearAuto(); });
    pop.addEventListener('mouseleave', ()=>{ hover = false; schedule(); });
    schedule();

    // Load user info
    chrome.storage.local.get(['firebaseUser'], ({ firebaseUser }) => {
      const email = firebaseUser?.email || 'Not signed in';
      emailEl.textContent = email;
    });

    // Close on outside click / ESC
    const closeAll = ()=>{ clearAuto(); pop.remove(); backdrop.remove(); };
    backdrop.addEventListener('click', closeAll);
    document.addEventListener('keydown', function onKey(e){ if(e.key==='Escape'){ closeAll(); document.removeEventListener('keydown', onKey); } });
  }

  // Add click functionality for profile button
  profileButton.addEventListener('click', () => {
    console.log('Profile button clicked');
    createProfilePopup();
  });

  // Search functionality - moved to global scope
  window.createSearchPopup = function() {
    console.log('createSearchPopup called');
    
    // Remove existing search popup if any
    const existingPopup = document.getElementById('search-popup');
    if (existingPopup) {
      existingPopup.remove();
    }

    // Create search popup container
    const searchPopup = document.createElement('div');
    searchPopup.id = 'search-popup';
    searchPopup.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 500px;
      max-width: 90vw;
      background: #1a1a1a;
      border: 1px solid #333333;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
      z-index: 1000000;
      padding: 16px 24px 24px 24px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    // Create search input (textarea for multi-line support)
    const searchInput = document.createElement('textarea');
    searchInput.placeholder = 'Search in conversation...';
    searchInput.style.cssText = `
      width: 100%;
      padding: 14px 18px;
      border: 1px solid #444444;
      border-radius: 8px;
      background: #2a2a2a;
      color: #ffffff;
      font-size: 16px;
      outline: none;
      margin-top: 20px;
      margin-bottom: 20px;
      transition: all 0.3s ease;
      resize: vertical;
      min-height: 60px;
      max-height: 200px;
      font-family: inherit;
      line-height: 1.4;
      white-space: pre-wrap;
      word-wrap: break-word;
    `;

    // Create search button container for centering
    const searchButtonContainer = document.createElement('div');
    searchButtonContainer.style.cssText = `
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    `;

    // Create search button
    const searchBtn = document.createElement('button');
    searchBtn.textContent = 'Search';
    searchBtn.style.cssText = `
      width: 120px;
      padding: 10px 20px;
      background: #2a2a2a;
      color: #ffffff;
      border: 1px solid #444444;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    `;

    // Create results container
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'search-results';
    resultsContainer.style.cssText = `
      max-height: 300px;
      overflow-y: auto;
      border-top: 1px solid #444444;
      padding-top: 20px;
    `;

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      background: none;
      border: none;
      color: #888888;
      font-size: 16px;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: all 0.3s ease;
      font-weight: bold;
      z-index: 1000001;
    `;

    // Add elements to popup
    searchPopup.appendChild(closeBtn);
    searchPopup.appendChild(searchInput);
    searchButtonContainer.appendChild(searchBtn);
    searchPopup.appendChild(searchButtonContainer);
    searchPopup.appendChild(resultsContainer);
    document.body.appendChild(searchPopup);

    // Focus on input
    searchInput.focus();

    // Close popup functionality
    closeBtn.addEventListener('click', () => {
      searchPopup.remove();
    });

    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.color = '#ffffff';
      closeBtn.style.background = '#444444';
      closeBtn.style.transform = 'scale(1.1)';
    });

    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.color = '#888888';
      closeBtn.style.background = 'none';
      closeBtn.style.transform = 'scale(1)';
    });

          // Function to highlight all matching words in text
      function highlightAllWordsInText(text, query) {
        const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
        let highlightedText = text;
        
        // Handle multi-line queries by checking each line separately
        const queryLines = query.split('\n').filter(line => line.trim().length > 0);
        const lowerText = text.toLowerCase();
        
        // Check for exact multi-line phrase match first
        for (const line of queryLines) {
          const lowerLine = line.toLowerCase().trim();
          if (lowerLine.length > 0 && lowerText.includes(lowerLine)) {
            const regex = new RegExp(`(${lowerLine.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<span style="background: #3bb910; color: #ffffff; padding: 2px 4px; border-radius: 3px; font-weight: bold;">$1</span>');
          }
        }
        
        // Check for exact full query match
        const lowerQuery = query.toLowerCase();
        if (lowerText.includes(lowerQuery)) {
          const regex = new RegExp(`(${lowerQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
          highlightedText = highlightedText.replace(regex, '<span style="background: #3bb910; color: #ffffff; padding: 2px 4px; border-radius: 3px; font-weight: bold;">$1</span>');
        }
        
        // Check for individual word matches
        for (const word of queryWords) {
          if (word.length < 2) continue; // Skip very short words
          
          const wordRegex = new RegExp(`\\b(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
          if (lowerText.includes(word)) {
            // Only highlight if not already highlighted as part of exact match
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = highlightedText;
            const existingHighlights = tempDiv.querySelectorAll('span[style*="background: #3bb910"]');
            let shouldHighlight = true;
            
            // Check if this word is already highlighted as part of exact match
            for (const highlight of existingHighlights) {
              if (highlight.textContent.toLowerCase().includes(word)) {
                shouldHighlight = false;
                break;
              }
            }
            
            if (shouldHighlight) {
              highlightedText = highlightedText.replace(wordRegex, '<span style="background: #ffa500; color: #ffffff; padding: 2px 4px; border-radius: 3px; font-weight: bold;">$1</span>');
            }
          }
        }
        
        return highlightedText;
      }

      // Search functionality
      function performSearch() {
        const query = searchInput.value.trim();
        if (!query) return;

        console.log('Performing search for:', query);

        // Clear previous results
        resultsContainer.innerHTML = '';

        // Search in conversation content
        const messages = document.querySelectorAll('[data-message-id]');
        console.log('Found messages:', messages.length);
        const results = [];

      // Enhanced search with partial matching and priority scoring
      const searchInContent = (content, query, messageId, author, index, element) => {
        const lowerContent = content.toLowerCase();
        const lowerQuery = query.toLowerCase();
        
        // Handle multi-line queries by preserving line breaks and treating each line as a potential match
        const queryLines = query.split('\n').filter(line => line.trim().length > 0);
        const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
        
        // Find all matches with priority scoring
        const matches = [];
        let searchIndex = 0;
        
        while (searchIndex < lowerContent.length) {
          // Try to find any word from the query
          let bestMatch = null;
          let bestMatchLength = 0;
          let bestMatchIndex = -1;
          let bestMatchScore = 0;
          
          // Check for exact multi-line query match first (highest priority)
          let exactMatchIndex = -1;
          let exactMatchLine = '';
          
          // Try to find exact match for each line of the query
          for (const line of queryLines) {
            const lowerLine = line.toLowerCase().trim();
            if (lowerLine.length > 0) {
              const lineIndex = lowerContent.indexOf(lowerLine, searchIndex);
              if (lineIndex !== -1) {
                exactMatchIndex = lineIndex;
                exactMatchLine = line;
                break;
              }
            }
          }
          
          // If no multi-line match, try exact full query match
          if (exactMatchIndex === -1) {
            exactMatchIndex = lowerContent.indexOf(lowerQuery, searchIndex);
            if (exactMatchIndex !== -1) {
              exactMatchLine = query;
            }
          }
          
          if (exactMatchIndex !== -1) {
            bestMatch = exactMatchLine;
            bestMatchLength = exactMatchLine.length;
            bestMatchIndex = exactMatchIndex;
            bestMatchScore = queryWords.length * 10; // Full match gets highest score
          }
          
          // If no exact match, try individual words
          if (!bestMatch) {
            for (const word of queryWords) {
              if (word.length < 2) continue; // Skip very short words
              
              const wordIndex = lowerContent.indexOf(word, searchIndex);
              if (wordIndex !== -1) {
                // Check if this is a better match (longer word)
                if (word.length > bestMatchLength) {
                  bestMatch = word;
                  bestMatchLength = word.length;
                  bestMatchIndex = wordIndex;
                  bestMatchScore = 1; // Single word match
                }
              }
            }
          }
          
          if (bestMatch && bestMatchIndex !== -1) {
            // Extract more context around the match for better display
            const startIndex = Math.max(0, bestMatchIndex - 40);
            const endIndex = Math.min(content.length, bestMatchIndex + bestMatch.length + 40);
            
            const beforeMatch = content.substring(startIndex, bestMatchIndex).replace(/\s+/g, ' ').trim();
            const match = content.substring(bestMatchIndex, bestMatchIndex + bestMatch.length);
            const afterMatch = content.substring(bestMatchIndex + bestMatch.length, endIndex).replace(/\s+/g, ' ').trim();
            
            // Calculate how many query words are found in this context
            const contextText = (beforeMatch + match + afterMatch).toLowerCase();
            let wordMatchCount = 0;
            for (const word of queryWords) {
              if (contextText.includes(word)) {
                wordMatchCount++;
              }
            }
            
            // Calculate final score based on word matches and match type
            const finalScore = bestMatchScore + (wordMatchCount * 5) + (bestMatch.length * 0.1);
            
            matches.push({
              messageId: messageId,
              author: author,
              content: content,
              beforeMatch: beforeMatch,
              match: match,
              afterMatch: afterMatch,
              fullMatch: bestMatch,
              index: index,
              element: element,
              matchIndex: bestMatchIndex,
              matchLength: bestMatch.length,
              matchScore: finalScore,
              wordMatchCount: wordMatchCount,
              totalQueryWords: queryWords.length
            });
            
            searchIndex = bestMatchIndex + bestMatch.length;
          } else {
            break;
          }
        }
        
        return matches;
      };
      
      // If no messages found, try alternative selectors
      if (messages.length === 0) {
        console.log('No messages with data-message-id found, trying alternative selectors');
        const alternativeMessages = document.querySelectorAll('.markdown, .prose, [role="article"], .message, .conversation-item, [role="presentation"] > div');
        console.log('Alternative messages found:', alternativeMessages.length);
        
        alternativeMessages.forEach((message, index) => {
          const content = message.textContent || '';
          const messageMatches = searchInContent(content, query, `alt-${index}`, 'unknown', index, message);
          results.push(...messageMatches);
        });
      } else {
        messages.forEach((message, index) => {
          const content = message.textContent || '';
          const messageId = message.getAttribute('data-message-id');
          const author = message.getAttribute('data-message-author-role') || 'unknown';
          const messageMatches = searchInContent(content, query, messageId, author, index, message);
          results.push(...messageMatches);
        });
      }

      console.log('Search results:', results.length);

      // Group results by message to avoid duplicates
      const groupedResults = new Map();
      
      results.forEach(result => {
        const key = `${result.messageId}-${result.author}-${result.index}`;
        
        if (!groupedResults.has(key)) {
          // First match for this message
          groupedResults.set(key, {
            ...result,
            allMatches: [result.match],
            totalMatches: 1
          });
        } else {
          // Additional match for this message
          const existing = groupedResults.get(key);
          existing.allMatches.push(result.match);
          existing.totalMatches++;
          // Keep the highest score
          if (result.matchScore > existing.matchScore) {
            existing.matchScore = result.matchScore;
            existing.wordMatchCount = result.wordMatchCount;
          }
        }
      });
      
      // Convert grouped results back to array and sort by priority
      const deduplicatedResults = Array.from(groupedResults.values());
      deduplicatedResults.sort((a, b) => {
        // First priority: Number of matching words (descending)
        if (a.wordMatchCount !== b.wordMatchCount) {
          return b.wordMatchCount - a.wordMatchCount;
        }
        
        // Second priority: Match score (descending)
        if (a.matchScore !== b.matchScore) {
          return b.matchScore - a.matchScore;
        }
        
        // Third priority: Total matches in message (descending)
        if (a.totalMatches !== b.totalMatches) {
          return b.totalMatches - a.totalMatches;
        }
        
        // Fourth priority: Message index (ascending - earlier messages first)
        return a.index - b.index;
      });

      // Display results
      if (deduplicatedResults.length === 0) {
        resultsContainer.innerHTML = '<div style="color: #888888; text-align: center; padding: 24px; font-size: 16px; font-weight: 500;">No matches found</div>';
        return;
      }

      deduplicatedResults.forEach((result, resultIndex) => {
        const resultItem = document.createElement('div');
        resultItem.style.cssText = `
          padding: 12px 14px;
          border: 1px solid #444444;
          border-radius: 6px;
          margin-bottom: 10px;
          background: #2a2a2a;
          cursor: pointer;
          transition: all 0.3s ease;
        `;

        const authorLabel = result.author === 'user' ? 'User' : 'Assistant';
        const messageNumber = result.index + 1;

        // Create priority indicator
        const priorityColor = result.wordMatchCount === result.totalQueryWords ? '#3bb910' : 
                             result.wordMatchCount >= result.totalQueryWords * 0.7 ? '#ffa500' : '#ff6b6b';
        const priorityText = result.wordMatchCount === result.totalQueryWords ? 'Perfect Match' :
                           result.wordMatchCount >= result.totalQueryWords * 0.7 ? 'Good Match' : 'Partial Match';
        
        // Show concise match info
        const matchInfo = result.totalMatches > 1 ? 
          ` (${result.totalMatches} matches)` : 
          '';
        
        resultItem.innerHTML = `
          <div style="font-weight: 600; color: #3bb910; margin-bottom: 4px; font-size: 13px;">
            ${authorLabel} ${messageNumber}${matchInfo}
          </div>
          <div style="color: #cccccc; font-size: 13px; line-height: 1.4; white-space: pre-wrap; word-wrap: break-word; max-height: 80px; overflow: hidden;">
            ${result.beforeMatch ? '...' + result.beforeMatch : ''}${highlightAllWordsInText(result.match, query)}${result.afterMatch ? result.afterMatch + '...' : ''}
          </div>
        `;

        // Add hover effect
        resultItem.addEventListener('mouseenter', () => {
          resultItem.style.background = '#3a3a3a';
          resultItem.style.borderColor = '#3bb910';
          resultItem.style.transform = 'scale(1.01)';
        });

        resultItem.addEventListener('mouseleave', () => {
          resultItem.style.background = '#2a2a2a';
          resultItem.style.borderColor = '#444444';
          resultItem.style.transform = 'scale(1)';
        });

                // Add click functionality to navigate to message
        resultItem.addEventListener('click', () => {
          console.log('Navigating to message:', result.messageId);
          
          // Try multiple navigation strategies
          let navigationSuccess = false;
          
          // Strategy 1: Use the existing navigateToMessage function
          if (typeof navigateToMessage === 'function') {
            console.log('Attempting navigation with navigateToMessage function');
            navigationSuccess = navigateToMessage(result.messageId);
            console.log('Navigation result:', navigationSuccess);
          } else {
            console.warn('navigateToMessage function not available');
          }
          
          // Strategy 2: Direct DOM navigation if first strategy failed
          if (!navigationSuccess) {
            console.log('Trying direct DOM navigation');
            
            // First, try to use the stored element if available
            let targetMessage = result.element;
            
            // If no stored element, try to find the message element directly
            if (!targetMessage) {
              targetMessage = document.querySelector(`[data-message-id="${result.messageId}"]`);
            }
            
            // If still not found, try alternative selectors
            if (!targetMessage) {
              console.log('Message not found with data-message-id, trying alternative selectors');
              
              // Try to find by content similarity
              const allMessages = document.querySelectorAll('[data-message-id], .markdown, .prose, [role="article"], .message, .conversation-item, [role="presentation"] > div');
              let bestMatch = null;
              let bestScore = 0;
              
              allMessages.forEach((msg, index) => {
                const content = msg.textContent || '';
                const resultContent = result.content || '';
                
                // Calculate similarity score
                const commonWords = resultContent.toLowerCase().split(' ').filter(word => 
                  content.toLowerCase().includes(word)
                ).length;
                
                if (commonWords > bestScore) {
                  bestScore = commonWords;
                  bestMatch = msg;
                }
              });
              
              if (bestMatch && bestScore > 0) {
                targetMessage = bestMatch;
                console.log('Found best match with score:', bestScore);
              }
            }
            
            // Navigate to the found element
            if (targetMessage) {
              console.log('Scrolling to target message');
              
              // Get the current scroll position and viewport dimensions
              const viewportHeight = window.innerHeight;
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              
              // First, scroll to the element with more precise positioning
              targetMessage.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
              });
              
              // Add a longer delay to ensure the initial scroll completes
              setTimeout(() => {
                // Get updated position after initial scroll
                const rect = targetMessage.getBoundingClientRect();
                const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Try to find the exact position of the matched text within the message
                const findExactMatchPosition = () => {
                  const messageText = targetMessage.textContent || '';
                  const lowerMessageText = messageText.toLowerCase();
                  
                  // Try to use the actual matched term from the search result first
                  const actualMatch = result.match || '';
                  const lowerActualMatch = actualMatch.toLowerCase();
                  
                  let matchIndex = -1;
                  
                  // First try to find the actual matched term
                  if (actualMatch && actualMatch.length > 0) {
                    matchIndex = lowerMessageText.indexOf(lowerActualMatch);
                    console.log('Found exact match at index:', matchIndex, 'for:', actualMatch);
                  }
                  
                  // If not found, try the full search query
                  if (matchIndex === -1) {
                    const searchQuery = query.toLowerCase();
                    matchIndex = lowerMessageText.indexOf(searchQuery);
                    console.log('Found search query at index:', matchIndex, 'for:', searchQuery);
                  }
                  
                  // If still not found, try individual words
                  if (matchIndex === -1) {
                    const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
                    for (const word of queryWords) {
                      if (word.length >= 2) {
                        const wordIndex = lowerMessageText.indexOf(word);
                        if (wordIndex !== -1) {
                          matchIndex = wordIndex;
                          console.log('Found word at index:', matchIndex, 'for:', word);
                          break;
                        }
                      }
                    }
                  }
                  
                                     if (matchIndex !== -1) {
                     // Calculate the relative position of the match within the message
                     const messageHeight = rect.height;
                     const matchRelativePosition = matchIndex / messageText.length;
                     const matchOffset = messageHeight * matchRelativePosition;
                     
                     // Get viewport height for centering calculation
                     const viewportHeight = window.innerHeight;
                     
                     // Position the match at the center of the viewport
                     const targetPosition = rect.top + currentScrollTop + matchOffset - (viewportHeight / 2);
                     
                     console.log('Calculated center position:', targetPosition, 'matchOffset:', matchOffset, 'matchIndex:', matchIndex);
                     return targetPosition;
                   }
                   
                   // Fallback: position the message at the center of the viewport
                   console.log('Using fallback centering');
                   const viewportHeight = window.innerHeight;
                   return rect.top + currentScrollTop - (viewportHeight / 2);
                };
                
                const precisePosition = findExactMatchPosition();
                
                // Fine-tune the scroll position to position at the top
                const finalPosition = Math.max(0, precisePosition);
                
                console.log('Scrolling to final position:', finalPosition);
                
                // Smooth scroll to position the matched content at the top
                window.scrollTo({
                  top: finalPosition,
                  behavior: 'smooth'
                });
                
                                 // Add a final adjustment to ensure the content is centered
                 setTimeout(() => {
                   // Get updated position after the scroll
                   const updatedRect = targetMessage.getBoundingClientRect();
                   const updatedScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                   const viewportHeight = window.innerHeight;
                   
                   // Position the message at the center of the viewport
                   const messageCenterPosition = updatedRect.top + updatedScrollTop - (viewportHeight / 2);
                   
                   console.log('Final adjustment to center position:', messageCenterPosition);
                   
                   window.scrollTo({
                     top: Math.max(0, messageCenterPosition),
                     behavior: 'smooth'
                   });
                 }, 500); // Wait for initial scroll to complete
                
              }, 500); // Increased delay for better timing
              
              // No highlighting - just center the matched content
              console.log('Navigation completed - matched content centered without highlighting');
              
              navigationSuccess = true;
              console.log('Direct navigation successful with term highlighting');
            } else {
              console.error('Could not find target message for navigation');
            }
          }
          
          // Strategy 3: Fallback - scroll to approximate position
          if (!navigationSuccess) {
            console.log('Trying fallback navigation');
            
            // Try to scroll to a position based on message index
            const allMessages = document.querySelectorAll('[data-message-id], .markdown, .prose, [role="article"], .message');
            if (allMessages.length > 0 && result.index < allMessages.length) {
              const approximateMessage = allMessages[result.index];
              if (approximateMessage) {
                approximateMessage.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'center' 
                });
                console.log('Fallback navigation completed');
              }
            }
          }
          
          // Close popup
          searchPopup.remove();
        });

        resultsContainer.appendChild(resultItem);
      });
    }

    // Add hover effects for search button
    searchBtn.addEventListener('mouseenter', () => {
      searchBtn.style.background = '#3a3a3a';
      searchBtn.style.borderColor = '#666666';
      searchBtn.style.transform = 'scale(1.05)';
    });

    searchBtn.addEventListener('mouseleave', () => {
      searchBtn.style.background = '#2a2a2a';
      searchBtn.style.borderColor = '#444444';
      searchBtn.style.transform = 'scale(1)';
    });

    // Add event listeners
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });

    // Close popup when clicking outside
    document.addEventListener('click', function closeOnOutsideClick(e) {
      if (!searchPopup.contains(e.target)) {
        searchPopup.remove();
        document.removeEventListener('click', closeOnOutsideClick);
      }
    });

    // Close popup on Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
      if (e.key === 'Escape') {
        searchPopup.remove();
        document.removeEventListener('keydown', closeOnEscape);
      }
    });
  };

  // Clicking ZeroEka icon: open ZeroEka site only (no sidebar toggle)
  zeroekaButton.addEventListener('click', (e) => {
    try { e.stopImmediatePropagation(); } catch (_) {}
    try { window.open('https://www.zeroeka.com/', '_blank'); } catch (_) {}
  });

  // Add to page
  document.body.appendChild(contractedSidebar);

  // Ensure ChatGPT tree shows user -> assistant -> subnodes structure
  const isOnChatGPT = (location.hostname || '').includes('chatgpt.com');
  const enforceAssistantChildStructure = () => {
    if (!isOnChatGPT) return;
    try {
      const ul = document.querySelector('.catalogeu-navigation-plugin-floatbar .panel ul');
      if (!ul) return;
      const userLis = Array.from(ul.children || []).filter(el => el && el.tagName === 'LI');
      userLis.forEach((userLi) => {
        try {
          // The original builder stores the live assistant article on __reply
          const answerArticle = userLi.__reply || null;
          if (!answerArticle || !answerArticle.querySelector) return;

          // Ensure a <ul> exists under the user li
          let userUl = userLi.querySelector(':scope > ul');
          if (!userUl) {
            userUl = document.createElement('ul');
            userLi.appendChild(userUl);
            userLi.classList.remove('leaf');
          }

          // Find or create the assistant reply li under the user li
          let replyLi = Array.from(userUl.children || []).find(li => li && li.__ref && li.__ref.deref && li.__ref.deref() === answerArticle);
          if (!replyLi) {
            replyLi = document.createElement('li');
            replyLi.classList.add('leaf');
            try { replyLi.__ref = new WeakRef(answerArticle); } catch (_) {}
            replyLi.setAttribute('data-role', 'assistant-reply');
            const md = answerArticle.querySelector('.markdown');
            const preview = ((md ? md.textContent : answerArticle.textContent) || '').trim().replace(/\s+/g, ' ').slice(0, 220);
            replyLi.setAttribute('title', preview);
            const iEl = document.createElement('i');
            const labelDiv = document.createElement('div');
            labelDiv.innerHTML = preview;
            replyLi.appendChild(iEl);
            replyLi.appendChild(labelDiv);
            // Insert reply node as first child
            userUl.insertBefore(replyLi, userUl.firstChild);
          }

          // Ensure all existing subnodes become children of reply li (maintain order)
          let replyUl = replyLi.querySelector(':scope > ul');
          if (!replyUl) {
            replyUl = document.createElement('ul');
            replyLi.appendChild(replyUl);
            replyLi.classList.remove('leaf');
          }
          const toMove = Array.from(userUl.children || []).filter(li => li !== replyLi);
          if (toMove.length) {
            toMove.forEach(li => replyUl.appendChild(li));
          }
        } catch (_) {}
      });
    } catch (err) {
      console.warn('assistant-structure enforcement failed', err);
    }
  };

  const startAssistantTreeObserver = () => {
    if (!isOnChatGPT) return;
    try {
      const ul = document.querySelector('.catalogeu-navigation-plugin-floatbar .panel ul');
      if (!ul) return;
      if (window.__assistantTreeMO) return;
      const mo = new MutationObserver(() => {
        enforceAssistantChildStructure();
      });
      mo.observe(ul, { childList: true, subtree: true });
      window.__assistantTreeMO = mo;
      enforceAssistantChildStructure();
    } catch (_) {}
  };

  // Try to attach observer a bit later (after panel/UL exists)
  setTimeout(startAssistantTreeObserver, 800);

  // Position the contracted sidebar when sidebar is open/closed
  const updateSidebarPosition = () => {
    const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
    const panel = floatbar ? floatbar.querySelector('.panel') : null;
    const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
    const root = document.documentElement;
    const nextRoot = document.querySelector('#__next');
    const nextInner = document.querySelector('#__next > div');
    
    const isPanelVisible = (() => {
      try {
        if (!panel) return false;
        const disp = (panel.style && panel.style.display) || '';
        const comp = (typeof getComputedStyle === 'function') ? getComputedStyle(panel).display : disp;
        return comp === 'flex' || (floatbar && floatbar.classList && floatbar.classList.contains('show-panel'));
      } catch (_) { return false; }
    })();
    
    console.log('updateSidebarPosition called:', {
      hasFloatbar: !!floatbar,
      hasPanel: !!panel,
      panelDisplay: panel ? panel.style.display : 'no panel',
      hasShowPanelClass: floatbar ? floatbar.classList.contains('show-panel') : false,
      isPanelVisible: isPanelVisible
    });
    
    // Helpers to reserve/clear right space so content never gets covered
    const clearReserve = () => {
      // remove both margin-right and padding-right from likely wrappers
      ['marginRight', 'paddingRight'].forEach((prop) => {
        try { main && (main.style[prop] = ''); } catch(_){}
        try { document.body && (document.body.style[prop] = ''); } catch(_){}
        // keep nextInner untouched
        try { nextRoot && (nextRoot.style[prop] = ''); } catch(_){}
        try { root && (root.style[prop] = ''); } catch(_){}
      });
    };
    const applyReserve = (px) => {
      // Prefer padding-right so layout reflows without clipping scrollbars
      const w = `${px}px`;
      clearReserve();
      // Apply only to the outer wrappers to avoid cumulative inner padding
      try { root && root.style.setProperty('padding-right', w, 'important'); } catch(_){}
      try { document.body && document.body.style.setProperty('padding-right', w, 'important'); } catch(_){}
      try { nextRoot && nextRoot.style.setProperty('padding-right', w, 'important'); } catch(_){}
      // Do not apply to nextInner and main to prevent duplicate inner gaps
    };

    if (isPanelVisible) {
      // Expanded sidebar is visible - hide contracted sidebar and reserve space for panel
      contractedSidebar.style.display = 'none';
      const prect = panel.getBoundingClientRect();
      let panelWidth = prect && prect.width ? Math.ceil(prect.width) : 600;
      // Ensure we do not overshoot, but do not shrink expanded panel reservation
      panelWidth = Math.max(300, panelWidth);
      applyReserve(panelWidth);
      console.log('Expanded panel visible; reserving space:', panelWidth);
      // Ensure ChatGPT tree nesting when panel is open
      setTimeout(() => { try { startAssistantTreeObserver(); } catch(_) {} }, 150);
    } else {
      // Expanded sidebar is hidden - show contracted sidebar and reduce main width to fit it
      contractedSidebar.style.display = 'flex';
      contractedSidebar.style.right = '0';
      contractedSidebar.style.visibility = 'visible';
      contractedSidebar.style.pointerEvents = 'auto';
      contractedSidebar.style.opacity = '1';

      const rect = contractedSidebar.getBoundingClientRect();
      let contractedWidth = rect && rect.width ? Math.ceil(rect.width) : (contractedSidebar.offsetWidth || 80);
      applyReserve(contractedWidth);
      console.log('Showing contracted sidebar and reserving exact space:', contractedWidth);
    }
  };

  // Update position initially and on window resize
  updateSidebarPosition();
  window.addEventListener('resize', updateSidebarPosition);

  // Observe sidebar state changes
  const observer = new MutationObserver(updateSidebarPosition);
  const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
  if (floatbar) {
    observer.observe(floatbar, { attributes: true, attributeFilter: ['class'] });
  }
  
  // Also observe the panel's display property changes
  const panelObserver = new MutationObserver(updateSidebarPosition);
  const panel = floatbar ? floatbar.querySelector('.panel') : null;
  if (panel) {
    panelObserver.observe(panel, { attributes: true, attributeFilter: ['style'] });
  }
  
  // Set up a periodic check to ensure consistency
  setInterval(updateSidebarPosition, 1000);
  
  // Add a global click handler to detect when the panel might be closed
  document.addEventListener('click', (e) => {
    // If clicked outside the panel and panel is visible, close it
    const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
    const panel = floatbar ? floatbar.querySelector('.panel') : null;
    
    if (panel && panel.style.display === 'flex' && !panel.contains(e.target) && !contractedSidebar.contains(e.target)) {
      // Panel is visible but clicked outside - close it
      panel.style.display = 'none';
      floatbar.classList.remove('show-panel');
      updateSidebarPosition();
    }
  });
  

  

  
  // Replace existing close button with fast custom one
  const replaceExistingCloseButton = () => {
    const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
    const panel = floatbar ? floatbar.querySelector('.panel') : null;
    
    if (panel) {
      // Find existing close button in header
      const existingCloseBtn = panel.querySelector('.header .close') || panel.querySelector('#closeBtn');
      
      if (existingCloseBtn) {
        // Replace the existing close button functionality
        existingCloseBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          // Fast close without animation delays
          panel.style.display = 'none';
          floatbar.classList.remove('show-panel');
          const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
          if (main) {
            main.style.marginRight = '';
            main.style.width = '';
          }
          document.body.style.marginRight = '';
          contractedSidebar.style.display = 'flex';
          contractedSidebar.style.right = '0';
        };
        
        console.log('Replaced existing close button with fast custom one');
      }
    }
  };
  
  // Replace existing close button after panel is created
  setTimeout(replaceExistingCloseButton, 1500);
  
  // Add keyboard shortcut (Escape key) to close panel
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
      const panel = floatbar ? floatbar.querySelector('.panel') : null;
      
      if (panel && panel.style.display === 'flex') {
        panel.style.display = 'none';
        floatbar.classList.remove('show-panel');
        const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
        if (main) {
          main.style.marginRight = '';
          main.style.width = '';
        }
        document.body.style.marginRight = '';
        contractedSidebar.style.display = 'flex';
        contractedSidebar.style.right = '0';
      }
    }
  });
  
  // Force update every 500ms to ensure consistency
  setInterval(() => {
    const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
    const panel = floatbar ? floatbar.querySelector('.panel') : null;
    const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
    
    const panelVisible = (() => {
      try {
        if (!panel) return false;
        const comp = getComputedStyle(panel).display;
        return comp === 'flex' || (floatbar && floatbar.classList.contains('show-panel'));
      } catch(_) { return false; }
    })();

    if (!panelVisible) {
      // Ensure contracted sidebar is visible
      contractedSidebar.style.display = 'flex';
      contractedSidebar.style.right = '0';
      contractedSidebar.style.visibility = 'visible';
      contractedSidebar.style.pointerEvents = 'auto';
      contractedSidebar.style.opacity = '1';
      // Ensure main page width is restored
      if (main) {
        main.style.marginRight = '';
        main.style.width = '';
      }
      document.body.style.marginRight = '';
    }
  }, 500);
  
  // Real-time conversation monitoring for mind map updates
  const setupRealTimeMonitoring = () => {
    let lastMessageCount = 0;
    let isMonitoring = false;
    
    const checkForNewMessages = () => {
      if (isMonitoring) return;
      isMonitoring = true;
      
      try {
        // Get current conversation messages
        const messages = document.querySelectorAll('article[data-testid^="conversation-turn-"]');
        const currentCount = messages.length;
        
        // If new messages detected, update mind map
        if (currentCount > lastMessageCount) {
          console.log(`Real-time update: ${currentCount - lastMessageCount} new messages detected`);
          lastMessageCount = currentCount;
          
          // Trigger mind map update if panel is visible
          const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
          const panel = floatbar ? floatbar.querySelector('.panel') : null;
          
          if (panel && panel.style.display === 'flex') {
            // Update the conversation tree in real-time
            updateConversationTree();
          }
        }
      } catch (error) {
        console.error('Real-time monitoring error:', error);
      } finally {
        isMonitoring = false;
      }
    };
    
    // Monitor for new messages every 2 seconds
    setInterval(checkForNewMessages, 2000);
    
    // Also monitor DOM changes for immediate updates
    const observer = new MutationObserver((mutations) => {
      let hasNewMessages = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const articles = node.querySelectorAll ? node.querySelectorAll('article[data-testid^="conversation-turn-"]') : [];
              if (articles.length > 0) {
                hasNewMessages = true;
              }
            }
          });
        }
      });
      
      if (hasNewMessages) {
        setTimeout(checkForNewMessages, 500); // Small delay to ensure DOM is fully updated
      }
    });
    
    // Start observing the main conversation container
    const mainContainer = document.querySelector('main') || document.body;
    if (mainContainer) {
      observer.observe(mainContainer, {
        childList: true,
        subtree: true
      });
    }
    
    console.log('Real-time conversation monitoring initialized');
  };
  
  // Enhanced conversation tree update function
  const updateConversationTree = () => {
    try {
      const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
      const panel = floatbar ? floatbar.querySelector('.panel') : null;
      
      if (panel) {
        // Get fresh conversation data
        const treeData = getConversationTreeData(true); // Force deep refresh
        
        // Update the tree display
        const ul = panel.querySelector('ul');
        if (ul && treeData && treeData.children) {
          // Clear existing content
          ul.innerHTML = '';
          
          // Rebuild tree with new data
          treeData.children.forEach(child => {
            const li = createTreeItem(child);
            ul.appendChild(li);
          });
          
          console.log('Real-time conversation tree updated');
        }
      }
    } catch (error) {
      console.error('Error updating conversation tree:', error);
    }
  };
  
  // Initialize real-time monitoring
  setupRealTimeMonitoring();
};

// Global functions for mind map functionality
const createTreeItem = (node) => {
  const li = document.createElement('li');
  li.className = 'tree-item';
  li.setAttribute('data-node-id', node.id);
  
  const content = document.createElement('div');
  content.className = 'tree-content';
  content.innerHTML = `
    <span class="tree-text">${node.text || 'Message'}</span>
    <span class="tree-author">${node.author || 'Unknown'}</span>
  `;
  
  // Add click handler for navigation
  content.addEventListener('click', () => {
    navigateToMessage(node.id);
  });
  
  li.appendChild(content);
  
  // Add children if they exist
  if (node.children && node.children.length > 0) {
    const ul = document.createElement('ul');
    node.children.forEach(child => {
      const childLi = createTreeItem(child);
      ul.appendChild(childLi);
    });
    li.appendChild(ul);
  }
  
  return li;
};

// Open jsMind window with given data
const openJsMindWindow = (mindmapData) => {
  try {
    const url = chrome.runtime.getURL('resources/mindmap.html');
    const child = window.open(url, 'jsmind_popup', 'width=1280,height=860');
    if (child) {
      const payload = mindmapData.data ? mindmapData : { format: 'node_tree', data: mindmapData };
      const post = () => { try { child.postMessage({ type: 'mindmap-data', payload }, '*'); } catch(_) {} };
      setTimeout(post, 300);
      const iv = setInterval(post, 700);
      setTimeout(() => clearInterval(iv), 4000);
      window.addEventListener('message', (ev) => {
        if (ev?.data && ev.data.type === 'mindmap-navigate' && ev.data.messageId) {
          try { navigateToMessage(ev.data.messageId); } catch(_) {}
        }
      });
    }
  } catch (e) {
    console.error('Failed to open jsMind window:', e);
  }
};

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
    <div style="display: flex; flex-direction: column; gap: 8px;">
            <span>🧠 ${mindmapData.data.topic || 'Super Mapper-Navigator Interactive Mind Map'}</span>
      <!-- Color Legend -->
      <div style="display: flex; gap: 12px; align-items: center; font-size: 12px; font-weight: normal; opacity: 0.9;">
        <span style="display: flex; align-items: center; gap: 4px;">
          <div style="width: 12px; height: 12px; background: #10a37f; border-radius: 2px; border: 1px solid #0e8a6f;"></div>
          <span>Main Topic</span>
        </span>
        <span style="display: flex; align-items: center; gap: 4px;">
          <div style="width: 12px; height: 12px; background: #e6f7ff; border-radius: 2px; border: 1px solid #91d5ff;"></div>
          <span>Prompts</span>
        </span>
        <span style="display: flex; align-items: center; gap: 4px;">
          <div style="width: 12px; height: 12px; background: #f6ffed; border-radius: 2px; border: 1px solid #b7eb8f;"></div>
          <span>Level 1</span>
        </span>
        <span style="display: flex; align-items: center; gap: 4px;">
          <div style="width: 12px; height: 12px; background: #fff0f6; border-radius: 2px; border: 1px solid #ffadd2;"></div>
          <span>Level 2</span>
        </span>
        <span style="display: flex; align-items: center; gap: 4px;">
          <div style="width: 12px; height: 12px; background: #f9f0ff; border-radius: 2px; border: 1px solid #d3adf7;"></div>
          <span>Level 3</span>
        </span>
        <span style="display: flex; align-items: center; gap: 4px;">
          <div style="width: 12px; height: 12px; background: #fffbe6; border-radius: 2px; border: 1px solid #ffe58f;"></div>
          <span>Level 4</span>
        </span>
      </div>
    </div>
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

  // Hide contracted sidebar when mind map is open
  const contractedSidebar = document.getElementById('zeroeka-contracted-sidebar');
  if (contractedSidebar) {
    contractedSidebar.style.display = 'none';
  }

  // Open dedicated jsMind page in a child window and pass data (avoids CSP issues)
  try {
    const url = chrome.runtime.getURL('resources/mindmap.html');
    const child = window.open(url, 'jsmind_popup', 'width=1280,height=860');
    if (child) {
      const payload = mindmapData.data ? mindmapData : { format: 'node_tree', data: mindmapData };
      const post = () => { try { child.postMessage({ type: 'mindmap-data', payload }, '*'); } catch(_) {} };
      setTimeout(post, 300);
      const iv = setInterval(post, 700);
      setTimeout(() => clearInterval(iv), 4000);
      // Listen for navigation requests from child
      window.addEventListener('message', (ev) => {
        if (ev?.data && ev.data.type === 'mindmap-navigate' && ev.data.messageId) {
          try { navigateToMessage(ev.data.messageId); } catch(_) {}
        }
      });
    }
  } catch (e) {
    console.error('Failed to open jsMind window:', e);
  }

  // Function to restore sidebar if it was visible before
  const restoreSidebar = () => {
    // Show contracted sidebar when mind map closes
    const contractedSidebar = document.getElementById('zeroeka-contracted-sidebar');
    if (contractedSidebar) {
      contractedSidebar.style.display = 'flex';
    }
    
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

  // Add navigation functionality (text size still applicable to jsMind container)
  addMindmapNavigation(reactFlowContainer);
};

// (Removed old in-page jsMind loader to avoid CSP issues)

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
  // Updated color scheme based on user request
  const colors = [
    '#10a37f', // Root node: Green gradient (#10a37f to #0e8a6f)
    '#e6f7ff', // Level 1: Blue gradient (#e6f7ff to #f0f9ff)
    '#f6ffed', // Level 2: Green gradient (#f6ffed to #f0fff4)
    '#fff0f6', // Level 3: Pink gradient (#fff0f6 to #fdf2f8)
    '#f9f0ff', // Level 4: Purple gradient (#f9f0ff to #faf5ff)
    '#fffbe6'  // Level 5: Yellow gradient
  ];
  return colors[level % colors.length];
};

const getNodeBorderColor = (level) => {
  // Updated border colors to match the new color scheme
  const colors = [
    '#0e8a6f', // Root node border
    '#91d5ff', // Level 1 border
    '#b7eb8f', // Level 2 border
    '#ffadd2', // Level 3 border
    '#d3adf7', // Level 4 border
    '#ffe58f'  // Level 5 border
  ];
  return colors[level % colors.length];
};

// Render jsMind mindmap
const renderJsMindMindmap = (mindmapData, container) => {
  console.log('Starting jsMind mindmap rendering...');
  if (typeof window.jsMind === 'undefined' && typeof jsMind === 'undefined') {
    console.error('jsMind not loaded');
    renderVanillaMindmap(mindmapData, container);
    return;
  }

  // Clear container
  container.innerHTML = '';
  
  // Create a container div for jsMind
  const jmContainer = document.createElement('div');
  jmContainer.id = 'jsmind_container';
  jmContainer.style.cssText = 'width: 100%; height: 100%; background: #f8f9fa;';
  container.appendChild(jmContainer);

  // Convert our structure to jsMind format (node_tree)
  const source = mindmapData.data ? mindmapData : { format: 'node_tree', data: mindmapData };

  // jsMind options
  const options = {
    container: 'jsmind_container',
    editable: false,
    theme: 'primary',
    mode: 'full',
    support_html: true,
    view: {
      engine: 'canvas',
      hmargin: 100,
      vmargin: 80,
      line_width: 2,
      line_color: '#555',
      line_style: 'curved',
      draggable: true,
      enable_device_pixel_ratio: true,
      zoom: { min: 0.5, max: 2.1, step: 0.1 },
    },
    layout: { hspace: 40, vspace: 20, pspace: 18, cousin_space: 10 },
    shortcut: { enable: true },
  };

  const JM = window.jsMind || jsMind;
  const jm = new JM(options);
  jm.show(source);

  // Enable draggable node plugin if present
  try { if (JM.draggable_node) JM.draggable_node(jm); } catch (_) {}

  // Click to navigate to message (node id should match message id when possible)
  try {
    jmContainer.addEventListener('click', (e) => {
      const nodeEl = e.target.closest('jmnode');
      if (!nodeEl) return;
      const nodeId = nodeEl.getAttribute('nodeid');
      if (nodeId) {
        // Attempt navigation on same page
        if (typeof navigateToMessage === 'function') {
          const ok = navigateToMessage(nodeId);
          if (!ok) console.warn('navigateToMessage failed for', nodeId);
        }
      }
    });
  } catch (_) {}
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
          // Respect current on-screen visibility (concise vs full)
          return extractTreeDataFromDOM(panel, true);
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
  
  function extractTreeDataFromDOM(ulElement, respectVisibility = true) {
    const treeData = [];
    if (!ulElement) return treeData;

    const isVisible = (el) => {
      if (!respectVisibility) return true;
      try {
        // Skip if inside a collapsed LI
        if (el.closest && el.closest('li.collapsed')) return false;
        // Walk up and ensure no ancestor is hidden and this element is displayed
        let n = el;
        while (n && n !== ulElement && n.nodeType === 1) {
          const cs = getComputedStyle(n);
          if (!cs || cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
          n = n.parentElement;
        }
      } catch (_) {}
      return true;
    };

    const items = Array.from(ulElement.children || []);
    console.log('Extracting from DOM with', items.length, 'items');

    items.forEach((item) => {
      if (item.tagName !== 'LI') return;
      if (!isVisible(item)) return;
      const contentDiv = item.querySelector(':scope > div');
      const childrenUl = item.querySelector(':scope > ul');
      const messageId = item.getAttribute('data-message-id');
      const nodeData = {
        id: messageId || generateId(),
        content: contentDiv ? contentDiv.textContent.trim() : 'Untitled',
        children: childrenUl ? extractTreeDataFromDOM(childrenUl, respectVisibility) : []
      };
      treeData.push(nodeData);
    });

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
  
  // Hide the floating button since we're using only the ZeroEka toggle button
  const floatbar = document.querySelector('.catalogeu-navigation-plugin-floatbar');
  if (floatbar) {
    const buttons = floatbar.querySelector('.buttons');
    if (buttons) {
      buttons.style.display = 'none';
    }
  }
  
  // Robust initialization system to ensure contracted sidebar always appears
  const ensureContractedSidebar = () => {
    try {
      const existingSidebar = document.getElementById('zeroeka-contracted-sidebar');
      if (!existingSidebar) {
        console.log('Contracted sidebar not found, creating it...');
        createZeroEkaIconButton();
      } else {
        console.log('Contracted sidebar already exists');
      }
    } catch (error) {
      console.error('Error ensuring contracted sidebar:', error);
    }
  };

  // Multiple initialization strategies for maximum reliability
  const initializeWithRetry = (maxRetries = 15, retryDelay = 1000) => {
    let retryCount = 0;
    
    const attemptInitialization = () => {
      try {
        // Check if page is ready
        if (document.readyState === 'loading') {
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Page still loading, retry ${retryCount}/${maxRetries}`);
            setTimeout(attemptInitialization, retryDelay);
          }
          return;
        }
        
        // Check if required elements exist
        const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
        if (!main) {
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Main element not found, retry ${retryCount}/${maxRetries}`);
            setTimeout(attemptInitialization, retryDelay);
          }
          return;
        }
        
        // Check if contracted sidebar exists
        const existingSidebar = document.getElementById('zeroeka-contracted-sidebar');
        if (!existingSidebar) {
          console.log('Creating contracted sidebar...');
          createZeroEkaIconButton();
        } else {
          console.log('Contracted sidebar already exists');
        }
        
        console.log('Initialization completed successfully');
      } catch (error) {
        console.error('Initialization attempt failed:', error);
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Initialization failed, retry ${retryCount}/${maxRetries}`);
          setTimeout(attemptInitialization, retryDelay);
        }
      }
    };
    
    attemptInitialization();
  };

  // Initialize on multiple events for maximum reliability
  window.addEventListener('load', initializeWithRetry);
  window.addEventListener('DOMContentLoaded', initializeWithRetry);
  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
      initializeWithRetry();
    }
  });

  // Also initialize immediately if page is already loaded
  if (document.readyState === 'complete') {
    initializeWithRetry();
  }

  // Fallback initialization with different delays
  setTimeout(ensureContractedSidebar, 1000);
  setTimeout(ensureContractedSidebar, 3000);
  setTimeout(ensureContractedSidebar, 5000);
  setTimeout(ensureContractedSidebar, 10000);

  // Continuous monitoring to ensure sidebar stays visible
  const monitorSidebar = () => {
    const sidebar = document.getElementById('zeroeka-contracted-sidebar');
    if (!sidebar) {
      console.log('Sidebar disappeared, recreating...');
      createZeroEkaIconButton();
    }
  };

  // Monitor every 5 seconds
  setInterval(monitorSidebar, 5000);

  // Add message listener for extension reloads
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'extension-reloaded') {
      console.log('Extension reloaded, ensuring sidebar exists...');
      setTimeout(ensureContractedSidebar, 1000);
    }
  });

  // Function to restore bookmarked chats on page load (without changing their relative order if already grouped)
  const restoreBookmarkedChats = () => {
    try {
      const bookmarkedChats = JSON.parse(localStorage.getItem('bookmarkedChats') || '[]');
      if (bookmarkedChats.length === 0) return;

      console.log('Restoring bookmarked chats:', bookmarkedChats);

      // Wait for ChatGPT sidebar to load with multiple retry strategies
      let retryCount = 0;
      const maxRetries = 10;
      
      const checkForSidebar = () => {
        const chatItems = document.querySelectorAll('nav[data-testid="chat-history"] a, nav[data-testid="chat-history"] [role="button"], nav[data-testid="chat-history"] .conversation-item, nav[data-testid="chat-history"] [data-testid="conversation-turn-2"], nav[data-testid="chat-history"] [data-testid="conversation-item"], nav[data-testid="chat-history"] .conversation-turn-2, nav[data-testid="chat-history"] a[href*="/c/"], nav a[href*="/c/"], aside a[href*="/c/"], [data-testid="chat-history"] a, [data-testid="chat-history"] [role="button"]');
        
        console.log(`Checking for sidebar (attempt ${retryCount + 1}/${maxRetries}), found ${chatItems.length} chat items`);
        
        if (chatItems.length > 0) {
           // Ensure bookmarked chats are grouped at the top without changing their current relative order
           const found = [];
           bookmarkedChats.forEach(chatId => {
            const chatItem = Array.from(chatItems).find(item => {
              const itemId = item.getAttribute('href') || item.getAttribute('data-testid') || item.textContent.trim();
              return itemId === chatId;
            });
            
            if (chatItem) {
              // Add bookmarked class (no visual indicator by default)
              chatItem.classList.add('bookmarked');
               found.push(chatItem);
              

            } else {
              console.warn('Bookmarked chat not found in sidebar:', chatId);
            }
          });
           if (found.length) {
             const parent = found[0].parentElement;
             if (parent) {
               // If already at the top in correct order, skip
               let alreadyAtTop = true;
               for (let i = 0; i < found.length; i += 1) {
                 if (parent.children[i] !== found[i]) { alreadyAtTop = false; break; }
               }
               if (!alreadyAtTop) {
                 // Move in reverse so top order matches current DOM order
                 for (let i = found.length - 1; i >= 0; i -= 1) {
                   const el = found[i];
                   if (parent.firstChild !== el) parent.insertBefore(el, parent.firstChild);
                 }
               }
             }
           }
        } else if (retryCount < maxRetries) {
          retryCount++;
          // Retry with increasing delays
          const delay = Math.min(1000 * retryCount, 3000);
          setTimeout(checkForSidebar, delay);
        } else {
          console.error('Failed to find sidebar after maximum retries');
        }
      };

      // Start checking for sidebar with initial delay
      setTimeout(checkForSidebar, 1000);
    } catch (error) {
      console.error('Error restoring bookmarked chats:', error);
    }
  };

  // Call restore function on page load
  window.addEventListener('load', restoreBookmarkedChats);
  document.addEventListener('DOMContentLoaded', restoreBookmarkedChats);
  
  // Monitor bookmark positions and fix if needed
  const monitorBookmarkPositions = () => {
    try {
      const bookmarkedChats = JSON.parse(localStorage.getItem('bookmarkedChats') || '[]');
      if (bookmarkedChats.length === 0) return;
      
      const chatItems = document.querySelectorAll('nav[data-testid="chat-history"] a, nav[data-testid="chat-history"] [role="button"], nav[data-testid="chat-history"] .conversation-item, nav[data-testid="chat-history"] [data-testid="conversation-turn-2"], nav[data-testid="chat-history"] [data-testid="conversation-item"], nav[data-testid="chat-history"] .conversation-turn-2, nav[data-testid="chat-history"] a[href*="/c/"], nav a[href*="/c/"], aside a[href*="/c/"], [data-testid="chat-history"] a, [data-testid="chat-history"] [role="button"]');
      
      bookmarkedChats.forEach(chatId => {
        const chatItem = Array.from(chatItems).find(item => {
          const itemId = item.getAttribute('href') || item.getAttribute('data-testid') || item.textContent.trim();
          return itemId === chatId;
        });
        
        if (chatItem) {
          // Ensure class reflects storage truth
          if (bookmarkedChats.includes(chatId)) {
            chatItem.classList.add('bookmarked');
          } else {
            chatItem.classList.remove('bookmarked');
          }
        }
      });
    } catch (error) {
      console.error('Error monitoring bookmark positions:', error);
    }
  };
  
  // Monitor bookmark positions periodically
  setInterval(monitorBookmarkPositions, 5000);

  // Listen for page visibility changes (when user returns to tab)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      console.log('Page became visible, checking sidebar...');
      setTimeout(ensureContractedSidebar, 500);
    }
  });

  // Listen for URL changes (SPA navigation)
  let currentUrl = window.location.href;
  const checkUrlChange = () => {
    if (window.location.href !== currentUrl) {
      currentUrl = window.location.href;
      console.log('URL changed, ensuring sidebar exists...');
      setTimeout(ensureContractedSidebar, 1000);
      // If Gemini SPA navigated, force a conversation tree refresh quickly and keep trying until filled
      try {
        if (window.location.hostname.includes('gemini.google.com')) {
          setTimeout(() => {
            try { if (typeof window.__onGeminiConversationChange === 'function') window.__onGeminiConversationChange(); } catch(_) {}
            try { if (typeof window.__rebuildGeminiTree === 'function') window.__rebuildGeminiTree(); } catch(_) {}
            try { if (typeof window.__rebuildUntilFilled === 'function') window.__rebuildUntilFilled(8000, 250); } catch(_) {}
          }, 80);
        }
      } catch(_) {}
    }
  };
  setInterval(checkUrlChange, 1000);

  // --- Gemini conversation → Floatbar Tree mirroring ---
  (function setupGeminiTree() {
    if (!window.location.hostname.includes('gemini.google.com')) return;
    // Prevent duplicate initialization
    if (window.__geminiTreeSetup) return;
    window.__geminiTreeSetup = true;

    // Silence any previously logged specific warnings from this module
    try {
      if (!window.__geminiWarnPatched) {
        const __origWarn = console.warn.bind(console);
        console.warn = function(...args) {
          if (typeof args[0] === 'string' && args[0].includes('Rebuild: no messages found')) return;
          return __origWarn(...args);
        };
        window.__geminiWarnPatched = true;
      }
    } catch(_) {}

    // Utilities
    const getFloatbarUl = () => document.querySelector('.catalogeu-navigation-plugin-floatbar .panel ul');
    const ensureGeminiAttrs = (el, idx) => {
      try {
        const author = el.getAttribute('data-message-author') || '';
        if (!el.hasAttribute('data-message-author-role')) {
          el.setAttribute('data-message-author-role', author);
        }
        if (!el.hasAttribute('data-message-id')) {
          el.setAttribute('data-message-id', `g_${idx + 1}`);
        }
      } catch (_) {}
    };
    const createLeafLi = (labelHtml, refEl, msgId) => {
      const li = document.createElement('li');
      li.classList.add('leaf');
      try { li.__ref = new WeakRef(refEl); } catch(_) {}
      if (msgId) li.setAttribute('data-message-id', msgId);
      const iEl = document.createElement('i');
      const div = document.createElement('div');
      div.innerHTML = labelHtml;
      li.appendChild(iEl);
      li.appendChild(div);
      return li;
    };
    const appendChildLi = (parentLi, childLi) => {
      try {
        let ul = parentLi.querySelector(':scope > ul');
        if (!ul) {
          ul = document.createElement('ul');
          parentLi.classList.remove('leaf');
          parentLi.appendChild(ul);
        }
        ul.appendChild(childLi);
      } catch(_) {}
    };
    // Two-level folding system for Gemini:
    // Level 1 (Parent-only): Hide all child and subnodes (depth >= 2: ul ul li)  
    // Level 2 (Child-level): Hide only subnodes (depth >= 3: ul ul ul li)
    const applyGeminiFold = (ul) => {
      try {
        const parentOnlyMode = !!window.__geminiParentOnly; // Fold button - shows only parents
        const childLevelMode = !!window.__geminiConcise;     // Deep button - shows parent + child
        
        if (parentOnlyMode) {
          // Hide all child nodes and subnodes (depth >= 2)
          const allChildAndSubNodes = ul.querySelectorAll('ul ul li');
          allChildAndSubNodes.forEach((li) => {
            li.style.display = 'none';
          });
        } else if (childLevelMode) {
          // Hide only subnodes (depth >= 3), keep child nodes visible
          const subNodes = ul.querySelectorAll('ul ul ul li');
          subNodes.forEach((li) => {
            li.style.display = 'none';
          });
          // Ensure child nodes are visible (depth = 2)
          const childNodes = ul.querySelectorAll('ul ul li');
          childNodes.forEach((li) => {
            // Only show if it's not a deeper subnode
            const depth = li.closest('ul ul ul ul') ? 4 : li.closest('ul ul ul') ? 3 : 2;
            if (depth === 2) {
              li.style.display = '';
            }
          });
        } else {
          // Show everything - no folding
          const allNodes = ul.querySelectorAll('ul ul li');
          allNodes.forEach((li) => {
            li.style.display = '';
          });
        }
      } catch(_) {}
    };
    const findNextModelWithContent = (blocks, fromIdx) => {
      for (let j = fromIdx + 1; j < blocks.length; j += 1) {
        const el = blocks[j];
        const role = el.getAttribute('data-message-author') || el.getAttribute('data-message-author-role');
        if (role === 'user') break;
        if (role === 'model' || role === 'assistant') {
          if (el.querySelector('.model-response-text')) return el;
        }
      }
      return null;
    };
    const findPrevUserForModel = (modelEl) => {
      let prev = modelEl && modelEl.previousElementSibling;
      while (prev) {
        const role = prev.getAttribute && (prev.getAttribute('data-message-author') || prev.getAttribute('data-message-author-role'));
        if (role === 'user') return prev;
        prev = prev.previousElementSibling;
      }
      return null;
    };
    const findFollowingModelForAnchor = (anchorEl) => {
      // Walk forward siblings until next prompt or a model response with content
      let cur = anchorEl && anchorEl.nextElementSibling;
      while (cur) {
        if (cur.querySelector) {
          // stop if we hit next prompt container
          if (cur.querySelector(PROMPT_SELECTOR_G)) break;
          const md = cur.querySelector('.model-response-text');
          if (md) {
            const role = cur.getAttribute('data-message-author') || cur.getAttribute('data-message-author-role');
            if (!role || role === 'model' || role === 'assistant') {
              return cur;
            }
          }
        }
        cur = cur.nextElementSibling;
      }
      // Fallback: the first model response that appears after anchor in document order
      try {
        const mds = Array.from(document.querySelectorAll('.model-response-text'));
        for (const md of mds) {
          if ((anchorEl.compareDocumentPosition(md) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0) {
            return md.closest('[data-message-author],[data-message-id]') || md.parentElement;
          }
        }
      } catch(_) {}
      return null;
    };
    const safeText = (el, max = 300) => {
      try { const t = (el?.textContent || '').trim(); return t.length > max ? t.slice(0, max) : t; } catch(_) { return ''; }
    };
    // Extract only visible text excluding specific selectors
    const getTextExcluding = (el, excludeSel, max = 300) => {
      try {
        const clone = el.cloneNode(true);
        if (excludeSel) {
          clone.querySelectorAll(excludeSel).forEach(n => n.remove());
        }
        // Prefer likely content nodes
        const preferSel = [
          '[data-message-text]',
          '.message-text',
          '.message-content',
          '.prose',
          '.markdown',
          'div[dir="auto"]',
          'p'
        ].join(',');
        const preferred = Array.from(clone.querySelectorAll(preferSel))
          .find(n => n && n.textContent && n.textContent.trim().length > 0) || clone;
        // Collect plain text, skip hidden/script, and skip model content for user prompts
        const walker = document.createTreeWalker(preferred, NodeFilter.SHOW_TEXT, {
          acceptNode(node) {
            const t = (node.nodeValue || '').trim();
            if (!t) return NodeFilter.FILTER_REJECT;
            const p = node.parentElement;
            if (!p) return NodeFilter.FILTER_ACCEPT;
            if (p.closest('script,style,template,svg,[aria-hidden="true"],.model-response-text')) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          }
        });
        let out = '';
        let n;
        while ((n = walker.nextNode())) {
          const t = n.nodeValue.trim();
          if (!t) continue;
          out += (out ? ' ' : '') + t;
          if (out.length >= max) break;
        }
        out = out.trim();
        if (!out) out = (preferred.textContent || '').trim();
        return out.length > max ? out.slice(0, max) : out;
      } catch(_) { return ''; }
    };
    // Extract user prompt text from Gemini user block
    const getUserTextGemini = (userEl, max = 300) => {
      try {
        // Broad candidate scan for Gemini user prompt text
        const candSelList = [
          '[data-message-text]',
          '.message-text',
          'message-content',
          '[data-message-content]',
          '[data-qa="UserQuery"]',
          '[data-qa="query-text"]',
          '.prose',
          '.markdown',
          'div[dir="auto"]',
          'blockquote',
          'li',
          'p',
          'span'
        ];
        const candidates = Array.from(userEl.querySelectorAll(candSelList.join(',')))
          .filter(n => !n.closest('.model-response-text'));
        for (const c of candidates) {
          const t = (c.textContent || '').trim();
          if (t) return t.length > max ? t.slice(0, max) : t;
        }
        // Try direct text from userEl (excluding model reply and common UI noise)
        const txt = getTextExcluding(userEl, '.model-response-text,[data-message-author="model"],button,svg,[role="img"],[aria-hidden="true"]', max);
        if (txt) return txt;
      } catch(_) {}
      // Exclude any nested model response to avoid duplication
      return getTextExcluding(userEl, '.model-response-text,[data-message-author="model"]', max);
    };
    // Extract assistant model text
    const getModelTextGemini = (modelEl, max = 300) => {
      try {
        const md = modelEl.querySelector('.model-response-text');
        if (!md) return '';
        const t = (md.textContent || '').trim();
        return t.length > max ? t.slice(0, max) : t;
      } catch(_) { return ''; }
    };
    // Gemini-specific prompt selector (from gemini_nav)
    const PROMPT_SELECTOR_G = 'user-query-content .query-text';
    const getGeminiPromptText = (refEl, max = 300) => {
      try {
        // First, try within the reference element
        if (refEl && refEl.querySelector) {
          const within = refEl.querySelector(PROMPT_SELECTOR_G);
          if (within) {
            const t = (within.textContent || '').trim();
            if (t) return t.length > max ? t.slice(0, max) : t;
          }
        }
        // Then, search previous siblings for the nearest prompt container
        let cur = refEl;
        let steps = 0;
        while (cur && steps < 50) {
          cur = cur.previousElementSibling;
          if (!cur) break;
          const q = cur.querySelector && cur.querySelector(PROMPT_SELECTOR_G);
          if (q && q.textContent && q.textContent.trim()) {
            const t = q.textContent.trim();
            return t.length > max ? t.slice(0, max) : t;
          }
          steps++;
        }
        // Fallback: last prompt on page
        const all = document.querySelectorAll(PROMPT_SELECTOR_G);
        if (all && all.length) {
          const last = all[all.length - 1];
          const t = (last.textContent || '').trim();
          if (t) return t.length > max ? t.slice(0, max) : t;
        }
      } catch(_) {}
      return '';
    };
    const buildSubcatalog = (hostLi, mdEl) => {
      // Gemini: add main subheadings as subnodes, and include their immediate sub-sub nodes (one extra level)
      if (!mdEl) return;
      const headingTags = new Set(['H1','H2','H3','H4','H5','H6','STRONG']);
      const listTags = new Set(['OL','UL']);

      // Only consider top-level structural nodes within the model response
      const isTopStructural = (node) => {
        let p = node.parentElement;
        while (p && p !== mdEl) {
          const tag = (p.tagName || '').toUpperCase();
          if (headingTags.has(tag) || listTags.has(tag)) return false;
          p = p.parentElement;
        }
        return true;
      };

      const appendOneLevel = (label, ref, parent = hostLi) => {
        const li = createLeafLi(label, ref, '');
        appendChildLi(parent, li);
        return li;
      };

      const isTimeCoded = (text) => /\[[^\]]+\]/.test((text || '').trim());

      // Build an ordered list of top-level headings (and time-coded paragraphs) only
      const topHeadingNodes = Array.from(mdEl.querySelectorAll('h1,h2,h3,h4,h5,h6,strong,p'))
        .filter(isTopStructural)
        .filter((node) => {
          const tag = (node.tagName || '').toUpperCase();
          if (headingTags.has(tag)) return true;
          if (tag === 'P') {
            const raw = (node.textContent || '').trim();
            return isTimeCoded(raw);
          }
          return false;
        });

      const getLabel = (el) => safeText(el, 240);
      const getItemLabel = (liEl) => {
        try {
          return (typeof getTextExcluding === 'function')
            ? (getTextExcluding(liEl, 'ul,ol', 240) || getLabel(liEl))
            : getLabel(liEl);
        } catch(_) { return getLabel(liEl); }
      };
      const processNestedList = (listEl, parentLi) => {
        const items = Array.from(listEl.children || []).filter(n => n.tagName && n.tagName.toUpperCase() === 'LI');
        items.forEach((it) => {
          const childLi = appendOneLevel(getItemLabel(it), it, parentLi);
          // one nested level only
          const nested = it.querySelector(':scope > ul, :scope > ol');
          if (nested) {
            const subItems = Array.from(nested.children || []).filter(n => (n.tagName||'').toUpperCase() === 'LI');
            subItems.forEach((subIt) => {
              appendOneLevel(getItemLabel(subIt), subIt, childLi);
            });
          }
        });
      };
      // If assistant main reply is top-level bullet points, add them directly under the assistant reply node
      try {
        const topLevelLists = Array.from(mdEl.querySelectorAll('ol,ul')).filter(isTopStructural);
        topLevelLists.forEach((lst) => processNestedList(lst, hostLi));
      } catch(_) {}
      const buildUnderHeading = (headLi, startEl, endEl) => {
        let cur = startEl;
        while (cur && cur !== endEl) {
          const tag = (cur.tagName || '').toUpperCase();
          if (listTags.has(tag)) {
            processNestedList(cur, headLi);
          } else if (headingTags.has(tag)) {
            appendOneLevel(getLabel(cur), cur, headLi);
          }
          cur = cur.nextElementSibling;
        }
      };

      topHeadingNodes.forEach((node, idx) => {
        const tag = (node.tagName || '').toUpperCase();
        let title = '';
        if (headingTags.has(tag)) {
          title = getLabel(node);
        } else {
          const raw = (node.textContent || '').trim();
          const m = raw.match(/\[[^\]]+\][^\n]*/);
          title = (m && m[0] ? m[0] : raw).slice(0,240);
        }
        const headLi = appendOneLevel(title, node, hostLi);
        const nextHead = topHeadingNodes[idx + 1] || null;
        buildUnderHeading(headLi, node.nextElementSibling, nextHead);
      });
    };

    const computeKeyFromBlocks = (blocks) => {
      try {
        const parts = [];
        const take = Math.min(6, blocks.length);
        for (let i = 0; i < take; i += 1) {
          const b = blocks[i];
          const a = b.getAttribute('data-message-author') || b.getAttribute('data-message-author-role') || '';
          const id = b.getAttribute('data-message-id') || '';
          const txt = safeText(b, 120);
          parts.push(a + '|' + id + '|' + txt);
        }
        return parts.join('\n');
      } catch(_) { return ''; }
    };

    // Backoff and scheduling helpers
    const inCooldown = () => Date.now() < (window.__geminiNoMsgCooldownUntil || 0);
    const scheduleRebuild = (delay = 150) => {
      try { clearTimeout(window.__geminiRebuildTimer); } catch(_) {}
      window.__geminiRebuildTimer = setTimeout(() => { try { rebuild(); } catch(_) {} }, delay);
    };
    let __rebuildLock = false;

    const rebuild = () => {
      try {
        if (__rebuildLock) return;
        if (inCooldown()) return;
        const ul = getFloatbarUl();
        if (!ul) return;
        __rebuildLock = true;
        // Find Gemini message blocks with multiple fallbacks
        let blocks = Array.from(document.querySelectorAll('div[data-message-author]'));
        if (blocks.length === 0) {
          blocks = Array.from(document.querySelectorAll('[data-message-author]'));
        }
        if (blocks.length === 0) {
          blocks = Array.from(document.querySelectorAll('[data-message-id]'));
        }
        // As a last resort, derive model blocks from content nodes
        let derivedPairs = [];
        if (blocks.length === 0) {
          const modelNodes = Array.from(document.querySelectorAll('.model-response-text'));
          modelNodes.forEach((modelEl, idx) => {
            let container = modelEl.closest('[data-message-author]') || modelEl.closest('[data-message-id]') || modelEl;
            ensureGeminiAttrs(container, idx);
            // naive previous sibling as user block fallback
            let userEl = null;
            let prev = container.previousElementSibling;
            while (prev && !userEl) {
              if (prev.matches('[data-message-author], [data-message-id]')) userEl = prev;
              prev = prev.previousElementSibling;
            }
            if (userEl) ensureGeminiAttrs(userEl, Math.max(0, idx - 1));
            derivedPairs.push({ user: userEl, model: container });
          });
        }

        blocks.forEach((b, idx) => ensureGeminiAttrs(b, idx));
        const liEls = [];
        let currentKey = '';
        // Prompt-first builder (gemini_nav semantics)
        const prompts = Array.from(document.querySelectorAll(PROMPT_SELECTOR_G));
        let builtByPrompts = false;
        if (prompts.length > 0) {
          const keyParts = [];
          prompts.forEach((promptEl, idx) => {
            const anchor = promptEl.closest('user-query') || promptEl.closest('[data-message-author="user"]') || promptEl;
            try { ensureGeminiAttrs(anchor, idx); } catch(_) {}
            const promptId = anchor.getAttribute('data-message-id') || `g_p_${idx+1}`;
            let text = (promptEl.textContent || '').trim();
            if (text.length > 220) text = text.slice(0,220);
            if (!text) return;
            keyParts.push(text);
            const userLi = createLeafLi(text, anchor, promptId);
            // Find following model output for this prompt
            const modelBlock = findFollowingModelForAnchor(anchor);
            if (modelBlock) {
              const replyId = modelBlock.getAttribute('data-message-id') || '';
              const md = modelBlock.querySelector('.model-response-text');
              const replyText = getModelTextGemini(modelBlock, 220) || (md ? safeText(md, 220) : safeText(modelBlock, 220));
              const replyLi = createLeafLi(replyText, modelBlock, replyId);
              appendChildLi(userLi, replyLi);
              if (md) buildSubcatalog(replyLi, md);
            }
            liEls.push(userLi);
          });
          currentKey = keyParts.slice(0,6).join('\n');
          builtByPrompts = liEls.length > 0;
        }
        if (!builtByPrompts && blocks.length > 0) {
          console.log('[Gemini] Rebuild (fallback): found blocks', blocks.length);
          currentKey = computeKeyFromBlocks(blocks);
          for (let i = 0; i < blocks.length; i += 1) {
            const userBlock = blocks[i];
            const author = userBlock.getAttribute('data-message-author') || userBlock.getAttribute('data-message-author-role');
            if (author !== 'user') continue;
            let modelBlock = findNextModelWithContent(blocks, i);
            const msgId = userBlock.getAttribute('data-message-id');
            let userRefForPrompt = userBlock;
            let userPrompt = getGeminiPromptText(userBlock, 220) || getUserTextGemini(userBlock, 220);
            if ((!userPrompt || !userPrompt.trim()) && modelBlock) {
              const prevUser = findPrevUserForModel(modelBlock);
              if (prevUser) {
                try { ensureGeminiAttrs(prevUser, 0); } catch(_) {}
                let alt = getGeminiPromptText(prevUser, 220) || getUserTextGemini(prevUser, 220);
                if (alt && alt.trim()) { userPrompt = alt; userRefForPrompt = prevUser; }
              }
            }
            if (!userPrompt || !userPrompt.trim()) userPrompt = '(prompt)';
            const userLi = createLeafLi(userPrompt, userRefForPrompt, msgId);
            if (modelBlock) {
              const replyId = modelBlock.getAttribute('data-message-id');
              const md = modelBlock.querySelector('.model-response-text');
              const replyText = getModelTextGemini(modelBlock, 220) || (md ? safeText(md, 220) : safeText(modelBlock, 220));
              const replyLi = createLeafLi(replyText, modelBlock, replyId);
              appendChildLi(userLi, replyLi);
              if (md) buildSubcatalog(replyLi, md);
            }
            liEls.push(userLi);
          }
        } else if (!builtByPrompts && derivedPairs.length > 0) {
          console.log('[Gemini] Rebuild: using derived pairs', derivedPairs.length);
          try { currentKey = computeKeyFromBlocks(derivedPairs.map(p => p.user || p.model).filter(Boolean)); } catch(_) {}
          derivedPairs.forEach(({ user, model }) => {
            if (!user && !model) return;
            // If user is missing, try to find the actual preceding user block in DOM
            if (!user && model) user = findPrevUserForModel(model);
            // Ensure attributes
            if (user) ensureGeminiAttrs(user, 0);
            if (model) ensureGeminiAttrs(model, 1);
            // Create user top node. If still no user, do not copy model text into user label
            const userRef = user || document.createElement('div');
            const userId = userRef?.getAttribute('data-message-id') || '';
            let userLabel = '(prompt)';
            if (user) {
              // Try Gemini selector first, then generic
              userLabel = getGeminiPromptText(userRef, 200) || getUserTextGemini(userRef, 200) || '(prompt)';
            }
            const userLi = createLeafLi(userLabel, userRef || document.body, userId);
            // Create assistant child
            if (model) {
              const replyId = model.getAttribute('data-message-id') || '';
              const md = model.querySelector('.model-response-text') || model;
              const replyText = getModelTextGemini(model, 220) || safeText(md, 220);
              const replyLi = createLeafLi(replyText, model, replyId);
              appendChildLi(userLi, replyLi);
              if (md) buildSubcatalog(replyLi, md);
            }
            liEls.push(userLi);
          });
        } else {
          // No content found; set cooldown to avoid tight loops (silent)
          const now = Date.now();
          window.__geminiNoMsgCooldownUntil = now + 2500; // backoff 2.5s
        }
        // Only clear and repaint when we have content, to avoid transient blanks
        if (liEls.length > 0) {
          // Keep a snapshot we can restore if something clears UL later
          rebuild._last = liEls.map(li => li.cloneNode(true));
          rebuild._key = currentKey;
          while (ul.firstChild) ul.removeChild(ul.firstChild);
          liEls.forEach(li => ul.appendChild(li));
          // Apply concise folding if enabled
          try { applyGeminiFold(ul); } catch(_) {}
        }
        // expose for manual refresh hooks
        window.__rebuildGeminiTree = rebuild;
        __rebuildLock = false;
      } catch (err) {
        console.error('Gemini tree rebuild failed:', err);
        __rebuildLock = false;
      }
    };

    // Expose a conversation-change hook to refresh immediately when Gemini swaps threads
    window.__onGeminiConversationChange = () => {
      // clear caches and rebuild, respecting cooldown
      try { delete rebuild._last; } catch(_) {}
      try { delete rebuild._key; } catch(_) {}
      if (inCooldown()) {
        // schedule just after cooldown expires
        const delay = Math.max(0, (window.__geminiNoMsgCooldownUntil || 0) - Date.now() + 50);
        scheduleRebuild(delay);
      } else {
        scheduleRebuild(0);
        [120,300,600].forEach(ms => setTimeout(() => scheduleRebuild(0), ms));
      }
    };

    // Wait for floatbar ul then observe the main area
    const waitForUl = setInterval(() => {
      const ul = getFloatbarUl();
      if (!ul) return;
      clearInterval(waitForUl);
      scheduleRebuild(50);
      try {
        const mainEl = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
        const mo = new MutationObserver((mutations) => {
          // Rebuild only when new prompt or model output appears
          const sel = PROMPT_SELECTOR_G + ', .model-response-text';
          let relevant = false;
          for (const m of mutations) {
            if (m.type !== 'childList') continue;
            for (const node of m.addedNodes) {
              if (node.nodeType !== 1) continue;
              const el = node;
              if ((el.matches && el.matches(sel)) || (el.querySelector && el.querySelector(sel))) { relevant = true; break; }
            }
            if (relevant) break;
          }
          if (relevant) scheduleRebuild(150);
        });
        mo.observe(mainEl, { childList: true, subtree: true });
        // Guard: if someone clears the UL, rebuild
        const ul = getFloatbarUl();
        if (ul) {
          const mo2 = new MutationObserver((mutations) => {
            // If anything tries to clear the UL, immediately restore content without clearing first
            if (ul.childElementCount === 0) {
              clearTimeout(rebuild._u); rebuild._u = setTimeout(() => {
                try {
                  const snapshot = (rebuild._last || []).slice(0);
                  if (snapshot.length > 0) {
                    while (ul.firstChild) ul.removeChild(ul.firstChild);
                    snapshot.forEach(li => ul.appendChild(li.cloneNode(true)));
                  } else {
                    scheduleRebuild(120);
                  }
                } catch(_) { rebuild(); }
              }, 80);
            }
          });
          mo2.observe(ul, { childList: true });
        }
        // Watch floatbar open/close to burst refresh after layout changes
        const fb = document.querySelector('.catalogeu-navigation-plugin-floatbar');
        if (fb) {
          const burst = () => { [50,150,300,600,1000].forEach(ms => setTimeout(() => scheduleRebuild(0), ms)); };
          const moFb = new MutationObserver(() => {
            const pn = fb.querySelector('.panel');
            const visible = !!(pn && (pn.style.display === 'flex' || fb.classList.contains('show-panel')));
            if (visible) burst();
          });
          moFb.observe(fb, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
        }
        // Two-level folding system for Gemini (Deep button + Fold button)
        const bindGeminiFoldingButtons = () => {
          try {
            // Initialize from storage only once
            if (typeof window.__geminiConcise === 'undefined' && chrome?.storage?.local) {
              chrome.storage.local.get(['geminiConcise', 'geminiParentOnly'], (d) => {
                try { 
                  window.__geminiConcise = !!d?.geminiConcise; 
                  window.__geminiParentOnly = !!d?.geminiParentOnly;
                } catch(_) {}
                const treeUl = getFloatbarUl();
                if (treeUl) applyGeminiFold(treeUl);
              });
            }
            
            const fb2 = document.querySelector('.catalogeu-navigation-plugin-floatbar');
            if (!fb2) return;
            
            // 1. Deep/In-depth button (tree icon) - toggles between child level and full depth
            const deepBtn = fb2.querySelector('.header .deep') || fb2.querySelector('.tools .deep') || fb2.querySelector('.deep');
            if (deepBtn && !deepBtn.__geminiBound) {
              deepBtn.__geminiBound = true;
              deepBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('[Gemini] Deep button clicked - toggling subnodes visibility');
                
                // Deep button toggles between parent+child (concise) and full depth (all subnodes)
                // Reset parent-only mode when deep button is used
                try { window.__geminiParentOnly = false; } catch(_) {}
                // Toggle child level mode (shows parent + child, hides/shows subnodes)
                try { window.__geminiConcise = !window.__geminiConcise; } catch(_) {}
                
                console.log('[Gemini] New modes - Parent-only:', window.__geminiParentOnly, 'Child-level (concise):', window.__geminiConcise);
                try { 
                  chrome?.storage?.local && chrome.storage.local.set({ 
                    geminiConcise: !!window.__geminiConcise,
                    geminiParentOnly: !!window.__geminiParentOnly
                  }); 
                } catch(_) {}
                
                const treeUl = getFloatbarUl();
                if (treeUl) {
                  applyGeminiFold(treeUl);
                } else {
                  console.warn('[Gemini] No tree UL found for folding');
                }
              }, true);
              console.log('[Gemini] Deep button bound successfully');
            }
            
            // 2. Fold button (leftmost in header) - toggles between parent-only and parent+child
            const foldBtn = fb2.querySelector('.header .fold');
            if (foldBtn && !foldBtn.__geminiFoldBound) {
              foldBtn.__geminiFoldBound = true;
              foldBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('[Gemini] Fold button clicked - toggling between parent-only and parent+child');
                
                // Toggle logic: if currently showing parent-only, expand to parent+child
                // If currently showing anything else (parent+child or full), collapse to parent-only
                const currentlyParentOnly = !!window.__geminiParentOnly;
                
                if (currentlyParentOnly) {
                  // Currently parent-only -> expand to parent+child (concise mode)
                  try { window.__geminiParentOnly = false; } catch(_) {}
                  try { window.__geminiConcise = true; } catch(_) {}
                  console.log('[Gemini] Unfolding to parent+child level');
                } else {
                  // Currently parent+child or full -> collapse to parent-only
                  try { window.__geminiParentOnly = true; } catch(_) {}
                  try { window.__geminiConcise = false; } catch(_) {}
                  console.log('[Gemini] Folding to parent-only level');
                }
                
                console.log('[Gemini] New modes - Parent-only:', window.__geminiParentOnly, 'Child-level:', window.__geminiConcise);
                try { 
                  chrome?.storage?.local && chrome.storage.local.set({ 
                    geminiConcise: !!window.__geminiConcise,
                    geminiParentOnly: !!window.__geminiParentOnly
                  }); 
                } catch(_) {}
                
                const treeUl = getFloatbarUl();
                if (treeUl) {
                  applyGeminiFold(treeUl);
                } else {
                  console.warn('[Gemini] No tree UL found for folding');
                }
              }, true);
              console.log('[Gemini] Fold button bound successfully');
            }
            
            if (!deepBtn && !foldBtn) {
              console.warn('[Gemini] Neither deep nor fold buttons found');
            }
          } catch(err) {
            console.error('[Gemini] Error binding folding buttons:', err);
          }
        };
        bindGeminiFoldingButtons();
        // Retry binding after delays in case floatbar isn't ready
        setTimeout(bindGeminiFoldingButtons, 500);
        setTimeout(bindGeminiFoldingButtons, 1000);
        // Remove periodic safety net to avoid spurious rebuilds
        try { clearInterval(window.__geminiRebuildIntervalId); } catch(_) {}
      } catch (e) {
        // No periodic fallback
      }
    }, 500);

    // Detect SPA route changes via History API
    try {
      const _ps = history.pushState; const _rs = history.replaceState;
      const settle = () => { try { window.__onGeminiConversationChange(); } catch(_) {} };
      history.pushState = function(){ const r = _ps.apply(this, arguments); settle(); return r; };
      history.replaceState = function(){ const r = _rs.apply(this, arguments); settle(); return r; };
      window.addEventListener('popstate', settle);
    } catch(_) {}

    // Conversation signature monitor: if first messages change, force refresh
    setInterval(() => {
      try {
        let blocks = Array.from(document.querySelectorAll('div[data-message-author]'));
        if (blocks.length === 0) blocks = Array.from(document.querySelectorAll('[data-message-author]'));
        if (blocks.length === 0) blocks = Array.from(document.querySelectorAll('[data-message-id]'));
        const key = computeKeyFromBlocks(blocks);
        if (key && key !== rebuild._key) {
          window.__onGeminiConversationChange();
        }
      } catch(_) {}
    }, 1200);
  })();
  
})();