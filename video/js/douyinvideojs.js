// 获取元素
var video=document.querySelector("video");
var play=document.querySelector(".fa-play");
var current=document.querySelector(".current");
var total=document.querySelector(".total");
var progress=document.querySelector(".progress");
var line=document.querySelector(".line");
var volume=document.querySelector(".volume");
var expand=document.querySelector(".fa-expand");
var current_time;


video.addEventListener("canplay", function(){
  video.style.display="block";

  // 点击播放
  play.onclick=function(){
    if(video.paused){
      video.play();
    }else{
      video.pause();
    }
    this.classList.toggle("fa-pause");
  }

  // 点击静音
  volume.onclick=function(){
    this.classList.toggle("fa-volume-off");
    this.classList.toggle("fa-volume-up");
    // 如果不是静音
    if ( !video.muted ) {
      video.muted=true;
    }else{
      video.muted=false;
    }
  }

  var total_time=video.duration;
  var h = parseInt(total_time/3600);
  var m = parseInt(total_time%3600/60);
  var s = parseInt(total_time%60);

  h = h>=10? h:"0"+h;
  m = m>=10? m:"0"+m;
  s = s>=10? s:"0"+s;
  total.innerHTML = h + ":" + m + ":" + s;

  // 监听当前播放时间
  video.addEventListener("timeupdate", function(){
    current_time = this.currentTime;

    var h = parseInt(current_time/3600);
    var m = parseInt(current_time%3600/60);
    var s = parseInt(current_time%60);

    h = h>=10? h:"0"+h;
    m = m>=10? m:"0"+m;
    s = s>=10? s:"0"+s;
    current.innerHTML = h + ":" + m + ":" + s;

    var new_width = current_time/total_time*100+"%";
    line.style.width = new_width;

  });

  // 跳播
  progress.onclick=function(e){
    var percent = e.offsetX/this.getAttribute("width");

    video.currentTime=percent*total_time;
  }

  // 最大化
  expand.onclick=function(){
    video.webkitRequestFullScreen();
  }
});
