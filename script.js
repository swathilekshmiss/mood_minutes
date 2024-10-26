 let music = new Audio("alm.mp3")
const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");
let alarmTime, isAlarmSet,
ringtone = new Audio("./files/ringtone.mp3");
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}
setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }
});
function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
}
setAlarmBtn.addEventListener("click", setAlarm);
(function(){
    setInterval(function(){
      var temps = new Date();
      var h = temps.getHours();
      var m = temps.getMinutes();
      var s = temps.getSeconds();
  
      if(h < 10) {
        h = "0" + h;
      }
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
  
      document.getElementById("heure").textContent = h + ":" + m + ":" + s;
    },1000);
  
  
    var i = 1;
    document.getElementById("plus").addEventListener('click', function() {
      var cp = document.getElementById("ligne").cloneNode(true);
      var div = document.createElement("div");
      div.setAttribute("id", "num" + i);
      var liste = document.getElementById("liste");
      liste.appendChild(div);
      liste.appendChild(cp);
      document.querySelector("#liste #num" + i + " + #ligne").hidden = false;
  
    
      var l_sup = document.querySelector("#liste #num" + i + " + #ligne");
      var l2_sup = document.querySelector("#num" + i);
      document.querySelector("#num" + i + " + #ligne #del").addEventListener('click', function() {
        l_sup.parentNode.removeChild(l_sup);
        l2_sup.parentNode.removeChild(l2_sup);
      });
  
      audio = document.querySelector("#num" + i + " + #ligne #audio");
      select = document.querySelector("#num" + i + " + #ligne #son");
      document.querySelector("#num" + i + " + #ligne #son").addEventListener("click", function(){
  
        value = select.value;
        audio.setAttribute("src", value);
      });
      i++;
    });
  })();
  let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/unstoppable.jpg',
        name : 'Unstoppable',
        artist : 'by Sia',
        music : 'music/unstoppable.mp3'
    },
    {
        img : 'images/Kar-Har-Maidaan-Fateh-Sanju-500-500.jpg',
        name : 'Maidaan Fateh',
        artist : 'by Shreya Ghoshal, Sukhwinder Singh',
        music : 'music/Kar Har Maidaan Fateh.mp3'
    },
    {
        img : 'images/restart.jpg',
        name : 'Restart',
        artist : 'by Shaan, Swanand Kirkire',
        music : 'music/Restart(PagalWorldl).mp3'
    },
    {
        img : 'images/bandeya.jpg',
        name : 'Bandeya re Bandeya',
        artist : 'by Arijit Singh, Asees Kaur',
        music : 'music/Bandeya Rey Bandeya - Arijit Singh, Asees Kaur.m4a'
    }


];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}