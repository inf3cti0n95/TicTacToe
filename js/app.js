var registerForm = document.getElementById('registerForm');
var loginForm = document.getElementById('loginForm');
var regButton = document.getElementById('regButton');
var loginButton = document.getElementById('loginButton');
var createButton = document.getElementById('createButton');
var joinButton = document.getElementById('joinButton');
var backArrow = document.getElementsByClassName('backArrow')[0];
var gameCreateSelectContainer = document.getElementById('gameCreateSelectContainer');
var isRegPage = false;
var isLoginPage = false;
var isCreateGamePage = false;
var isJoinGamePage = false;

window.addEventListener('load', () => {
    document.getElementsByTagName('body')[0].className = "loaded";
    var req = new XMLHttpRequest();
    req.open("GET", "php/login.php?login=check");
    req.send();
    req.addEventListener('load', () => {
        if (req.readyState == 4 && req.status == 200) {
            var resp = JSON.parse(req.responseText);
            if(resp['resp']){
            loginbuttonclicked();
            isLoggedIn(resp);
        }
        }
    });
    
});

registerForm.addEventListener('submit', (e) => {

    e.preventDefault();
    var pwd = registerForm.elements.namedItem("pwd");
    var unm = registerForm.elements.namedItem("unm");
    var cpwd = registerForm.elements.namedItem("cpwd");
    var nm = registerForm.elements.namedItem("name");
    if (cpwd.value == "") {
        cpwd.focus();
        return;
    }
    if (pwd.value == "") {
        pwd.focus();
        return;
    }
    if (unm.value == "") {
        unm.focus();
        return;
    }
    if (nm.value == "") {
        nm.focus();
        return;
    }
	
	/****         viraj aa karje         ****/
    if(pwd.value!=cpwd.value)
        document.write("Please enter the same password in both field.");
    else{
        var req = new XMLHttpRequest();
        req.open("GET", "php/register.php?" + 'nm=' + nm.value +'&unm=' + unm.value +'&pwd=' + pwd.value);
        req.send();
        req.addEventListener('load', () => {
            if (req.readyState == 4 && req.status == 200) {
                var resp = JSON.parse(req.responseText);
                isRegistered(resp);
            }
        });
    }
});

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    var pwd = loginForm.elements.namedItem("pwd");
    var unm = loginForm.elements.namedItem("unm");
    var req = new XMLHttpRequest();
    req.open("GET", "php/login.php?" + 'unm=' + unm.value +'&pwd=' + pwd.value);
    req.send();
    req.addEventListener('load', () => {
        if (req.readyState == 4 && req.status == 200) {
            var resp = JSON.parse(req.responseText);
            isLoggedIn(resp);
        }
    });
});
function isLoggedIn(resp){
    if(resp['resp']){
        
        TweenMax.to(loginForm,0.5,{opacity:0,onComplete:()=>{
            loginForm.style.display="none";
            isLoginPage=false;
            backArrow.style.display="none";            
            TweenMax.to('.loginImg',0.2,{opacity:0});
            gameCreateSelectContainer.style.display="block";
            TweenMax.to(gameCreateSelectContainer,0.2,{opacity:1});
            TweenMax.to('.seperator',1,{scaleX:"1"});
        }});

    }
        
    else{

    }
        
}
function isRegistered(resp){
    if(resp['resp']=="success")
        document.write("Registration successfully.");
    else if(resp['resp']=="user_exist")
        document.write("Username already exists.");
    else
        document.write("Please try again");
}

regButton.addEventListener('click', () => {

    isRegPage = true;
    backArrow.style.display="block";
    let register = document.getElementsByClassName('register')[0];
    let login = document.getElementsByClassName('login')[0];
    let regformContainer = document.getElementsByClassName('regformContainer')[0];



    TweenMax.to(register, 0.5, {
        width: "100%"
    });
    TweenMax.to(login, 0.5, {
        x: "100%"
    });
    
    TweenMax.to(regButton,0.5,{opacity:0,onComplete: ()=>{
        regButton.style.display="none";
        TweenMax.set(regformContainer,{display:"block",opacity:0});
        TweenMax.to(regformContainer,0.5,{opacity:1});
    }});

});

loginButton.addEventListener('click', () => {


   loginbuttonclicked();

});

backArrow.addEventListener('click', () => {
    backArrowz();
});

