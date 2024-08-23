const navbar = document.querySelector(".navbar");
let scoreTotal = 0;
let agePoints = 0;
let englishPoints = 0;
let overSeasWorkPoints = 0;
let auWorkPoints = 0;
let educationalPoints = 0;
let auStudyPoints = 0;
let auSteamPoints = 0;
let auCertifiedPoints = 0;
let auRegionalPoints = 0;
let auPartnerPoints = 0;
let auPYPoints = 0;

function total(){
    scoreTotal = agePoints + englishPoints + overSeasWorkPoints + auWorkPoints + educationalPoints + auStudyPoints + auSteamPoints + auCertifiedPoints + auRegionalPoints + auPartnerPoints + auPYPoints;
    console.log(scoreTotal);
    navbar.innerHTML = `<p class="scoreTotal">Your score：${scoreTotal}</p>`;
};

//age value
const age = document.querySelectorAll('input[name="age"]');
const agePoint = document.querySelector(".agePoint");
document.addEventListener("click",function(e){
    if (e.target.name == "age"){
        agePoint.innerHTML = `<h3>Age</h3><p class="point text-center">${e.target.value}</p>`;
        agePoints = parseInt(e.target.value);
        total();
    }
});
//english value
const english = document.querySelectorAll('input[name="english"]');
const englishPoint = document.querySelector(".englishPoint");
document.addEventListener("click",function(e){
    if (e.target.name == "english"){
        englishPoint.innerHTML = `<h3>English language requirements</h3><p class="point text-center">${e.target.value}</p>`;
        englishPoints = parseInt(e.target.value);
        total();
    }
});
//overSeasWork value
const overSeasWork = document.querySelectorAll('input[name="overSeasWork"]');
const overSeasWorkPoint = document.querySelector(".overSeasWorkPoint");
document.addEventListener("click",function(e){
    if (e.target.name == "overSeasWork"){
        overSeasWorkPoint.innerHTML = `<h3>Overseas work Experience</h3><p class="point text-center">${e.target.value}</p>`;
        overSeasWorkPoints = parseInt(e.target.value);
        total();
    }
});
//auWork value
const auWork = document.querySelectorAll('input[name="auWork"]');
const auWorkPoint = document.querySelector(".auWorkPoint");
document.addEventListener("click",function(e){
    if (e.target.name == "auWork"){
        auWorkPoint.innerHTML = `<h3>Australian work Experience</h3><p class="point text-center">${e.target.value}</p>`;
        auWorkPoints = parseInt(e.target.value);
        total();
    }
});
//educational value
const educational = document.querySelectorAll('input[name="educational"]');
const educationalPoint = document.querySelector(".educationalPoint");
document.addEventListener("click",function(e){
    if (e.target.name == "educational"){
        educationalPoint.innerHTML = `<h3>Educational Qualifications</h3><p class="point text-center">${e.target.value}</p>`;
        educationalPoints = parseInt(e.target.value);
        total();
    }
});
//auStudy value
const auStudy = document.querySelectorAll('input[name="auStudy"]');
const auStudyPoint = document.querySelector(".auStudyPoint");
document.addEventListener("click",function(e){
    if (e.target.name == "auStudy"){
        auStudyPoint.innerHTML = `<h3>Australian study requirement</h3><p class="point text-center">${e.target.value}</p>`;
        auStudyPoints = parseInt(e.target.value);
        total();
    }
});
//auSteam value
const auSteam = document.querySelectorAll('input[name="auSteam"]');
const auSteamPoint = document.querySelector(".auSteamPoint");
document.addEventListener("click",function(e){
    if (e.target.name == "auSteam"){
        auSteamPoint.innerHTML = `<h3>Specialist education qualification</h3><p class="point text-center">${e.target.value}</p>`;
        auSteamPoints = parseInt(e.target.value);
        total();
    }
});
//auCertified value
const auCertified = document.querySelectorAll('input[name="auCertified"]');
const auCertifiedPoint = document.querySelector(".auCertifiedPoint");
document.addEventListener("click",function(e){
    if (e.target.name == "auCertified"){
        auCertifiedPoint.innerHTML = `<h3>Credentialled community language</h3><p class="point text-center">${e.target.value}</p>`;
        auCertifiedPoints = parseInt(e.target.value);
        total();
    }
});
//auRegional value
const auRegional = document.querySelectorAll('input[name="auRegional"]');
const auRegionalPoint = document.querySelector(".auRegionalPoint");
document.addEventListener("click",function(e){
    if (e.target.name == "auRegional"){
        auRegionalPoint.innerHTML = `<h3>Study in regional Australia</h3><p class="point text-center">${e.target.value}</p>`;
        auRegionalPoints = parseInt(e.target.value);
        total();
    }
});
//auPartner value
const auPartner = document.querySelectorAll('input[name="auPartner"]');
const auPartnerPoint = document.querySelector(".auPartnerPoint");
document.addEventListener("click",function(e){
    if (e.target.name == "auPartner"){
        auPartnerPoint.innerHTML = `<h3>Partner skills</h3><p class="point text-center">${e.target.value}</p>`;
        auPartnerPoints = parseInt(e.target.value);
        total();
    }
});
//auPY value
const auPY = document.querySelectorAll('input[name="auPY"]');
const auPYPoint = document.querySelector(".auPYPoint");
document.addEventListener("click",function(e){
    if (e.target.name == "auPY"){
        auPYPoint.innerHTML = `<h3>Professional year in Australia</h3><p class="point text-center">${e.target.value}</p>`;
        auPYPoints = parseInt(e.target.value);
        total();
    }
});



