"use strict"

const $wallet       = document.querySelector('#wallet');

const $hero         = document.querySelector('#hero'),
      $imgHero      = document.querySelector('#img-hero'),
      $imgTrace     = document.querySelector('#img-trace');

const $line         = document.querySelector('#game-line');

const $score        = document.querySelector('#game-score'),
      $status       = document.querySelector('#game-status');

const $buttonsMinus  = document.querySelectorAll('#button-minus'),
      $buttonsPlus   = document.querySelectorAll('#button-plus');

const $buttonsStart = document.querySelectorAll('#button-bet');

function start({button}){
    const $wrapper  = button.parentElement.parentElement;
    const $input    = $wrapper.querySelector('#input-bet');
    const valueBet  = parseFloat($input.value);

    if( valueBet >= 0.2 ){
        console.log(1)
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