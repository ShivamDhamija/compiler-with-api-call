var white=document.getElementById("white");
var black=document.getElementById("black");
var btn=document.getElementById("btn");
var lang=document.getElementById("lang");

btn.addEventListener("click",function()
{  
var value=white.value;
var key=lang.value;
  
var data={code:value,langId:key}

btn.style.border = '2px solid orange';

  console.log("key value : "+key);

console.log("function 1 start")
  var request = new XMLHttpRequest();

  request.open("POST","https://codequotient.com/api/executeCode");
  
  request.setRequestHeader("Content-Type", "application/json");

  request.send( JSON.stringify(data));
 
  request.addEventListener("load", function(event)
  {
    var dato = JSON.parse(event.target.responseText);
     console.log("31 "+dato);
     if(dato.error!==undefined)
     {
       black.innerText=dato.error;
       console.log("1st error come");
     }
     else
     {
       var  id=setTimeout(function()
       {
          console.log("2nd function start");
         var req = new XMLHttpRequest();

         req.open("GET","https://codequotient.com/api/codeResult/"+dato.codeId);

         req.send();
          //console.log(req);
          req.addEventListener("load",function(event){
         clearInterval(id);
         var x=JSON.parse(event.target.responseText);
         var dt = JSON.parse(x.data);
          console.log(x);
          if(dt.errors!=="")
          {
            black.innerText = dt.errors;
             console.log("2nd error come");
          }
          else
          { console.log("out come");
            black.innerText = dt.output;
          }
        })
       },5000);

     }
  } 
  );
});
