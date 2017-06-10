export class toast{
  showToast(msg){
    let x = document.getElementById('snackbar');
    x.innerText = msg;
    x .className = 'show';
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
}
