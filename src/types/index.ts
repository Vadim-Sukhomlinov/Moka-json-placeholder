export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    link?: string;
    comment_count?: number;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface PostCardProps {
    post: Post;
    onClick: () => void;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface CommentItemProps {
    comment: Comment;
    isLast?: boolean;
}

export interface ThemeContextValue {
    toggleTheme: () => void;
    isDarkMode: boolean;
    gradientBackground: string;
}
