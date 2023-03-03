package com.reactlibrary;

import static org.opencv.imgproc.Imgproc.COLOR_GRAY2BGR;
import static org.opencv.imgproc.Imgproc.HOUGH_GRADIENT;
import static org.opencv.imgproc.Imgproc.HOUGH_GRADIENT_ALT;
import static org.opencv.imgproc.Imgproc.HoughCircles;
import static org.opencv.imgproc.Imgproc.INTER_CUBIC;
import static org.opencv.imgproc.Imgproc.INTER_LINEAR_EXACT;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.graphics.Bitmap;
import android.graphics.Color;

import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.Core;
import org.opencv.core.MatOfDouble;
import org.opencv.core.Point;
import org.opencv.core.Scalar;
import org.opencv.core.MatOfPoint;
import org.opencv.core.Size;

import org.opencv.android.Utils;
import org.opencv.imgproc.Imgproc;
import org.opencv.imgcodecs.Imgcodecs;

import android.util.Log;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.opencv.imgproc.CLAHE;


public class RNOpenCvLibraryModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public RNOpenCvLibraryModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNOpenCvLibrary";
    }
    //get skin area (or t-zone)


    class cPoint
    {
        double x;
        double y;
    }
    private Mat StringContourToMat(String contour, int width, int height){
        String[] contourpoints = contour.split(",");
        MatOfPoint contourp = new MatOfPoint();
        Point point = new Point();
        ArrayList<Point> pointlist = new ArrayList<Point>();
        for( int i=0; i<contourpoints.length/2; i++){
            point = new Point(Integer.parseInt(contourpoints[i*2]), Integer.parseInt(contourpoints[i*2+1]));
            pointlist.add(point);
            //Log.d("i", i);
        }
        contourp.fromList(pointlist);
        List<MatOfPoint> contours = new ArrayList<MatOfPoint>();
        contours.add(contourp);
        Mat image = new Mat(height, width, CvType.CV_8UC4, Scalar.all(0));
        Imgproc.drawContours(image, contours, -1, new Scalar(255,255,255,255), Imgproc.FILLED);
        return image;
    }



    @ReactMethod(isBlockingSynchronousMethod = true)
    public void CreateDR(){
        File f0 = new File(reactContext.getCacheDir()+"/face");
        if(!f0.isDirectory()) {
            f0.mkdirs();
        }

        File f = new File(reactContext.getCacheDir()+"/mask");
        if(!f.isDirectory()) {
            f.mkdirs();
        }
        File f1 = new File(reactContext.getCacheDir()+"/result");
        if(!f1.isDirectory()) {
            f1.mkdirs();
        }
        File f2 = new File(reactContext.getCacheDir()+"/colored_result");
        if(!f2.isDirectory()) {
            f2.mkdirs();
        }
    }

    private void CleanFolder(String aa){
        File dir = new File(aa);
        if (dir.isDirectory())
        {
            String[] children = dir.list();
            for (int i = 0; i < children.length; i++)
            {
                new File(dir, children[i]).delete();
            }
        }
        return;
    }



    @ReactMethod(isBlockingSynchronousMethod = true)
    public String ContourToMask(String  stringface, int width, int height, String stringnose,
                                String stringleye, String stringreye, String stringeyebrow_l,
                                String stringeyebrow_r, String stringmouth_t, String stringmouth_b){
        String[] facepoints = stringface.split(",");
        String[] eyepoints_l = stringleye.split(",");
        String[] eyepoints_r = stringreye.split(",");
        String[] eyebrowpoints_l = stringeyebrow_l.split(",");
        String[] eyebrowpoints_r = stringeyebrow_r.split(",");
        String[] nosepoints = stringnose.split(",");
        String[] mouthpoints_t = stringmouth_t.split(",");
        String[] mouthpoints_b = stringmouth_b.split(",");


        MatOfPoint facecontour = new MatOfPoint();
        Point point = new Point();
        ArrayList<Point> pointlist = new ArrayList<Point>();
        for( int i=0; i<facepoints.length/2; i++){
            point = new Point(Integer.parseInt(facepoints[i*2]), Integer.parseInt(facepoints[i*2+1]));
            pointlist.add(point);
            //Log.d("i", i);
        }


        facecontour.fromList(pointlist);
        List<MatOfPoint> contours = new ArrayList<MatOfPoint>();
        contours.add(facecontour);



        String path= reactContext.getCacheDir()+"/"+"Mask.png";
        Log.d("path", path);

        Mat image = new Mat(width, height, CvType.CV_8UC4, Scalar.all(0));
        Imgproc.drawContours(image, contours, -1, new Scalar(255,255,255,255), Imgproc.FILLED);

        //face mask done

        MatOfPoint leyecontour = new MatOfPoint();
        Point leyepoint = new Point();
        ArrayList<Point> leyepointlist = new ArrayList<Point>();
        for( int i=0; i<eyepoints_l.length/2; i++){
            leyepoint = new Point(Integer.parseInt(eyepoints_l[i*2]), Integer.parseInt(eyepoints_l[i*2+1]));
            leyepointlist.add(leyepoint);
            //Log.d("i", i);
        }
        leyecontour.fromList(leyepointlist);


        List<MatOfPoint> eyecontours = new ArrayList<MatOfPoint>();
        eyecontours.add(leyecontour);

        MatOfPoint reyecontour = new MatOfPoint();
        Point reyepoint = new Point();
        ArrayList<Point> reyepointlist = new ArrayList<Point>();
        for( int i=0; i<eyepoints_r.length/2; i++){
            reyepoint = new Point(Integer.parseInt(eyepoints_r[i*2]), Integer.parseInt(eyepoints_r[i*2+1]));
            reyepointlist.add(reyepoint);
            //Log.d("i", i);
        }
        reyecontour.fromList(reyepointlist);

        eyecontours.add(reyecontour);
        Imgproc.drawContours(image, eyecontours, -1, new Scalar(0,0,0,0), Imgproc.FILLED);
        Core.flip(image,image,1);
        Imgproc.resize(image,image, new Size(360,480));
        Imgcodecs.imwrite(path, image);
        return path;
    }


    private void HEFace(String Path){
        Mat InputImage = Imgcodecs.imread(Path);
        String maskpath =reactContext.getCacheDir()+"/mask/"+"concatmask"+".png";
        Mat InputMask = Imgcodecs.imread(maskpath);
        Mat HSVImage = new Mat();
        List<Mat> HSV = new ArrayList<Mat>(3);
        String Path2 = reactContext.getCacheDir()+"/face/"+"facehsv"+".png";
        Mat GrayImage = new Mat();
        Imgproc.cvtColor(InputImage, GrayImage, Imgproc.COLOR_BGR2GRAY);
        Imgproc.equalizeHist(GrayImage, GrayImage);
        String PathG = reactContext.getCacheDir()+"/face/"+"gray"+".png";
        Imgcodecs.imwrite(PathG, GrayImage);
        Imgproc.cvtColor(InputImage, HSVImage, Imgproc.COLOR_BGR2HSV);
        Imgcodecs.imwrite(Path2, HSVImage);
        Core.split(HSVImage, HSV);
        CLAHE clahe = Imgproc.createCLAHE();
        Mat equalizedV = new Mat();
        Imgproc.equalizeHist(HSV.get(2), equalizedV);
        clahe.apply(HSV.get(2), equalizedV);
        List<Mat> HSV2 = new ArrayList<Mat>(3);
        HSV2.add(0,HSV.get(0));
        HSV2.add(1,HSV.get(1));
        HSV2.add(2,equalizedV);
        Mat HSVImage2 = HSVImage;
        Core.merge(HSV2, HSVImage2);
        Mat result = new Mat();
        Imgproc.cvtColor(HSVImage2, result, Imgproc.COLOR_HSV2BGR);
        double[] zeros= {0,0,0};
        for(int x=0; x<InputMask.cols(); x++){
            for(int y=0; y<InputMask.rows(); y++){
                if(InputMask.get(y,x)[0] != 255) {
                    result.put(y, x, zeros);
                    GrayImage.put(y, x, zeros);
                }
            }
        }
        PathG = reactContext.getCacheDir()+"/face/"+"HEface_gray"+".png";
        String Path1 = reactContext.getCacheDir()+"/face/"+"HEface"+".png";
        Imgcodecs.imwrite(Path1, result);
        Imgcodecs.imwrite(PathG, GrayImage);

    }


    @ReactMethod(isBlockingSynchronousMethod = true)
    public String FacialContourToMask(String  stringcontour, int width, int height, int pwidth, int pheight, String name){
        String[] contourpoints = stringcontour.split(",");
        if(name == "facemask"){
            CleanFolder(reactContext.getCacheDir().toURI()+"/mask");
        }
        MatOfPoint facialcontour = new MatOfPoint();
        Point point = new Point();
        ArrayList<Point> pointlist = new ArrayList<Point>();
        for( int i=0; i<contourpoints.length/2; i++){
            point = new Point(Integer.parseInt(contourpoints[i*2]), Integer.parseInt(contourpoints[i*2+1]));
            pointlist.add(point);
            //Log.d("i", i);
        }


        facialcontour.fromList(pointlist);
        List<MatOfPoint> contours = new ArrayList<MatOfPoint>();
        contours.add(facialcontour);



        String path= reactContext.getCacheDir()+"/mask/"+name+".png";


        Mat image = new Mat(width, height, CvType.CV_8UC4, Scalar.all(0));
        Imgproc.drawContours(image, contours, -1, new Scalar(255,255,255,255), Imgproc.FILLED);
        Core.flip(image,image,1);


        //Imgproc.resize(image, image, new Size(pwidth, pheight));
        Imgcodecs.imwrite(path, image);
        return path;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void ConcatMask(String Path, Boolean pm){
        Mat InputMask = Imgcodecs.imread(Path);
        Mat BaseMask = new Mat();
        File f = new File(reactContext.getCacheDir()+"/mask/"+"concatmask.png");
        if(f.isFile()) {
            if(pm == false){
                BaseMask = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"concatmask.png");
            }else{
                BaseMask = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"facemask.png");
            }
        }else{
            BaseMask = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"facemask.png");
        }
        Mat ResultMask = new Mat();

        BaseMask.copyTo(ResultMask);
        double[] zeros= {0,0,0};
        //if(pm == false){
            for(int x=0; x<InputMask.cols(); x++){
                for(int y=0; y<InputMask.rows(); y++){
                    if(InputMask.get(y,x)[0] == 255) {
                       ResultMask.put(y, x, zeros);
                    }
                }
            }
        //}
        String path= reactContext.getCacheDir()+"/mask/"+"concatmask"+".png";
        Imgcodecs.imwrite(path, ResultMask);
        return;
    }


    private void drawResult(String src, String mask, String name, String Color){
        Mat image = Imgcodecs.imread(src);
        Mat ori_image = Imgcodecs.imread(reactContext.getCacheDir()+"/face/"+"ori_face"+".png");
        Imgproc.resize(ori_image, ori_image, new Size (image.cols(),image.rows()), 0, 0, INTER_LINEAR_EXACT);
        Mat concatresult = image;
        Mat facemask = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"facemask"+".png");
        Mat maskimage = Imgcodecs.imread(mask);
        double[] color= {0,0,0};
        double[] color2= {0,0,0};
        switch (Color) {
            case "red":
                color = new double[] {0,0,200};
                color2 = new double[] {0,0,150};
                break;
            case "orange":
                color = new double[] {0,100,200};
                color2= new double[] {0,50,150};
                break;
            case "green":
                color = new double[] {0,200,0};
                color2= new double[] {0,150,0};
                break;
            case "blue":
                color = new double[] {200,0,0};
                color2= new double[] {150,0,0};
                break;
            case "pink":
                color = new double[] {200,111,200};
                color2= new double[] {100,50,100};
                break;
        }
        for(int x=0; x<image.cols(); x++){
            for(int y=0; y<image.rows(); y++){
                if(maskimage.get(y,x)[0] == 255) {
                    if(Color != "green"){
                            concatresult.put(y, x, color2);
                            image.put(y, x, color);
                    }
                }else{
                    if(Color == "green") {
                            concatresult.put(y, x, color2);
                            image.put(y, x, color);
                    }
                }
            }
        }

        File f = new File(reactContext.getCacheDir()+"/colored_result");
        if(!f.isDirectory()) {
            f.mkdirs();
        }
        String path0= reactContext.getCacheDir()+"/colored_result/"+name+"_mask.png";
        Imgcodecs.imwrite(path0, image);
        Core.addWeighted( ori_image, 0.75, image, 0.20, 10, image);

        Mat timage = new Mat();
        Imgproc.resize(image, timage, new Size (120,160), 0, 0, INTER_LINEAR_EXACT);

        String path= reactContext.getCacheDir()+"/colored_result/"+name+".png";
        Imgcodecs.imwrite(path, image);

        String tpath= reactContext.getCacheDir()+"/colored_result/"+name+"_thumb.png";
        Imgcodecs.imwrite(tpath, timage);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
        public void CopyFace(String Path){
        //HEFace(reactContext.getCacheDir()+"/mask1/"+"test2"+".png");
        File f0 = new File(reactContext.getCacheDir()+"/face");
        if(!f0.isDirectory()) {
            f0.mkdirs();
        }
        CleanFolder(reactContext.getCacheDir().toURI()+"/face");


        Mat InputFace = Imgcodecs.imread(Path);
        //String path= reactContext.getCacheDir()+"/face/"+"HEface"+".png";
        String path1= reactContext.getCacheDir()+"/face/"+"ori_face"+".png";
        Imgcodecs.imwrite(path1, InputFace);
        HEFace(Path);
        return;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void CopyHRFace(String Path){
        //HEFace(reactContext.getCacheDir()+"/mask1/"+"test2"+".png");
        File f0 = new File(reactContext.getCacheDir().toURI()+"/face");
        if(!f0.isDirectory()) {
            f0.mkdirs();
        }
        Mat InputFace = Imgcodecs.imread(Path);
        String path= reactContext.getCacheDir()+"/result/"+"ori_HRface"+".png";
        Imgcodecs.imwrite(path, InputFace);
        return;
    }



    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getPath(String name){
        String result= reactContext.getCacheDir()+"/colored_result/"+name+".png";
        return result;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void getRedness(){
        String photopath= reactContext.getCacheDir()+"/face/"+"HEface"+".png";
        Mat image = Imgcodecs.imread(photopath);
        Mat hsvimage = new Mat();
        Imgproc.cvtColor(image, hsvimage, Imgproc.COLOR_BGR2HSV);
        Mat FaceMask = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"concatmask.png");
        Mat lowh = new Mat(image.rows(),image.cols(),CvType.CV_8UC1);
        Mat highh = new Mat(image.rows(),image.cols(),CvType.CV_8UC1);
        Mat lh = new Mat(image.rows(),image.cols(),CvType.CV_8UC1);
        Mat uh = new Mat(image.rows(),image.cols(),CvType.CV_8UC1);

        Scalar llowbound = new Scalar(0,70,70);
        Scalar lupperbound = new Scalar(10,255,255);
        Scalar hlowbound = new Scalar(160,70,70);
        Scalar hupperbound = new Scalar(180,255,255);

        Core.inRange(hsvimage, llowbound, lupperbound, lowh);
        File f = new File(reactContext.getCacheDir()+"/result");
        if(!f.isDirectory()) {
            f.mkdirs();
        }
        String lowpath= reactContext.getCacheDir()+"/result/"+"low.png";
        Imgcodecs.imwrite(lowpath, lowh);
        Core.inRange(hsvimage, hlowbound, hupperbound, highh);
        String highpath= reactContext.getCacheDir()+"/result/"+"high.png";
        Imgcodecs.imwrite(highpath, highh);
        //Imgproc.adaptiveThreshold(redimage, resultred, avgrgb.val[0], Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY, 11, 12);
        String path= reactContext.getCacheDir()+"/result/"+"RedMask.png";
        //Imgcodecs.imwrite(path, resultred);

        double[] zeros= {0,0,0};
        for(int x=0; x<image.cols();x++){
            for(int y=0; y<image.rows();y++){
                if(FaceMask.get(y,x)[0] ==255){
                  if(lowh.get(y,x)[0]== 255){
                      lh.put(y,x,lowh.get(y,x));
                  }else{
                      lh.put(y,x,zeros);
                  }
                  if(highh.get(y,x)[0]== 255){
                      uh.put(y,x,highh.get(y,x));
                  }else{
                      uh.put(y,x,zeros);
                  }

                }else{
                    lh.put(y,x,zeros);
                    uh.put(y,x,zeros);
                }
            }
        }

        String lpath= reactContext.getCacheDir()+"/result/"+"red_l.png";
        Imgcodecs.imwrite(lpath, lh);
        String upath= reactContext.getCacheDir()+"/result/"+"red_u.png";
        Imgcodecs.imwrite(upath, uh);


        String fpath= reactContext.getCacheDir()+"/face/"+"HEface"+".png";

        drawResult(fpath, lpath, "red_l", "red");
        drawResult(fpath, upath, "red_u", "red");


        //calc average redness then threshold, calc pixel percent on mask area

        return;
    }
//
//    //region trouble(improvise)
//    @ReactMethod(isBlockingSynchronousMethod = true)
//    public void getTrouble(){
//        String photopath1= reactContext.getCacheDir()+"/face/"+"HEface_gray"+".png";
//
//        Mat image = Imgcodecs.imread(photopath1, Imgcodecs.IMREAD_GRAYSCALE);
//        Imgproc.medianBlur(image, image, 5);
//        Imgproc.equalizeHist(image, image);
//        Imgproc.adaptiveThreshold(image, image, 255, Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY, 19, 12);
//        Mat mask = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"concatmask"+".png");
//        Mat facemask = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"facemask"+".png");
//        Mat ori_face = Imgcodecs.imread(reactContext.getCacheDir()+"/result/"+"ori_HRface"+".png");
//        Imgproc.resize(mask, mask, new Size (image.cols(),image.rows()), 0, 0, INTER_LINEAR_EXACT);
//        Imgproc.resize(facemask, facemask, new Size (image.cols(),image.rows()), 0, 0, INTER_LINEAR_EXACT);
//        Imgproc.resize(ori_face, ori_face, new Size (image.cols(),image.rows()), 0, 0, INTER_LINEAR_EXACT);
//
//        for(int x=0; x<image.cols();x++){
//            for(int y=0; y<image.rows();y++){
//                if(mask.get(y,x)[0]!=255){
//                    image.put(y,x,new double[] {255,255,255});
//                }
//                if(facemask.get(y,x)[0]==255){
//                    ori_face.put(y,x,new double[] {255,255,255});
//                }
//            }
//        }
//
//
//
//        String apath= reactContext.getCacheDir()+"/colored_result/"+"ttrouble"+".png";
//        Imgcodecs.imwrite(apath, image);
//
//        //Imgproc.GaussianBlur(image, image, new Size(13,13),2);
//        //Imgproc.threshold(image,image, 0, 255, Imgproc.THRESH_OTSU);
//        //Mat outputimage = Imgcodecs.imread(reactContext.getCacheDir()+"/result/"+"ori_face"+".png");
//        Mat circles = new Mat();
//        Mat circles2 = new Mat();
//        Mat pimage = image.clone();
//        Mat timage = image.clone();
//        HoughCircles(image, circles, HOUGH_GRADIENT, 2, 1, 160, 10, 5, 20);
//        HoughCircles(image, circles2, HOUGH_GRADIENT, 2, 1, 160, 10, 1, 4);
//        int radius = 0;
//        Imgproc.cvtColor(image,image,COLOR_GRAY2BGR);
//        for (int i = 0; i < circles.cols(); i++) {
//            Point center = new Point(Math.round(circles.get(0, i)[0]), Math.round(circles.get(0, i)[1]));
//            radius = (int) Math.round(circles.get(0, i)[2]);
//            // draw the circle center
//            //Imgproc.circle(pimage, center, 20, new Scalar(0, 255, 0), -1, 8, 0);
//            // draw the circle outline
//            Imgproc.circle(timage, center, 10, new Scalar(0, 255, 0), 10, 8, 0);
//            //System.out.println("" + circles.get(0,0)[0] + ", " + circles.get(0,0)[1] + ", " + circles.get(0,0)[2]);
//        }
//        for (int i = 0; i < circles2.cols(); i++) {
//            Point center = new Point(Math.round(circles2.get(0, i)[0]), Math.round(circles2.get(0, i)[1]));
//            radius = (int) Math.round(circles2.get(0, i)[2]);
//            // draw the circle center
//            Imgproc.circle(pimage, center, 3, new Scalar(0, 255, 0), 3, 8, 0);
//            // draw the circle outline
//            //Imgproc.circle(timage, center, radius/2, new Scalar(0, 0, 255), 1, 8, 0);
//            //System.out.println("" + circles.get(0,0)[0] + ", " + circles.get(0,0)[1] + ", " + circles.get(0,0)[2]);
//        }
//        String path= reactContext.getCacheDir()+"/mask/"+"trouble"+".png";
//        Imgcodecs.imwrite(path, timage);
//        String ppath= reactContext.getCacheDir()+"/mask/"+"pore"+".png";
//        Imgcodecs.imwrite(ppath, pimage);
//
//        String oripath = reactContext.getCacheDir()+"/face/"+"ori_face"+".png";
//        drawResult(oripath, path, "trouble", "green");
//        drawResult(oripath, ppath, "pore", "green");
//        //drawResult(fpath, lpath, "red_l", "red");
//
//    }
//
//    //endregion
//
    @ReactMethod(isBlockingSynchronousMethod = true)
    public void getRedSpot(){
        String photopath= reactContext.getCacheDir()+"/face/"+"HEface"+".png";
        Mat image = Imgcodecs.imread(photopath);
        Mat hsvimage = new Mat();
        Imgproc.cvtColor(image, hsvimage, Imgproc.COLOR_BGR2HSV);
        Mat FaceMask = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"concatmask.png");
        Mat lowh = new Mat(image.rows(),image.cols(),CvType.CV_8UC1);
        Mat upperh = new Mat(image.rows(),image.cols(),CvType.CV_8UC1);
        Mat lh = new Mat(image.rows(),image.cols(),CvType.CV_8UC1);
        Mat uh = new Mat(image.rows(),image.cols(),CvType.CV_8UC1);

        Scalar llowbound = new Scalar(0,90,140);
        Scalar lupperbound = new Scalar(10,255,255);
        Scalar rlowbound = new Scalar(160,90,140);
        Scalar rupperbound = new Scalar(180,255,255);
        Core.inRange(hsvimage, llowbound, lupperbound, lowh);
        File f = new File(reactContext.getCacheDir()+"/result");
        if(!f.isDirectory()) {
            f.mkdirs();
        }
        String lowpath= reactContext.getCacheDir()+"/result/"+"reds_l.png";
        Imgcodecs.imwrite(lowpath, lowh);
        Core.inRange(hsvimage, rlowbound, rupperbound, upperh);
        String upperpath= reactContext.getCacheDir()+"/result/"+"reds_u.png";
        Imgcodecs.imwrite(upperpath, upperh);
        //Imgproc.adaptiveThreshold(redimage, resultred, avgrgb.val[0], Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY, 11, 12);
        //String path= reactContext.getCacheDir()+"/result/"+"RedMask.png";
        //Imgcodecs.imwrite(path, resultred);
        int red=1;
        int masked=1;
        double[] zeros= {0,0,0};
        for(int x=0; x<image.cols();x++){
            for(int y=0; y<image.rows();y++){
                if(FaceMask.get(y,x)[0] ==255){
                    masked++;
                    if(lowh.get(y,x)[0]== 255){
                        red++;
                        lh.put(y,x,lowh.get(y,x));
                    }else{
                        lh.put(y,x,zeros);
                    }
                    if(upperh.get(y,x)[0]== 255){
                        red++;
                        uh.put(y,x,upperh.get(y,x));
                    }else{
                        uh.put(y,x,zeros);
                    }

                }else{
                    lh.put(y,x,zeros);
                    uh.put(y,x,zeros);
                }
            }
        }

        String lpath= reactContext.getCacheDir()+"/result/"+"reds_ls.png";
        Imgcodecs.imwrite(lpath, lh);
        String upath= reactContext.getCacheDir()+"/result/"+"reds_us.png";
        Imgcodecs.imwrite(upath, uh);


        String fpath= reactContext.getCacheDir()+"/face/"+"HEface"+".png";

//        Mat Dark = Imgcodecs.imread(reactContext.getCacheDir()+"/result/"+"dark"+".png");
//        Mat concatred = new Mat(image.size(), CvType.CV_8UC3);
//        for(int x=0; x<image.cols();x++){
//            for(int y=0; y<image.rows();y++){
//                if(Dark.get(y,x)[0]==255){
//                    if(lh.get(y,x)[0]==255){
//                        concatred.put(y,x,zeros);
//                    }
//                    if(uh.get(y,x)[0]==255){
//                        concatred.put(y,x,zeros);
//                    }
//                }else{
//                    concatred.put(y,x,new double[] {255,255,255});
//                }
//            }
//        }
//        String ccpath= reactContext.getCacheDir()+"/result/"+"concatred"+".png";
//        Imgcodecs.imwrite(ccpath, concatred);
        drawResult(fpath, lpath, "reds_ls", "red");
        drawResult(fpath, upath, "reds_us", "red");


        //calc average redness then threshold, calc pixel percent on mask area

        //before return, get red spot(countour) then make redmask, then paint contour it red on redmask
        return;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void getDarkness(){
        String photopath= reactContext.getCacheDir()+"/face/"+"HEface"+".png";
        Mat image = Imgcodecs.imread(photopath);
        String photopath1= reactContext.getCacheDir()+"/face/"+"HEface_gray"+".png";
        Mat grayimage = Imgcodecs.imread(photopath1);
        Mat resultimage = new Mat();
        Mat skincrop = new Mat(image.size(), CvType.CV_8U);
        Core.inRange(image,  new Scalar(30,255,255), new Scalar(0, 58, 50), skincrop);
        String crpath= reactContext.getCacheDir()+"/mask/"+"skin.png";
        Imgcodecs.imwrite(crpath, skincrop);
        Imgproc.cvtColor(image, grayimage, Imgproc.COLOR_BGR2GRAY);
        Mat rangemask=new Mat(grayimage.size(), CvType.CV_8U);
        Core.inRange(grayimage, new Scalar(70) , new Scalar(255), rangemask);
        //Imgproc.equalizeHist(grayimage, grayimage);
        //String epath= reactContext.getCacheDir()+"/face/"+"GrayEH.png";
        //Imgcodecs.imwrite(epath, grayimage);


        String blkpath= reactContext.getCacheDir()+"/mask/"+"rangemask.png";
        Imgcodecs.imwrite(blkpath, rangemask);



        Imgproc.adaptiveThreshold(grayimage, resultimage, 255, Imgproc.ADAPTIVE_THRESH_MEAN_C, Imgproc.THRESH_BINARY, 81, 12);
        String rtpath= reactContext.getCacheDir()+"/result/"+"GrayRT.png";
        Imgcodecs.imwrite(rtpath, resultimage);
        Mat FaceMask = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"concatmask.png", Imgcodecs.IMREAD_UNCHANGED);

        int dark=0;
        int masked=0;
        for(int x=0; x<image.cols();x++){
            for(int y=0; y<image.rows();y++) {
                    if (FaceMask.get(y, x)[0] == 255) {
                        masked++;
                        if (resultimage.get(y, x)[0] == 0) {
                            dark++;
                        }
                    } else {
                        resultimage.put(y, x, new double[]{255});
                    }

            }
        }
        for(int x=0; x<image.cols();x++){
            for(int y=0; y<image.rows();y++) {
                if (rangemask.get(y, x)[0] == 0) {
                    resultimage.put(y, x, new double[]{255});
                }
            }
        }
        String fpath= reactContext.getCacheDir()+"/face/"+"HEface"+".png";

        String rpath= reactContext.getCacheDir()+"/result/"+"Dark.png";

        Imgcodecs.imwrite(rpath, resultimage);
        drawResult(fpath, rpath, "Dark", "green");
//        if(masked!=0){
//            double percent=dark/masked;
//        }
//sa
//        double percent=dark/masked;
        //calc average darkness then threshold, calc pixel percent on mask area



        //before return, get dark spot(coutour) then make redmask, then paint contour it red on darkmask
        return;
    }

