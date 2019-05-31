// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      *jenkins.tc-gaming*
// @grant        none
// ==/UserScript==

!function() {
    const d = [];
    [].forEach.call(document.querySelectorAll('#projectstatus>tbody>tr[id]'), a=>d.push(`['${a.id}', '${a.id.replace(/tcg *-? *|job *[-_] *?/gi, '').replace(/ *([-_])+ */, '$1')}', '']`));
    const cfg = `\n\t['','======== 我是分割线，可以作为分类命名 =========='],\n\t` + d.join(',\n\t');
    const url = location.href;
    const tpl = `// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  jenkins 视图整理脚本模板
// @author       You
// @match        /*url*/
// @grant        none
// ==/UserScript==
// 配置说明： ['目标ID'  ,  '显示名称'  ,  '替换跳转链接']
// 举个栗子： 链接到 sit-jenkins.xxxx.co:8080
//  [
//     'job_TCG WEB AAA - SIT DEPLOYMENT',
//     'AAA WEB DEPLOYMENT SIT',
//     'http://sit-jenkins.xxxx.co:8080/job/SIT%20-%2050%20WEB%20Deployment%20AAA/build?delay=0sec'
//  ],
const config = [/*cfg*/];
(function() {
    setTimeout(()=>{
    const a=[]
    const ps = document.querySelector('#projectstatus tbody');
    function fix(id,text,jump,i){
        let tr;
        if(!id){
            tr = document.createElement('tr');
            tr.calssName = "job-status-nobuilt";
            tr.innerHTML='<td colspan="8" style="text-align: center;background: #e3f1f0;"><a class="model-link inside">'+text+'</a>'
                +'</td>';
        }else{
          tr = ps.querySelector('[id="'+id+'"]');
          if(!tr){
              tr = ps.querySelector('.job-status-blue,.job-status-nobuilt,.job-status-red').clone(true);
              tr.querySelector('.model-link').textContent=text+'[NOT FOUND]';
          }else tr.querySelector('.model-link').textContent=text;
          if(jump)[].forEach.call(tr.querySelectorAll('td a'),a=>{
            if(a.textContent[0]!=='#'){
               a.href = jump;
               a.target="_blank";
            }
          });
        }
        a.push(tr);
    }
    config.forEach((c,i)=>fix(c[0],c[1],c[2],i));
    ps.innerHTML = '';
    a.forEach(tr=> ps.appendChild(tr));
    },100)
})(config);
`

    const dom = document.body.appendChild(document.createElement('div'));
    const script = document.createElement('script');
    script.onload = e=>{
        document.getElementById('x-copy').style.display = "block";
        new ClipboardJS('#x-copy').on('success', function(e) {
            e.trigger.textContent = '已复制！';
            setTimeout(()=>e.trigger.textContent = '复制', 2e3);
        });
    }
    script.src = "https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js"
    document.head.appendChild(script);
    dom.innerHTML = '<style>.x-msk{position:fixed;width:800px;right:0;bottom:0;height:700px;background:#fff;border-radius:10px 0 0;padding:10px;box-shadow:rgba(0,0,0,.15) -2px -2px 20px;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transition:.3s ease-in-out;transition:.3s ease-in-out}.x-msk[data-a="-1"]{-webkit-transform:translate3d(720px,662px,0);transform:translate3d(720px,662px,0)}.x-msk *{font-family:Microsoft YaHei!important}button#x-re{float:left}#x-cfg{width:100%;display:block;height:649px;color:#8bc34a;line-height:1.5;border:0;background:#181818;font-size:12px;padding:10px;border-radius:4px}.x-msk button{float:right;margin:0 4px 7px;font-size:12px;border:0;background:#607d8b;color:#fff;padding:4px 13px;border-radius:3px;box-shadow:rgba(0,0,0,.1) 0 2px 4px}</style>' + '<div class="x-msk" data-a="-1"><div>' + '<button id="x-copy"  data-clipboard-target="#x-cfg" style="display:none">复制</button>' + '<button id="x-ts">测试</button>' + '<button id="x-reset">重置</button>' + '<button id="x-re">展开</button>'
    + '</div><div class="x-ctx"><textarea id="x-cfg"></textarea></div><div>';
    const vv = tpl.replace('/*url*/', url).replace('/*cfg*/', cfg);
    ;const e = document.getElementById('x-cfg');
    e.value = vv;
    document.getElementById('x-ts').onclick = ()=>eval(e.value);
    document.getElementById('x-reset').onclick = ()=>e.value = vv;
    const tg = document.getElementById('x-re');
    const mk = document.querySelector('.x-msk');
    tg.onclick = ()=>{
        tg.textContent = (mk.dataset.a = ~mk.dataset.a) ? '展开' : '收起';
    }
    ;
}();
