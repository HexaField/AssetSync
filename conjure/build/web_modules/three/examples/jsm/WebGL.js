var a={isWebGLAvailable:function(){try{var t=document.createElement("canvas");return!!(window.WebGLRenderingContext&&(t.getContext("webgl")||t.getContext("experimental-webgl")))}catch(n){return!1}},isWebGL2Available:function(){try{var t=document.createElement("canvas");return!!(window.WebGL2RenderingContext&&t.getContext("webgl2"))}catch(n){return!1}},getWebGLErrorMessage:function(){return this.getErrorMessage(1)},getWebGL2ErrorMessage:function(){return this.getErrorMessage(2)},getErrorMessage:function(t){var n={1:"WebGL",2:"WebGL 2"},o={1:window.WebGLRenderingContext,2:window.WebGL2RenderingContext},r='Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>',e=document.createElement("div");return e.id="webglmessage",e.style.fontFamily="monospace",e.style.fontSize="13px",e.style.fontWeight="normal",e.style.textAlign="center",e.style.background="#fff",e.style.color="#000",e.style.padding="1.5em",e.style.width="400px",e.style.margin="5em auto 0",o[t]?r=r.replace("$0","graphics card"):r=r.replace("$0","browser"),r=r.replace("$1",n[t]),e.innerHTML=r,e}};export{a as WEBGL};