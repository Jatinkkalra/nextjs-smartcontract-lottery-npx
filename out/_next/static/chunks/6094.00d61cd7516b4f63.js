"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6094],{86094:function(i,n,e){e.r(n),e.d(n,{OpenloginAdapter:function(){return p},getOpenloginDefaultOptions:function(){return h}});var t=e(3388),o=e(45624),s=e(4942),r=e(67845),a=e(72378),c=e.n(a);let h=(i,n)=>({adapterSettings:{network:t.dr.MAINNET,clientId:"",uxMode:t.$e.POPUP},chainConfig:i?(0,o.h2)(i,n):null,loginSettings:{}});function l(i,n){var e=Object.keys(i);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(i);n&&(t=t.filter(function(n){return Object.getOwnPropertyDescriptor(i,n).enumerable})),e.push.apply(e,t)}return e}function g(i){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?l(Object(e),!0).forEach(function(n){(0,s.Z)(i,n,e[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(e)):l(Object(e)).forEach(function(n){Object.defineProperty(i,n,Object.getOwnPropertyDescriptor(e,n))})}return i}class p extends o.J5{constructor(i){var n,e,r,a;super(),(0,s.Z)(this,"name",o.rW.OPENLOGIN),(0,s.Z)(this,"adapterNamespace",o.yk.MULTICHAIN),(0,s.Z)(this,"type",o.hN.IN_APP),(0,s.Z)(this,"openloginInstance",null),(0,s.Z)(this,"status",o.MP.NOT_READY),(0,s.Z)(this,"currentChainNamespace",o.EN.EIP155),(0,s.Z)(this,"openloginOptions",void 0),(0,s.Z)(this,"loginSettings",{}),(0,s.Z)(this,"privKeyProvider",null),o.cM.debug("const openlogin adapter",i);let c=h(null===(n=i.chainConfig)||void 0===n?void 0:n.chainNamespace,null===(e=i.chainConfig)||void 0===e?void 0:e.chainId);if(this.openloginOptions=g(g({clientId:"",network:t.dr.MAINNET},c.adapterSettings),i.adapterSettings||{}),this.loginSettings=g(g({},c.loginSettings),i.loginSettings),this.sessionTime=this.loginSettings.sessionTime||86400,null!==(r=i.chainConfig)&&void 0!==r&&r.chainNamespace){this.currentChainNamespace=null===(a=i.chainConfig)||void 0===a?void 0:a.chainNamespace;let n=c.chainConfig?c.chainConfig:{};if(this.chainConfig=g(g({},n),null==i?void 0:i.chainConfig),o.cM.debug("const openlogin chainConfig",this.chainConfig),!this.chainConfig.rpcTarget&&i.chainConfig.chainNamespace!==o.EN.OTHER)throw o.Ty.invalidParams("rpcTarget is required in chainConfig")}}get chainConfigProxy(){return this.chainConfig?g({},this.chainConfig):null}get provider(){var i;return(null===(i=this.privKeyProvider)||void 0===i?void 0:i.provider)||null}set provider(i){throw Error("Not implemented")}async init(i){var n;if(super.checkInitializationRequirements(),!(null!==(n=this.openloginOptions)&&void 0!==n&&n.clientId))throw o.Ty.invalidParams("clientId is required before openlogin's initialization");if(!this.chainConfig)throw o.Ty.invalidParams("chainConfig is required before initialization");let e=!1;if(this.openloginOptions.uxMode===t.$e.REDIRECT){let i=(0,t.Gv)();Object.keys(i).length>0&&i._pid&&(e=!0)}this.openloginOptions=g(g({},this.openloginOptions),{},{replaceUrlOnRedirect:e}),this.openloginInstance=new t.ZP(this.openloginOptions),o.cM.debug("initializing openlogin adapter init"),await this.openloginInstance.init(),this.status=o.MP.READY,this.emit(o.n2.READY,o.rW.OPENLOGIN);try{o.cM.debug("initializing openlogin adapter"),this.openloginInstance.privKey&&(i.autoConnect||e)&&await this.connect()}catch(i){o.cM.error("Failed to connect with cached openlogin provider",i),this.emit("ERRORED",i)}}async connect(i){super.checkConnectionRequirements(),this.status=o.MP.CONNECTING,this.emit(o.n2.CONNECTING,g(g({},i),{},{adapter:o.rW.OPENLOGIN}));try{return await this.connectWithProvider(i),this.provider}catch(i){if(o.cM.error("Failed to connect with openlogin provider",i),this.status=o.MP.READY,this.emit(o.n2.ERRORED,i),null!=i&&i.message.includes("user closed popup"))throw o.RM.popupClosed();throw o.RM.connectionError("Failed to login with openlogin")}}async disconnect(){let i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{cleanup:!1};if(this.status!==o.MP.CONNECTED)throw o.RM.notConnectedError("Not connected with wallet");if(!this.openloginInstance)throw o.Ty.notReady("openloginInstance is not ready");await this.openloginInstance.logout(),i.cleanup?(this.status=o.MP.NOT_READY,this.openloginInstance=null,this.privKeyProvider=null):this.status=o.MP.READY,this.emit(o.n2.DISCONNECTED)}async authenticateUser(){if(this.status!==o.MP.CONNECTED)throw o.RM.notConnectedError("Not connected with wallet, Please login/connect first");let i=await this.getUserInfo();return{idToken:i.idToken}}async getUserInfo(){if(this.status!==o.MP.CONNECTED)throw o.RM.notConnectedError("Not connected with wallet");if(!this.openloginInstance)throw o.Ty.notReady("openloginInstance is not ready");let i=await this.openloginInstance.getUserInfo();return i}setAdapterSettings(i){if(this.status===o.MP.READY)return;let n=h();this.openloginOptions=g(g(g({},n.adapterSettings),this.openloginOptions||{}),i),i.sessionTime&&(this.loginSettings=g(g({},this.loginSettings),{},{sessionTime:i.sessionTime}))}setChainConfig(i){super.setChainConfig(i),this.currentChainNamespace=i.chainNamespace}async connectWithProvider(i){if(!this.chainConfig)throw o.Ty.invalidParams("chainConfig is required before initialization");if(!this.openloginInstance)throw o.Ty.notReady("openloginInstance is not ready");if(this.currentChainNamespace===o.EN.SOLANA){let{SolanaPrivateKeyProvider:i}=await Promise.all([e.e(8766),e.e(108),e.e(2335),e.e(7918)]).then(e.bind(e,44445));this.privKeyProvider=new i({config:{chainConfig:this.chainConfig}})}else if(this.currentChainNamespace===o.EN.EIP155){let{EthereumPrivateKeyProvider:i}=await Promise.all([e.e(3482),e.e(1796),e.e(2062),e.e(8890)]).then(e.bind(e,52062));this.privKeyProvider=new i({config:{chainConfig:this.chainConfig}})}else if(this.currentChainNamespace===o.EN.OTHER)this.privKeyProvider=new r.FL;else throw Error("Invalid chainNamespace: ".concat(this.currentChainNamespace," found while connecting to wallet"));if(!this.openloginInstance.privKey&&i){var n;this.loginSettings.curve||(this.loginSettings.curve=this.currentChainNamespace===o.EN.SOLANA?t.x7.ED25519:t.x7.SECP256K1),await this.openloginInstance.login(c()(this.loginSettings,{loginProvider:i.loginProvider},{extraLoginOptions:g(g({},i.extraLoginOptions||{}),{},{login_hint:i.login_hint||(null===(n=i.extraLoginOptions)||void 0===n?void 0:n.login_hint)})}))}let s=this.openloginInstance.privKey;if(s){if(this.currentChainNamespace===o.EN.SOLANA){let{getED25519Key:i}=await Promise.all([e.e(108),e.e(5418)]).then(e.bind(e,33946));s=i(s).sk.toString("hex")}await this.privKeyProvider.setupProvider(s),this.status=o.MP.CONNECTED,this.emit(o.n2.CONNECTED,{adapter:o.rW.OPENLOGIN,reconnected:!i})}}}}}]);