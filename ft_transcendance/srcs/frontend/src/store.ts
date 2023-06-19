import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { io } from 'socket.io-client';
import { ref } from 'vue';
import router from './router';

const persistedState = createPersistedState({
  paths: [
    'isToken', 
    'isDoubleAuth',
    'isId',
    'isNickname',
    //'isAvatar',
    'isMe',
    'isQrCode',
    'isBool',
    'isCode',
    'isBlockBool',
    'isStatusCode',
    'isTrigger',
    'isWhat',
    'isError',
    'isUserId',
    'isMatchHistory',
    'isAllUsers',
    'isUsers',
    'isOneUser',
    'isUserContext',
    'isUserBlocked',
    'isUserAvatar',
    //'isArrayAvatar',
    'isChanId',
    'isChans',
    'isChanContext',
    'isChatHistory',
    'isChatMessages',
    'isNewMessage',
    'isGoPlay',
    'isRoom',
    'isInvitePlay',
    'isresultSocketOn',
    'isBallX',
    'isBallY',
    'isScoreUser1',
    'isScoreUser2',
    'isUser1',
    'isUser2',
    'isInterval',
    'isPlayer',
    'isMatchmaking',
    'isColorRect1',
    'isColorRect2',
    'isColorBall',
    'isColorBackGround',
    'isColorNet',
    'isColorText',
    'isPlayStart',
    'isNameNotif',
    'isName',
    'isMsg',
    'isInvite',
    'isAcceptPlay',
    'isStatus',
    'isTheyQuit',
  ]});

