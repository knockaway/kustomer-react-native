package com.kustomerreactnative;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.module.annotations.ReactModule;
import com.kustomer.core.models.KusChatAvailability;
import com.kustomer.core.models.KusWidgetType;
import com.kustomer.ui.Kustomer;

import kotlin.Unit;


@ReactModule(name = KustomerReactNativeModule.NAME)
public class KustomerReactNativeModule extends ReactContextBaseJavaModule {
  public static final String NAME = "KustomerReactNative";

  public KustomerReactNativeModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void isChatAvailable(Promise promise) {
    WritableArray mutableArray = Arguments.createArray();

    try {
      Kustomer.Companion.getInstance().isChatAvailable(kusResult -> {
        // Resolve with [response, null]
        mutableArray.pushBoolean(
          kusResult.successOr(KusChatAvailability.KUS_OFFLINE) == KusChatAvailability.KUS_ONLINE
        );
        mutableArray.pushNull();

        promise.resolve(mutableArray);

        return Unit.INSTANCE;
      });
    } catch (Exception ex) {
      // Resolve with [false, exception]
      mutableArray.pushBoolean(false);
      mutableArray.pushString(
        ex.getMessage()
      );

      promise.resolve(mutableArray);
    }
  }

  @ReactMethod
  public void _show(String option) {
    switch (option) {
      case "onlyChat":
        Kustomer.Companion.getInstance().open(KusWidgetType.CHAT_ONLY);
        break;
      case "chatAndKnowledgeBase":
        Kustomer.Companion.getInstance().open(KusWidgetType.CHAT_KB);
        break;
      case "onlyKnowledgeBase":
        Kustomer.Companion.getInstance().open(KusWidgetType.KB_ONLY);
        break;
      default:
        Kustomer.Companion.getInstance().open(KusWidgetType.DEFAULT);
    }
  }
}
