export interface Comment {
    _id: string;
    content: string;
    postId: string;
    owner: {
      _id : string;
      userFullName: string;
      profileImage?: string;
    };
  }