function loginbuttonclicked(){
    
     isLoginPage = true;
    let register = document.getElementsByClassName('register')[0];
    let login = document.getElementsByClassName('login')[0];
    let loginformContainer = document.getElementsByClassName('loginformContainer')[0];

    backArrow.style.display="block";

    TweenMax.to(login, 0.5, {
        width: "100%"
    });
    TweenMax.to(register, 0.5, {
        x: "-100%"
    });
    TweenMax.to(loginButton,0.5,{opacity:0,onComplete: ()=>{
        loginButton.style.display="none";
        TweenMax.set(loginformContainer,{display:"block",opacity:0});
        TweenMax.to(loginformContainer,0.5,{opacity:1});
    }});
}
function backArrowz(){
    let register = document.getElementsByClassName('register')[0];
    let login = document.getElementsByClassName('login')[0];
    let loginformContainer = document.getElementsByClassName('loginformContainer')[0];
    let regformContainer = document.getElementsByClassName('regformContainer')[0];
    let createGameContainer = document.getElementsByClassName('createGameContainer')[0];
    let selectGameContainer = document.getElementsByClassName('selectGameContainer')[0];
    if (isRegPage) {
        TweenMax.to(register, 0.5, {
            width: "50%"
        });
        TweenMax.to(login, 0.5, {
            x: "0%"
        });
        
        TweenMax.to(regformContainer,0.5,{opacity:0,onComplete: ()=>{
            regformContainer.style.display="none";
            TweenMax.set(regButton,{display:"block",opacity:0});
            TweenMax.to(regButton,0.5,{opacity:1});
        }});
        isRegPage=!isRegPage;
    }
    if (isLoginPage) {
        TweenMax.to(login, 0.5, {
            width: "50%"
        });
        TweenMax.to(register, 0.5, {
            x: "0%"
        });
        TweenMax.to(loginformContainer,0.5,{opacity:0,onComplete: ()=>{
            loginformContainer.style.display="none";
            TweenMax.set(loginButton,{display:"block",opacity:0});
            TweenMax.to(loginButton,0.5,{opacity:1});
        }});
        isLoginPage=!isLoginPage;

    }
    if (isCreateGamePage) {
        TweenMax.to(createGameContainer, 0.5, {
            height: "calc(50% - 5px)"
        });
        TweenMax.to(selectGameContainer, 0.5, {
            y: "0%"
        });
       
            TweenMax.set('.seperator',{scaleX:"0"});
        TweenMax.to(loginformContainer ,0.5,{opacity:0,onComplete: ()=>{
            loginformContainer.style.display="none";

            TweenMax.set(createButton,{display:"block",opacity:0});
            TweenMax.to(createButton,0.5,{opacity:1});
            TweenMax.to('.seperator',1,{scaleX:"1"});
        }});
        isCreateGamePage=!isCreateGamePage;

    
    }
    if (isJoinGamePage) {
        TweenMax.to(selectGameContainer, 0.5, {
            height: "calc(50% - 5px)"
        });
        TweenMax.to(createGameContainer, 0.5, {
            y: "0%"
        });
 
           TweenMax.set('.seperator',{scaleX:"0"}); 
        TweenMax.to(loginformContainer,0.5,{opacity:0,onComplete: ()=>{
            loginformContainer.style.display="none";
 
            TweenMax.set(joinButton,{display:"block",opacity:0});
            TweenMax.to(joinButton,0.5,{opacity:1});
 
            TweenMax.to('.seperator',1,{scaleX:"1"});
        }});
        isJoinGamePage=!isJoinGamePage;

    }
    backArrow.style.display="none";
}


createButton.addEventListener('click', () => {

    isCreateGamePage = true;
    backArrow.style.display="block";
    let createGameContainer = document.getElementsByClassName('createGameContainer')[0];
    let selectGameContainer = document.getElementsByClassName('selectGameContainer')[0];
    let regformContainer = document.getElementsByClassName('regformContainer')[0];



    TweenMax.to(createGameContainer, 0.5, {
        height: "100%"
    });
    TweenMax.to(selectGameContainer, 0.5, {
        yPercent: "100"
    });
    
    TweenMax.to(createButton,0.5,{opacity:0,onComplete: ()=>{
        createButton.style.display="none";
        // TweenMax.set(regformContainer,{display:"block",opacity:0});
        // TweenMax.to(regformContainer,0.5,{opacity:1});
    }});

});
joinButton.addEventListener('click', () => {

    isJoinGamePage = true;
    backArrow.style.display="block";
    let createGameContainer = document.getElementsByClassName('createGameContainer')[0];
    let selectGameContainer = document.getElementsByClassName('selectGameContainer')[0];
    let regformContainer = document.getElementsByClassName('regformContainer')[0];



    TweenMax.fromTo(selectGameContainer, 0.5,{height:"50%"},{
        height: "100%"
    });
    TweenMax.to(createGameContainer, 0.5, {
        yPercent: "-100"
    });
    
    TweenMax.to(joinButton,0.5,{opacity:0,onComplete: ()=>{
        joinButton.style.display="none";
        // TweenMax.set(regformContainer,{display:"block",opacity:0});
        // TweenMax.to(regformContainer,0.5,{opacity:1});
    }});

});