//click to change colour
$(function(){
    $('.ageButton').find('button').click(function(e){ 
        if(e.target.getAttribute("class") !== "checked"){
            $(this).toggleClass('checked');
            $(this).siblings().removeClass('checked');
        }
        else{
            return
        }
    });
    $('.englishButton').find('button').click(function(e){ 
        if(e.target.getAttribute("class") !== "checked"){
            $(this).toggleClass('checked');
            $(this).siblings().removeClass('checked');
        }
        else{
            return
        }
    });
    $('.overSeasWorkButton').find('button').click(function(e){ 
        if(e.target.getAttribute("class") !== "checked"){
            $(this).toggleClass('checked');
            $(this).siblings().removeClass('checked');
        }
        else{
            return
        }
    });
    $('.auWorkButton').find('button').click(function(e){ 
        if(e.target.getAttribute("class") !== "checked"){
            $(this).toggleClass('checked');
            $(this).siblings().removeClass('checked');
        }
        else{
            return
        }
    });
    $('.educationalButton').find('button').click(function(e){ 
        if(e.target.getAttribute("class") !== "checked"){
            $(this).toggleClass('checked');
            $(this).siblings().removeClass('checked');
        }
        else{
            return
        }
    });
    $('.auStudyButton').find('button').click(function(e){ 
        if(e.target.getAttribute("class") !== "checked"){
            $(this).toggleClass('checked');
            $(this).siblings().removeClass('checked');
        }
        else{
            return
        }
    });
    $('.auSteamButton').find('button').click(function(e){ 
        if(e.target.getAttribute("class") !== "checked"){
            $(this).toggleClass('checked');
            $(this).siblings().removeClass('checked');
        }
        else{
            return
        }
    });
    $('.auCertifiedButton').find('button').click(function(e){ 
        if(e.target.getAttribute("class") !== "checked"){
            $(this).toggleClass('checked');
            $(this).siblings().removeClass('checked');
        }
        else{
            return
        }
    });
    $('.auRegionalButton').find('button').click(function(e){ 
        if(e.target.getAttribute("class") !== "checked"){
            $(this).toggleClass('checked');
            $(this).siblings().removeClass('checked');
        }
        else{
            return
        }
    });
    $('.auPartnerButton').find('button').click(function(e){ 
        if(e.target.getAttribute("class") !== "checked"){
            $(this).toggleClass('checked');
            $(this).siblings().removeClass('checked');
        }
        else{
            return
        }
    });
    $('.auPYButton').find('button').click(function(e){ 
        if(e.target.getAttribute("class") !== "checked"){
            $(this).toggleClass('checked');
            $(this).siblings().removeClass('checked');
        }
        else{
            return
        }
    });

})

//navbar
$(window).scroll(function(){
    if($(this).scrollTop()>85){
        document.querySelector('.navbar').classList.add('fixed-top');
    }else{
        document.querySelector('.navbar').classList.remove('fixed-top');
    }
});

// issue: value, colour, calculate