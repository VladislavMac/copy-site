const $width = document.querySelector('#width');
const $height = document.querySelector('#height');

const $button = document.querySelector('button');

$button.addEventListener('click', () =>{
    this.$screenW = window.innerWidth;
    this.$screenH = window.innerHeight;
    
    $width.innerHTML  = this.$screenW
    $height.innerHTML = this.$screenH
})