import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import { RotateInDownLeft, runOnJS} from 'react-native-reanimated';
import { Animated, Linking, Platform, StyleSheet, View, Image, Button, Dimensions, PermissionsAndroid} from 'react-native';
import {
  Camera,
  PhotoFile,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ModalResultType } from 'react-native-use-modal';
import { scanFaces, Face } from '../../custom_modules/vision-camera-face-detector-custom';
import colors from '../../utils/colors';
import { CameraScreenNavigationProp } from '../../navigators/navigation.types';
import { sleep } from '../../utils/utils';
import useSimpleModal from '../../hooks/useSimpleModal';
import CameraButton from '../../components/CameraButton';
import CameraFlipIcon from '../../assets/icons/camera-flip.svg';
import Container from '../../components/Container';
import TouchableRipple from '../../components/TouchableRipple';
import Tooltip from '../../components/Tooltip';
import Tooltip2 from '../../components/Tooltip';
import OpenCV from '../../NativeModules/OpenCV';
import {NativeModules} from 'react-native';
var PermissionFile = NativeModules.PermissionFile;

export const navigationRef = React.createRef();
const windowWidth = Dimensions.get('window').width;
var isclose = true;
var iscenter = false;
var isglare = false;

const useRequestCameraPermission = (
  setCameraPosition: Dispatch<SetStateAction<'front' | 'back' | 'unspecified'>>,
) => {
  const simpleModal = useSimpleModal();
  const navigation = useNavigation<CameraScreenNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      const showModal = async () => {
        const result = await simpleModal.show({
          message:
            '피부 측정을 위해서 카메라 권한이 필요 합니다.\n설정에서 카메라 권한을 수락해주세요.',
          confirmText: '설정',
          overrideConfirm: async () => {
            await Linking.openSettings();
          },
        });

        if (result.type === ModalResultType.CANCEL) {
          navigation.goBack();
        }
      };

      const requestCameraPermission = async () => {
        const newCameraPermission = await Camera.requestCameraPermission();
        await requestStoragePermission();
        if (newCameraPermission === 'denied') {
          showModal().catch((err) => {});
        } else {
          setCameraPosition('front');
        }
      };

      requestCameraPermission().catch((err) => {
        console.log(err);
        showModal().catch((err) => {console.log(err);});
      });
    }, []),
  );
};
export async function requestStoragePermission() 
{
  console.log("requestStoragePermission")
  if (Platform.Version >= 30) {
    console.log("v30")
    await PermissionFile.checkAndGrantPermission(
      (err: any) => {
        console.log(err)
        alert(
          'Sorry, Access not granted'
        );
      },
      (res: any) => {
        if (res) {
          console.log(res)
        }
      },)
  } else {
    console.log("not v30")
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        if (granted) {
          console.log("READ_EXTERNAL_STORAGE permission granted")
          //alert("EXTERNAL_STORAGE permission granted");
        } else {
            console.log("READ_EXTERNAL_STORAGE permission denied")
            alert("READ_EXTERNAL_STORAGE permission denied");
        }
    const granted2 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        if (granted2) {
          console.log("WRITE_EXTERNAL_STORAGE permission granted")
          //alert("EXTERNAL_STORAGE permission granted");
        } else {
            console.log("WRITE_EXTERNAL_STORAGE permission denied")
            alert("WRITE_EXTERNAL_STORAGE permission denied");
        }
  }
}
const useFlashAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animateFlash = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 20,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return { fadeAnim, animateFlash };
};

