package com.kustomerreactnative;

import android.os.Looper;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.module.annotations.ReactModule;
import com.kustomer.core.models.KusChatAvailability;
import com.kustomer.core.models.KusWidgetType;
import com.kustomer.ui.Kustomer;

import java.util.ArrayList;
import androidx.lifecycle.Observer;

import javax.annotation.Nullable;

import kotlin.Unit;



@ReactModule(name = KustomerReactNativeModule.NAME)
public class KustomerReactNativeModule extends ReactContextBaseJavaModule {
  public static final String NAME = "KustomerReactNative";
  private ReactApplicationContext reactContext;
  private static android.os.Handler mainHandler;
  private Integer unreadCount = 0;

  private final Observer<Integer> unreadCountObserver = new Observer<Integer>() {
    @Override
    public void onChanged(@Nullable final Integer count) {
      unreadCount = count;
      // send data over to JS side
      ModuleHelper.sendEvent(reactContext, "onUnreadCountChange", count);
    }
  };

  public KustomerReactNativeModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public void initialize() {
    super.initialize();
    MyKUSChatListener listener = new MyKUSChatListener(this.reactContext);
    Kustomer.Companion.getInstance().addChatListener(listener);

    this.mainHandler = new android.os.Handler(Looper.getMainLooper());

    // mainHandler.post() will execute the lambda on the main thread
    this.mainHandler.post(() -> {
      // start listening for unreadCountChanges
      /**
       * NOTE: To keep consistency between platforms We will not be implementing 'KusChatListener' for listening for unreadCountChanges
       * KusChatListener returns the unreadCount specific per conversation, which is different from 'Kustomer.Companion.getInstance().observeUnreadCount()' where it returns the total count
       */
      Kustomer.Companion.getInstance().observeUnreadCount().observeForever(unreadCountObserver);
    });
  }

  /**
   * Cleanup method
   */
  @Override
  public void onCatalystInstanceDestroy() {
    super.onCatalystInstanceDestroy();
    this.mainHandler.post(() -> {
      Kustomer.Companion.getInstance().observeUnreadCount().removeObserver(unreadCountObserver);
    });
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  @ReactMethod
  public void getUnreadCount(Callback callback) {
    // return through callback for consistency with iOS
    callback.invoke(this.unreadCount);
  }


  @ReactMethod
  public void isChatAvailable(Promise promise) {
    try {
      Kustomer.Companion.getInstance().isChatAvailable(kusResult -> {
        // Resolve with [response, null]
        WritableArray array = ModuleHelper.constructPromiseResponse(kusResult.successOr(KusChatAvailability.KUS_OFFLINE) == KusChatAvailability.KUS_ONLINE, null);

        promise.resolve(array);

        return Unit.INSTANCE;
      });
    } catch (Exception ex) {
      // Resolve with [false, exception]
      WritableArray array = ModuleHelper.constructPromiseResponse(false, ex.getMessage());
      promise.resolve(array);
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
