import { AlarmClockCheck } from "lucide-react";
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

  const feeds = [
    {
      id: 1,
      image:
        "data:image/jpeg;base64,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",
      name: "Alonso Kelina Falao Asiano Pero",
      create_at: "07 Hours ago",
    },
    {
      id: 2,
      image:
        "data:image/jpeg;base64,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",
      name: "Alonso Kelina Falao Asiano Pero",
      create_at: "07 Hours ago",
    },
    {
      id: 3,
      image:
        "data:image/jpeg;base64,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",
      name: "Alonso Kelina Falao Asiano Pero",
      create_at: "07 Hours ago",
    },
    {
      id: 4,
      image:
        "data:image/jpeg;base64,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",
      name: "Various versions have evolved over the years",
      create_at: "07 Hours ago",
    },
    {
      id: 5,
      image:
        "data:image/jpeg;base64,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",
      name: "Various versions have evolved over the years",
      create_at: "07 Hours ago",
    },
  ];
  return (
    <section>
      <div className="w-full">
        <div
          className="relative bg-[url('https://bizmap.dexignzone.com/f8-prod/static/media/bnr2.9d4a017f.jpg')] 
          className="relative bg-[url('https://bizmap.dexignzone.com/react/demo/static/media/bnr2.9d4a017f.jpg')] 
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
                  {/* Feeds Section */}
                  <div className="p-[30px] mb-[50px] border-[2px] border-[#ecebf5]">
                    <h3 className="text-lg font-semibold pb-[10px] uppercase">
                      FEEDS
                    </h3>
                    <div class="inline-block w-[50px] h-[3px] mb-[30px] bg-[#4611a7]"></div>
                    <div className="space-y-4">
                      {feeds.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <img
                            src={item.image}
                            alt={`Feed ${item}`}
                            className="w-20  rounded"
                          />
                          <div>
                            <h6 className="leading-[20px] hover:text-[#4d1aaa] mb-[8px]">
                              <Link className="block text-[16px] font-[500] ">
                                {item.name}
                              </Link>
                            </h6>
                            <div className="flex items-center">
                              <AlarmClockCheck
                                fontSize="14px"
                                color="#4611a7"
                              />
                              <p className="text-[14px] font-[400] text-[#4611a7]">
                                {item.create_at}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
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
