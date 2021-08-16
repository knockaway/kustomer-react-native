type onUnreadCountChangeCallback = (n: number) => void;
type onConversationCreatedCallback = (param: {
  conversationId: string;
  brandId: string;
}) => void;

export type ChatListenerCallback<T> = T extends 'onConversationCreated'
  ? onConversationCreatedCallback
  : T extends 'onUnreadCountChange'
  ? onUnreadCountChangeCallback
  : never;
