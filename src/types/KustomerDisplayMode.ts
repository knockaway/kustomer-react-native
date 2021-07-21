type KustomerDisplayModeiOS =
  | 'newChat'
  | 'activeChat'
  | 'chatHistory'
  | 'knowledgeBase';

type KustomerDisplayModeAndroid = 'chatAndKnowledgeBase';

export type KustomerDisplayMode =
  | KustomerDisplayModeiOS
  | KustomerDisplayModeAndroid
  | 'onlyChat'
  | 'onlyKnowledgeBase'
  | 'default';
