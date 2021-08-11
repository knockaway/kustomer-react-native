package com.kustomerreactnative;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Map;

public class ModuleHelper {
  /**
   * Helper to send events back to JS
   */
  protected static void sendEvent(ReactApplicationContext reactContext, String eventName, @Nullable Object params) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, params);
  }

  /**
   * Helper to easily construct our expected response array
   * @return array with 2 index [success, error]
   */
  protected static WritableArray constructPromiseResponse(@Nullable Object successItem, @Nullable Object errorItem) {
    WritableArray response = Arguments.createArray();
    response = pushItem(response, successItem);
    response = pushItem(response, errorItem);
    return response;
  }

  private static WritableArray pushItem(WritableArray array, @Nullable Object item) {

    if (item instanceof Integer)
      array.pushInt((Integer) item);
    else if (item instanceof String)
      array.pushString((String) item);
    else if (item instanceof Boolean)
      array.pushBoolean((Boolean) item);
    else if (item instanceof Map)
      array.pushMap((ReadableMap) item);
    else if (item instanceof Array)
      array.pushArray((ReadableArray) item);
    else
      array.pushNull();

    return array;
  }

}
