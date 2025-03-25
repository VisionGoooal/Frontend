export interface Post {
    _id: string;
    title: string;
    content: string;
    owner: {
      _id? :string;
      userFullName : string;
      profileImage : string;
    };
    likes: [number];
    image?: string;
  }