import{r as p,j as e}from"./index-pdw-_P6u.js";import{a as f}from"./axios-x9P0maA2.js";const y=()=>{const[n,c]=p.useState(""),[i,r]=p.useState([]),g=async t=>{if(t.preventDefault(),!n.trim())return;const o={role:"user",content:n},d=[...i,o];r(d),c("");try{const u=(await f.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCxo6MAhPSEPlTdZkrY-oUBSLnZquocI34",{contents:[{parts:[{text:n}]}]},{headers:{"Content-Type":"application/json"}})).data.candidates[0].content.parts.map(s=>s.text.split(`
`).map(a=>a.trim().replace(/```(.*?)```/gs,"<pre>$1</pre>").replace(/\*(.*?)\*/g,"<b>$1</b>")).join(`
`)).join(" ").split(" ");let l=0;const x={role:"model",content:""};r([...d,x]);const h=setInterval(()=>{l<u.length?(r(s=>{const a=s[s.length-1];return[...s.slice(0,-1),{...a,content:a.content+" "+u[l]}]}),l++):clearInterval(h)},100)}catch(m){console.error("Error fetching data from Gemini API:",m)}};return e.jsx("div",{className:"flex justify-center",children:e.jsxs("div",{className:"relative w-5/6 flex flex-col justify-center p-6 bg-white bg-opacity-90 rounded-lg shadow-md min-h-[90vh] max-h-[110vh]",children:[e.jsx("div",{className:"bg-red-600 flex justify-center font-bold text-2xl",children:"Welcome to the chatbot"}),e.jsx("div",{className:"flex-1 overflow-y-auto mb-4",children:e.jsx("div",{className:"messages space-y-2",children:i.map((t,o)=>e.jsx("div",{className:`p-3 rounded-lg ${t.role==="user"?"bg-blue-300 text-left":"bg-green-300 text-left"}`,dangerouslySetInnerHTML:{__html:t.content}},o))})}),e.jsxs("form",{onSubmit:g,className:"relative flex mt-auto",children:[e.jsx("input",{type:"text",value:n,onChange:t=>c(t.target.value),className:"flex-1 p-3 border border-gray-300 rounded-l-lg"}),e.jsx("button",{type:"submit",className:"p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600",children:"Send"})]})]})})};export{y as default};
