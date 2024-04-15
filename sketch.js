var colors = "590d22-800f2f-a4133c-c9184a-ff4d6d-ff758f-ff8fa3-ffb3c1-ffccd5-fff0f3".split("-").map(a=>"#"+a)
var line_colors = "f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529".split("-").map(a=>"#"+a)
var face_colors ="8a817c-bcb8b1-e0afa0-c0d6df".split("-").map(a=>"#"+a)
// 宣告一個物件，為一個陣列，陣列內可以放很多物件的資訊
var pets = []  //所有物件的資料內容
var pet  //正在處理的物件
class pet_class{  //宣告一個pet_class物件，
  constructor(args){  //描述物件的初始值，只有設定物件的資料內容
    this.p = args.p || {x:width/2,y:height/2}; //物件的位置
    this.r = args.r || random(50,120)  //物件的大小
    this.color = args.color || random(colors)  //物件的顏色，color函數為顏色設定值
    this.v = args.v || {x:random(-2,2),y:random(-2,2)}   //物件的移動速度，有兩個屬性(x,y)，移動的速度
    this.line_color = args.line_color || random(line_colors)  //圓的框線顏色
    this.face_color = args.face_color || random(face_colors)
    this.a = args.a || {x:0,y:random(0.7,1.2)}  //加速度
    this.mode = random(["happy","bad"])
    this.rid = random(0,1000000) //亂數值0~10000之間
  }
  draw(){   //畫出物件畫面的程式碼，一個物件繪出的程式碼
    push()
      translate(this.p.x,this.p.y) //把圓點(0,0)設定到圓心上
      stroke(this.line_color)
      fill(this.face_color)
     
     
      //  ミミ耳朵

      if (this.mode=="happy") {
        arc(0, this.r/4, this.r, this.r, random(150, 210), random(330, 390));
      } else {
        push();
        rotate(180);
        arc(0, this.r / 1.8, this.r * 0.8, this.r * 0.8, random(150, 210), random(330, 390));
        pop();
      }

      //  カオ臉
      noStroke();
      fill(this.face_color);
      ellipse(0, 0, this.r, this.r / 1.12);

      //  メ眼睛
      fill("#463f3a");
      circle(-this.r / 6, -this.r / 50, this.r / 7);
      circle(this.r / 6, -this.r / 50, this.r / 7);

      //  クチ嘴巴
      fill("#fefae0");
      circle(this.r / 9, this.r / 7.5, this.r / 3.5);
      circle(-this.r / 9, this.r / 7.5, this.r / 3.5);

      //  ハナ鼻子
      fill(this.color);
      ellipse(0, this.r / 11, this.r / 5, this.r / 7);

      pop();
    
  }
  update(){  //物件移動更新後的程式碼
    if(this.mode == "happy"){
      this.p.y = this.p.y + sin(frameCount/10+this.r) *(this.r/10)
    }
    else{
      this.p.x = this.p.x + this.v.x   //x軸
      this.p.y = this.p.y + this.v.y   //y軸
    }
    

    if(this.p.x<0){  //碰到視窗左邊
      this.v.x = -this.v.x
    }
    if(this.p.x>width){  //碰到視窗右邊
      this.v.x = -this.v.x
    }
    if(this.p.y<0){   //碰到視窗上邊
      this.v.y = -this.v.y
    }
    if(this.p.y>height){  //碰到視窗下邊
      this.v.y= -this.v.y
    }
  }
  ispetInRange(){ //計算物件與滑鼠間的距離是否小於直徑
    //d:把目前這個物件的位置與滑鼠間的距離
    let d = dist(mouseX,mouseY,this.p.x,this.p.y)
    if(d<this.r){
      return true
    }
    else{
      return false
    }
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  for(i=0;i<30;i=i+1){  //產生多個物件資料(30顆)
    pet = new pet_class({  //傳一串參數值到class內
    v:{x:random(-2,2),y:random(-2,2)},
    p:{x:random(0,width),y:random(0,height)},
    a:{x:0,y:0}
    })
    pets.push(pet)
  }
  // print(pets)
}

var score = 0
function draw() {
  background(220);
  // ===========================================
  // 得分文字
  fill("#590d22")
  textSize(30) //大小
  text("按下空白鍵新增，按下滑鼠得分",100,150) //位置

  fill("#590d22")
  textSize(70) //大小
  text("得分:"+score,100,100) //位置
  // ===========================================

  for(j=0;j<pets.length;j=j+1){
    pet = pets[j]
    pet.draw()   //繪出物件的樣子
    pet.update()  //更改物件的位置
  }
}

// ====================================
// 按下空白鍵新增一個
function keyPressed(){
  pet = new pet_class({  //傳一串參數值到class內
    v:{x:random(-2,2),y:random(-2,2)}, //速度
    p:{x:mouseX,y:mouseY}, //位置
    a:{x:0,y:0} //加速度
    })
    pets.push(pet)
    }
// ====================================
// 按下滑鼠使物件消失
function mousePressed(){
  for(let pet of pets){
    if(pet.ispetInRange()){
      pets.splice(pets.indexOf(pet),1)
      score = score+1
    }
  }
// ====================================
  print(score)
}
