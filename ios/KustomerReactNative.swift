
import KustomerChat
@objc(KustomerReactNative)
public class KustomerReactNative: NSObject {
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

