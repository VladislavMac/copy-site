"use strict"

const $wallet       = document.querySelector('#wallet');

const $imgHero      = document.querySelector('#img-hero'),
      $imgTrace     = document.querySelector('#img-trace');

const $line         = document.querySelector('#game-line');

const $score        = document.querySelector('#game-score'),
      $status       = document.querySelector('#game-status');

const $buttonsMinus  = document.querySelectorAll('#button-minus'),
      $buttonsPlus   = document.querySelectorAll('#button-plus');

const $buttonsStart  = document.querySelectorAll('#button-bet');
const $screen        = document.querySelector('.game-wrapper-screen');

const $hero  = document.querySelector('#hero');

let key_hero_X = $hero.style.left,
    key_hero_Y = $hero.style.top;
let key_interval_score;
let key_interval_line;
let key_score = 1.00;
let key_money = 0.0;
let key_bet = {};
let key_width_line = 0;

// #EA0075 #F222A1
// #F45F35 #FBB462

function setbuttonGet({button : button}){
    button.id = 'button-get'
    button.style.background = "linear-gradient(263.87deg, #F45F35 0%, #FBB462 100%)"
    button.querySelector('#out-money').style.display = 'flex'
    button.querySelector('#out-title').innerHTML = 'ЗАБРАТЬ'

    button.addEventListener('click', () =>{
        getBet({button : button})
    })
}

function setbuttonCancel({button : button}){
    button.id = 'button-cancel'
    button.style.background = "linear-gradient(263.87deg, #EA0075 0%, #F222A1 100%)"
    button.querySelector('#out-money').style.display = 'none'
    button.querySelector('#out-title').innerHTML = 'ОТМЕНИТЬ'

    button.addEventListener('click', () =>{
        returnBet({button : button})
    })
}

function setbuttonSet({button : button}){
    button.id = 'button-bet'
    button.style.background = "linear-gradient(263.87deg, rgb(148, 78, 245) 0%, rgb(92, 36, 252) 100%)"
    button.querySelector('#out-money').style.display = 'none'
    button.querySelector('#out-title').innerHTML = 'СТАВКА'

    button.addEventListener('click', () =>{
        setBet({button : button})
    })
}

function screenEnd(){
    $screen.style.display = 'none';
    $screen.querySelector('#line').style.width = '100%';

    key_score = 1.00;
    if( Object.keys(key_bet).length !== 0 ){
        for(const index in key_bet){
            for(const key in key_bet[index]){
                setbuttonGet({button : key_bet[index][key]})
            }
        }
    }

    statusSet();    
    heroFly();
    scoreStart();
    lucky();
}

function screenStart(){
    const $line = $screen.querySelector('#line');
    $screen.style.display = 'block';
    key_interval_line = setInterval(() =>{
        key_width_line = ($line.getBoundingClientRect().width.toFixed(0) - 1);

        $line.style.width = key_width_line + 'px';
        if( $line.style.width === '0px' ){
            clearInterval(key_interval_line);
            screenEnd();    
        }
    },30)
}

screenStart()

function setMoney(){
    const $money = document.querySelector('#money');
    $money.innerHTML = key_money.toFixed(1) + '&nbsp;$';
}

function heroReturn(){
    const $hero  = document.querySelector('#hero');

    $hero.style.transform = 'rotate(0deg)';

    $hero.style.left = key_hero_X;
    $hero.style.top  = key_hero_Y;
}

function heroGoodbye(){
    const $hero  = document.querySelector('#hero');
    const x = $hero.style.left,
          y = $hero.style.top;

    $hero.style.left = parseInt(x) + 400 + 'px';
    $hero.style.top = parseInt(y) - 100 + 'px';
}

function heroFly(){
    const $hero  = document.querySelector('#hero');
    const x = 256, y = 50;

    $hero.style.transform = 'rotate(8deg)';

    $hero.style.left = x + 'px';
    $hero.style.top  = y  + 'px';
}

function scoreStart(){ // 2 to all button
    key_interval_score = setInterval(() => {
        key_score += 0.01
        $score.innerHTML = `x${key_score.toFixed(2)}`;
        for(const index in key_bet){
            for(const key in key_bet[index]){
                key_bet[index][key].querySelector('#out-money').innerHTML = (key_score * key).toFixed(2) + '$'
            }
        }
    }, 100);
}

function statusSet(status){
    if(status){
        $status.style.color = 'rgb(250, 250, 250)';
        return true
    }
    $status.style.color = 'rgb(250, 250, 250, 0)';
}

function gameEnd(){
    clearInterval(key_interval_score);
    heroGoodbye();
    for(const index in key_bet){
        for(const key in key_bet[index]){
            setbuttonSet({button : key_bet[index][key]})
        }
    }
    key_bet = {};

    setTimeout(()=>{
        heroReturn();
        screenStart()
    }, 3000)
}

function lucky(){
    let time = {min : 100, max : 10000}

    setTimeout(() =>{
        gameEnd();
        statusSet(true)
    }, Math.floor(Math.random() * (time.max - time.min)) + time.min)
}

function returnBet({button}){  
    // for(const index in key_bet){
    //     for(const key in key_bet[index]){
    //         if( index === button.getAttribute('type') ){
    //             let returmNum = (parseFloat(key)) + key_money;
    //             key_money = returmNum;
    //             setMoney();
    //             setbuttonSet({button: key_bet[index][key]})
    //             delete key_bet[index]
    //         }
    //     }
    // }
}

function setBet({button}){
    const $wrapper  = button.parentElement.parentElement;
    const $input    = $wrapper.querySelector('#input-bet');
    const valueBet  = parseFloat($input.value);
    if( valueBet >= 0.2 && key_money >= 0.2 && key_width_line > 0 ){
        key_bet[button.getAttribute('type')] = {[valueBet] : button}
        console.log(key_bet)
        key_money = key_money - valueBet;
        setMoney()
        setbuttonCancel({button : button});
    }
}

function betMinus({button}){
    const $wrapper  = button.parentElement.parentElement;
    const $input    = $wrapper.querySelector('#input-bet');
    const valueBet  = parseFloat($input.value);

    if( valueBet > 0.1 ){
        $input.value = (valueBet - 0.1).toFixed(1)
    }
}
function betPlus({button}){
    const $wrapper  = button.parentElement.parentElement;
    const $input    = $wrapper.querySelector('#input-bet');
    const valueBet  = parseFloat($input.value);

    $input.value = (valueBet + 0.1).toFixed(1)
}

setMoney();

$buttonsStart.forEach(button =>{
        console.log(1)
    setbuttonSet({button : button})
})

$buttonsMinus.forEach(button =>{
    button.addEventListener('click', () =>{
        betMinus({button : button})
    })
})

$buttonsPlus.forEach(button =>{
    button.addEventListener('click', () =>{
        betPlus({button : button})
    })
})

$wallet.addEventListener('click', () =>{
    key_money += 2.0;
    setMoney();
})