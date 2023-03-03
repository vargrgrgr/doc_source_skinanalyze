import React, { useEffect, useRef, useState, Dispatch,  } from 'react';
import { View, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import ImageResizer from 'react-native-image-resizer';
import RNFS, { readDir } from 'react-native-fs';
import {
  ImageProcScreenNavigationProp,
  ImageProcScreenProp,
} from '../../navigators/navigation.types';
import Container from '../../components/Container';
import OpenCV from '../../NativeModules/OpenCV';
import SkinAnalysis from '../../NativeModules/SkinAnalysis';
import { paddingHorizontal, sleep } from '../../utils/utils';
import { Face } from '../../custom_modules/vision-camera-face-detector-custom';
import { Point } from 'react-native-vision-camera'

import testResults from '../../store/test-results';

export interface placeholderData {
  oil: number,
  wrinkle: number,
  pigment: number,
  trouble: number,
  pore: number,
  flush: number,
};






// const StatusIcon = () => {
//   const [close, setclose] = useState(true);
//   const [center, setcenter] = useState(false);
//   useEffect(() => {
//     let timer = setInterval(() => {
//       if(isclose == true ){
//         setclose(true)
//       }else{
//         setclose(false)
//       }

//       if(iscenter == true){
//         setcenter(true)
//       }else{
//         setcenter(false)
//       }
//     }, 200);
    
//     return () => clearInterval(timer)
//   }, []);Dispatch
//                 center? 
//                 <Button title="화면중심" color="blue"/> : 
//                 <Button title="중심확인" color="gray"/>
//               }
//           </View>
//     </>
//   );
// };




const pointstostring = (points: Point[]) =>{
  var Ret = new String;
  points.map((point)=> Ret+=(String(point.x)+","+String(point.y)+","));
  //console.log(Ret)
  return Ret;
}

const ImageProcScreen = () => {
  
  const photo = useRoute<ImageProcScreenProp>().params.photo;
  const face = useRoute<ImageProcScreenProp>().params.face;
  const pwidth = useRoute<ImageProcScreenProp>().params.photo.width;
  const pheight = useRoute<ImageProcScreenProp>().params.photo.height;
  const fwidth = useRoute<ImageProcScreenProp>().params.width;
  const fheight = useRoute<ImageProcScreenProp>().params.height;
  const fcontour = face.contours.FACE;
  const photoprop='files:/'+useRoute<ImageProcScreenProp>().params.photo.path;
  const navigation = useNavigation<ImageProcScreenNavigationProp>();
  var resizeUri: String='init';
  var photopath = photo.path;

  const getscore = (val: number) =>{
    var val2 = (Math.round(val));
    var score=0;
    if(val2<=20){
      score = 90
    }
    if(val2<=30){
      score = 80
    }
    if(val2>30 &&val2<=50){
      score = 70
    }
    if(val2>50 &&val2<=75){
      score = 60
    }
    if(val2>75){
      score = 50
    }
    if(val2>100){
      score = 30
    }
    return score;
  }
  const handleCanvas = async (canvas) => {
    if(canvas==null) return;
      const ctx= await canvas.getContext('2d');
      canvas.width = Dimensions.get('window').width;
      canvas.height = Dimensions.get('window').height;
     // console.log("image w: "+pwidth);
     // console.log("image h: "+pheight);
     // console.log("canvas w: "+canvas.width);
      //console.log("canvas h: "+canvas.height);
      const fimage = new CanvasImage(canvas, canvas.width, canvas.height);
     // console.log("canvas draw");
      fimage.width = canvas.width;
      fimage.height = canvas.height;

      var resizew=canvas.width*1.2;
      var resizeh= canvas.height*1.2;


       //console.log("resizew: "+resizew);
       // console.log("resizeh: "+resizeh);
        
        ImageResizer.createResizedImage(
          photopath, 
          resizew, 
          resizeh, 
          'JPEG', 
          100, 0,
          undefined,
          false,
          {
            mode: 'contain',
            onlyScaleDown: false,
          }).then((resizedImageUri) => {
        //  console.log("uri:"+resizedImageUri.path);
  
            RNFS.readFile(resizedImageUri.path, 'base64').then(res =>{
              resizeUri=resizedImageUri.path;
              fimage.src='data:image/jpg;base64,'+res;
              
            }).catch((err) => {
              console.log(err)
            })
            fimage.width = resizew;
            fimage.height = resizeh;
        })
        
        fimage.addEventListener("load", () => {
          console.log("Have successfully loaded ")
          //ctx.drawImage(fimage, 0, 0);
          drawImageProp(ctx, fimage, -resizew*1/6, -resizeh*1/6, fimage.width+resizew*1/6, fimage.height+resizeh*1/6, 0, 0);
        });
  }

  /**
 * By Ken Fyrstenberg Nilsen
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
*/
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
      
  
 //const set
/*
  const opencvtest =async () =>{
    var teststr: String;
    console.log("teststr");
    teststr="default";
    OpenCV.test(teststr);
    console.log(teststr);
  }
*/
/*
const opencvtest = async () => {
  var teststr: String;
  teststr = OpenCV.test();
  if(teststr != "default"){
    console.log(teststr);
  }
  else{
    console.log("null");
  }
}
/*
const test = () => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      OpenCV.test(msg => {
        resolve(msg);
      });
    }
  });
}
*/

  //const [face, setFace] = React.useState<Face>();
  // const drawfacemask = async (face: Face)=>{
  //   console.log("facemask")
  //   console.log(face.contours.FACE)
  //   console.log("stringface")
  //   const stringface = pointstostring(face.contours.FACE);
  //   console.log(stringface)
  //   const Ret = await OpenCV.ContourToMask(stringface, useRoute<ImageProcScreenProp>().params.face.bounds.width, useRoute<ImageProcScreenProp>().params.face.bounds.height);
  //   console.log(Ret)
  
  // }
  var result: placeholderData = {
    oil: 0,
    wrinkle: 0,
    pigment: 0,
    trouble: 0,
    pore: 0,
    flush: 0,
  };
  var result2: placeholderData = {
    oil: 0,
    wrinkle: 0,
    pigment: 0,
    trouble: 0,
    pore: 0,
    flush: 0,
  };
  // const [flush, setflush] = useState(0);
  // const [trouble, settrouble] = useState(0);
  // const [pigment, setpigment] = useState(0);
  // const [pore, setpore] = useState(0);
  // const [wrinkle, setwrinkle] = useState(0);

  useEffect(() => {
    // declare the data fetching function
    const navigate = async () => {  
      console.log("Image Proc start");
      console.log("create cache dir");
      await OpenCV.CreateDR();
      console.log("delete cache");
      await OpenCV.deleteCacheDir();
      
      //console.log(photo.path);
      console.log("build facemask");
      
      const stringface = pointstostring(face.contours.FACE);
      const stringnosebt = pointstostring(face.contours.NOSE_BOTTOM);
      const stringnosebr = pointstostring(face.contours.NOSE_BRIDGE);
      const stringeye_l = pointstostring(face.contours.LEFT_EYE);
      const stringeyeb_l = pointstostring(face.contours.LEFT_EYEBROW_TOP).concat(pointstostring(face.contours.LEFT_EYEBROW_BOTTOM).toString());
      const stringeye_r = pointstostring(face.contours.RIGHT_EYE);
      const stringeyeb_r = pointstostring(face.contours.RIGHT_EYEBROW_TOP).concat(pointstostring(face.contours.RIGHT_EYEBROW_BOTTOM).toString());
      const stringulib_t = pointstostring(face.contours.UPPER_LIP_TOP);
      const stringulib_b = pointstostring(face.contours.UPPER_LIP_BOTTOM);
      const stringllib_t = pointstostring(face.contours.LOWER_LIP_TOP);
      const stringllib_b = pointstostring(face.contours.LOWER_LIP_BOTTOM);

      console.log("read facial points");

      const facemask = await OpenCV.FacialContourToMask(stringface, fwidth, fheight, pwidth, pheight,  'facemask');
      const nosebtmask = await OpenCV.FacialContourToMask(stringnosebt, fwidth, fheight, pwidth, pheight,   'nosebtmask');
      const nosebrmask = await OpenCV.FacialContourToMask(stringnosebr, fwidth, fheight, pwidth, pheight,   'nosebrmask');   
      const l_eyemask = await OpenCV.FacialContourToMask(stringeye_l, fwidth, fheight, pwidth, pheight,   'l_eyemask');
      const l_eyebmask = await OpenCV.FacialContourToMask(stringeyeb_l, fwidth, fheight, pwidth, pheight,   'l_eyebmask');
      const r_eyemask = await OpenCV.FacialContourToMask(stringeye_r, fwidth, fheight, pwidth, pheight,   'r_eyemask');
      const r_eyebmask = await OpenCV.FacialContourToMask(stringeyeb_r, fwidth, fheight, pwidth, pheight,   'r_eyebmask');
      const u_lipmask_t = await OpenCV.FacialContourToMask(stringulib_t, fwidth, fheight, pwidth, pheight,   'u_lipmask_t');
      const u_lipmask_b = await OpenCV.FacialContourToMask(stringulib_b, fwidth, fheight, pwidth, pheight,   'l_lipmask_b');
      const l_lipmask_t = await OpenCV.FacialContourToMask(stringllib_t, fwidth, fheight, pwidth, pheight,   'u_lipmask_t');
      const l_lipmask_b = await OpenCV.FacialContourToMask(stringllib_b, fwidth, fheight, pwidth, pheight,   'l_lipmask_b');

      console.log("concanate masks");

      await OpenCV.ConcatMask(nosebtmask, true);
      await OpenCV.ConcatMask(nosebrmask, false);
      await OpenCV.ConcatMask(l_eyemask, false);
      await OpenCV.ConcatMask(l_eyebmask, false);
      await OpenCV.ConcatMask(r_eyemask, false);
      await OpenCV.ConcatMask(r_eyebmask, false);
      await OpenCV.ConcatMask(u_lipmask_t, false);
      await OpenCV.ConcatMask(u_lipmask_b, false);
      await OpenCV.ConcatMask(l_lipmask_t, false);
      await OpenCV.ConcatMask(l_lipmask_b, false);

      console.log("facemask complete");

      console.log("preprocessing");

      const fwid:number = parseInt(fwidth.toString());
      console.log("facewidth :"+fwid);
      const fhei:number = parseInt(fheight.toString());
      console.log("faceheight :"+fhei);
      console.log(photopath);

        await ImageResizer.createResizedImage(photopath, fhei, fwid, 'JPEG', 100, 0).then(async resizedImageUri => {
          console.log("1 uri:"+resizedImageUri.path);
          
          await OpenCV.CopyHRFace(photopath);
          await OpenCV.CopyFace(resizedImageUri.path);
          console.log("readfile");

          await OpenCV.getRedness();
          console.log("red")
          await OpenCV.getDarkness();
          console.log("dark")
          await OpenCV.getRedSpot();
          console.log("rs")
          await OpenCV.getTrouble();
          console.log("tr")
          
          var red = await OpenCV.getRedSpotVal();
          console.log("red: "+ red)
          var dark = await OpenCV.getDarkSpotVal();
          console.log("dark: "+dark)
          var mask = await OpenCV.getMaskVal();
          console.log("mask: "+mask)
          var wrinkle = await SkinAnalysis.wrinkle_detection();
          console.log("wrinkle: "+wrinkle)
          var pore= await OpenCV.getPoreVal();
          console.log("pore: "+pore)
          var trouble = await SkinAnalysis.find_trouble();
          console.log("trouble: "+trouble)
          result.oil = 0;


          result2.flush = red/mask*100;
          result2.trouble = trouble/mask*100*(1/3);
          result2.pigment = dark/mask*100;
          result2.pore = pore/mask*100*2;
          result2.wrinkle = wrinkle/mask*100*2;



          
          result.flush=getscore(result2.flush);
          result.trouble=getscore(result2.trouble);
          result.pigment=getscore(result2.pigment);
          result.pore= getscore(result2.pore);
          result.wrinkle=getscore(result2.wrinkle);;

          


          console.log("result");
          console.log(result)
        })


    




    }

    setTimeout(async () => {

      await navigate()
      navigation.navigate("TestResults",{result, result2, photo});
    }, 1000);
    
  }, []);

  return (
    <>
    <Canvas ref={handleCanvas}/>
    <Image 
      source={require('../../assets/images/sample.gif')}
      style={styles.overlay}>
    </Image>
    </>
  ); 
};

const styles = StyleSheet.create({
  ImageContainer: {
    flex: 1,
  },
  resultsContainer: {
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%'
  },
  overlay: {
    position: "absolute",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'stretch',
    backgroundColor: "white",
    opacity: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay2: {
    position: "absolute",
    width: Dimensions.get('window').width,

    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    opacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
  },
});

export default ImageProcScreen;
