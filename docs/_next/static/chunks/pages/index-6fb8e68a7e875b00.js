(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5405],{48312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(9941)}])},9941:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return v}});var s=n(85893),a=n(67294);let r=e=>{let[t,n]=(0,a.useState)(),[r,c]=(0,a.useState)(!1),l={to:e.address};return r?(0,s.jsx)("p",{children:"Requesting tokens from API..."}):t?(0,s.jsx)("div",{children:(0,s.jsxs)("p",{children:["Result from API: ",t.result?"worked":"failed"]})}):(0,s.jsx)("div",{className:"card bg-primary text-primary-content mt-4",children:(0,s.jsxs)("div",{className:"card-body",children:[(0,s.jsx)("h2",{className:"card-title",children:(0,s.jsx)("p",{className:"text-center",children:"Mint tokens"})}),(0,s.jsx)("button",{className:"btn btn-active btn-neutral",onClick:()=>{c(!0),fetch("".concat("https://tokenvotedapp-9jc31xz7.b4a.run","/mint-tokens"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)}).then(e=>e.json()).then(e=>{n(e),c(!1)})},children:"Request 1000000 tokens"})]})})},c=e=>{let{address:t,canSelfDelegate:n}=e,[r,c]=(0,a.useState)(),[l,d]=(0,a.useState)(!1),i={to:t};return l?(0,s.jsx)("p",{children:"Self Delegating ..."}):r?(0,s.jsx)("div",{children:(0,s.jsxs)("p",{children:["Result from API: ",r.result?"worked":"failed"]})}):(0,s.jsx)("div",{className:"card bg-primary text-primary-content mt-4",children:(0,s.jsxs)("div",{className:"card-body",children:[(0,s.jsx)("h2",{className:"card-title",children:(0,s.jsx)("p",{className:"text-center",children:"Self Delegating (only available if user has balance)"})}),(0,s.jsx)("button",{disabled:!n,className:"btn btn-active btn-neutral",onClick:()=>{d(!0),fetch("".concat("https://tokenvotedapp-9jc31xz7.b4a.run","/self-delegate"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then(e=>e.json()).then(e=>{c(e),d(!1)})},children:"Self Delegating"})]})})},l=()=>{let[e,t]=(0,a.useState)(),[n,r]=(0,a.useState)(!0);return((0,a.useEffect)(()=>{fetch("".concat("https://tokenvotedapp-9jc31xz7.b4a.run","/contract-address")).then(e=>e.json()).then(e=>{t(e),r(!1)})},[]),n)?(0,s.jsx)("p",{children:"Loading token address from API..."}):e?(0,s.jsx)("div",{children:(0,s.jsxs)("p",{children:["Token address from API:",(0,s.jsx)("br",{}),(0,s.jsx)("p",{style:{fontWeight:"bold"},children:e.result})]})}):(0,s.jsx)("p",{children:"No token address information"})};var d=n(69077);let i=()=>{let{address:e}=(0,d.mA)(),{data:t,isError:n,isLoading:a}=(0,d.do)({address:"0xE4df6fBbC99c537CC0D1935a404727399A47F469",abi:[{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"balanceOf",outputs:[{name:"balance",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"}],functionName:"balanceOf",args:[e]}),i="number"==typeof t||"bigint"==typeof t?t:0;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"card bg-primary text-primary-content mt-4",children:(0,s.jsxs)("div",{className:"card-body",children:[(0,s.jsx)("h2",{className:"card-title",children:"MyToken Infos : "}),(0,s.jsx)(o,{}),(0,s.jsx)(x,{isLoading:a,isError:n,balance:i}),(0,s.jsx)(l,{}),(0,s.jsx)(r,{address:e})]})}),(0,s.jsx)("div",{className:"card bg-primary text-primary-content mt-4",children:(0,s.jsx)("div",{className:"card-body",children:(0,s.jsx)(c,{address:e,canSelfDelegate:0!==i})})})]})};function o(){let{data:e,isError:t,isLoading:n}=(0,d.do)({address:"0xE4df6fBbC99c537CC0D1935a404727399A47F469",abi:[{constant:!0,inputs:[],name:"name",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"}],functionName:"name"});return n?(0,s.jsx)("div",{children:"Fetching name…"}):t?(0,s.jsx)("div",{children:"Error fetching name"}):(0,s.jsxs)("div",{children:["Token name: ","string"==typeof e?e:0]})}function x(e){let{isLoading:t,isError:n,balance:a}=e;return t?(0,s.jsx)("div",{children:"Fetching balance…"}):n?(0,s.jsx)("div",{children:"Error fetching token balance. Pls connect wlt!"}):(0,s.jsxs)("div",{children:["Balance (MTK): ",a.toString()]})}let h=Number("10000000000000000000"),p=e=>{let{}=e,[t,n]=(0,a.useState)(""),[r,c]=(0,a.useState)(!1),l=async()=>{n("1000000"),c(!1)},d=!!t&&Number(t)>h;console.log(h);let i=async()=>{c(!0),fetch("".concat("https://tokenvotedapp-9jc31xz7.b4a.run","/deploy-tokenized"),{method:"POST",headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{console.log(e),c(!1)})};return((0,a.useEffect)(()=>{l()},[]),r)?(0,s.jsx)("p",{children:"Fetching total supply ..."}):(0,s.jsx)("div",{className:"card bg-primary text-primary-content mt-4",children:(0,s.jsxs)("div",{className:"card-body",children:[(0,s.jsx)("h2",{className:"card-title",children:(0,s.jsxs)("p",{className:"text-center",children:["total supply : ",t," (this is mocked)"]})}),d?(0,s.jsx)("button",{className:"btn btn-active btn-neutral",onClick:i,children:"deploy Tokenized Ballot with default Proposals"}):(0,s.jsx)("div",{children:"You cannot deploy Tokenized Ballot yet, total supply is inferior to the minimum requested "})]})})},m=e=>{let{tokenizedBallot:t}=e;return(0,s.jsx)("div",{className:"card bg-primary text-primary-content mt-4",children:(0,s.jsxs)("div",{className:"card-body",children:[(0,s.jsx)("h2",{className:"card-title",children:"Tokenized Ballot Infos : "}),(0,s.jsxs)("p",{children:["Name : ",t.name]}),(0,s.jsxs)("p",{children:["Address : ",t.address]})]})})},u=e=>{var t;let{}=e,[n,r]=(0,a.useState)({name:"mock",address:""}),[c,l]=(0,a.useState)(!1),d=async()=>{r({name:"",address:""}),l(!1)},i=null!==(t=n.address)&&void 0!==t&&t;return((0,a.useEffect)(()=>{d()},[]),c)?(0,s.jsx)("p",{children:"Fetching Tokenized Ballot contract..."}):i?(0,s.jsx)(m,{tokenizedBallot:n}):(0,s.jsx)(p,{})},j=e=>{let{data:t,isError:n,isLoading:a}=(0,d.KQ)({address:e.address});return a?(0,s.jsx)("div",{children:"Fetching balance…"}):n?(0,s.jsx)("div",{children:"Error fetching balance"}):(0,s.jsx)("div",{className:"card bg-primary text-primary-content mt-4",children:(0,s.jsxs)("div",{className:"card-body",children:["My current Balance: ",null==t?void 0:t.formatted," ",null==t?void 0:t.symbol]})})},b=()=>{let{address:e,isConnecting:t,isDisconnected:n}=(0,d.mA)(),{chain:a}=(0,d.LN)();return e?(0,s.jsxs)("div",{style:{backgroundColor:"transparent",boxShadow:"  0px 4px 8px -2px rgba(9, 30, 66, 0.25), 0px 0px 0px 1px rgba(9, 30, 66, 0.08)",padding:"12px",borderRadius:"5%"},children:[(0,s.jsxs)("p",{children:["Your account address is ",e]}),(0,s.jsxs)("p",{children:["Connected to the network ",null==a?void 0:a.name]}),(0,s.jsx)(j,{address:e})]}):t?(0,s.jsx)("div",{children:(0,s.jsx)("p",{children:"Loading..."})}):n?(0,s.jsx)("div",{children:(0,s.jsx)("p",{children:"Wallet disconnected. Connect wallet to continue"})}):(0,s.jsx)("div",{children:(0,s.jsx)("p",{children:"Connect wallet to continue"})})},f=()=>(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{className:"flex items-center flex-col flex-grow pt-10",children:(0,s.jsxs)("div",{className:"px-5",children:[(0,s.jsxs)("h1",{className:"text-center mb-8",children:[(0,s.jsx)("span",{className:"block text-2xl mb-2",children:"Welcome to"}),(0,s.jsx)("span",{className:"block text-4xl font-bold",children:"Our DApp - Team 11"})]}),(0,s.jsx)(y,{})]})})});function y(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("p",{className:"text-center text-lg",children:" My Wallet information "}),(0,s.jsx)(b,{}),(0,s.jsx)("br",{})," ",(0,s.jsx)(i,{}),(0,s.jsx)("br",{}),(0,s.jsx)(u,{})]})}var v=f}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=48312)}),_N_E=e.O()}]);