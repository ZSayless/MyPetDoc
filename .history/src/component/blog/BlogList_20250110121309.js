import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 12;
  const blogData = [
    {
      id: 1,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 2,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 3,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 4,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 5,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 6,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 7,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 8,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 9,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 10,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 11,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 12,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 13,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 14,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 15,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 16,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 17,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 18,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 19,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 20,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 21,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 22,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 23,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 24,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 25,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 26,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 27,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 28,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 29,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 30,
      title:
        "Mình đã làm thế nào để hoàn thành một dự án website chỉ trong 15 ngày",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Lý Cao Nguyên",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/public-images/6670ea3e254bb.png",
      description:
        "Xin chào mọi người mình là Lý Cao Nguyên, mình đã làm một dự án website front-end với hơn 100 bài học và 200 bài viết này ",
      tags: "Frontend",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/10850/667550d384026.png",
    },
    {
      id: 31,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
    {
      id: 32,
      title:
        "Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án AI Powered Learning",
      date: "3 tháng trước",
      readTime: "6 phút đọc",
      name: "Sơn Đặng",
      avatar:
        "https://files.fullstack.edu.vn/f8-prod/user_avatars/1/64f9a2fd4e064.jpg",
      isVerified: true,
      description:
        "Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang...",
      tags: "ReactJS",
      thumbnail:
        "https://files.fullstack.edu.vn/f8-prod/blog_posts/11504/66fd03cd7b3e4.jpg",
    },
  ];
  const offset = currentPage * limit;
  const currentPageData = blogData.slice(offset, offset + limit);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <div className="w-full">
        <div
          className="relative bg-[url('https://bizmap.dexignzone.com/f8-prod/static/media/bnr2.9d4a017f.jpg')] 
      bg-cover bg-center bg-no-repeat h-[300px] md:h-[400px] flex flex-col items-center justify-center
      before:content-[''] before:absolute before:inset-0 before:bg-black/50"
        >
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-[50px] font-bold mb-4">
              Blog Standard
            </h1>
            <p className="text-lg md:text-[18px] mb-8">
              Find awesome places, bars, restaurants & activities.
            </p>
            <div className="flex justify-center items-center space-x-2 text-sm md:text-base ">
              <div className="py-[10px] px-[20px] btn__contact rounded">
                <Link
                  to="/"
                  className="text-[14px] font-[500px] cursor-pointer"
                >
                  Home
                </Link>
                <span className="mx-2">|</span>
                <Link
                  to="/bloglist"
                  className="text-[14px] font-[500px] cursor-pointer"
                >
                  Blog Standard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5 pt-[100px] pb-[70px]">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-6">
              {currentPageData.map((blog) => (
                <div
                  key={blog.id}
                  className="flex bg-white rounded-lg p-[20px] border-[2px] border-[#e8e8e8] "
                >
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={blog.avatar}
                      alt={blog.name}
                      className="w-[26px] h-[26px] rounded-full"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-2 text-sm text-[#292929] mb-1">
                      <span className="font-medium">{blog.name}</span>
                    </div>

                    <h2 className="text-lg font-semibold mb-2">
                      <Link
                        to={`/blogdetail/${blog.id}`}
                        className="text-[#000]"
                      >
                        {blog.title}
                      </Link>
                    </h2>

                    <p className="text-gray-600 text-sm mb-3">
                      {blog.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <Link className="px-[10px] py-[4px] bg-gray-100 text-[#333] rounded-[100px] text-[14px] font-medium">
                        {blog.tags}
                      </Link>
                      <span className="text-[#000] text-[14px]">
                        {blog.date}
                      </span>
                      <span className="text-[#000] text-[14px]">•</span>
                      <span className="text-[#000] text-[14px]">
                        {blog.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-4 mt-[34px] hidden lg:block">
                    <Link>
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-[200px] h-[120px] object-cover rounded-[15px]"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <ReactPaginate
              previousLabel={"<<"}
              nextLabel={">>"}
              pageCount={Math.ceil(blogData.length / limit)}
              onPageChange={handlePageClick}
              containerClassName={"flex justify-center mt-12 gap-2"}
              previousClassName={"px-[12px] py-[6px] text-[#000]"}
              nextClassName={"px-[12px] py-[6px] text-[#000] "}
              pageClassName={"px-[12px] py-[6px] text-[#000] "}
              activeClassName={"bg-[#f05123] text-[#fff] rounded"}
            />
          </div>

          <div className="col-span-12 lg:col-span-4 text-[#000]">
            <div className="row">
              <div className="grid-cols-12">
                <div className="col-span-12">
                  {/* Search Section */}
                  <div className="p-[30px] mb-[50px] border-[2px] border-[#ecebf5]">
                    <h3 className="text-lg font-semibold pb-[10px] uppercase">
                      SEARCH
                    </h3>
                    <div class="inline-block w-[50px] h-[3px] mb-[30px] bg-[#4611a7]"></div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Search your keyword..."
                        className="w-full px-[30px] py-[15px] border border-gray-300 rounded-l outline-none"
                      />
                      <button className="bg-[#4611a7] text-white px-4 rounded-r hover:bg-[#7133e2]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-[30px] mb-[50px] border-[2px] border-[#ecebf5]">
                  <h3 className="text-[22px] font-semibold pb-[10px] uppercase">
                    Follow us
                  </h3>
                  <div className="inline-block w-[50px] h-[3px] mb-[30px] bg-[#4611a7]"></div>
                  <div className="flex gap-2">
                    {/* Facebook */}
                    <Link
                      href="#"
                      className="bg-[#3b5998] p-2 rounded-full text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </Link>

                    {/* Google+ */}
                    <Link
                      href="#"
                      className="bg-[#dd4b39] p-2 rounded-full text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z" />
                      </svg>
                    </Link>

                    {/* LinkedIn */}
                    <Link
                      href="#"
                      className="bg-[#0077b5] p-2 rounded-full text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                    </Link>

                    {/* Instagram */}
                    <Link
                      href="#"
                      className="bg-[#e4405f] p-2 rounded-full text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </Link>

                    {/* Twitter */}
                    <Link
                      href="#"
                      className="bg-[#1da1f2] p-2 rounded-full text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="col-span-12">
                  {/* Categories Section */}
                  <div className="p-[30px] mb-[50px] border-[2px] border-[#ecebf5]">
                    <h3 className="text-lg font-semibold pb-[10px] uppercase">
                      CATEGORIES
                    </h3>
                    <div class="inline-block w-[50px] h-[3px] mb-[30px] bg-[#4611a7]"></div>
                    <div className="space-y-2">
                      <div className="text-[16px] font-[400px] border__category flex justify-between items-center py-[15px] text-[#4b4d56]">
                        <span>Lifestyle</span>
                        <span>(55)</span>
                      </div>
                      <div className="text-[16px] font-[400px] border__category flex justify-between items-center py-[15px] text-[#4b4d56]">
                        <span>Travel</span>
                        <span>(34)</span>
                      </div>
                      <div className="text-[16px] font-[400px] border__category flex justify-between items-center py-[15px] text-[#4b4d56]">
                        <span>Fashion</span>
                        <span>(89)</span>
                      </div>
                      <div className="text-[16px] font-[400px] border__category flex justify-between items-center py-[15px] text-[#4b4d56]">
                        <span>Music</span>
                        <span>(96)</span>
                      </div>
                      <div className="text-[16px] font-[400px] border__category flex justify-between items-center py-[15px] text-[#4b4d56]">
                        <span>Branding</span>
                        <span>(78)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12">
                  {/* Tags Section */}
                  <div className="p-[30px] mb-[50px] border-[2px] border-[#ecebf5]">
                    <h3 className="text-lg font-semibold pb-[10px] uppercase">
                      TAGS
                    </h3>
                    <div className="inline-block w-[50px] h-[3px] mb-[30px] bg-[#4611a7]"></div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Travel",
                        "Lifestyle",
                        "Photo",
                        "Adventures",
                        "Musician",
                        "08",
                        "Travel",
                        "Lifestyle",
                        "Photo",
                        "Adventures",
                        "Musician",
                        "08",
                      ].map((tag) => (
                        <Link
                          key={tag}
                          className="px-[20px] py-[15px] text-[#7886a0] text-[14px] bg-white border border-[#eaeaea] rounded text-sm hover:bg-[#4611a7] hover:text-white transition-colors duration-300"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-span-12">
                  <img
                    className="w-full"
                    src="https://bizmap.dexignzone.com/react/demo/static/media/add1.58429641.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
