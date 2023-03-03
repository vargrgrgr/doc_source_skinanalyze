package com.reactlibrary;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;


public class RNSkinAnalysisLibraryModule extends ReactContextBaseJavaModule{
    private final ReactApplicationContext reactContext;

    public RNSkinAnalysisLibraryModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }


    @Override
    public String getName() {
        return "RNSkinAnalysisLibrary";
    }

    @ReactMethod
    public void detectWrinkles(String inputImagePath, String outputImagePath, int kernelSize, int lowThreshold, int highThreshold, Callback callback) {
        int width, height;
        int[] pixels;

        // Load input image
        Bitmap inputBitmap = BitmapFactory.decodeFile(inputImagePath);
        width = inputBitmap.getWidth();
        height = inputBitmap.getHeight();
        pixels = new int[width * height];
        inputBitmap.getPixels(pixels, 0, width, 0, 0, width, height);

        // Convert input image to grayscale
        int[] gray = new int[width * height];
        for (int i = 0; i < width * height; i++) {
            int red = Color.red(pixels[i]);
            int green = Color.green(pixels[i]);
            int blue = Color.blue(pixels[i]);
            int grayValue = (int) (0.2989 * red + 0.5870 * green + 0.1140 * blue);
            gray[i] = grayValue;
        }

        // Call Canny edge detection function
        int[] output = new int[width * height];
        wrinkledetect(gray, output, width, height, kernelSize, lowThreshold, highThreshold);

        // Convert output image to bitmap
        int[] outputPixels = new int[width * height];
        for (int i = 0; i < width * height; i++) {
            int value = output[i];
            outputPixels[i] = Color.rgb(value, value, value);
        }
        Bitmap outputBitmap = Bitmap.createBitmap(outputPixels, width, height, Bitmap.Config.RGB_565);

        // Save output image to file
        File outputFile = new File(outputImagePath);
        try {
            FileOutputStream outputStream = new FileOutputStream(outputFile);
            outputBitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);
            outputStream.close();
        } catch (IOException e) {
            Log.e("RNSkinAnalysisLibraryModule", "Error saving output image: " + e.getMessage());
        }

        callback.invoke(outputImagePath);
    }

    @ReactMethod
    public void detectTroubles(String filePath, int minRadius, int maxRadius, int threshold, Promise promise) {
        try {
            // Read image file and get width, height
            byte[] imageData = readImageFile(filePath);
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inJustDecodeBounds = true;
            BitmapFactory.decodeByteArray(imageData, 0, imageData.length, options);
            int width = options.outWidth;
            int height = options.outHeight;

            ArrayList<Circle> circles = findtrouble(imageData, width, height, minRadius, maxRadius, threshold);

            // 결과 반환
            promise.resolve(circles);
        }catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }

    public byte[] readImageFile(String filePath) throws IOException {
        InputStream inputStream = new FileInputStream(filePath);
        ByteArrayOutputStream byteBuffer = new ByteArrayOutputStream();

        int bufferSize = 1024;
        byte[] buffer = new byte[bufferSize];

        int len;
        while ((len = inputStream.read(buffer)) != -1) {
            byteBuffer.write(buffer, 0, len);
        }

        return byteBuffer.toByteArray();
    }


    private static native void wrinkledetect(int[] image, int[] output, int width, int height, int kernelSize, int lowThreshold, int highThreshold);
    public native ArrayList<Circle> findtrouble(byte[] data, int width, int height, int minRadius, int maxRadius, int threshold);

        // JNI에서 사용할 Circle 클래스 정의
    public static class Circle {
        public int x;
        public int y;
        public int radius;
        public Circle(int x, int y, int radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
        }
    }

}

