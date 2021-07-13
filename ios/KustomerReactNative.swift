
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
            Kustomer.show(preferredView: .newChat)
        case "activeChat":
            Kustomer.show(preferredView: .activeChat)
        case "chatHistory":
            Kustomer.show(preferredView: .chatHistory)
        case "onlyChat":
            Kustomer.show(preferredView: .onlyChat)
        case "knowledgeBase":
            Kustomer.show(preferredView: .knowledgeBase)
        case "onlyKnowledgeBase":
            Kustomer.show(preferredView: .onlyKnowledgeBase)
        default:
            Kustomer.show()
        }
    }
}