const store = createStore({
  plugins: [persistedState],

  state: {

    //self
    isToken: "", 
    isDoubleAuth: false,
    isId: 0,
    isNickname: "",
    isAvatar: "",
    isMe: [],
    isQrCode: "",

    //truc
    isBool: false,
    isCode: false,
    isBlockBool: false,
    isStatusCode: false,
    isTrigger: false,//a verifier si exist
    isWhat: "",
    isError: [],

    //user
    isUserId: 0,
    isMatchHistory: [],
    isAllUsers: [],
    isUsers: [],
    isOneUser: [],
    isUserContext: [],
    isUserBlocked: [],
    isUserAvatar: '',
    isArrayAvatar: <any>[],//faire map si le temps
    
    //chan
    isChanId: 0,
    isChans: [],
    isChanContext: [],
    isChatHistory: [],
    //isUsersInChan: [],
    
    //chat
    isChatMessages: ref<string[]>([]),
    isNewMessage: ref(''),

    //pong
    isGoPlay: "",
    isRoom: "",
    isInvitePlay: "",//a verifier si exist
    isresultSocketOn: 0,//a verifier si exist
    isBallX: 0,
    isBallY: 0,
    isScoreUser1: 0,
    isScoreUser2: 0,
    isUser1: 0,
    isUser2: 0,
    isInterval: 0,
    isPlayer: 0,
    isMatchmaking: false,
    isColorRect1: "#ffffff",
    isColorRect2: "#ffffff",
    isColorBall: "#ffffff",
    isColorBackGround: "#000000",
    isColorNet: "#ffffff",
    isColorText: "#ffffff",
    isPlayStart: false,
    //socket
    isWebSocket: null,

    //notif
    isNameNotif: "",
    isName: "",
    isMsg: "",
    isInvite: false,
    isAcceptPlay: false,
    isStatus: false,
    isTheyQuit: false,
  },

  mutations: {
    setError(state, isError) {state.isError = isError;},
    setStatus(state, isStatus) {state.isStatus = isStatus;},
    setMsg(state, isMsg) {state.isMsg = isMsg;},
    setQrCode(state, payload) {state.isQrCode = payload;},
    setMatchHistory(state, isMatchHistory) {state.isMatchHistory = isMatchHistory;},

    setPlayStart(state, isPlayStart) {state.isPlayStart = isPlayStart;},
    setColorRect1(state, isColorRect1) {state.isColorRect1 = isColorRect1;},
    setColorRect2(state, isColorRect2) {state.isColorRect2 = isColorRect2;},
    setColorBall(state, isColorBall) {state.isColorBall = isColorBall;},
    setColorBackGround(state, isColorBackGround) {state.isColorBackGround = isColorBackGround;},
    setColorNet(state, isColorNet) {state.isColorNet = isColorNet;},
    setColorText(state, isColorText) {state.isColorText = isColorText;},

    setMe(state, isMe) {state.isMe = isMe;},
    setAcceptPlay(state, isAcceptPlay) {state.isAcceptPlay = isAcceptPlay;},
    setInvite(state, isInvite) {state.isInvite = isInvite;},
    setMatchmaking(state, isMatchmaking) {state.isMatchmaking = isMatchmaking;},
    setNameNotif(state, isNameNotif) {state.isNameNotif = isNameNotif;},
    setresultSocketOn(state, isresultSocketOn) {state.isresultSocketOn = isresultSocketOn;},
    setGoPlay(state, isGoPlay) {state.isGoPlay = isGoPlay;},
    setBallX(state, isBallX) {state.isBallX = isBallX;},
    setBallY(state, isBallY) {state.isBallY = isBallY;},
    setPlayer(state, isPlayer) {state.isPlayer = isPlayer;},
    setScoreUser1(state, isScoreUser1) {state.isScoreUser1 = isScoreUser1;},
    setScoreUser2(state, isScoreUser2) {state.isScoreUser2 = isScoreUser2;},
    setUser1(state, isUser1) {state.isUser1 = isUser1;},
    setUser2(state, isUser2) {state.isUser2 = isUser2;},
    setRoom(state, isRoom) {state.isRoom = isRoom;},
    setTrigger(state, isTrigger) {state.isTrigger = isTrigger;},
    setInterval(state, isInterval) {state.isInterval = isInterval;},
    setInvitePlay(state, isInvitePlay) {state.isInvitePlay = isInvitePlay;},
    setStatusCode(state,  isStatusCode) {state.isStatusCode =  isStatusCode},
    setChatMessages(state, isChatMessages){state.isChatMessages = isChatMessages},
    setNewMessage(state, isNewMessage){state.isNewMessage = isNewMessage},
    setToken(state, isToken){state.isToken = isToken},
    setDoubleAuth(state, isDoubleAuth){state.isDoubleAuth = isDoubleAuth},
    setId(state, isId){state.isId = isId},
    setNickname(state, isNickname) {state.isNickname = isNickname},
    setAvatar(state, isAvatar) {state.isAvatar = isAvatar},
    setUserAvatar(state, isUserAvatar) {state.isUserAvatar = isUserAvatar},
    setCode(state, isCode) {state.isCode = isCode},
    setAllUsers(state, isAllUsers) {state.isAllUsers = isAllUsers},
    setUsers(state, isUsers) {state.isUsers = isUsers},
    setOneUser(state, isOneUser) {state.isOneUser = isOneUser},
    setUserContext(state, isUserContext) {state.isUserContext = isUserContext},
    setUserBlocked(state, isUserBlocked) {state.isUserBlocked = isUserBlocked},
    setChanContext(state, isChanContext) {state.isChanContext = isChanContext},
    setWhat(state, isWhat) {state.isWhat = isWhat},
    setChanId(state, isChanId) {state.isChanId = isChanId},
    setUserId(state, isUserId) {state.isUserId = isUserId},
    setBool(state, isBool) {state.isBool = isBool},
    setBlockBool(state, isBlockBool) {state.isBlockBool = isBlockBool},
    setChatHistory(state, isChatHistory) {state.isChatHistory = isChatHistory},
    //setUsersInChan(state, isUsersInChan) {state.isUsersInChan = isUsersInChan},
    setChans(state,  isChans) {state.isChans =  isChans},
    setWebSocket(state, isWebSocket) {state.isWebSocket = isWebSocket;},
    setName(state, isName) {state.isName = isName;},
    setArrayAvatar(state, payload){
      const {item, index} = payload;
      state.isArrayAvatar[index] = item;
    },
    clearArray(state) {
      state.isArrayAvatar = [];
      //state.isOneUser= [];
    },
  },

  getters: {
    getError: state => state.isError,
    getStatus: state => state.isStatus,
    getMsg: state => state.isMsg,
    getQrCode: state => state.isQrCode,
    getMatchHistory: state => state.isMatchHistory,

    getPlayStart: state => state.isPlayStart,
    getColorRect1: state => state.isColorRect1,
    getColorRect2: state => state.isColorRect2,
    getColorBall: state => state.isColorBall,
    getColorBackGround: state => state.isColorBackGround,
    getColorNet: state => state.isColorNet,
    getColorText: state => state.isColorText,

    getMe: state => state.isMe,
    getAcceptPlay: state => state.isAcceptPlay,
    getInvite: state => state.isInvite,
    getMatchmaking: state => state.isMatchmaking,
    getresultSocketOn: state => state.isresultSocketOn,
    getNameNotif: state => state.isNameNotif,
    getGoPlay: state => state.isGoPlay,
    getBallX: state => state.isBallX,
    getBallY: state => state.isBallY,
    getPlayer: state => state.isPlayer,
    getScoreUser1: state => state.isScoreUser1,
    getScoreUser2: state => state.isScoreUser2,
    getUser1: state => state.isUser1,
    getUser2: state => state.isUser2,
    getRoom: state => state.isRoom,
    getTrigger: state => state.isTrigger,    
    getInterval: state => state.isInterval,
    getInvitePlay: state => state.isInvitePlay,
    getStatusCode: state => state.isStatusCode,
    getChatMessages: state => state.isChatMessages,
    getNewMessage: state => state.isNewMessage,
    getToken: state => state.isToken,
    getDoubleAuth: state => state.isDoubleAuth,
    getId: state => state.isId,
    getAvatar: state => state.isAvatar,
    getUserAvatar: state => state.isUserAvatar,
    getCode: state => state.isCode,
    getNickname: state => state.isNickname,
    getAllUsers: state => state.isAllUsers,
    getUsers: state => state.isUsers,
    getOneUser: state => state.isOneUser,
    getUserContext: state => state.isUserContext,
    getUserBlocked: state => state.isUserBlocked,
    getChanContext: state => state.isChanContext,
    getWhat: state => state.isWhat,
    getChanId: state => state.isChanId,
    getUserId: state => state.isUserId,
    getBool: state => state.isBool,
    getBlockBool: state => state.isBlockBool,
    getChatHistory: state => state.isChatHistory,
    //getUsersInChan: state => state.isUsersInChan,
    getWebSocket: state => state.isWebSocket,
    getName: state => state.isName,
    getArrayAvatar: (state) => (index: any) => {
      return state.isArrayAvatar[index]
    },
    getChans: state => state.isChans,
  },
  actions: {
    initWebSocket({ commit }) {
      const webSocket = io({
        path: "/api/socket.io",
        auth: {
          token: store.getters.getToken,
        }
      });

      webSocket.on('connect', () => {
        console.log('Socket connected');
        commit('setWebSocket', webSocket);
      });

      webSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        localStorage.clear();
        store.replaceState({});
        store.commit('setToken', "");
        store.commit('setDoubleAuth', {isDoubleAuth: false});
        router.push('/');
      });
      //invite: boolean, accept: boolean, status: boolean, theyQuit: boolean
      webSocket.on('notif', (nickname: string, msg: string) =>{
        commit('setNameNotif', nickname); // a qui on parle
        commit('setMsg', msg);
        if (store.getters.getMsg == "quit"){
          alert('the user quit the game')
          store.commit('setNameNotif', "");
          router.push('/Play');
          return ;
        }
      });
    },
  }
})

export default store;