//    final Mat Rgba = inputFrame.rgba();
//    Mat grayScaleGaussianBlur = new Mat();
//    Imgproc.cvtColor(Rgba , grayScaleGaussianBlur, Imgproc.COLOR_BGR2GRAY);
//    Imgproc.GaussianBlur(grayScaleGaussianBlur, grayScaleGaussianBlur, new Size(5, 5), 0);
//
//    Core.MinMaxLocResult minMaxLocResultBlur = Core.minMaxLoc(grayScaleGaussianBlur);
//
//    final double maxval = minMaxLocResultBlur.maxVal;
//    final double minval = minMaxLocResultBlur.minVal;
//
//
//    if (maxval >= 253.0 && minval > 0.0 && minval < 20.0)
    
    @ReactMethod(isBlockingSynchronousMethod = true)
    public String isGlare(String photopath){
      Mat image = Imgcodecs.imread(photopath);
      Imgproc.cvtColor(image, image, Imgproc.COLOR_BGR2GRAY);
      Imgproc.GaussianBlur(image, image, new Size(7, 7), 0);
      Core.MinMaxLocResult minMaxLocResultBlur = Core.minMaxLoc(image);
      double maxval = minMaxLocResultBlur.maxVal;
      double minval = minMaxLocResultBlur.minVal;
      if (maxval >= 253.0 && minval <=  0.0){
          return "true";
      }
      return "false";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getDarkSpotVal(){
        Mat image = Imgcodecs.imread(reactContext.getCacheDir()+"/result/"+"Dark.png");
        Mat maskimage = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"concatmask.png");
        int dark = 0;
        for(int x=0; x<image.cols();x++){
            for(int y=0; y<image.rows();y++){
                if(maskimage.get(y,x)[0] ==255) {
                    if (image.get(y, x)[0] != 255) {
                        dark = dark + 1;

                    }
                }
            }
        }
        return dark;
    }


    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getPoreVal(){
        Mat image = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"pore.png");
        int p = 0;
        for(int x=0; x<image.cols();x++){
            for(int y=0; y<image.rows();y++){
                    if (image.get(y,x)[0]==0) {
                        p = p + 1;
                    }
            }
        }
        return p;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getTroubleVal(){
        Mat image = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"trouble.png");
        int p = 0;
        for(int x=0; x<image.cols();x++){
            for(int y=0; y<image.rows();y++){
                if (image.get(y,x)[0]==0) {
                    p = p + 1;
                }
            }
        }
        return p;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getRedSpotVal(){
        Mat image = Imgcodecs.imread(reactContext.getCacheDir()+"/result/"+"red_l.png");
        Mat image2 = Imgcodecs.imread(reactContext.getCacheDir()+"/result/"+"red_u.png");
        Mat maskimage = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"concatmask.png");
        int masked = 0;
        int red = 0;
        for(int x=0; x<image.cols();x++){
            for(int y=0; y<image.rows();y++){
                if(maskimage.get(y,x)[0] ==255){
                    masked=masked+1;
                    if(image.get(y,x)[0] == 255){
                        red=red+1;
                    }
                    if(image2.get(y,x)[0] == 255){
                        red=red+1;
                    }
                }
            }
        }
        return red/2;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getMaskVal(){

        Mat maskimage = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"concatmask.png");
        int masked = 0;
        for(int x=0; x<maskimage.cols();x++){
            for(int y=0; y<maskimage.rows();y++){
                if(maskimage.get(y,x)[0] ==255){
                    masked=masked+1;
                }
            }
        }
        return masked;
    }

