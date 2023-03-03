package com.reactlibrary;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RNSkinAnalysisLibraryPackage implements ReactPackage {
    public RNSkinAnalysisLibraryPackage() {
        System.loadLibrary("findtrouble");
        System.loadLibrary("wrinkledetect");
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        // Add any custom native modules here
        return modules;
    }


    @Override
    public List<ViewManager> createViewManagers(
            ReactApplicationContext reactContext) {
        List<ViewManager> managers = new ArrayList<>();
        // Add any custom view managers here
        return managers;
    }
}

