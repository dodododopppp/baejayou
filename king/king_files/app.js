const q =['','사자왕', '햄버거왕', '송금왕', '제빵왕', '등산왕', '걷기왕', '메모왕', '주차왕', '배구왕', '요리왕', '잠금왕', '욕설왕', '감시왕', '농담왕', '컴퓨터왕', '대화왕', '시험왕', '확인왕', '생각왕', '설득왕',  '제조왕', '과자왕', '담배왕', '댄스왕', '숙제왕','정글왕', '방어왕', '너일루왕', '로봇왕', '영어왕'];
const a=['','라이온킹', '버거킹', '인터넷뱅킹', '베이킹', '하이킹', '워킹', '체킹', '파킹', '블로킹', '쿠킹', '락킹', '뻐킹', '룩킹', '조킹', '해킹', '토킹', '마킹', '체킹', '띵킹', '스피킹', '메이킹', '쿠킹', '스모킹', '문워킹',  '홈워킹', '갱킹', '탱킹', '이새킹', '위잉치킹', '프리토킹'];
var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
var point = 0;
var flag = 0;
function imainfo(){
  if(flag) document.getElementById('ima').src = "./king_files/img/"+arr[point]+".png";
  else document.getElementById('ima').src = "./king_files/img/lol.png";
}
function queinfo(){
  if(flag) document.getElementById('que').innerHTML = q[arr[point]]+"?";
  else{
    document.getElementById('que').innerHTML = a[arr[point]]+("ㅋ".repeat(8-a[arr[point]].length));
    point++;
  }
}
function change(){
  if(point>=30){
    document.getElementById('ima').src = "./king_files/img/rt.gif";
    document.getElementById('que').innerHTML = "감사합니다.";
  }else{
    document.getElementById('box').style.padding="100px";
    if(flag){
      imainfo(); queinfo();
      flag=0;
    }else{
      imainfo(); queinfo();
      flag=1;
    }
  }

}

window.onload = () => {
  for(var x=0;x<arr.length;x++){
    var i = parseInt(Math.random()*(arr.length-1));
    var j = parseInt(Math.random()*(arr.length-1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  document.getElementById('ima').src = "./king_files/img/"+arr[point]+".png";
  document.getElementById('que').innerHTML = q[arr[point]]+"?<br><p style=\"font-weight:400;font-size:30px;background-color:white;line-height:0\">(사진을 누르면 다음으로 이동합니다.)<p>";
} 

