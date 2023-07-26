"use strict"

const $wallet       = document.querySelector('#wallet');

const $imgHero      = document.querySelector('#img-hero'),
      $imgTrace     = document.querySelector('#img-trace');

const $line         = document.querySelector('#game-line');

const $score        = document.querySelector('#game-score'),
      $status       = document.querySelector('#game-status');

const $buttonsMinus  = document.querySelectorAll('#button-minus'),
      $buttonsPlus   = document.querySelectorAll('#button-plus');

const $buttonsStart = document.querySelectorAll('#button-bet');

function fly(){
    const $hero  = document.querySelector('#hero');

    const heroX  = $hero.getBoundingClientRect().x,
          heroY  = $hero.getBoundingClientRect().y;

    let x = 256, y = 50;

    $hero.style.transform = 'rotate(8deg)';

    $hero.style.left = x + 'px';
    $hero.style.top  = y  + 'px';
}

function start({button}){
    const $wrapper  = button.parentElement.parentElement;
    const $input    = $wrapper.querySelector('#input-bet');
    const valueBet  = parseFloat($input.value);

    if( valueBet >= 0.2 ){
        fly();
        setTimeout(() =>{
            move();
        }, 200)
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

function addMoney({money}){
    const $money = document.querySelector('#money');
    const value = parseFloat($money.innerHTML);
    $money.innerHTML = (value + money).toFixed(1) + '&nbsp;$';
}

$buttonsStart.forEach(button =>{
    button.addEventListener('click', () =>{
        start({button : button})
    })
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
    addMoney({money : 2});
})