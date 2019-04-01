# KonamiCode
Code for having a secret code sequence on a website. 

```
const KONAMI_CODE = [38,38,40,40,37,39,37,39,66,65,13];

let konami = new SecretCode(KONAMI_CODE, "konami code");

window.addEventListener(konami.SUCCESS_EVENT, ()=>{
  konami.clear();
  console.log("~~~POWER UPS~~~");
});
```
