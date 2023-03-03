import React, { memo } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp, Dimensions  } from 'react-native';
import { Source } from 'react-native-fast-image';
import OpenCV from '../../../NativeModules/OpenCV';
import ImageResizer from 'react-native-image-resizer';
import { CustomizedSolutionScreenNavigationProp } from '../../../navigators/navigation.types';
import { paddingHorizontal } from '../../../utils/utils';
import useNavigation from '../../../hooks/useNavigation';
import AppText from '../../../components/AppText';
import Image from '../../../components/Image';
import PriceDiscount from '../../../components/PriceDiscount';
import TextDemiLight from '../../../components/TextDemiLight';
import TouchableRipple from '../../../components/TouchableRipple';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import RNFS, { readDir } from 'react-native-fs';

interface Props {
  name: string;
  value: number;
  score: number;
}

const ResultItem = ({
  name, value, score
}: Props) => {

  var picture: Source = {uri:"nan"};
  var PhotoPath: string;
  var Description: string;
  switch(name) {
    case "wrinkle":
        PhotoPath="Wrinkle";
        Description=" 주름 분석 결과가 나왔습니다.";
        value=value;
      break;
    case "pore":
        PhotoPath="pore";
        Description=" 모공 분석 결과가 나왔습니다.";
        value=value;
      // code block
      break;
    case "flush":
        PhotoPath="red_l";
        Description=" 홍조 분석 결과가 나왔습니다.";
        value=value;
      // code block
      break;
    case "trouble":
        PhotoPath="trouble";
        Description=" 트러블 분석 결과가 나왔습니다.";
        value=value;
      // code block
      break;      
    case "pigment":
        PhotoPath="Dark";
        Description=" 색소침착 분석 결과가 나왔습니다.";
        value=value;
      // code block
      break;             
    case "oil":
        PhotoPath="Dark";
        Description=" 유수분 분석 결과가 나왔습니다.";
        value=value;
      // code block
      break;         
    default:
        PhotoPath="Dark";
        Description=" 유수분 분석 결과가 나왔습니다.";
    break;
  }
  var val2 = (Math.round(value*100)/100.0);
  var desc2 = "측정 이상 지수는 "+val2+"점"+" 입니다."
  var desc3 = "";
  if(val2<=15){
    score = 90
  }
  if(val2<=30){
    score = 70
  }
  if(val2>30 &&val2<=50){
    score = 60
  }
  if(val2>50 &&val2<=75){
    score = 40
  }
  if(val2>75){
    score = 30
  }
  if(val2>100){
    score = 20
  }


  if(score>=70){
    desc3= " 건강한 피부를 가지고 계십니다."
  }else if(score>=60){
    desc3= " 관리상태가 좋은 피부를 가지고 계십니다."
  }else if(score>=45){
    desc3= " 일반적인 수준의 수치입니다."
  }else if(score>=30){
    desc3= " 피부 관리가 필요한 수치입니다."
  }else{
    desc3= " 관리가 시급한 피부입니다."
  }

  console.log("PhotoPath " + PhotoPath);
  console.log("value " + value);
  console.log("path " + OpenCV.getPath(PhotoPath+"_thumb"));
  picture.uri = "files://"+OpenCV.getPath(PhotoPath+"_thumb");
  const handleCanvas = async (canvas) => {
    if(canvas==null) return;
      const ctx=canvas.getContext('2d');
      canvas.width = 90;
      console.log("canvas width:"+canvas.width);
      canvas.height = 120;
      console.log("canvas height:"+canvas.height);
      const fimage = new CanvasImage(canvas, canvas.width, canvas.height);
      console.log("canvas draw");
      fimage.width = 120;
      fimage.height = 160;

        RNFS.readFile(OpenCV.getPath(PhotoPath+"_thumb"), 'base64').then(res =>{
            fimage.src='data:image/jpg;base64,'+res;
            
          }).catch((err) => {
            console.log(err)
          })
        
        fimage.addEventListener("load", () => {
          console.log("Have successfully loaded ")
          //ctx.drawImage(fimage, 0, 0);
          drawImageProp(ctx, fimage, 0, 0, 100, 100, 0.5, 0.5);
        });
  }
  function drawImageProp(ctx: any, img: CanvasImage, x: number, y: number, w: number, h: number, offsetX?: number, offsetY?: number) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }
  
    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;
  
    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;
  
    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;
  
    // decide which gap to fill    
    if (nw < w) ar = w / nw;                             
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;
  
    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);
  
    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;
  
    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;
  
    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
  }
  if(name=='oil'){
      return (
    <TouchableRipple style={styles.container}>
      <View style={styles.inner}>
        <View>
          <TextDemiLight style={styles.description2} numberOfLines={3}>
            {Description}{"\n"}
            {desc2}{"\n"}
            {desc3}
          </TextDemiLight>
        </View>
      </View>
    </TouchableRipple>
  );
  }else{
    return (
      <TouchableRipple style={styles.container}>
        <View style={styles.inner}>
          <>
            <Canvas ref={handleCanvas}/>
          </>
          <View>
            <TextDemiLight style={styles.description} numberOfLines={3}>
              {Description}{"\n"}
              {desc2}{"\n"}
              {desc3}
            </TextDemiLight>
          </View>
        </View>
      </TouchableRipple>
    );
  }

};




const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  inner: {
    
    flexDirection: 'row',
  },
  description: {
    fontSize: 12,
    width: 120,
    marginTop: 4,
    marginLeft: 4,
    marginRight: 8,
    paddingRight: 8,
    marginBottom: 5,
  },
  description2: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    marginRight: 8,
    paddingRight: 8,
    marginBottom: 5,
  },
  
});

export default memo(ResultItem);