//
//    //region wrinkle(improvise)
//    //-----------------------------------------------------------------------
//    @ReactMethod(isBlockingSynchronousMethod = true)
//    public int getWrinkle(){
//        String photopath= reactContext.getCacheDir()+"/face/"+"HEface"+".png";
//        Mat image = Imgcodecs.imread(photopath);
//        Mat mask = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"concatmask.png");
//        Mat canny1 = new Mat();
//        Mat canny2 = new Mat();
//        int masked = 0;
//        MatOfDouble mean = new MatOfDouble();
//        MatOfDouble stdev = new MatOfDouble();
//        Imgproc.cvtColor(image,image,Imgproc.COLOR_BGR2GRAY);
//        Imgproc.medianBlur(image,image,7);
//        double[] zeros= {0,0,0};
//        for(int x=0; x<image.cols();x++){
//            for(int y=0; y<image.rows();y++){
//                if(mask.get(y,x)[0]!=255){
//                    image.put(y,x, zeros);
//                }
//            }
//        }
//
//
//        Core.meanStdDev(image, mean, stdev);
//        Mat edges;
//        Imgproc.Canny(image, canny1, 115, 255);
//        String cpath= reactContext.getCacheDir()+"/result/"+"canny.png";
//        Imgcodecs.imwrite(cpath, canny1);
//
//        for(int x=0; x<canny1.cols();x++){
//            for(int y=0; y<canny1.rows();y++){
//                if(mask.get(y,x)[0]==255){
//                    if(canny1.get(y,x)[0]==255) {
//                        masked++;
//                    }
//                }else{
//                    canny1.put(y,x, zeros);
//                }
//            }
//        }
//
//        String rmpath = reactContext.getCacheDir()+"/mask/"+"rangemask.png";
//        Mat rangemask = Imgcodecs.imread(rmpath)
//
//                ;
//
//        for(int x=0; x<image.cols();x++){
//            for(int y=0; y<image.rows();y++){
//                if(mask.get(y,x)[0]!=255){
//                    canny1.put(y,x, zeros);
//                    if(y>=1 && x>=1){
//                        canny1.put(y-1,x-1, zeros);
//                        canny1.put(y-1,x, zeros);
//                        canny1.put(y,x-1, zeros);
//                        if(y<image.rows() && x<image.cols()){
//                            canny1.put(y-1,x+1, zeros);
//                            canny1.put(y+1,x-1, zeros);
//                        }
//                    }
//                    if(y<image.rows() && x<image.cols()){
//                        canny1.put(y+1,x+1, zeros);
//                        canny1.put(y+1,x, zeros);
//                        canny1.put(y,x+1, zeros);
//                    }
//
//                }
//
//                if(rangemask.get(y,x)[0]!=255){
//                    canny1.put(y,x, zeros);
//                    if(y>=1 && x>=1){
//                        canny1.put(y-1,x-1, zeros);
//                        canny1.put(y-1,x, zeros);
//                        canny1.put(y,x-1, zeros);
//                        if(y<image.rows() && x<image.cols()){
//                            canny1.put(y-1,x+1, zeros);
//                            canny1.put(y+1,x-1, zeros);
//                        }
//                    }
//                    if(y<image.rows() && x<image.cols()){
//                        canny1.put(y+1,x+1, zeros);
//                        canny1.put(y+1,x, zeros);
//                        canny1.put(y,x+1, zeros);
//                    }
//
//                }
//            }
//        }
//
//
//        String rpath= reactContext.getCacheDir()+"/result/"+"Wrinkle.png";
//        String fpath= reactContext.getCacheDir()+"/face/"+"ori_face"+".png";
//        Imgcodecs.imwrite(rpath, canny1);
//        drawResult(fpath, rpath, "Wrinkle", "orange");
//        return masked;
//    }
//    //------------------------------------------------------------------------
//    //endregion
//
    private boolean deleteDir(File dir) {
        if(dir==null){
            dir =  reactContext.getCacheDir();
        }
        if (dir != null && dir.isDirectory()) {
            String[] children = dir.list();
            for (int i = 0; i < children.length; i++) {
                boolean success = deleteDir(new File(dir, children[i]));
                if (!success) {
                    return false;
                }
            }
            return dir.delete();
        } else if(dir!= null && dir.isFile()) {
            return dir.delete();
        } else {
            return false;
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void deleteCacheDir() {
        CleanFolder(reactContext.getCacheDir().toURI()+"/face");
        CleanFolder(reactContext.getCacheDir().toURI()+"/mask");
        CleanFolder(reactContext.getCacheDir().toURI()+"/result");
        CleanFolder(reactContext.getCacheDir().toURI()+"/colored_result");
    }


    private Scalar AveragePixelValue(Mat faceimage){
        int size = (int) faceimage.total() * faceimage.channels();
        int pixelcount =0;
        long red=0;
        long green=0;
        long blue=0;
        Scalar avg = new Scalar(0,0,0);
        Bitmap bmp = Bitmap.createBitmap(faceimage.width(), faceimage.height(), Bitmap.Config.ARGB_8888);
        Utils.matToBitmap(faceimage, bmp);
        for(int x=0; x<faceimage.width(); x++){
            for(int y=0; y<faceimage.height(); y++){
                if(Color.alpha(bmp.getPixel(x,y))>0){
                    red += Color.red(bmp.getPixel(x,y));
                    green += Color.green(bmp.getPixel(x,y));
                    blue += Color.blue(bmp.getPixel(x,y));
                    pixelcount++;
                }
            }
        }
        avg = new Scalar(((int) red/pixelcount), ((int) blue/pixelcount), ((int) green/pixelcount));
        return avg;
    }


    public Mat getskinarea(Mat face){
        Mat img=face;                                                                                                                                          ;
        //converting from gbr to hsv color space
        int COLOR_BGR2HSV = 40;
        Mat img_HSV = new Mat();

        Mat atmask = new Mat().ones(300 , 300, 0);
        Imgcodecs.imwrite(reactContext.getCacheDir()+"/mask/"+"at0r.jpg", atmask);
        Imgproc.cvtColor(img, img_HSV, COLOR_BGR2HSV);

        Imgcodecs.imwrite(reactContext.getCacheDir()+"/mask/"+"hsv.jpg", img_HSV);
        
        //skin color range for hsv color space 
        Scalar HSV_tp = new Scalar( 0, 15, 0 );
        Scalar HSV_bt = new Scalar(17,170,255 );
        int CV_8U=0;
        Mat matmask = new Mat().ones(3 , 3, CV_8U);
        
        
        Mat HSV_mask = new Mat();
        Core.inRange(img_HSV, HSV_tp , HSV_bt, HSV_mask);
        int MORPH_OPEN = 2;
        Imgproc.morphologyEx(HSV_mask, HSV_mask, MORPH_OPEN, matmask);
        //converting from gbr to YCbCr color space
        int COLOR_BGR2YCrCb = 36;
        Mat img_YCrCb = new Mat();
        Imgproc.cvtColor(img,img_YCrCb, COLOR_BGR2YCrCb);
        //skin color range for hsv color space 
        Scalar YCrCb_tp = new Scalar( 0, 135, 85 );
        Scalar YCrCb_bt = new Scalar(255,180,135 );
        Mat YCrCb_mask = new Mat();
        Core.inRange(img_YCrCb, YCrCb_tp, YCrCb_bt, YCrCb_mask);
        
        Imgproc.morphologyEx(YCrCb_mask, YCrCb_mask, MORPH_OPEN, matmask);

        //merge skin detection (YCbCr and hsv)
        Mat global_mask=new Mat();
        Core.bitwise_and(YCrCb_mask,HSV_mask, global_mask);
        Imgproc.medianBlur(global_mask,global_mask,3);        
        Imgproc.morphologyEx(global_mask,global_mask, MORPH_OPEN, matmask);


        //Mat HSV_result = bitwise_not(HSV_mask);
        //Mat YCrCb_result = bitwise_not(YCrCb_mask);
        Mat global_result=new Mat();
        Core.bitwise_not(global_mask, global_result);
        
        //Imgcodecs.imwrite("global.jpg", global_result);
        return global_result;
    }
    //line detection+transform in skin area
    /*
    private double getwrinkle(Mat faceimg, Mat skinarea){
        Mat sourceImage;
        Mat destinationImage;
        Mat thresh;
        //Contrast
        Mat contrast = new Mat(sourceImage.rows(), sourceImage.cols(), sourceImage.type());
        Imgproc.equalizeHist(sourceImage, contrast);
         //Apply Adaptive threshold
        thresh = new Mat();
        Imgproc.adaptiveThreshold(destinationImage, thresh, 255, Imgproc.ADAPTIVE_THRESH_GAUSSIAN_C, Imgproc.THRESH_BINARY_INV, 99, 10);
         // dilation 
        Mat element1 = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new  Size(2*3+1, 2*6+1));
        Imgproc.dilate(thresh, thresh, element1);
         //Find contours
         List<MatOfPoint> contours = new ArrayList<MatOfPoint>(); 
         Mat image32S = new Mat();
         Mat threshClone = thresh.clone();
         threshClone.convertTo(image32S, CvType.CV_32SC1);
         Imgproc.findContours(image32S, contours, new Mat(), Imgproc.RETR_FLOODFILL,Imgproc.CHAIN_APPROX_SIMPLE);
 
         //Find contours with smaller area and color them to black (removing furhter noise)
         Imgproc.cvtColor(thresh, thresh, Imgproc.COLOR_GRAY2BGR); 
         for (int c=0; c<contours.size(); c++) {
             double value = Imgproc.contourArea(contours.get(c));
             if(value<500){
                 Imgproc.drawContours(thresh, contours, c, new Scalar(0, 0, 0), -1); 
             }
         }
         return 0;

    }
    */

    //redness
    // redarea/skin area
    
    /*
    private getredarea(Mat skinarea){
    
    }
    //malenoma
    // darkarea/skin area
    private getdarkarea(Mat skinarea){
    
    }
    //trouble
    // redarea find high value contour
    private getredspot(Mat skinarea){
    
    }
    //pore
    // find high value blk dots in skin area
    private getblackdots(Mat skinarea){
    
    }
    */
    @ReactMethod(isBlockingSynchronousMethod = true)
    public String FaceProc(String photopath) {
        Mat face = Imgcodecs.imread(reactContext.getCacheDir()+"/mask/"+"/skinarea");
        Imgcodecs.imwrite(reactContext.getCacheDir()+"/mask/"+"face.jpg", face);
        //Mat matmask = new Mat().ones(300 , 300, 0);
        //Imgcodecs.imwrite("/data/user/0/com.doctorigin/cache/skinarea.jpg", matmask);
        if (face==null){
            return "9";
        }
        Mat skinarea = getskinarea(face);
        if (skinarea==null){
            return "8";
        }
        Imgcodecs.imwrite(reactContext.getCacheDir()+"/mask/"+"skinarea4.jpg", skinarea);
        return "10";
    }
    
}