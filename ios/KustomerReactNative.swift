
import KustomerChat
import Foundation

let RCTKustomerOnUnreadCountChange = "KustomerOnUnreadCountChange"
let RCTKustomerOnConversationCreated = "KustomerOnConversationCreated"
let RCTKustomerOnConversationEnded = "KustomerOnConversationEnded"

@objc(KustomerReactNative)
public class KustomerReactNative: RCTEventEmitter {
    private var chatListenerUid: String?
    // MARK: Overrides for RCTEventEmitter methods
    
    /**
     *  method will be called when the first observer is added
     */
    public override func startObserving() {
        NotificationCenter.default.addObserver(self, selector: #selector(self.handleOnUnreadCountChange), name: Notification.Name(rawValue: RCTKustomerOnUnreadCountChange), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(self.handleOnConversationCreated), name: Notification.Name(rawValue: RCTKustomerOnConversationCreated), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(self.handleOnConversationEnded), name: Notification.Name(rawValue: RCTKustomerOnConversationEnded), object: nil)
        
        let listener = MyListener()
        chatListenerUid = Kustomer.chatProvider.addChatListener(listener)
        
    }
    
    /**
     * method will be called when the last observer is removed
     */
    public override func stopObserving() {
        if (chatListenerUid != nil) {
            Kustomer.chatProvider.removeChatListener(chatListenerUid!)
        }
    }
    /**
     * Valid event names on the JS side
     */
    public override func supportedEvents() -> [String]! {
        return ["onUnreadCountChange", "onConversationCreated", "onConversationEnded"]
    }

    @objc func handleOnUnreadCountChange(_ notification: NSNotification) {
        // safe unwrap userInfo object
        if let count = notification.userInfo?["count"] as? Int {
            // send event to react native JS
            self.sendEvent(withName: "onUnreadCountChange", body: count)
        }
    }
    
    @objc func handleOnConversationCreated(_ notification: NSNotification) {
        // safe unwrap userInfo object
        if let convoId = notification.userInfo?["conversationId"] as? NSString {
            // send event to react native JS
            // JS return obj: { conversationId, brandId }
            self.sendEvent(withName: "onConversationCreated", body: ["conversationId": convoId, "brandId": notification.userInfo?["brandId"]])
        }
    }
    
    @objc func handleOnConversationEnded(_ notification: NSNotification) {
        // safe unwrap userInfo object
        if let convoId = notification.userInfo?["conversationId"] as? NSString {
            // send event to react native JS
            // JS return obj: { conversationId, brandId }
            self.sendEvent(withName: "onConversationEnded", body: ["conversationId": convoId, "brandId": notification.userInfo?["brandId"]])
        }
    }
    
    // MARK: Exposed Kustomer Methods
    /**
    - parameters:
        - option: string value for Kustomer preferredView
     */
    @objc(_show:)
    func _show(option: NSString) {
        switch option {
        case "newChat":
            dispatchMain {
                Kustomer.show(preferredView: .newChat)
            }
        case "activeChat":
            dispatchMain {
                Kustomer.show(preferredView: .activeChat)
            }
        case "chatHistory":
            dispatchMain {
                Kustomer.show(preferredView: .chatHistory)
            }
        case "onlyChat":
            dispatchMain {
                Kustomer.show(preferredView: .onlyChat)
            }
        case "knowledgeBase":
            dispatchMain {
                Kustomer.show(preferredView: .knowledgeBase)
            }
        case "onlyKnowledgeBase":
            dispatchMain {
                Kustomer.show(preferredView: .onlyKnowledgeBase)
            }
        default:
            dispatchMain {
                Kustomer.show()
            }
        }
    }
    
    @objc(isChatAvailable:withRejecter:)
    func isChatAvailable(resolve: @escaping RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        // https://developer.kustomer.com/chat-sdk/v2-iOS/docs/api-classes-chatprovider
        let provider = ChatProvider.shared
        let available: Bool? = provider.isChatAvailable()
        
        // if nil it means that something went wrong on Kustomer's end
        if available == nil {
            // fetching Kustomer Settings async to grab a more accurate error
            tryToFetchSettings() { completion in
                resolve([false, completion])
            }
        } else {
            resolve([available!, nil])
        }
    }
    
    @objc(getUnreadCount:)
    func getUnreadCount(callback: RCTResponseSenderBlock) {
        // RCTResponseSenderBlock has to be an array
        callback([Kustomer.getUnreadCount(), nil])
    }
    
    @objc(requestAuthorizationForPush)
    func requestAuthorizationForPush() {
        Kustomer.requestAuthorizationForPush()
    }
    
    // MARK: Private Methods
    
    /**
     * Method to call the Kustomer REST API to check the exact error if available
     */
    private func tryToFetchSettings(completion: @escaping (String) -> ()) {
        ChatProvider.shared.reloadChatSettings({ error in
            if error == nil {
                completion("Chat settings fetched from servers")
            } else {
                completion("Could not reload chat settings because \(error!)")
            }
        })
    }
    
    /**
     * Helper to run a method on the Main UI Thread
     */
    private func dispatchMain(cb: @escaping () -> ()) {
        DispatchQueue.main.async {
          cb()
        }
    }
}

/**
 * https://developer.kustomer.com/chat-sdk/v2-iOS/docs/api-protocols-kuschatlistener
 */
class MyListener:KUSChatListener {
    func onUnreadCountChange(count: Int) {
        // post event to native iOS global listener
        NotificationCenter.default.post(name: Notification.Name(rawValue: RCTKustomerOnUnreadCountChange), object: nil, userInfo: ["count": count])
    }
    
    

    func onConversationCreated(conversationId: String, conversation: KUSConversation) {
        print("BRAND ID: \(conversation.brandId)")
        NotificationCenter.default.post(name: Notification.Name(rawValue: RCTKustomerOnConversationCreated), object: nil, userInfo: [
            "conversationId": conversationId,
            "brandId": conversation.brandId as Any,
        ])
    }

    func onConversationEnded(conversationId: String, conversation: KUSConversation) {
        print("BRAND ID: \(conversation.brandId)")
        NotificationCenter.default.post(name: Notification.Name(rawValue: RCTKustomerOnConversationEnded), object: nil, userInfo: [
            "conversationId": conversationId,
            "brandId": conversation.brandId as Any,
        ])
    }
}
