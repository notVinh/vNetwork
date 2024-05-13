export const sidebarItem = [
  {
    id: 1,
    name: "Home",
    url: "/",
    imgURL: "/assets/icons/home1.svg",
  },
  {
    id: 2,
    name: "My Post",
    url: "/mypost",
    imgURL: "/assets/icons/postcard.svg",
  },
  {
    id: 3,
    name: "Bookmark",
    url: "/bookmark",
    imgURL: "/assets/icons/bookmark.svg",
  },
  {
    id: 4,
    name: "People",
    url: "/people",
    imgURL: "/assets/icons/people.svg",
  },
];

export const postAction = [
  {
    id: 1,
    name: "Like",
    url: "/new-post",
    imgURL: "/assets/icons/like.svg",
  },
  {
    id: 2,
    name: "Comment",
    url: "/search",
    imgURL: "/assets/icons/chat.svg",
  },
  {
    id: 3,
    name: "Repost",
    url: "/chat",
    imgURL: "/assets/icons/repost.svg",
  },
  {
    id: 4,
    name: "Share",
    url: "/nofication",
    imgURL: "/assets/icons/share2.svg",
  },
];

export const multiFormatDateString = (timestamp = "") => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date = new Date(timestampNum * 1000);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return "Just now";
  }
};

export const multiFormatDateStringAbb = (timestamp = "") => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date = new Date(timestampNum * 1000);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return multiFormatDateStringAbb(timestamp);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} d`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} d`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} h`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} m`;
    default:
      return "now";
  }
};
