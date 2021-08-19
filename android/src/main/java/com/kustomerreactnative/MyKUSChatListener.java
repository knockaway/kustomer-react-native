package com.kustomerreactnative;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.kustomer.core.listeners.KusChatListener;
import com.kustomer.core.models.KusChatAvailability;
import com.kustomer.core.models.KusWidgetType;
import com.kustomer.core.models.chat.KusChatMessage;
import com.kustomer.core.models.chat.KusConversation;
import com.kustomer.core.models.chat.KusConversationPreview;
import com.kustomer.core.models.chat.KusSatisfaction;
import com.kustomer.core.models.chat.KusTypingIndicator;
import com.kustomer.core.models.chat.KusUser;

import org.jetbrains.annotations.NotNull;

import java.util.HashMap;

public class MyKUSChatListener implements KusChatListener {
  private ReactApplicationContext reactContext;

  public MyKUSChatListener(ReactApplicationContext reactContext) {
    this.reactContext = reactContext;
  }
  @Override
  public void onConversationCreated(@NotNull KusConversation kusConversation) {
    // brandID returns null when it shouldn't have
    // created a ticket on Kustomer dashboard, but just a FYI
    WritableMap map = new WritableNativeMap();
    map.putString("conversationId", kusConversation.getId());
    map.putString("brandId", kusConversation.getBrandId());

    ModuleHelper.sendEvent(this.reactContext, "onConversationCreated", map);
  }

  @Override
  public void onConversationEnded(@NotNull KusConversation kusConversation) {
    WritableMap map = new WritableNativeMap();
    map.putString("conversationId", kusConversation.getId());
    map.putString("brandId", kusConversation.getBrandId());

    ModuleHelper.sendEvent(this.reactContext, "onConversationEnded", map);
  }

  @Override
  public void onAgentIsTyping(@NotNull String s, @NotNull KusTypingIndicator kusTypingIndicator) {
    // TBA
  }

  @Override
  public void onAgentJoined(@NotNull String s, @NotNull KusUser kusUser) {
    // TBA
  }

  @Override
  public void onAssistantEnded(@NotNull KusConversation kusConversation) {
    // TBA
  }

  @Override
  public void onChatMessageReceived(@NotNull String s, @NotNull KusChatMessage kusChatMessage) {
    // TBA
  }

  @Override
  public void onConversationLastMessageAtChanged(@NotNull String s, long l) {
    // TBA
  }

  @Override
  public void onConversationMerged(@NotNull KusConversation kusConversation, @NotNull KusConversation kusConversation1) {
    // TBA
  }

  @Override
  public void onConversationUnended(@NotNull KusConversation kusConversation) {
    // TBA
  }

  @Override
  public void onCustomerMerged(@NotNull String s) {
    // TBA
  }

  @Override
  public void onPreviewChanged(@NotNull String s, @NotNull KusConversationPreview kusConversationPreview) {
    // TBA
  }

  @Override
  public void onSatisfactionEventReceived(@NotNull String s, @NotNull KusSatisfaction kusSatisfaction) {
    // TBA
  }

  @Override
  public void onUnreadCountChange(@NotNull String s, int i) {
    // TBA
  }
}