const useFlipAnimation = () => {
  const flipAnim = useRef(new Animated.Value(0)).current;

  const cameraRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const animateFlipCamera = () => {
    const isFlipping =
      (flipAnim as any)._value !== 0 && (flipAnim as any)._value !== 1;

    if (isFlipping) {
      return true;
    }

    flipAnim.setValue(0);
    Animated.timing(flipAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    return false;
  };

  return { cameraRotate, animateFlipCamera };
};

const useCameraDevicePosition = () => {
  const { cameraRotate, animateFlipCamera } = useFlipAnimation();

  const [cameraPosition, setCameraPosition] = useState<
    'front' | 'back' | 'unspecified'
  >('unspecified');
 const devices = useCameraDevices();

  const device = devices[cameraPosition];

  const flipCamera = () => {
    const isFlipping = animateFlipCamera();

    if (!isFlipping) {
      setCameraPosition((p) => (p === 'back' ? 'front' : 'back'));
    }
  };

  return { device, cameraRotate, flipCamera, setCameraPosition };
};

const StatusIcon = () => {
  const [close, setclose] = useState(true);
  const [center, setcenter] = useState(false);
  useEffect(() => {
    let timer = setInterval(() => {
      if(isclose == true ){
        setclose(true)
      }else{
        setclose(false)
      }

      if(iscenter == true){
        setcenter(true)
      }else{
        setcenter(false)
      }

    }, 100);
    
    return () => clearInterval(timer)
  }, []);


  return (
    <>
          <View style={styles.button}>
              {
                close? 
                <Button title="거리불명" color="gray"/>: 
                <Button title="적정거리"  color="blue"/>
              }
          </View>
          <View style={styles.button2}>
              {
                center? 
                <Button title="화면중심" color="blue"/> : 
                <Button title="중심확인" color="gray"/>
              }
          </View>
    </>
  );
};




// mark: camerascreen
const CameraScreen = () => {

  const camera = useRef<Camera>(null);
  const { device, cameraRotate, flipCamera, setCameraPosition } =
    useCameraDevicePosition();
  useRequestCameraPermission(setCameraPosition);
  const { fadeAnim, animateFlash } = useFlashAnimation();
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const [focusedScreen, setfocusedScreen] = useState(true);
  
  var count = 0



  var photopath = "non";


  useEffect(()=>{


    setfocusedScreen(true);
    getCamera();
  });


  const takePhoto = async (face: Face, width: Number, height: Number) => {
    console.log("FACE cap");
    console.log(count)
    // if(flag=1){
    //   return;
    // }
    if(count>3 ){
      //flag=1;
      try {
        if (!camera.current) {
          return;
        }
            camera.current.takePhoto({
            qualityPrioritization: 'quality',
            enableAutoRedEyeReduction: true}).then((result)=>{
              const photo = result;
              if(photo!=null){
                
                photopath = "files:/"+photo.path; 
                animateFlash();
                setfocusedScreen(false);
                getCamera();
                console.log(face.contours.FACE)
                navigation.navigate('ImageProc', { photo, face, width, height });
                return;
              }
            })
           
      } catch (e) {
        //flag=0;
        //setPictureTaken(false);
        console.error('Failed to take photo!', e);
        //flagval.iscap = true;
        return;
      }
    }else{
      count=count+1;
    }
    return;
  };




  const setclose = async (trigger: boolean) => {
    if(trigger != isclose && isclose ==false){
      count=0;
    }
      isclose=trigger;

  }
  const setcenter = async (trigger: boolean) => {
    if(trigger != iscenter && iscenter == true){
      count=0;
    }
      iscenter=trigger;

  }


  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const scannedFaces = scanFaces(frame);
    const flength = scannedFaces.length;
    var bface;
    var sface;
    const fwidth = frame.width/9;
    const fheight = frame.height/9;
    var i = 0
    sface = scannedFaces.pop();
    const out_bound={
      x: fwidth/2,
      y: fheight/2,
      width: fwidth*8,
      height: fheight*8
    }
    const in_bound={
      x: 2*fwidth,
      y: 2.5*fheight,
      width: fwidth*2,
      height: fheight*2.5
    }
    var taken =0;
    var close=false;
    var center=false;
    

    if(taken == 1){
      return;
    }
    if (sface != null){
        bface=sface;
    }
    else{
      bface=null;
    }
    for(i=0;i<flength-1;i++){
      sface = scannedFaces.pop();
      //console.log("pop");
      if (sface != null){  
        if (bface != null){
          if(sface.bounds.height>bface.bounds.height){
            bface=sface;
          }
        }
        else{
          bface=sface;
        }
      }
      else{
        break;
      }
    }
    //console.log("bf");
    if(bface != null){
      if(in_bound.x <= bface.bounds.x+bface.bounds.width/2 && bface.bounds.x+bface.bounds.width/2<=out_bound.x+out_bound.width){
       if (in_bound.y <= bface.bounds.y+bface.bounds.height/2 && bface.bounds.y+bface.bounds.height/2<=out_bound.y+out_bound.height){
        console.log("is center")
        center=true;
       } else{
        console.log("not center")
        center=false;
       }
      } else{
        console.log("not center2")
        center=false;
      }
      console.log(bface.bounds.x+bface.bounds.width/2)
      console.log(bface.bounds.y+bface.bounds.height/2)
    
      if(bface.bounds.x>=out_bound.x && out_bound.x+out_bound.width >=bface.bounds.x+bface.bounds.width){
        if(bface.bounds.y>=out_bound.y && out_bound.y+out_bound.height >=bface.bounds.y+bface.bounds.height){
          console.log("good distance")
          close=false;
        } else{
          if(iscenter==true){
            close=true;
          }
        }
      } else{
        if(iscenter==true){
          close=true;
        }
      }
      if(bface.bounds.height<fheight*3||bface.bounds.width<fwidth*3){
        close=true;
        center=false;
      }

      if(close==false && center ==true){
        //ok
        runOnJS(setclose)(close);
        runOnJS(setcenter)(center);
        runOnJS(takePhoto)(bface, frame.width, frame.height);
        taken=1;
        console.log("takephoto");
      }else{
        runOnJS(setclose)(close);
        runOnJS(setcenter)(center);
        console.log("nope ");
      }
      bface=null;

    }else{
      close=true;
      center=false;
      runOnJS(setclose)(close);
      runOnJS(setcenter)(center);
      console.log("no face");
    }
    

      
    

  }, []);



  
  


  const getCamera = () => {
  
    
    if (focusedScreen == false) return <View style={styles.blackScreen} />;
    if (device == null) return <View style={styles.blackScreen} />;
    /*
    if (focusedScreen == false){
      return (
      <View style={styles.blackScreen}>
        <Image
            style ={{width: "100%", height:"100%"}}
            source={require('../../assets/images/sample.gif')}
          />
      </View>
      );
    } 
    */
    return (
      <View
        style={[
          [styles.cameraBackground],
        ]}
      >
        <Camera
          ref={camera}
          style={[styles.camera]}
          device={device}
          isActive
          photo
          frameProcessor={frameProcessor}
          frameProcessorFps={2}
        />
        <StatusIcon />
      

      </View>
    );
  };

  const getTooltip  = () => {
    if(iscenter==true){
      return(
      <View style={styles.bottomBar}> 
        <Tooltip style={styles.tooltip}>
          고객님의 피부를 측정중입니다. 
        </Tooltip>    
      </View>
      );
    }
    if(iscenter==false){
      return(
      <View style={styles.bottomBar}> 
        <Tooltip style={styles.tooltip}>
          카메라를 정면으로 바라봐주세요.
        </Tooltip> 
      </View>
      )
    }

  };

  const getBottomBar = () => (
    <View style={styles.bottomBar}> 
      <TouchableRipple style={styles.flipButton} onPress={flipCamera}>
        <CameraFlipIcon fill={colors.text}  width={40} height={40} />
      </TouchableRipple>
    </View>
  );
    

  return (
    <Container>
      {getCamera()}
      {getTooltip()}
      {getBottomBar()}
    </Container>
  );
};

const styles = StyleSheet.create({
  blackScreen: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraBackground: {
    color: "grey",
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 25,
    paddingBottom: 5,
    zIndex: 1,
  },
  tooltip: {
    position: 'absolute',
    top: -52,
    alignSelf: 'center',
  },
  tooltip2: {
    position: 'absolute',
    top: +52,
    alignSelf: 'center',
  },
  flipButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginVertical: -20,
    borderRadius: 20,
  },
  resultsContainer: {
    backgroundColor: colors.backgroundSecondary,
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  button:{
    left: 0,
    position: 'absolute',
    width:100,
    height:40,
    opacity: 1,
    borderRadius: 15,
    backgroundColor:'white'
  },
  button2:{
    
    position: 'absolute',
    right:0,
    width:100,
    height:40,
    opacity: 1,
    borderRadius: 15,
    backgroundColor:'white'
  },
  button3:{
    right: windowWidth/2-50,
    position: 'absolute',
    width:100,
    height:40,
    opacity: 1,
    borderRadius: 15,
    backgroundColor:'white'
  },
});

export default CameraScreen;
